export const buildPrompt =
  (
    rows: any[],
    additionalInfo: string
  ) => {
    return `
Generate an assessment paper.

Instructions:
${additionalInfo}

Question Configuration:
${JSON.stringify(rows)}
`;
  };