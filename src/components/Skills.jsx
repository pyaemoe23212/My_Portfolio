import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import '../styles/skills.css';

function Skills() {
  const skillsRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const items = skillsRef.current.querySelectorAll('.skill-item');
    gsap.set(items, { opacity: 1, scale: 1 });
    gsap.fromTo(
      items,
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: 'elastic.out(1, 0.5)',
      }
    );

        // Canvas animation for flowing lines
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = skillsRef.current.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

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
      ctx.strokeStyle = '#FFFFFF';
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
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section id="skills" className="skills" ref={skillsRef}>
      <canvas ref={canvasRef} className="skills-canvas"></canvas>
      <h2>My Skills</h2>
      <div className="skills-grid">
        <div className="skill-item">HTML</div>
        <div className="skill-item">CSS</div>
        <div className="skill-item">TailWind CSS</div>
        <div className="skill-item">React.js</div>
        <div className="skill-item">Node.js</div>
        <div className="skill-item">JavaScript (ES6+)</div>
        <div className="skill-item">Python</div>
        <div className="skill-item">MySQL</div>
      </div>
    </section>
  );
}

export default Skills;