import nodemailer from "nodemailer";

const transporter =
  nodemailer.createTransport({
    host:
      "smtp-relay.brevo.com",

    port: 2525,

    secure: false,

    auth: {
      user:
        process.env.EMAIL_USER,

      pass:
        process.env.EMAIL_PASS,
    },

    connectionTimeout: 30000,

    greetingTimeout: 30000,

    socketTimeout: 30000,

    tls: {
      rejectUnauthorized: false,
    },
  });

export const sendOTPEmail =
  async (
    email: string,
    otp: string
  ) => {
    try {
      const info =
        await transporter.sendMail({
          from:
            '"VedaAI" <vyakhyagoyal22@gmail.com>',

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

      console.log(info);
    } catch (error) {
      console.log(
        "EMAIL ERROR:",
        error
      );

      throw error;
    }
  };