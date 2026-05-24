export const buildPrompt = (
  rows: any[],
  additionalInfo: string,
  sourceContent: string
) => {
  return `
You are an expert school teacher and assessment designer.

Your task is to generate a professional school-level question paper based ONLY on the uploaded study material and teacher instructions.

==============================
IMPORTANT RULES
==============================

1. Create proper exam sections like:
- Section A
- Section B
- Section C

2. Every question MUST include:
- question
- difficulty
- marks

3. Difficulty must ONLY be:
- easy
- medium
- hard

4. Generate questions ONLY from the uploaded study material.

5. Avoid duplicate questions.

6. Ignore OCR noise, random symbols, formatting issues, or unreadable text.

7. Keep questions educational, realistic, and school appropriate.

8. Questions should feel like real CBSE/ICSE school assessments.

9. Follow the teacher instructions carefully.

10. Return ONLY valid JSON.
DO NOT return markdown.
DO NOT wrap response in triple backticks.

==============================
TEACHER INSTRUCTIONS
==============================

${additionalInfo || "No additional instructions provided."}

==============================
QUESTION CONFIGURATION
==============================

${JSON.stringify(rows, null, 2)}

==============================
UPLOADED STUDY MATERIAL CONTENT
==============================

${sourceContent || "No study material uploaded."}

==============================
OUTPUT FORMAT
==============================

{
  "sections": [
    {
      "title": "Section A",
      "instruction": "Attempt all questions",
      "questions": [
        {
          "question": "What is photosynthesis?",
          "difficulty": "easy",
          "marks": 2
        }
      ]
    }
  ]
}

`;
};