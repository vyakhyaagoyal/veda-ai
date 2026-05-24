import mongoose, {
  Schema,
} from "mongoose";

const NotificationSchema =
  new Schema(
    {
      title: String,

      message: String,

      type: {
        type: String,

        enum: [
          "success",
          "warning",
          "error",
          "info",
        ],

        default: "info",
      },

      read: {
        type: Boolean,

        default: false,
      },

      assignmentId: {
        type:
          Schema.Types.ObjectId,

        ref: "Assignment",
      },
    },
    {
      timestamps: true,
    }
  );

export const Notification =
  mongoose.model(
    "Notification",
    NotificationSchema
  );