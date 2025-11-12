import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import '../styles/contact.css';

function Contact() {
  const contactRef = useRef(null);
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const elements = contactRef.current.children;
    gsap.set(elements, { opacity: 1, x: 0 });
    gsap.fromTo(
      elements,
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
      }
    );

        const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = contactRef.current.offsetHeight;
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
    <section id="contact" className="contact" ref={contactRef}>
      <canvas ref={canvasRef} className="contact-canvas"></canvas>
      <h2>Get in Touch</h2>
      <p>Feel free to reach out via email or connect with me on social platforms!</p>
      <div className="contact-links">
        <a href="mailto:tunbhonepyaemoe@gmail.com">Email</a>
        <a href="https://github.com/pyaemoe23212">GitHub</a>
        <a href="https://www.linkedin.com/in/tun-bhone-pyae-moe-5092a0372/">LinkedIn</a>
      </div>
    </section>
  );
}

export default Contact;