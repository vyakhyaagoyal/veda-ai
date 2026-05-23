import axios from "@/lib/axios";

export const assignmentService = {
  async getAssignments() {
    const response =
      await axios.get("/assignments");

    return response.data.data;
  },

  async deleteAssignment(
    id: string
  ) {
    return axios.delete(
      `/assignments/${id}`
    );
  },
};