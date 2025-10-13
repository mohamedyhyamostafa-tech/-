export default function Home() {
  function toggleSidebar() {
    document.getElementById("sidebar").classList.toggle("active");
  }

  function searchPage() {
    const input = document.getElementById("searchInput").value.toLowerCase();
    const links = document.querySelectorAll(".links a");
    for (let link of links) {
      if (link.innerText.toLowerCase().includes(input)) {
        window.location.href = link.href;
        return;
      }
    }
    alert("Page not found!");
  }

  function playWelcome() {
    const music = new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3");
    music.volume = 0.2;
    music.play();

    setTimeout(() => {
      const msg = new SpeechSynthesisUtterance("Welcome to Alzaeem Tech website!");
      msg.lang = "en-US";
      msg.rate = 1.2;
      msg.pitch = 1.1;
      window.speechSynthesis.speak(msg);
    }, 3000);
  }

  if (typeof window !== "undefined") {
    window.onload = () => playWelcome();
  }

  return (
    <div style={{ margin: 0, fontFamily: "'Segoe UI', sans-serif", background: "linear-gradient(135deg,#0d0d0d,#1a1a1a,#262626)", color: "white", overflowX: "hidden" }}>
      <button
        onClick={toggleSidebar}
        style={{ position: "fixed", top: 20, right: 20, background: "gold", color: "black", border: "none", padding: "10px 15px", cursor: "pointer", borderRadius: 8, fontWeight: "bold", zIndex: 1002 }}
      >
        ☰ Menu
      </button>

      <header style={{ textAlign: "center", padding: 20, fontSize: 40, fontWeight: "bold", color: "gold", textShadow: "0 0 15px #ff0,0 0 25px #f80" }}>
        ⚔️ 𝒜𝓁𝓏𝒶𝒾𝓂 𝒯𝑒𝒸𝒽 ⚔️ <i className="fa-solid fa-brain" style={{ color: "#0ff" }}></i>
      </header>

      <div id="sidebar" style={{
        position: "fixed", top: "-100%", left: 0, width: "100%", height: 320, background: "rgba(0,0,0,0.95)",
        padding: 20, boxShadow: "0 3px 15px #000", transition: "top 0.5s ease", zIndex: 1001, display: "flex", flexDirection: "column", justifyContent: "space-between"
      }}>
        <div>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <input id="searchInput" placeholder="Search page..." style={{ width: "70%", padding: 8, borderRadius: 6, outline: "none", fontSize: 14 }} />
            <button onClick={searchPage} style={{ padding: "8px 10px", borderRadius: 6, background: "gold", cursor: "pointer", fontWeight: "bold", marginLeft: 8 }}>Search</button>
          </div>

          <div className="links">
            <a href="https://alzaeem1.gt.tc/index">🏠 Home</a><br />
            <a href="https://alzaeem1.gt.tc/rule%20unive">🏛 University of Computers</a><br />
            <a href="https://alzaeem1.gt.tc/rule%20stud">🎓 Student values</a><br />
            <a href="https://alzaeem1.gt.tc/rule%20doct">👨‍🏫 Teacher values</a><br />
            <a href="https://alzaeem1.gt.tc/student">🧠 Student page</a><br />
            <a href="https://alzaeem1.gt.tc/Main">📝 Registration</a><br />
            <a href="https://alzaeem1.gt.tc/file">🛡 Student files</a><br />
            <a href="https://alzaeem1.gt.tc/search1_hub">🌐 Services</a><br />
            <a href="https://alzaeem1.gt.tc/search_hub">💻 Software</a><br />
            <a href="mailto:mohamedyhyamostafa@gmail.com">📧 Contact</a>
          </div>
        </div>
        <div style={{ textAlign: "center", fontSize: 12, color: "#bbb" }}>
          ⚔️ © 2025 Alza3im Tech ⚔️<br />All Rights Reserved
        </div>
      </div>

      <div style={{ margin: 40, textAlign: "center" }}>
        <div style={{ fontSize: 28, fontWeight: "bold", color: "gold" }}>✨ Power • Intelligence • Future ✨</div>
        <div style={{ marginTop: 15, fontSize: 22, fontWeight: "bold" }}>⚔️ Where AI Meets Warriors of Technology ⚔️</div>
        <div style={{ marginTop: 20 }}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyKVX7d7hDJYenWDygmHG-h239wLLUlIPmFWwlSiF4mA&s=10"
            alt="Wild Horse Logo"
            style={{ width: 280, borderRadius: 20, boxShadow: "0 0 30px gold", maxWidth: "90%" }}
          />
          <p>The Untamed Stallion of Sharqia 🐎</p>
        </div>
      </div>

      <button
        onClick={playWelcome}
        style={{
          position: "fixed", bottom: 25, right: 25, padding: "12px 18px",
          background: "cyan", color: "black", fontWeight: "bold",
          border: "none", borderRadius: 10, cursor: "pointer",
          zIndex: 1003, boxShadow: "0 0 15px cyan"
        }}
      >
        🔊 Play Welcome Voice
      </button>
    </div>
  );
}
