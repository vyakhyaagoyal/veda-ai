import { Worker }
  from "bullmq";

import { redis }
  from "../config/redis";

import { Assignment }
  from "../models/Assignment";

import { generatePaper }
  from "../services/ai.service";

import { buildPrompt }
  from "../utils/buildPrompt";

import { getIO }
  from "../sockets/socket";

new Worker(
  "assignment-generation",

  async (job) => {
    const {
      assignmentId,
    } = job.data;

    const io = getIO();

    try {
      const assignment =
        await Assignment.findById(
          assignmentId
        );

      if (!assignment) return;

      assignment.status =
        "generating";

      await assignment.save();

      io.emit(
        "generation-progress",
        {
          assignmentId,

          status:
            "generating",
        }
      );

      const prompt =
        buildPrompt(
          assignment.questionConfig,
          assignment.additionalInfo
        );

      const paper =
        await generatePaper(
          prompt
        );

      assignment.generatedPaper =
        paper;

      assignment.status =
        "completed";

      await assignment.save();

      io.emit(
        "generation-complete",
        {
          assignmentId,

          status:
            "completed",
        }
      );
    } catch (error) {
      console.error(error);

      io.emit(
        "generation-failed",
        {
          assignmentId,
        }
      );
    }
  },

  {
    connection: redis,
  }
);