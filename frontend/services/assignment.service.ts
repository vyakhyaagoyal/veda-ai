import api from "@/lib/axios";

export const assignmentService = {
  async getAssignments() {
    const response =
      await api.get("/assignments");

    return response.data.data;
  },
};