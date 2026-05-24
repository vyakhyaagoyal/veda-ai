import axios from "@/lib/axios";

export const paperService = {
  async getAssignment(id: string) {
    const response =
      await axios.get(
        `/assignments/${id}`
      );

    return response.data.data;
  },

  async regeneratePaper(
    id: string
  ) {
    return axios.post(
      `/assignments/${id}/regenerate`
    );
  },
};