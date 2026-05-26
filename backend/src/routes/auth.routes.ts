import express from "express";

import {
  login,
  signup,
  verifyOTP,
    getMe,
    logout
} from "../controllers/auth.controller";

import {
  protect,
} from "../middlewares/auth.middleware";

const router =
  express.Router();

router.post(
  "/signup",
  signup
);

router.post(
  "/verify-otp",
  verifyOTP
);

router.post(
  "/login",
  login
);

router.get(
  "/me",
  protect,
  getMe
);

router.post(
  "/logout",
  logout
);

export default router;