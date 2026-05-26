import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    verified: {
      type: Boolean,
      default: false,
    },

    otp: String,

    otpExpiry: Date,

    avatar: {
      type: String,
      default:
        "https://api.dicebear.com/7.x/adventurer/svg",
    },

    school: {
      name: {
        type: String,
        default: "Delhi Public School",
      },

      city: {
        type: String,
        default: "India",
      },
    },
  },

  {
    timestamps: true,
  }
);

export const User =
  mongoose.model("User", userSchema);