import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "../styles/skills.css";

function Skills() {
  const skillsRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const items = skillsRef.current.querySelectorAll(".skill-item");
    gsap.set(items, { opacity: 1, scale: 1 });
    gsap.fromTo(
      items,
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "elastic.out(1, 0.5)",
      }
    );

    // Canvas animation for flowing lines
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = skillsRef.current.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Line animation
    const lines = [];
    for (let i = 0; i < 20; i++) {
      lines.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 3.25,
        vy: (Math.random() - 0.5) * 3.25,
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
    <section id="skills" className="skills" ref={skillsRef}>
      <canvas ref={canvasRef} className="skills-canvas"></canvas>
      <h2>My Skills</h2>
      <div className="skills-grid">
        <div className="skill-item">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/1200px-HTML5_logo_and_wordmark.svg.png"
            alt="HTML5"
            className="skill-icon"
          />
          <p>HTML</p>
        </div>
        <div className="skill-item"><img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/CSS3_logo_and_wordmark.svg/726px-CSS3_logo_and_wordmark.svg.png"
            alt="CSS"
            className="skill-icon"
          />
          <p>CSS</p></div>
        <div className="skill-item"><img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/2560px-Tailwind_CSS_Logo.svg.png"
            alt="TailWind CSS"
            className="skill-icon"
          />
          <p>TailWind CSS</p></div>
        <div className="skill-item"><img
            src="https://lh6.googleusercontent.com/proxy/8CGXD0uyb6RKJLgXrBFSqn5abhmt1HmwduYTq9p-MHLIp6hzl0wjgjxXbRp2hXDgaiLCyy9d7IHSm2Euuzs60UIPDvxil0uKXCMiAIuIPCoNGpau1K40JRY"
            alt="JavaScript"
            className="skill-icon"
          />
          <p>JavaScript (ES6+)</p></div>
        <div className="skill-item"><img
            src="https://www.mindrops.com/images/nodejs-image.webp"
            alt="Node.js"
            className="skill-icon"
          />
          <p>Node.js</p></div>
        <div className="skill-item"><img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1200px-Python-logo-notext.svg.png"
            alt="Python"
            className="skill-icon"
          />
          <p>Python</p></div>
        <div className="skill-item"><img
            src="https://cdn.prod.website-files.com/66754aa69a5d872183713f9c/672dfced5422c158fb5a6002_mysql%20logo.png"
            alt="MySQL"
            className="skill-icon"
          />
          <p>MySQL</p></div>
        <div className="skill-item"><img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/React_Logo_SVG.svg/250px-React_Logo_SVG.svg.png"
            alt="React.Js"
            className="skill-icon"
          />
          <p>React.Js</p></div>
      </div>
    </section>
  );
}

export default Skills;
