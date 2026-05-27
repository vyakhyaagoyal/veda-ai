import { Resend } from "resend";

const resend = new Resend(
  process.env.RESEND_API_KEY
);

export const sendOTPEmail =
  async (
    email: string,
    otp: string
  ) => {
    try {
      await resend.emails.send({
        from:
          "VedaAI <onboarding@resend.dev>",

        to: email,

        subject:
          "VedaAI Verification Code",

        html: `
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
      });

      console.log(
        "OTP sent successfully"
      );
    } catch (error) {
      console.log(error);

      throw error;
    }
  };