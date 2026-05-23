import { create } from "zustand";

export interface Assignment {
  _id: string;
  title: string;
  assignedOn: string;
  dueDate: string;
  category: string;
  submissions: number;

  status:
    | "draft"
    | "generating"
    | "completed"
    | "failed";
}

interface AssignmentStore {
  assignments: Assignment[];

  loading: boolean;

  search: string;

  filter: string;

  setAssignments: (
    assignments: Assignment[]
  ) => void;

  addAssignment: (
    assignment: Assignment
  ) => void;

  removeAssignment: (
    id: string
  ) => void;

  updateAssignment: (
    id: string,
    updates: Partial<Assignment>
  ) => void;

  setLoading: (
    loading: boolean
  ) => void;

  setSearch: (
    search: string
  ) => void;

  setFilter: (
    filter: string
  ) => void;
}

export const useAssignmentStore =
  create<AssignmentStore>((set) => ({
    assignments: [] as Assignment[],

    loading: false,

    search: "",

    filter: "all",

    setAssignments: (assignments) =>
      set({ assignments }),

    addAssignment: (assignment) =>
      set((state) => ({
        assignments: [
          assignment,
          ...state.assignments,
        ],
      })),

    removeAssignment: (id) =>
      set((state) => ({
        assignments:
          state.assignments.filter(
            (a) => a._id !== id
          ),
      })),

    updateAssignment: (
      id,
      updates
    ) =>
      set((state) => ({
        assignments:
          state.assignments.map((a) =>
            a._id === id
              ? { ...a, ...updates }
              : a
          ),
      })),

    setLoading: (loading) =>
      set({ loading }),

    setSearch: (search) =>
      set({ search }),

    setFilter: (filter) =>
      set({ filter }),
  }));