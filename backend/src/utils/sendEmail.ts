import nodemailer from "nodemailer";

export const sendOTPEmail =
  async (
    email: string,
    otp: string
  ) => {
    const transporter =
      nodemailer.createTransport({
        service: "gmail",

        auth: {
          user:
            process.env.EMAIL_USER,

          pass:
            process.env.EMAIL_PASS,
        },
      });

    await transporter.sendMail({
      from:
        process.env.EMAIL_USER,

      to: email,

      subject:
        "VedaAI Verification Code",

      html: `
        <div style="font-family:sans-serif;padding:20px">
          <h2>Verify your account</h2>

          <p>Your OTP is:</p>

          <h1>${otp}</h1>

          <p>This OTP expires in 10 minutes.</p>
        </div>
      `,
    });
  };