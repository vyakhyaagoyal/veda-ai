import api from "@/lib/api";
// import axios from "@/lib/axios";

export const generationService = {
  async createAssignment(
    formData: FormData
  ) {
    const response =
      await api.post(
        "/assignments/create",
        formData
      );

    return response.data;
  },
};