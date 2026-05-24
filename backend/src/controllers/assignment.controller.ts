import { Request, Response }
  from "express";

import { Assignment }
  from "../models/Assignment";

import { generationQueue }
  from "../queues/generation.queue";

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

      const assignment =
        await Assignment.create({
          dueDate,

          additionalInfo,

          questionConfig:
            JSON.parse(rows),

          status: "queued",
        });

      await generationQueue.add(
        "generate-paper",
        {
          assignmentId:
            assignment._id,
        }
      );

      return res.json({
        success: true,

        assignmentId:
          assignment._id,
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

      assignment.generatedPaper =
        undefined;

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

    res.json({
      success: true,

      data: assignment,
    });
  };