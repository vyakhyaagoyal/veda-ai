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

  const cleanedText =
    text
      .replace(/\s+/g, " ")
      .trim();

  // -----------------------------
  // OCR VALIDATION
  // -----------------------------
  const alphaChars =
  cleanedText.match(/[a-zA-Z]/g)
    ?.length || 0;

const readabilityScore =
  alphaChars /
  cleanedText.length;

const isUnreadable =
  cleanedText.length < 50 ||
  readabilityScore < 0.3;

  if (isUnreadable) {
    throw new Error(
      "OCR_UNREADABLE"
    );
  }

  return cleanedText.slice(
    0,
    12000
  );
}

    return "";
  };