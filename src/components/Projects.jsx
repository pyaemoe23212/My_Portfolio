import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import faqImage from "../assets/faqpage.png";
import faqHome from "../assets/faqhome.png";
import faqList from "../assets/faqlist.png";
import faqFeedback from "../assets/faqFeedback.png";
import CarShowroomImage from "../assets/carshowroom.png";
import CarCard from "../assets/carcard.png";
import CarDetail from "../assets/cardetail.png";
import CarHome from "../assets/carhome.png";
import CarLogo from "../assets/carlogo.png";
import RentCar from "../assets/rentcar.png";
import SoldCar from "../assets/soldcar.png";
import TicketImage from "../assets/ticketanywhere.png";
import PortfolioImage from "../assets/portfolio.png";
import EcommerceImage from "../assets/ecommerce.png";
import EcommHome from "../assets/ecommhome.png";
import EcommOrder from "../assets/ecommorder.png";
import EcommCheckout from "../assets/ecommcheckout.png";
import ElementaryImage from "../assets/elementaryschool.png";
import EleAbout from "../assets/eleabout.png";
import EleCourse from "../assets/elecourse.png";
import EleTeachers from "../assets/eleteachers.png";
import "../styles/projects.css";

function Projects() {
  const projectsRef = useRef(null);
  const canvasRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  // Project data with image galleries
  const projects = [
    {
      id: 1,
      title: "RIC Gaming Club FAQ Page ChatBot",
      description:
        "This is a class project. This is the chatbot website that everyone who is interested in joining RIC Gaming Club can ask everything about the club.",
      images: [faqImage,faqHome,faqList,faqFeedback],
      githubLink:
        "https://github.com/pyaemoe23212/RIC-Gaming-Club-FAQ-Page.git",
      liveLink:
        "https://pyaemoe23212.github.io/RIC-Gaming-Club-FAQ-Page/Ask-a-question/ask_questions.html",
    },
    {
      id: 2,
      title: "Portfolio Website",
      description:
        "A personal portfolio website built with React and Vite, showcasing my projects and skills with a modern, responsive design.",
      images: [PortfolioImage],
      githubLink: "https://github.com/pyaemoe23212/My_Portfolio.git",
      liveLink: "https://tbpmportfolio.netlify.app/",
    },
    {
      id: 3,
      title: "CarShowroom Website",
      description:
        "Developed the frontend using React (Vite) and Tailwind CSS as part of a MERN stack project. Focused on creating a clean, responsive, and user-friendly dashboard for displaying available and rentable cars.",
      images: [CarHome,CarShowroomImage,CarLogo,CarCard,CarDetail,SoldCar,RentCar],
      githubLink: "https://github.com/pyaemoe23212/CarShowroom_User.git",
      liveLink: "https://carshowroomwebsite.netlify.app/",
    },
    {
      id: 4,
      title: "Ticket Website",
      description:
        "Developed the frontend using React (Vite) and Tailwind CSS for a Python Django backend, focusing on creating a responsive and user-friendly interface for browsing events and booking tickets.",
      images: [TicketImage],
      githubLink: "https://github.com/pyaemoe23212/Ticket_Website_User.git",
      liveLink: "https://ticketbrowse.netlify.app/",
    },
    {
      id: 5,
      title: "Mini ECommerce Website",
      description:
        "Developed the frontend using React (Vite) and Tailwind CSS for a PHP Laravel backend, featuring product browsing, cart management, and a seamless shopping experience.",
      images: [EcommerceImage,EcommHome,EcommCheckout,EcommOrder],
      githubLink: "https://github.com/pyaemoe23212/E-Commerce-Website.git",
      liveLink: "",
    },
    {
      id: 6,
      title: "Online Course E-Learning Website for Elementary School(Ui/Ux)",
      description:
        "Designed using Figma to create an intuitive and user-friendly learning interface for young students.",
      images: [ElementaryImage,EleCourse,EleAbout,EleTeachers],
    },
  ];

  const handleImageClick = (project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
  };

  const closeModal = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex(
        (prev) => (prev + 1) % selectedProject.images.length
      );
    }
  };

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex(
        (prev) =>
          (prev - 1 + selectedProject.images.length) %
          selectedProject.images.length
      );
    }
  };

  return (
    <section id="projects" className="projects" ref={projectsRef}>
      <canvas ref={canvasRef} className="projects-canvas"></canvas>
      <h2>Projects</h2>
      <p>
        Currently the projects are deployed using Netlify Drop, so it only shows
        the frontend layout and design the backend isn't included, so features
        like data or login won't work.
      </p>
      <br />
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
            {project.images && project.images[0] && (
              <div className="project-image-container">
                <img
                  src={project.images[0]}
                  alt={project.title}
                  className="project-image"
                  onClick={() => handleImageClick(project)}
                  style={{ cursor: "pointer" }}
                />
                {project.images.length > 1 && (
                  <span className="image-count">
                    {project.images.length} images
                  </span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Image Gallery Modal */}
      {selectedProject && (
        <div className="image-modal" onClick={handleBackdropClick}>
          <div className="modal-content">
            <button className="close-btn" onClick={closeModal}>
              ✕
            </button>

            <div className="gallery-container">
              <img
                src={selectedProject.images[currentImageIndex]}
                alt={`${selectedProject.title} - ${currentImageIndex + 1}`}
                className="modal-image"
              />

              {selectedProject.images.length > 1 && (
                <>
                  <button className="gallery-btn prev-btn" onClick={prevImage}>
                    ❮
                  </button>
                  <button className="gallery-btn next-btn" onClick={nextImage}>
                    ❯
                  </button>

                  <div className="image-indicators">
                    {selectedProject.images.map((_, index) => (
                      <span
                        key={index}
                        className={`dot ${
                          index === currentImageIndex ? "active" : ""
                        }`}
                        onClick={() => setCurrentImageIndex(index)}
                      ></span>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Projects;
