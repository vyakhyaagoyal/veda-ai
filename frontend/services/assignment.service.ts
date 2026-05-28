import api from "@/lib/api";
// import axios from "@/lib/axios";

export const assignmentService = {
  async getAssignments() {
    const response =
      await api.get("/assignments");

    return response.data.data;
  },

  deleteAssignment: async (
  id: string
) => {
  const response =
    await api.delete(
      `/assignments/${id}`
    );

  return response.data;
},
};