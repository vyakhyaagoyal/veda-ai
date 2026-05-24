import mongoose, {
  Schema,
} from "mongoose";


const QuestionSchema =
  new Schema({
   question: {
  type: String,
  required: true,
},

difficulty: {
  type: String,
  enum: [
    "easy",
    "medium",
    "hard",
  ],
},

marks: {
  type: Number,
  required: true,
},
  });

const SectionSchema =
  new Schema({
    title: {
  type: String,
  required: true,
},

instruction: {
  type: String,
  required: true,
},

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
      sourceContent: String,

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
  type: {
    sections: [
      SectionSchema,
    ],
  },

  default: undefined,
},
    },
    {
      timestamps: true,
    }
  );

  AssignmentSchema.index({
  createdAt: -1,
});

export const Assignment =
  mongoose.model(
    "Assignment",
    AssignmentSchema
  );