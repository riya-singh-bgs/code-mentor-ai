const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

exports.getReview= async (req, res) => {
  console.log("Google Gemini Key:", process.env.RIYA_KEY);
  const { prompt, code } = req.body;
  const finalPrompt = prompt
    ? prompt
    : `Please review the following code:\n${code}`;
  try {
    // Initialize Gemini client
    const genAI = new GoogleGenerativeAI(process.env.RIYA_KEY);

    // Use the correct model name
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });


    // Generate response
    const result = await model.generateContent(code);

    // Extract the text
    const responseText = result.response.text();
    console.log("✅ Gemini Response:", responseText);

    res.json({ response: responseText });

  } catch (error) {
    console.error("RIYA ❌", error);
    res.status(500).json({ error: error.message });
  }
};
