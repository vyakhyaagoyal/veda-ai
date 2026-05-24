import { QuestionRow }
  from "@/store/create-assignment.store";

export const validateAssignment = ({
  dueDate,
  rows,
  additionalInfo,
  uploadedFiles,
}: {
  dueDate: string;

  rows: QuestionRow[];

  additionalInfo: string;

  uploadedFiles: File[];
}) => {

  const errors: string[] = [];

  // Due Date
  if (!dueDate?.trim()) {
    errors.push("Due date should not be empty");
  }

  // Uploaded Files
  if (!uploadedFiles.length) {
    errors.push(
      "Please upload at least one document/image"
    );
  }

  // Additional Info
  if (!additionalInfo?.trim()) {
    errors.push(
      "Additional information should not be empty"
    );
  }

  // Rows
  if (!rows.length) {
    errors.push(
      "Add at least one question type"
    );
  }

  for (const row of rows) {

    // Question Type
    if (!row.type?.trim()) {
      errors.push(
        "Question type should not be empty"
      );
    }

    // Question Count
    if (row.count <= 0) {
      errors.push(
        `${row.type} question count must be greater than 0`
      );
    }

    // Marks
    if (row.marks <= 0) {
      errors.push(
        `${row.type} marks must be greater than 0`
      );
    }
  }

  return errors;
};