import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import profileImage from "../assets/myphoto.jpg"; // For local image
import { ThemeContext } from "../context/ThemeContext";
import "../styles/hero.css";

function Hero() {
  const heroRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    // GSAP animation for content
    const elements = heroRef.current?.querySelectorAll(
      "h1, h2, p, .cta-button, .hero-image-container"
    );
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
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // // Theme colors
    // const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
    // const lineColor = isDarkMode ? '#00D4FF' : '#FFFFFF';

    // Line animation
    const lines = [];
    for (let i = 0; i < 30; i++) {
      lines.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 3.25, // Speed: -2 to 2 pixels/frame
        vy: (Math.random() - 0.5) * 3.25,
      });
    }

    let animationFrameId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "#FFFFFF"; // Single color for both modes
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.5;

      lines.forEach((line, i) => {
        ctx.beginPath();
        ctx.moveTo(line.x, line.y);

        // Update position
        line.x += line.vx;
        line.y += line.vy;

        // Bounce off edges
        if (line.x < 0 || line.x > canvas.width) line.vx *= -1;
        if (line.y < 0 || line.y > canvas.height) line.vy *= -1;

        ctx.lineTo(line.x, line.y);
        ctx.stroke();

        // Connect to nearby lines (spider web effect)
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
    <section id="home" className="hero" ref={heroRef}>
      <canvas ref={canvasRef} className="hero-canvas"></canvas>
      <div className="hero-container">
        <div className="hero-image-container">
          <img src={profileImage} alt="Profile" className="hero-image" />
        </div>
        <div className="hero-content">
          <h1>TunBhone PyaeMoe</h1>
          <h2>Web Developer</h2>
          <p>
            Welcome to my portfolio! I build modern, responsive web applications
            with React and other technologies.
          </p>
          <a href="#contact" className="cta-button">
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
