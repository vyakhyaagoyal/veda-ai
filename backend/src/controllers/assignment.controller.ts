import { Request, Response }
  from "express";

import { Assignment }
  from "../models/Assignment";

import { generationQueue }
  from "../queues/generation.queue";

  import { generatePDF }
  from "../services/pdf.service";

  import { parseUploadedFile }
  from "../services/file-parser.service";

  export const downloadPDF =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const assignment =
        await Assignment.findById(
          req.params.id
        );

      if (
        !assignment ||
        !assignment.generatedPaper
      ) {
        return res
          .status(404)
          .json({
            success: false,
          });
      }

      generatePDF(
        assignment,
        res
      );
    } catch (error) {
      console.error(error);

      res
        .status(500)
        .json({
          success: false,
        });
    }
  };

export const createAssignment =

  async (
    req: Request,
    res: Response
  ) => {
    try {
      const {
        dueDate,
        additionalInfo,
        rows,
      } = req.body;

      const sourceContent =
  req.file
    ? await parseUploadedFile(
        req.file
      )
    : "";

    if (!rows) {
  return res
    .status(400)
    .json({
      success: false,
      message:
        "Question configuration required",
    });
}

      const assignment =
  await Assignment.create({
    dueDate,

    additionalInfo,

    sourceContent,

    questionConfig:
      JSON.parse(rows),

    status: "queued",

    uploadedFileUrl:
  req.file?.originalname || "",
  });

      await generationQueue.add(
  "generate-paper",
  {
    assignmentId:
      assignment._id,
  },
  {
    attempts: 3,

    backoff: {
      type: "exponential",

      delay: 2000,
    },

    removeOnComplete: 50,

    removeOnFail: 20,
  }
);

      return res.json({
        success: true,

        assignmentId:
          assignment._id,
      });
    } 
    catch (error: any) {
  console.error(error);

  // -----------------------------
  // OCR FAILURE
  // -----------------------------
  if (
    error.message ===
    "OCR_UNREADABLE"
  ) {
    return res
      .status(400)
      .json({
        success: false,

        message:
          "Could not extract readable content from uploaded image. Please upload a clearer image or PDF.",
      });
  }

  return res
    .status(500)
    .json({
      success: false,

      message:
        "Something went wrong while creating assignment.",
    });
}
  };

  export const regenerateAssignment =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const assignment =
        await Assignment.findById(
          req.params.id
        );

      if (!assignment) {
        return res
          .status(404)
          .json({
            success: false,
            message:
              "Assignment not found",
          });
      }

      // Reset assignment
      assignment.status =
        "queued";

      assignment.generatedPaper = undefined;

      await assignment.save();

      // Add queue job again
      await generationQueue.add(
        "generate-paper",
        {
          assignmentId:
            assignment._id,
        }
      );

      return res.json({
        success: true,
      });
    } catch (error) {
      console.error(error);

      return res
        .status(500)
        .json({
          success: false,
        });
    }
  };

export const getAssignments =
  async (
    req: Request,
    res: Response
  ) => {
    const assignments =
      await Assignment.find().sort({
        createdAt: -1,
      });

    res.json({
      success: true,

      data: assignments,
    });
  };

export const getAssignmentById =
  async (
    req: Request,
    res: Response
  ) => {
    const assignment =
  await Assignment.findById(
    req.params.id
  );

if (!assignment) {
  return res
    .status(404)
    .json({
      success: false,
      message:
        "Assignment not found",
    });
}

    res.json({
      success: true,

      data: assignment,
    });
  };