export type Difficulty =
  | "easy"
  | "medium"
  | "hard";

export interface Question {
  id: string;
  text: string;
  difficulty: Difficulty;
  marks: number;
}

export interface Section {
  title: string;
  instruction: string;
  questions: Question[];
}

export interface AssignmentPaper {
  sections: Section[];
}

export interface Assignment {
  _id: string;

  title: string;

  subject: string;

  className: string;

  dueDate: string;

  createdAt: string;

  status:
    | "draft"
    | "generating"
    | "completed"
    | "failed";

  totalMarks: number;

  totalQuestions: number;

  paper?: AssignmentPaper;
}