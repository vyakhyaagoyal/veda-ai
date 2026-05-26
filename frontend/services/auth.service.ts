import axios from "@/lib/axios";

export const authService = {
  signup: async (data: any) => {
    const response =
      await axios.post(
        "/auth/signup",
        data
      );

    return response.data;
  },

  getMe: async () => {
  const response =
    await axios.get(
      "/auth/me"
    );

  return response.data;
},

logout: async () => {
  const response =
    await axios.post(
      "/auth/logout"
    );

  return response.data;
},

verifyOTP: async (data: any) => {
  const response =
    await axios.post(
      "/auth/verify-otp",
      data
    );

  return response.data;
},

  login: async (data: any) => {
    const response =
      await axios.post(
        "/auth/login",
        data
      );

    return response.data;
  },
};