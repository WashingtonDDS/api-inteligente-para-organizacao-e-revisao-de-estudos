import axios from "axios";

const apiGemini = axios.create({
  baseURL: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?alt=sse&key=${process.env.APIKEY}`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiGeminiGeradorDeDescricao = async (prompt: string) => {
  try {
    const response = await apiGemini.post("", {
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
    });
    const responseData = JSON.parse(response.data.replace(/^data: /, ""));

    if (
      responseData &&
      responseData.candidates &&
      responseData.candidates[0] &&
      responseData.candidates[0].content &&
      responseData.candidates[0].content.parts &&
      responseData.candidates[0].content.parts[0]
    ) {
      const text = responseData.candidates[0].content.parts[0].text.trim();
      return text;
    }
  } catch (error) {
    console.error("Erro interno", error);
  }
};
