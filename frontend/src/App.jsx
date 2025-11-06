import React, { useState, useEffect } from "react";
import "./App.css";
import Prism from "prismjs";
import Markdown from "react-markdown";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import axios from "axios";

function App() {
  const [code, setCode] = useState(`function sum(){
    return 1 + 1;
  }`);

  const [review, setReview] = useState("");

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  async function reviewCode() {
    try {
      const response = await axios.post("http://localhost:3000/ai/getReview", { code });
      console.log("Response from backend:", response.data);

      // ✅ If backend sends an object like { response: "..." }
      if (response.data.response) {
        setReview(response.data.response);
      } else {
        setReview(response.data);
      }

    } catch (error) {
      console.error("Error while reviewing code:", error);
      setReview("❌ Error while reviewing code. Please check backend connection.");
    }
  }

  return (
    <main>
      <div className="left">
        <div className="code">
          <Editor
            value={code}
            onValueChange={(newCode) => setCode(newCode)}
            highlight={(code) => Prism.highlight(code, Prism.languages.javascript, "javascript")}
            padding={10}
           
          />
        </div>
        <div onClick={reviewCode} className="review">
          Review
        </div>
      </div>

      <div className="right">
        <Markdown>{review || "📝 Your AI code review will appear here..."}</Markdown>
      </div>
    </main>
  );
}

export default App;
