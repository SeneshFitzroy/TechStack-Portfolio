import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';
import Script from 'next/script';

export default function Home() {
  // State management
  const [darkMode, setDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [cursorFollowerPosition, setCursorFollowerPosition] = useState({ x: 0, y: 0 });

  // Refs for DOM elements and animations
  const heroTextRef = useRef(null);
  const heroImageRef = useRef(null);
  const cursorRef = useRef(null);
  const cursorFollowerRef = useRef(null);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollY(position);
      setShowBackToTop(position > 500);
      
      // Animate elements as they come into view
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach(elem => {
        const rect = elem.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 100;
        if (isVisible) {
          elem.classList.add('animated');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Custom cursor effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
      
      // Delayed follower effect
      setTimeout(() => {
        setCursorFollowerPosition({ x: e.clientX, y: e.clientY });
      }, 100);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Update cursor position
  useEffect(() => {
    if (cursorRef.current) {
      cursorRef.current.style.left = `${cursorPosition.x}px`;
      cursorRef.current.style.top = `${cursorPosition.y}px`;
    }
    if (cursorFollowerRef.current) {
      cursorFollowerRef.current.style.left = `${cursorFollowerPosition.x}px`;
      cursorFollowerRef.current.style.top = `${cursorFollowerPosition.y}px`;
    }
  }, [cursorPosition, cursorFollowerPosition]);

  // Initialize animations when page loads
  useEffect(() => {
    // Create starfield
    const createStars = () => {
      const starsContainer = document.querySelector('.stars');
      if (!starsContainer) return;
      
      for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.setProperty('--i', Math.random());
        star.style.setProperty('--opacity', 0.2 + Math.random() * 0.8);
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        starsContainer.appendChild(star);
      }
    };

    // Initialize GSAP animations if available
    if (window.gsap) {
      const gsap = window.gsap;
      const ScrollTrigger = window.ScrollTrigger;
      
      // Register ScrollTrigger plugin
      gsap.registerPlugin(ScrollTrigger);
      
      // Hero section animations
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
      
      // Timeline animations
      gsap.utils.toArray('.timeline-item').forEach(item => {
        gsap.fromTo(
          item,
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            scrollTrigger: {
              trigger: item,
              start: 'top 80%',
            }
          }
        );
      });
    }
    
    // Initialize stars
    createStars();
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={darkMode ? 'dark-mode' : ''}>
      <Head>
        <title>Senesh Fitzroy - Strategic Project Manager</title>
        <meta name="description" content="Portfolio of Senesh Fitzroy, a strategic project manager and software developer." />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* External Scripts */}
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js" />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js" />

      {/* Custom Cursor */}
      <div className="cursor" ref={cursorRef}></div>
      <div className="cursor-follower" ref={cursorFollowerRef}></div>

      {/* Navigation */}
      <nav className={`navbar ${scrollY > 50 ? 'navbar-scrolled' : ''}`}>
        <div className="navbar-container">
          <div className="logo-container">
            <img src="/assets/senesh.jpeg" alt="Senesh Fitzroy Portrait" className="profile-logo" />
            <span className="logo-text">Senesh Fitzroy</span>
          </div>
          
          <button className={`mobile-menu-btn ${isMenuOpen ? 'menu-open' : ''}`} onClick={toggleMenu}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
          
          <ul className={`nav-links ${isMenuOpen ? 'show' : ''}`}>
            <li><a href="#about" onClick={() => setIsMenuOpen(false)}>About</a></li>
            <li><a href="#education" onClick={() => setIsMenuOpen(false)}>Education</a></li>
            <li><a href="#experience" onClick={() => setIsMenuOpen(false)}>Experience</a></li>
            <li><a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a></li>
          </ul>
          
          <button className="theme-toggle" onClick={toggleDarkMode} aria-label="Toggle dark mode"></button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="stars"></div>
        <div className="hero-content">
          <div className="hero-text" ref={heroTextRef}>
            <h1 data-text="Senesh Fitzroy">Senesh Fitzroy</h1>
            <h2>Strategic Project Manager & Software Developer</h2>
            <p>Driving innovation through technology and strategic execution.</p>
            <div className="hero-buttons">
              <a href="#contact" className="hero-btn primary-btn">
                Contact Me <i className="fas fa-arrow-right"></i>
              </a>
              <a href="#projects" className="hero-btn secondary-btn">
                View Projects <i className="fas fa-code"></i>
              </a>
            </div>
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
        <div className="about-cards">
          <div className="about-card animate-on-scroll">
            <div className="about-card-icon">
              <i className="fas fa-code"></i>
            </div>
            <h3>Software Development</h3>
            <p>Proficient in multiple programming languages and frameworks, creating elegant solutions to complex problems.</p>
          </div>
          <div className="about-card animate-on-scroll">
            <div className="about-card-icon">
              <i className="fas fa-tasks"></i>
            </div>
            <h3>Project Management</h3>
            <p>Experienced in leading cross-functional teams and delivering projects on time and within budget.</p>
          </div>
          <div className="about-card animate-on-scroll">
            <div className="about-card-icon">
              <i className="fas fa-lightbulb"></i>
            </div>
            <h3>Innovation</h3>
            <p>Committed to staying at the forefront of technology and driving digital transformation.</p>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="education animate-on-scroll">
        <h2>Education</h2>
        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-header">
              <img src="/assets/nsbm-logo.png" alt="NSBM Logo" className="timeline-logo" />
              <div className="timeline-title">
                <h3>NSBM Green University</h3>
                <p>Computing Foundation Programme (Sep 2022 - Sep 2023)</p>
              </div>
            </div>
            <div className="timeline-content">
              <ul>
                <li>Programming Fundamentals, Web Development</li>
                <li>ICT Project Management</li>
              </ul>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-header">
              <img src="/assets/plymouth-logo.png" alt="Plymouth Logo" className="timeline-logo" />
              <div className="timeline-title">
                <h3>University of Plymouth</h3>
                <p>BSc (Hons) Software Engineering (Sep 2023 - Present)</p>
              </div>
            </div>
            <div className="timeline-content">
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
        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-header">
              <div className="timeline-title">
                <h3>Vice President</h3>
                <p>NSBM Circularity and Sustainability Community (Apr 2024 - Present)</p>
              </div>
            </div>
            <div className="timeline-content">
              <ul>
                <li>Led sustainability initiatives and campaigns</li>
                <li>Promoted eco-conscious practices</li>
              </ul>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-header">
              <div className="timeline-title">
                <h3>Media Coordinator</h3>
                <p>Student Circle of Software Engineering (Feb 2024 - Present)</p>
              </div>
            </div>
            <div className="timeline-content">
              <ul>
                <li>Promoted software engineering events</li>
                <li>Managed event publicity and content creation</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact animate-on-scroll">
        <h2>Contact Me</h2>
        <div className="contact-container">
          <div className="contact-info">
            <div className="contact-item">
              <div className="contact-icon">
                <i className="fas fa-envelope"></i>
              </div>
              <div className="contact-text">
                <h3>Email</h3>
                <p>seneshfitzroy@gmail.com</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <div className="contact-text">
                <h3>Location</h3>
                <p>Sri Lanka</p>
              </div>
            </div>
            <div className="social-links">
              <a href="https://linkedin.com/in/seneshfitzroy" target="_blank" rel="noreferrer" className="social-link">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="https://github.com/SeneshFitzroy" target="_blank" rel="noreferrer" className="social-link">
                <i className="fab fa-github"></i>
              </a>
              <a href="https://twitter.com/SeneshFitzroy" target="_blank" rel="noreferrer" className="social-link">
                <i className="fab fa-twitter"></i>
              </a>
            </div>
          </div>
          
          <form className="contact-form">
            <div className="form-group">
              <input type="text" className="form-control" id="name" placeholder=" " required />
              <label htmlFor="name" className="form-label">Your Name</label>
            </div>
            <div className="form-group">
              <input type="email" className="form-control" id="email" placeholder=" " required />
              <label htmlFor="email" className="form-label">Your Email</label>
            </div>
            <div className="form-group">
              <textarea className="form-control form-textarea" id="message" placeholder=" " required></textarea>
              <label htmlFor="message" className="form-label">Your Message</label>
            </div>
            <button type="submit" className="submit-btn">Send Message</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">SF</div>
          <p>Passionate about creating innovative software solutions</p>
          <div className="footer-links">
            <a href="#about">About</a>
            <a href="#education">Education</a>
            <a href="#experience">Experience</a>
            <a href="#contact">Contact</a>
          </div>
          <div className="footer-social">
            <a href="https://linkedin.com/in/seneshfitzroy" target="_blank" rel="noreferrer" className="footer-social-link">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="https://github.com/SeneshFitzroy" target="_blank" rel="noreferrer" className="footer-social-link">
              <i className="fab fa-github"></i>
            </a>
            <a href="https://twitter.com/SeneshFitzroy" target="_blank" rel="noreferrer" className="footer-social-link">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} Senesh Fitzroy. All Rights Reserved.</p>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <div 
        className={`back-to-top ${showBackToTop ? 'visible' : ''}`} 
        onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
      >
        <i className="fas fa-arrow-up"></i>
      </div>
    </div>
  );
}
