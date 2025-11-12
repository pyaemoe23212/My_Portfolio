import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import FAQImage from "../assets/FAQ_Page.png";
import CarShowroomImage from "../assets/CarShowroom.png";
import TicketImage from "../assets/TicketAnywhere.png";
import PortfolioImage from "../assets/portfolio.png";
import "../styles/projects.css";

function Projects() {
  const projectsRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    // GSAP animation for content
    const elements = projectsRef.current?.querySelectorAll(".project-card");
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
      canvas.height = projectsRef.current.offsetHeight;
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
      ctx.strokeStyle = "#00D4FF";
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

  // Project data
  const projects = [
    {
      id: 1,
      title: "RIC Gaming Club FAQ Page",
      description:
        "This is a class project. This is the website that everyone who is interested in joining RIC Gaming Club can ask everything about the club.",
      image: FAQImage,
      githubLink:
        "https://github.com/pyaemoe23212/RIC-Gaming-Club-FAQ-Page.git",
      liveLink:
        "https://pyaemoe23212.github.io/RIC-Gaming-Club-FAQ-Page/Ask-a-question/ask_questions.html",
      previewUrl:
        "https://pyaemoe23212.github.io/RIC-Gaming-Club-FAQ-Page/Ask-a-question/ask_questions.html",
    },
    {
      id: 2,
      title: "Portfolio Website",
      description:
        "A personal portfolio website built with React and Vite, showcasing my projects and skills with a modern, responsive design.",
      image: PortfolioImage,
      githubLink: "https://github.com/pyaemoe23212/My_Portfolio.git",
      liveLink: "https://tbpmportfolio.netlify.app/",
    },
    {
      id: 3,
      title: "CarShowroom Website",
      description:
        "Designed and developed the dashboard layout using React (Vite) and Tailwind CSS to display available and rentable cars with a clean, intuitive interface..",
      image: CarShowroomImage,
      githubLink: "https://github.com/pyaemoe23212/CarShowroom_User.git",
      liveLink: "https://carshowroomuser.netlify.app/",
    },
    {
      id: 3,
      title: "Ticket Website",
      description:
        "Built a responsive frontend web application using React (Vite) and Tailwind CSS, focusing on a smooth and user-friendly experience for browsing events and booking tickets.",
      image: TicketImage,
      githubLink: "https://github.com/pyaemoe23212/Ticket_Website_User.git",
      liveLink: "https://ticketuser.netlify.app/",
    },
  ];

  return (
    <section id="projects" className="projects" ref={projectsRef}>
      <canvas ref={canvasRef} className="projects-canvas"></canvas>
      <h2>Projects</h2>
      <div className="project-grid">
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            <div className="project-content">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-links">
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live Demo
                  </a>
                )}
              </div>
            </div>
            {project.image && (
              <div className="project-image-container">
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-image"
                  onError={(e) => {
                    console.error("Project image failed to load:", e);
                    e.target.src = "https://via.placeholder.com/300";
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;
