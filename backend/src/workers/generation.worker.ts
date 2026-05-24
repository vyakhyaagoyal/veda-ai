import { Worker } from "bullmq";

import { redisConnection } from "../queues/redis";

import { Assignment } from "../models/Assignment";

import { buildPrompt } from "../utils/buildPrompt";

import { generatePaper } from "../services/ai.service";

import { getIO } from "../sockets/socket";

new Worker(
  "assignment-generation",

  async (job) => {
    const { assignmentId } =
      job.data;

    const io = getIO();

    try {
      // -----------------------------
      // FIND ASSIGNMENT
      // -----------------------------
      const assignment =
        await Assignment.findById(
          assignmentId
        );

      if (!assignment) {
        throw new Error(
          "Assignment not found"
        );
      }

      // -----------------------------
      // UPDATE STATUS
      // -----------------------------
      assignment.status =
        "generating";

      await assignment.save();

      // -----------------------------
      // SOCKET EVENT
      // -----------------------------
      io.emit(
        "generation-progress",
        {
          assignmentId,

          status:
            "generating",
        }
      );

      // -----------------------------
      // BUILD PROMPT
      // -----------------------------
      const prompt =
  buildPrompt(
    assignment.questionConfig || [],

    assignment.additionalInfo || "",

    assignment.sourceContent || ""
  );

      // -----------------------------
      // GENERATE PAPER
      // -----------------------------
      const generatedPaper =
        await generatePaper(
          prompt
        );

      // -----------------------------
      // SAVE GENERATED PAPER
      // -----------------------------
      assignment.generatedPaper =
        generatedPaper;

      assignment.status =
        "completed";

      await assignment.save();

      // -----------------------------
      // SOCKET COMPLETE EVENT
      // -----------------------------
      io.emit(
        "generation-complete",
        {
          assignmentId,

          status:
            "completed",
        }
      );

      console.log(
        `Assignment ${assignmentId} generated successfully`
      );
    } catch (error) {
      console.error(error);

      // -----------------------------
      // UPDATE FAILURE STATUS
      // -----------------------------
      await Assignment.findByIdAndUpdate(
        assignmentId,
        {
          status: "failed",

failureReason:
  error instanceof Error
    ? error.message
    : "Unknown error",
        }
      );

      // -----------------------------
      // SOCKET FAILURE EVENT
      // -----------------------------
      io.emit(
        "generation-failed",
        {
          assignmentId,
        }
      );
    }
  },

  {
    connection: redisConnection,
  }
);