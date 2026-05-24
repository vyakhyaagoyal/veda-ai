// import OpenAI from "openai";

// const openai = new OpenAI({
//   apiKey:
//     process.env.OPENAI_API_KEY,
// });

// export const generatePaper =
//   async (
//     prompt: string
//   ) => {
//     const completion =
//       await openai.chat.completions.create(
//         {
//           model: "gpt-4o-mini",

//           messages: [
//             {
//               role: "system",

//               content:
//                 `
// Generate a structured school assessment paper.

// Return ONLY valid JSON.

// Format:
// {
//   "sections": [
//     {
//       "title": "",
//       "instruction": "",
//       "questions": [
//         {
//           "question": "",
//           "difficulty": "",
//           "marks": 0
//         }
//       ]
//     }
//   ]
// }
// `,
//             },

//             {
//               role: "user",

//               content: prompt,
//             },
//           ],
//         }
//       );

//    try {
//   return JSON.parse(
//     completion.choices[0]
//       .message.content || "{}"
//   );
// } catch {
//   return {
//     sections: [],
//   };
// }
//   };

import {
  GoogleGenerativeAI,
} from "@google/generative-ai";

const genAI =
  new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY!
  );

export const generatePaper =
  async (
    prompt: string
  ) => {
    try {
      const model =
        genAI.getGenerativeModel({
          model: "gemini-1.5-flash",
        });

      const result =
        await model.generateContent(
          prompt
        );

      const response =
        result.response.text();

      try {
        return JSON.parse(response);
      } catch {
        return {
          sections: [],
        };
      }
    } catch (error) {
      console.error(error);

      return {
        sections: [],
      };
    }
  };