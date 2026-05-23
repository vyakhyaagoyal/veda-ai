import { create } from "zustand";

export interface QuestionRow {
  id: string;
  type: string;
  count: number;
  marks: number;
}

interface CreateAssignmentStore {
    progress: number;

setProgress: (
  progress: number
) => void;

  dueDate: string;

  additionalInfo: string;

  uploadedFile: File | null;

  rows: QuestionRow[];

  loading: boolean;

  setDueDate: (
    dueDate: string
  ) => void;

  setAdditionalInfo: (
    info: string
  ) => void;

  setUploadedFile: (
    file: File | null
  ) => void;

  setRows: (
    rows: QuestionRow[]
  ) => void;

  setLoading: (
    loading: boolean
  ) => void;

  resetForm: () => void;
}

export const useCreateAssignmentStore =
  create<CreateAssignmentStore>(
    (set) => ({
        progress: 1,

      dueDate: "",

      additionalInfo: "",

      uploadedFile: null,

      loading: false,

      rows: [
        {
          id: crypto.randomUUID(),
          type: "Multiple Choice Questions",
          count: 4,
          marks: 1,
        },
      ],

      setProgress: (progress) =>
  set({ progress }),
      
      setDueDate: (dueDate) =>
        set({ dueDate }),

      setAdditionalInfo: (
        additionalInfo
      ) =>
        set({ additionalInfo }),

      setUploadedFile: (
        uploadedFile
      ) =>
        set({ uploadedFile }),

      setRows: (rows) =>
        set({ rows }),

      setLoading: (loading) =>
        set({ loading }),

      resetForm: () =>
        set({
          dueDate: "",
          additionalInfo: "",
          uploadedFile: null,
          rows: [],
        }),
    })
  );