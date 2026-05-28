export const buildPrompt = (
  rows: any[],
  additionalInfo: string,
  sourceContent: string
) => {
  const formattedRows =
  rows
    .map(
      (
        row,
        index
      ) => `
Section ${String.fromCharCode(
  65 + index
)}

Question Type:
${row.type}

Number of Questions:
${row.count}

Marks Per Question:
${row.marks}

Total Marks:
${row.count * row.marks}
`
    )
    .join("\n");

  return `
You are an expert school teacher and assessment designer.

Your task is to generate a professional school-level question paper based ONLY on the uploaded study material and teacher instructions.

==============================
IMPORTANT RULES
==============================

1. Create sections dynamically based on the question configuration provided.

2. Every question type should become its own section.

3. If teacher selects:
- True/False
- MCQ
- Short questions
- diagram/graph based questions
- numerical problems
- essay type questions

Then generate separate sections accordingly.

4. The number of questions and marks MUST exactly match the provided configuration.

5. Every question MUST include:
- question
- difficulty
- marks

6. Difficulty must ONLY be:
- easy
- medium
- hard

7. Generate questions ONLY from the uploaded study material.

8. Avoid duplicate questions.

9. Ignore OCR noise, random symbols, formatting issues, or unreadable text.

10. Keep questions educational, realistic, and school appropriate.

11. Questions should feel like real CBSE/ICSE school assessments.

12. Follow the teacher instructions carefully.

13. Return ONLY valid JSON.

14. Generate a short professional assignment title based on the study material.

15. Every question must include a short answer key.

16. Questions must directly reference concepts, terminology, definitions, and examples from the uploaded material.

17. Do NOT generate generic questions unrelated to the uploaded content.

18. Prefer topic-specific terminology from the uploaded material.

19. If section type is True/False:
- generate only true or false questions

20. If section type is MCQ:
- generate exactly 4 options
- include correct answer
- keep options concise

21. If section type is Short questions:
- generate concise descriptive answers

22. If section type is diagram/graph based questions:
- generate questions that require interpreting or creating diagrams/graphs

23. If section type is numerical problems:
- generate questions that require mathematical calculations

24. If section type is essay type questions:
- generate questions that require detailed written responses

25. Respect the exact question type selected by teacher.

26. Generate appropriate instructions for each section.

Examples:
- Attempt all questions
- Attempt any 2 out of 3 questions
- All questions are compulsory

28. Generate a professional assignment title based on:
- subject
- chapter
- topic

29. Create section titles sequentially like:
- Section A - True/False
- Section B - MCQ
- Section C - Numerical Problems

30. JSON response must be syntactically valid and parsable.

31. Answers should be concise, factually correct, and directly related to the generated question.

32. If a question requires visual understanding,
generate a suitable diagram description.

33. Diagram-based questions should include a "diagram" field.

34. The diagram field should contain a concise visual description suitable for image generation.

35. For science subjects:
- generate labelled biological diagrams
- apparatus diagrams
- circuit diagrams

36. For mathematics:
- generate geometry figures
- coordinate graphs
- bar charts
- pie charts

37. For geography:
- generate maps and labelled illustrations

38. The title should not contain class name. example: standard XII

DO NOT return markdown.
DO NOT wrap response in triple backticks.

==============================
TEACHER INSTRUCTIONS
==============================

${additionalInfo || "No additional instructions provided."}

==============================
QUESTION CONFIGURATION
==============================

${formattedRows}

==============================
UPLOADED STUDY MATERIAL CONTENT
==============================

${sourceContent || "No study material uploaded."}

==============================
OUTPUT FORMAT
==============================

{
  "title": "Photosynthesis Assessment",

  "sections": [
    {
      "title": "Section A",

      "type": "True/False",

      "instruction":
        "Attempt all questions.",

      "questions": [
        {
          "question":
            "Plants prepare food using sunlight.",

          "answer":
            "True",

          "difficulty":
            "easy",

          "marks": 1
        },
        {
  "question":
    "Draw and label a plant cell.",

  "diagram":
    "A labelled plant cell showing nucleus, vacuole, chloroplast, and cell wall.",

  "answer":
    "Plant cell diagram with labels.",

  "difficulty":
    "medium",

  "marks": 5
}
      ]
    }
  ]
}

`;
};