import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "../styles/about.css";

function About() {
  const aboutRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    // GSAP animation for content
    const elements = aboutRef.current?.querySelectorAll("h2, p");
    if (elements) {
      gsap.set(elements, { opacity: 1, y: 0 });
      gsap.fromTo(
        elements,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out" }
      );
    }

    // Canvas animation for flowing lines
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = aboutRef.current.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Line animation
    const lines = [];
    for (let i = 0; i < 20; i++) {
      lines.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
      });
    }

    let animationFrameId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "#FFFFFF";
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.5;

      lines.forEach((line, i) => {
        ctx.beginPath();
        ctx.moveTo(line.x, line.y);
        line.x += line.vx;
        line.y += line.vy;
        if (line.x < 0 || line.x > canvas.width) line.vx *= -1;
        if (line.y < 0 || line.y > canvas.height) line.vy *= -1;
        ctx.lineTo(line.x, line.y);
        ctx.stroke();

        lines.forEach((otherLine, j) => {
          if (i !== j) {
            const dist = Math.hypot(line.x - otherLine.x, line.y - otherLine.y);
            if (dist < 100) {
              ctx.beginPath();
              ctx.moveTo(line.x, line.y);
              ctx.lineTo(otherLine.x, otherLine.y);
              ctx.stroke();
            }
          }
        });
      });

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section id="about" className="about" ref={aboutRef}>
      <canvas ref={canvasRef} className="about-canvas"></canvas>
      <div className="about-container">
        <h2>About Me</h2>
        <p>
          I’m a final-year ICT undergraduate at Rangsit University, Thailand. I have strong technical skills in HTML, CSS, JavaScript (ES6+), React (Vite), TailwindCSS, Node.js, and SQLite, and a growing interest in applying AI to solve real-world challenges. I’m passionate about continuous learning, problem-solving, and building practical solutions that combine creativity and technology.
        </p>
      </div>
    </section>
  );
}

export default About;
