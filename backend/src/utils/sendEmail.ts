import axios from "axios";

export const sendOTPEmail =
  async (
    email: string,
    otp: string
  ) => {
    try {
      const response =
        await axios.post(
          "https://api.brevo.com/v3/smtp/email",
          {
            sender: {
              name: "VedaAI",
              email:
                "vyakhyagoyal22@gmail.com",
            },

            to: [
              {
                email,
              },
            ],

            subject:
              "VedaAI Verification Code",

            htmlContent: `
              <div style="
                font-family:sans-serif;
                padding:20px;
              ">
                <h2>
                  Verify your VedaAI account
                </h2>

                <p>Your OTP is:</p>

                <h1>${otp}</h1>

                <p>
                  This OTP expires in
                  10 minutes.
                </p>
              </div>
            `,
          },
          {
            headers: {
              accept:
                "application/json",

              "api-key":
                process.env
                  .BREVO_API_KEY,

              "content-type":
                "application/json",
            },
          }
        );

      console.log(
        "EMAIL SENT:",
        response.data
      );
    } catch (error: any) {
      console.log(
        "EMAIL ERROR:",
        error.response?.data ||
          error.message
      );

      throw error;
    }
  };