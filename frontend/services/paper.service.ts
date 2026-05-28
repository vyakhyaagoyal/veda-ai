import api from "@/lib/api";
// import axios from "@/lib/axios";

export const paperService = {
  async getAssignment(id: string) {
    const response =
      await api.get(
        `/assignments/${id}`
      );

    return response.data.data;
  },

  async regeneratePaper(
    id: string
  ) {
    return api.post(
      `/assignments/${id}/regenerate`
    );
  },
};