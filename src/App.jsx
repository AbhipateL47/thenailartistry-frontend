import { useEffect, useState } from "react";
import "./index.css";

export default function App() {
  const [countdown, setCountdown] = useState("");

  // Countdown Timer
  useEffect(() => {
    const targetDate = new Date("Jan 1, 2026 00:00:00").getTime();

    const tick = () => {
      const now = Date.now();
      const distance = targetDate - now;

      if (distance < 0) {
        setCountdown("🎆 Happy New Year 2026!");
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  // Sparkle Effect
  useEffect(() => {
    const sparkleCount = Math.floor(Math.random() * 6) + 20;

    for (let i = 0; i < sparkleCount; i++) {
      const sparkle = document.createElement("div");
      sparkle.className = "sparkle";
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const delay = Math.random() * 5;
      sparkle.style.top = `${top}%`;
      sparkle.style.left = `${left}%`;
      sparkle.style.animationDelay = `${delay}s`;
      document.body.appendChild(sparkle);
    }

    return () => {
      document.querySelectorAll(".sparkle").forEach(s => s.remove());
    };
  }, []);

  return (
    <main className="page">
      <h1>✨ The Nail Artistry ✨</h1>
      <p>Our beautiful website is getting ready. Stay tuned for the grand reveal!</p>
      <h2 id="countdown">{countdown}</h2>
      <footer>© 2025 The Nail Artistry. All Rights Reserved.</footer>
    </main>
  );
}
