import PDFDocument from "pdfkit";

export const generatePDF =
  (
    assignment: any,
    res: any
  ) => {
    const doc =
      new PDFDocument({
        margin: 50,
      });

    // Headers
    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=assignment-${assignment._id}.pdf`
    );

    doc.pipe(res);

    // School Name
    doc
      .fontSize(22)
      .font("Helvetica-Bold")
      .text(
        "Delhi Public School",
        {
          align: "center",
        }
      );

    doc.moveDown(0.5);

    doc
      .fontSize(16)
      .font("Helvetica")
      .text(
        "AI Generated Question Paper",
        {
          align: "center",
        }
      );

    doc.moveDown(2);

    // Student Info
    doc
      .fontSize(12)
      .text(
        "Name: ________________________"
      );

    doc.moveDown(1);

    doc.text(
      "Roll Number: __________________"
    );

    doc.moveDown(1);

    doc.text(
      "Section: ______________________"
    );

    doc.moveDown(2);

    // Sections
    assignment.generatedPaper.sections.forEach(
      (
        section: any,
        sectionIndex: number
      ) => {
        // Section title
        doc
          .fontSize(18)
          .font("Helvetica-Bold")
          .text(
            section.title,
            {
              underline: true,
            }
          );

        doc.moveDown(0.5);

        doc
          .fontSize(12)
          .font("Helvetica-Oblique")
          .text(
            section.instruction
          );

        doc.moveDown(1);

        // Questions
        section.questions.forEach(
          (
            q: any,
            index: number
          ) => {
            doc
              .fontSize(12)
              .font("Helvetica")
              .text(
                `${index + 1}. [${
                  q.difficulty
                }] ${
                  q.question
                } (${
                  q.marks
                } Marks)`,
                {
                  lineGap: 6,
                }
              );

            doc.moveDown(1);
          }
        );

        doc.moveDown(2);
      }
    );

    // Footer
    doc
      .fontSize(14)
      .font("Helvetica-Bold")
      .text(
        "End of Question Paper",
        {
          align: "center",
        }
      );

    doc.end();
  };