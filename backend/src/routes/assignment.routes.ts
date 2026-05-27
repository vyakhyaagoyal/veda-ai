import express from "express";

import {
  createAssignment,
  getAssignments,
  regenerateAssignment,
  getAssignmentById,
  downloadPDF,
  deleteAssignment,
} from "../controllers/assignment.controller";

import { upload }
  from "../middlewares/upload";

import {
  handleMulterError,
} from "../middlewares/multer-error.middleware";

const router =
  express.Router();

router.post(
  "/create",

  upload.single("file"),

  handleMulterError,

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

router.get(
  "/:id/pdf",
  downloadPDF
);

router.delete(
  "/:id",
  deleteAssignment
);

export default router;