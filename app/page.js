"use client";
import { useState } from "react";

export default function Page() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  function calculate() {
    try {
      // ذكاء بسيط: تقييم المعادلات الحسابية
      const res = eval(input);
      setResult(res);
    } catch {
      setResult("❌ خطأ في المعادلة");
    }
  }

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="أدخل المعادلة هنا..."
        style={{
          padding: "10px",
          fontSize: "18px",
          width: "300px",
          borderRadius: "8px",
          border: "none",
          outline: "none"
        }}
      />
      <br /><br />
      <button
        onClick={calculate}
        style={{
          background: "#00c6ff",
          border: "none",
          padding: "10px 20px",
          borderRadius: "10px",
          color: "white",
          fontSize: "18px",
          cursor: "pointer"
        }}
      >
        احسب
      </button>
      <h2 style={{ marginTop: "20px" }}>{result}</h2>
    </div>
  );
}
