import mongoose, {
  Schema,
} from "mongoose";

const QuestionSchema =
  new Schema({
    question: String,

    difficulty: String,

    marks: Number,
  });

const SectionSchema =
  new Schema({
    title: String,

    instruction: String,

    questions: [
      QuestionSchema,
    ],
  });

const AssignmentSchema =
  new Schema(
    {
      dueDate: String,

      additionalInfo: String,

      uploadedFileUrl: String,

      questionConfig: [
        {
          type: String,

          count: Number,

          marks: Number,
        },
      ],

      status: {
        type: String,

        enum: [
          "queued",
          "generating",
          "completed",
          "failed",
        ],

        default: "queued",
      },

      generatedPaper: {
        sections: [
          SectionSchema,
        ],
      },
    },
    {
      timestamps: true,
    }
  );

export const Assignment =
  mongoose.model(
    "Assignment",
    AssignmentSchema
  );