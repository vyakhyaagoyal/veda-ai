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

import {
  protect,
} from "../middlewares/auth.middleware";

const router =
  express.Router();

router.post(
  "/create",
  protect,
  upload.single("file"),

  handleMulterError,

  createAssignment
);

router.get(
  "/",

  protect,

  getAssignments
);

router.get(
  "/:id",

  protect,

  getAssignmentById
);

router.get(
  "/:id/pdf",

  protect,

  downloadPDF
);

router.delete(
  "/:id",

  protect,

  deleteAssignment
);

router.post(
  "/:id/regenerate",

  protect,

  regenerateAssignment
);

export default router;