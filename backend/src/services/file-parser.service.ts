import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import Tesseract from "tesseract.js";

export const parseUploadedFile =
  async (
    file: Express.Multer.File
  ) => {
    try {
      // =========================
      // NO FILE
      // =========================
      if (!file) {
        console.log(
          "No file uploaded"
        );

        return "";
      }

      console.log(
        "Uploaded file type:",
        file.mimetype
      );

      // =========================
      // PDF PARSING
      // =========================
      if (
        file.mimetype ===
        "application/pdf"
      ) {
        const pdf =
          await pdfjsLib.getDocument({
            data: new Uint8Array(
              file.buffer
            ),
          }).promise;

        let extractedText =
          "";

        for (
          let i = 1;
          i <= pdf.numPages;
          i++
        ) {
          const page =
            await pdf.getPage(i);

          const textContent =
            await page.getTextContent();

          const pageText =
            textContent.items
              .map(
                (item: any) =>
                  item.str
              )
              .join(" ");

          extractedText +=
            pageText + "\n";
        }

        const cleanedText =
          extractedText
            .replace(/\s+/g, " ")
            .trim();

        console.log(
          "PDF Extracted Text:",
          cleanedText.slice(
            0,
            500
          )
        );

        // ------------------------
        // VALIDATION
        // ------------------------
        if (
          cleanedText.length <
          50
        ) {
          throw new Error(
            "PDF_EMPTY_OR_UNREADABLE"
          );
        }

        return cleanedText.slice(
          0,
          12000
        );
      }

      // =========================
      // TXT FILE
      // =========================
      if (
        file.mimetype ===
        "text/plain"
      ) {
        const text =
          file.buffer
            .toString("utf-8")
            .replace(/\s+/g, " ")
            .trim();

        console.log(
          "TXT Extracted Text:",
          text.slice(0, 500)
        );

        return text.slice(
          0,
          12000
        );
      }

      // =========================
      // IMAGE OCR
      // =========================
      if (
        [
          "image/png",
          "image/jpeg",
          "image/jpg",
        ].includes(
          file.mimetype
        )
      ) {
        console.log(
          "Running OCR..."
        );

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

        console.log(
          "OCR Extracted Text:",
          cleanedText.slice(
            0,
            500
          )
        );

        // ------------------------
        // OCR VALIDATION
        // ------------------------
        const alphaChars =
          cleanedText.match(
            /[a-zA-Z]/g
          )?.length || 0;

        const readabilityScore =
          alphaChars /
          cleanedText.length;

        const isUnreadable =
          cleanedText.length <
            50 ||
          readabilityScore <
            0.3;

        if (
          isUnreadable
        ) {
          throw new Error(
            "OCR_UNREADABLE"
          );
        }

        return cleanedText.slice(
          0,
          12000
        );
      }

      // =========================
      // UNSUPPORTED FILE
      // =========================
      console.log(
        "Unsupported file type"
      );

      return "";
    } catch (error) {
      console.error(
        "FILE PARSER ERROR:",
        error
      );

      return "";
    }
  };