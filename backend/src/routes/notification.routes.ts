import express from "express";

import {
  getNotifications,
  markAsRead,
  clearAllNotifications,
} from "../controllers/notification.controller";

const router =
  express.Router();

router.get(
  "/",
  getNotifications
);

router.patch(
  "/:id/read",
  markAsRead
);

router.delete(
  "/clear-all",
  clearAllNotifications
);

export default router;