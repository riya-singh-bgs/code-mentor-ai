const { GoogleGenerativeAI } =require("@google/generative-ai"); // ✅ correct SDK import
 const genAI = new GoogleGenerativeAI(process.env.RIYA_KEY);


    const model = genAI.getGenerativeModel({
       model: "gemini-2.5-flash-lite", 
       systemInstruction:`
       you are an code reviewer,who have epertise in development
       you look for the code and find the problems and suggest the solution to developer.
       first you give code is good code or bad code then you have to give what changes require.

       you always try to find a best solution for the developer and try to make the code more efficient and clean.
       
       `
       
      }); 

    async function generateContent(prompt) {
      const result=await model.generateContent(prompt);
      return result.response.text();
      
    }
    model.exports=generateContent
