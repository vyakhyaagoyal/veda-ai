import { QuestionRow }
  from "@/store/create-assignment.store";

export const validateAssignment =
  ({
    dueDate,
    rows,
  }: {
    dueDate: string;
    rows: QuestionRow[];
  }) => {
    if (!dueDate) {
      return "Due date is required";
    }

    if (!rows.length) {
      return "Add at least one question type";
    }

    for (const row of rows) {
      if (row.count <= 0) {
        return "Question count must be greater than 0";
      }

      if (row.marks <= 0) {
        return "Marks must be greater than 0";
      }
    }

    return null;
  };