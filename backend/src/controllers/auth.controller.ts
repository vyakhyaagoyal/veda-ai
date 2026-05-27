import bcrypt from "bcryptjs";

import { Request, Response } from "express";

import { User } from "../models/User";

import { generateOTP } from "../utils/generateOTP";

import { sendOTPEmail } from "../utils/sendEmail";

import { generateToken } from "../utils/generateToken";

import {
  AuthRequest,
} from "../middlewares/auth.middleware";

export const signup =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const {
        firstName,
        lastName,
        email,
        password,
      } = req.body;

      const existingUser =
        await User.findOne({
          email,
        });

      if (existingUser) {
        return res.status(400).json({
          message:
            "User already exists",
        });
      }

      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        );

      const otp =
        generateOTP();

      const otpExpiry =
        new Date(
          Date.now() +
            10 * 60 * 1000
        );

      // SEND EMAIL FIRST
      await sendOTPEmail(
        email,
        otp
      );

      // CREATE USER ONLY AFTER EMAIL SUCCESS
      await User.create({
        firstName,
        lastName,
        email,
        password:
          hashedPassword,
        otp,
        otpExpiry,
      });

      return res.status(201).json({
        message:
          "OTP sent successfully",
      });
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        message:
          "Signup failed",
      });
    }
  };

export const verifyOTP =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const {
        email,
        otp,
      } = req.body;

      const user =
        await User.findOne({
          email,
        });

      if (!user) {
        return res.status(404).json({
          message:
            "User not found",
        });
      }

      if (
        user.otp !== otp
      ) {
        return res.status(400).json({
          message:
            "Invalid OTP",
        });
      }

      if (
        user.otpExpiry! <
        new Date()
      ) {
        return res.status(400).json({
          message:
            "OTP expired",
        });
      }

      user.verified = true;

      user.otp = undefined;

      await user.save();

      const token =
        generateToken(
          user._id.toString()
        );

      res.cookie(
        "token",
        token,
        {
          httpOnly: true,
          secure:
  process.env.NODE_ENV ===
  "production",
          sameSite: "none",
        }
      );

      res.json({
        message:
          "Account verified",

        user,
      });
    } catch (error) {
      res.status(500).json({
        message:
          "Verification failed",
      });
    }
  };

  export const getMe =
  async (
    req: AuthRequest,
    res: Response
  ) => {
    try {
      const user =
        await User.findById(
          req.userId
        ).select("-password");

      res.json(user);
    } catch (error) {
      res.status(500).json({
        message:
          "Failed to fetch user",
      });
    }
  };

  export const logout =
  async (
    req: Request,
    res: Response
  ) => {
    res.clearCookie("token", {
      httpOnly: true,
      secure:
  process.env.NODE_ENV ===
  "production",
      sameSite: "none",
    });

    res.json({
      message:
        "Logged out",
    });
  };

export const login =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const {
        email,
        password,
      } = req.body;

      const user =
        await User.findOne({
          email,
        });

      if (!user) {
        return res.status(404).json({
          message:
            "User not found",
        });
      }

      const isMatch =
        await bcrypt.compare(
          password,
          user.password
        );

      if (!isMatch) {
        return res.status(400).json({
          message:
            "Invalid credentials",
        });
      }

      const token =
        generateToken(
          user._id.toString()
        );

      res.cookie(
        "token",
        token,
        {
          httpOnly: true,
          secure:
  process.env.NODE_ENV ===
  "production",
          sameSite: "none",
        }
      );

      res.json({
        user,
      });
    } catch (error) {
      res.status(500).json({
        message:
          "Login failed",
      });
    }
  };