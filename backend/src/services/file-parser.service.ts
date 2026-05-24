import pdfParse from "pdf-parse";

import Tesseract
  from "tesseract.js";

export const parseUploadedFile =
  async (
    file: Express.Multer.File
  ) => {
    if (!file) return "";

    // ---------------- PDF ----------------
    if (
      file.mimetype ===
      "application/pdf"
    ) {
      const data = await (pdfParse as any)(file.buffer);

      return data.text.slice(0, 12000);
    }

    // ---------------- TXT ----------------
    if (
      file.mimetype ===
      "text/plain"
    ) {
      return file.buffer
        .toString("utf-8")
        .slice(0, 12000);
    }

    // ---------------- IMAGES ----------------
    if (
      [
        "image/png",
        "image/jpeg",
        "image/jpg",
      ].includes(file.mimetype)
    ) {
      const {
        data: { text },
      } =
        await Tesseract.recognize(
          file.buffer,
          "eng"
        );

        

      return text.slice(
        0,
        12000
      );
      
    }

    return "";
  };