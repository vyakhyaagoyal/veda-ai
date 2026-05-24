import api from "@/lib/axios";
import axios from "@/lib/axios";

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
    await axios.delete(
      `/assignments/${id}`
    );

  return response.data;
},
};