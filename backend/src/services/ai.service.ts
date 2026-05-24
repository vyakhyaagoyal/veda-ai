import OpenAI from "openai";

const openai = new OpenAI({
  apiKey:
    process.env.OPENAI_API_KEY,
});

export const generatePaper =
  async (
    prompt: string
  ) => {
    const completion =
      await openai.chat.completions.create(
        {
          model: "gpt-4o-mini",

          messages: [
            {
              role: "system",

              content:
                `
Generate a structured school assessment paper.

Return ONLY valid JSON.

Format:
{
  "sections": [
    {
      "title": "",
      "instruction": "",
      "questions": [
        {
          "question": "",
          "difficulty": "",
          "marks": 0
        }
      ]
    }
  ]
}
`,
            },

            {
              role: "user",

              content: prompt,
            },
          ],
        }
      );

   try {
  return JSON.parse(
    completion.choices[0]
      .message.content || "{}"
  );
} catch {
  return {
    sections: [],
  };
}
  };