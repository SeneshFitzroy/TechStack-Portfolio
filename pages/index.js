import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';
import Script from 'next/script';
import '../styles/globals.css';

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const heroTextRef = useRef(null);
  const heroImageRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollY(position);
      setShowBackToTop(position > 500);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.gsap) {
      const gsap = window.gsap;

      // Hero Section Animations
      gsap.fromTo(
        heroTextRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out' }
      );
      gsap.fromTo(
        heroImageRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1.5, delay: 0.5, ease: 'power3.out' }
      );

      // Scroll-triggered animations
      const sections = document.querySelectorAll('.animate-on-scroll');
      sections.forEach((section) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
            },
          }
        );
      });
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? 'dark-mode' : ''}>
      <Head>
        <title>Senesh Fitzroy - Strategic Project Manager</title>
        <meta name="description" content="Portfolio of Senesh Fitzroy, a strategic project manager and software developer." />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js" />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js" />

      {/* Navigation */}
      <nav className={`navbar ${scrollY > 50 ? 'navbar-scrolled' : ''}`}>
        <div className="navbar-container">
          <div className="logo-container">
            <img src="/assets/senesh.jpeg" alt="Senesh Fitzroy Portrait" className="profile-logo" />
            <span className="logo-text">Senesh Fitzroy</span>
          </div>
          <ul className={`nav-links ${isMenuOpen ? 'show' : ''}`}>
            <li><a href="#about">About</a></li>
            <li><a href="#education">Education</a></li>
            <li><a href="#experience">Experience</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <button className="theme-toggle" onClick={toggleDarkMode}>
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text" ref={heroTextRef}>
            <h1>Senesh Fitzroy</h1>
            <h2>Strategic Project Manager & Software Developer</h2>
            <p>Driving innovation through technology and strategic execution.</p>
          </div>
          <div className="hero-image" ref={heroImageRef}>
            <img src="/assets/senesh.jpeg" alt="Senesh Fitzroy" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about animate-on-scroll">
        <h2>About Me</h2>
        <p>
          I am a software developer and strategic project manager with a passion for innovation and problem-solving.
          My expertise lies in full-stack development, project management, and digital transformation.
        </p>
      </section>

      {/* Education Section */}
      <section id="education" className="education animate-on-scroll">
        <h2>Education</h2>
        <div className="education-timeline">
          <div className="education-item">
            <img src="/assets/nsbm-logo.png" alt="NSBM Logo" />
            <div>
              <h3>NSBM Green University</h3>
              <p>Computing Foundation Programme (Sep 2022 - Sep 2023)</p>
              <ul>
                <li>Programming Fundamentals, Web Development</li>
                <li>ICT Project Management</li>
              </ul>
            </div>
          </div>
          <div className="education-item">
            <img src="/assets/plymouth-logo.png" alt="Plymouth Logo" />
            <div>
              <h3>University of Plymouth</h3>
              <p>BSc (Hons) Software Engineering (Sep 2023 - Present)</p>
              <ul>
                <li>Specialized in Software Development</li>
                <li>Research in Innovative Tech Solutions</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="experience animate-on-scroll">
        <h2>Experience</h2>
        <div className="experience-timeline">
          <div className="experience-item">
            <div>
              <h3>Vice President</h3>
              <p>NSBM Circularity and Sustainability Community (Apr 2024 - Present)</p>
              <ul>
                <li>Led sustainability initiatives and campaigns.</li>
                <li>Promoted eco-conscious practices.</li>
              </ul>
            </div>
          </div>
          <div className="experience-item">
            <div>
              <h3>Media Coordinator</h3>
              <p>Student Circle of Software Engineering (Feb 2024 - Present)</p>
              <ul>
                <li>Promoted software engineering events.</li>
                <li>Managed event publicity and content creation.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact animate-on-scroll">
        <h2>Contact Me</h2>
        <p>Email: <a href="mailto:seneshfitzroy@gmail.com">seneshfitzroy@gmail.com</a></p>
        <div className="social-links">
          <a href="https://linkedin.com/in/seneshfitzroy" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://github.com/SeneshFitzroy" target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </section>

      <footer>
        <p>© {new Date().getFullYear()} Senesh Fitzroy. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
