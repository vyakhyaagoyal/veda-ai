import api from "@/lib/api";
// import axios from "@/lib/axios";

export const generationService = {
  async createAssignment(
    formData: FormData
  ) {
    const response =
      await api.post(
        "/assignments/create",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    return response.data;
  },
};