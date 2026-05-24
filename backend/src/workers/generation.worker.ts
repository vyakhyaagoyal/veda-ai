import { Worker } from "bullmq";

import { redisConnection } from "../queues/redis";

import { Assignment } from "../models/Assignment";

import { buildPrompt } from "../utils/buildPrompt";

import { generatePaper } from "../services/ai.service";

import { getIO } from "../sockets/socket";

import { Notification }
  from "../models/Notification";

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

        assignment.title =
  generatedPaper.title ||
  "Untitled Assignment";

      // -----------------------------
      // SAVE GENERATED PAPER
      // -----------------------------
      assignment.generatedPaper = {
  sections:
    generatedPaper.sections ||
    [],
};

      assignment.status =
        "completed";

        await Notification.create({
  title:
    "Assignment Generated",

  message: `${assignment.title} has been generated successfully.`,

  type: "success",

  assignmentId:
    assignment._id,
});

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