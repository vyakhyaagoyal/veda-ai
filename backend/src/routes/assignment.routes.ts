import express from "express";

import {
  createAssignment,
  getAssignments,
  getAssignmentById,
} from "../controllers/assignment.controller";

import { upload }
  from "../middlewares/upload";

const router =
  express.Router();

router.post(
  "/create",
  upload.single("file"),
  createAssignment
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