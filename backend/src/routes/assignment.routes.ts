import express from "express";

import {
  createAssignment,
  getAssignments,
  regenerateAssignment,
  getAssignmentById,
} from "../controllers/assignment.controller";

import { upload }
  from "../middlewares/upload";

const router =
  express.Router();

router.post(
  "/create",
  upload.array("files",50), //50 is max limit for number of files
  createAssignment
);

router.post(
  "/:id/regenerate",
  regenerateAssignment
);

router.get(
  "/",
  getAssignments
);

router.get(
  "/:id",
  getAssignmentById
);

export default router;