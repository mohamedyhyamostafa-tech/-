export const metadata = {
  title: "AI Calculator",
  description: "Smart calculator powered by AI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ 
        background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)", 
        color: "#fff", 
        fontFamily: "Arial", 
        textAlign: "center", 
        padding: "50px" 
      }}>
        <h1>🤖 AI Smart Calculator</h1>
        {children}
      </body>
    </html>
  );
}
