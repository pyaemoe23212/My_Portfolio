import { useEffect, useState, useContext } from 'react';
import { gsap } from 'gsap';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';
import { ThemeContext } from '../context/ThemeContext';
import '../styles/header.css';

function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const sections = ['home', 'about', 'projects', 'skills', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of section is visible
    );

    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    return () => {
      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  useEffect(() => {
    const navItems = document.querySelectorAll('.nav-item');
    gsap.set(navItems, { opacity: 1, y: 0 });
    gsap.fromTo(
      navItems,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out' }
    );
  }, []);

  return (
    <header className="header">
      <nav>
        <ul className="nav-list">
          <li className={`nav-item ${activeSection === 'home' ? 'active' : ''}`}>
            <a className="nav-link" href="#home">Home</a>
          </li>
          <li className={`nav-item ${activeSection === 'about' ? 'active' : ''}`}>
            <a className="nav-link" href="#about">About</a>
          </li>
          <li className={`nav-item ${activeSection === 'projects' ? 'active' : ''}`}>
            <a className="nav-link" href="#projects">Projects</a>
          </li>
          <li className={`nav-item ${activeSection === 'skills' ? 'active' : ''}`}>
            <a className="nav-link" href="#skills">Skills</a>
          </li>
          <li className={`nav-item ${activeSection === 'contact' ? 'active' : ''}`}>
            <a className="nav-link" href="#contact">Contact</a>
          </li>
          <li className="nav-item">
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === 'dark' ? (
                <SunIcon className="theme-icon" />
              ) : (
                <MoonIcon className="theme-icon" />
              )}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;