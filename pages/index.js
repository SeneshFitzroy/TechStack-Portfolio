import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';
import Script from 'next/script';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  // References for animation elements
  const heroTextRef = useRef(null);
  const heroImageRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  // Custom animation function instead of AOS
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollY(position);
    
    // Show/hide back to top button
    if (position > 500) {
      setShowBackToTop(true);
    } else {
      setShowBackToTop(false);
    }
    
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

  useEffect(() => {
    // Simulate loading state
    setTimeout(() => setIsLoading(false), 1500);
    
    // Initialize scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Optional: Check for user preferred color scheme
    if (typeof window !== 'undefined') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(isDark);
    }
    
    // Hero section entrance animations
    setTimeout(() => {
      if (heroTextRef.current) heroTextRef.current.classList.add('animated');
      if (heroImageRef.current) heroImageRef.current.classList.add('animated');
      setTimeout(() => {
        if (scrollIndicatorRef.current) scrollIndicatorRef.current.classList.add('animated');
      }, 1000);
    }, 500);
    
    // Initialize particles if available
    setTimeout(() => {
      if (window.particlesJS) {
        initParticles();
      }
    }, 2000);
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Function to initialize particles
  const initParticles = () => {
    particlesJS("particles-js", {
      particles: {
        number: {
          value: 100,
          density: { enable: true, value_area: 800 }
        },
        color: { value: darkMode ? '#ffffff' : '#3b82f6' },
        shape: {
          type: "circle",
          stroke: { width: 0, color: "#000000" },
          polygon: { nb_sides: 5 }
        },
        opacity: {
          value: 0.2,
          random: true,
          anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false }
        },
        size: {
          value: 3,
          random: true,
          anim: { enable: true, speed: 2, size_min: 0.3, sync: false }
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: darkMode ? '#ffffff' : '#3b82f6',
          opacity: 0.2,
          width: 1
        },
        move: {
          enable: true,
          speed: 2,
          direction: "none",
          random: false,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: { enable: false, rotateX: 600, rotateY: 1200 }
        }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "grab" },
          onclick: { enable: true, mode: "push" },
          resize: true
        },
        modes: {
          grab: { distance: 140, line_linked: { opacity: 1 } },
          bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
          repulse: { distance: 200, duration: 0.4 },
          push: { particles_nb: 4 },
          remove: { particles_nb: 2 }
        }
      },
      retina_detect: true
    });
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // Reinitialize particles with new color
    setTimeout(() => {
      if (window.particlesJS) {
        initParticles();
      }
    }, 100);
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Skills data
  const skills = {
    languages: ['JavaScript', 'TypeScript', 'Python', 'Java', 'C#', 'HTML/CSS', 'PHP', 'Dart'],
    frameworks: ['React', 'Next.js', 'Node.js', 'Express', 'Flutter', 'Bootstrap', 'Laravel', 'Firebase'],
    tools: ['Git', 'GitHub', 'VS Code', 'Figma', 'Adobe XD', 'MongoDB', 'MySQL', 'AWS']
  };

  // Projects data
  const projects = [
    {
      title: "SafeTrack",
      description: "A web-based platform designed to modernize and optimize Public Health Inspector workflows",
      technologies: ["React", "Node.js", "Firebase", "AI"],
      links: {
        demo: "https://lnkd.in/gjF6JYPQ",
        github: "https://lnkd.in/gYEy_jGF",
        website: "https://lnkd.in/gAkFTnJP"
      }
    },
    {
      title: "Team-Sync",
      description: "Mobile app for streamlining collaboration and task management for university group projects",
      technologies: ["Flutter", "Dart", "Firebase"],
      links: {
        github: "#",
      }
    },
    {
      title: "Food-Inspector-App",
      description: "C#-based application designed to streamline food inspections",
      technologies: ["C#", ".NET", "SQL"],
      links: {
        github: "#",
      }
    },
    {
      title: "Jewelify E-commerce",
      description: "Elegant online jewelry shopping platform",
      technologies: ["HTML", "CSS", "Bootstrap", "PHP", "JavaScript"],
      links: {
        github: "#",
      }
    }
  ];

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <div className="loading-logo">SF</div>
          <div className="loading-spinner">
            <div className="spinner-ring"></div>
          </div>
          <div className="loading-text">Loading your experience...</div>
        </div>
        <style jsx>{`
          .loading-screen {
            height: 100vh;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            background: ${darkMode ? '#0f172a' : '#f8fafc'};
            position: fixed;
            top: 0;
            left: 0;
            z-index: 9999;
          }
          .loading-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
          }
          .loading-logo {
            font-size: 2.5rem;
            font-weight: 800;
            color: ${darkMode ? '#60a5fa' : '#3b82f6'};
            background: ${darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(59,130,246,0.1)'};
            width: 70px;
            height: 70px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 0 30px ${darkMode ? 'rgba(96,165,250,0.3)' : 'rgba(59,130,246,0.3)'};
            animation: pulse 2s infinite;
          }
          .loading-spinner {
            position: relative;
            width: 80px;
            height: 80px;
          }
          .spinner-ring {
            position: absolute;
            width: 100%;
            height: 100%;
            border: 3px solid transparent;
            border-top: 3px solid ${darkMode ? '#60a5fa' : '#3b82f6'};
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
          .spinner-ring:after {
            content: '';
            position: absolute;
            width: 80%;
            height: 80%;
            top: 10%;
            left: 10%;
            border: 3px solid transparent;
            border-top: 3px solid ${darkMode ? '#818cf8' : '#6366f1'};
            border-radius: 50%;
            animation: spin 1.5s linear reverse infinite;
          }
          .loading-text {
            font-size: 1rem;
            font-weight: 500;
            color: ${darkMode ? '#e2e8f0' : '#4b5563'};
            letter-spacing: 1px;
            animation: fadeInOut 2s infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes pulse {
            0% { transform: scale(1); box-shadow: 0 0 0 0 ${darkMode ? 'rgba(96,165,250,0.5)' : 'rgba(59,130,246,0.5)'}; }
            70% { transform: scale(1.05); box-shadow: 0 0 0 15px rgba(59,130,246,0); }
            100% { transform: scale(1); }
          }
          @keyframes fadeInOut {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 1; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className={`portfolio ${darkMode ? 'dark-mode' : ''}`}>
      <Head>
        <title>Senesh Fitzroy - Software Engineer</title>
        <meta name="description" content="Senesh Fitzroy - Software Engineer, Researcher, Entrepreneur and Model" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
      </Head>

      <Script src="https://cdnjs.cloudflare.com/ajax/libs/particles.js/2.0.0/particles.min.js" strategy="afterInteractive" />

      {/* Navigation */}
      <nav className={`navbar ${isMenuOpen ? 'menu-open' : ''} ${scrollY > 50 ? 'navbar-scrolled' : ''}`}>
        <div className="navbar-container">
          <div className="logo-container">
            <div className="logo">SF</div>
            <div className="logo-text">Senesh<span>Fitzroy</span></div>
          </div>
          <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Toggle menu">
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
          <ul className={`nav-links ${isMenuOpen ? 'show' : ''}`}>
            <li><a href="#about" onClick={() => setIsMenuOpen(false)}>About</a></li>
            <li><a href="#skills" onClick={() => setIsMenuOpen(false)}>Skills</a></li>
            <li><a href="#projects" onClick={() => setIsMenuOpen(false)}>Projects</a></li>
            <li><a href="#experience" onClick={() => setIsMenuOpen(false)}>Experience</a></li>
            <li><a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a></li>
          </ul>
          <div className="theme-toggle" onClick={toggleDarkMode} title="Toggle dark mode">
            <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'}`}></i>
            <span className="theme-text">{darkMode ? 'Light' : 'Dark'} Mode</span>
          </div>
        </div>
      </nav>

      {/* Hero Section with Particles */}
      <section className="hero">
        <div id="particles-js" className="particles"></div>
        <div className="hero-gradient-overlay"></div>
        <div className="hero-content">
          <div className="hero-text" ref={heroTextRef}>
            <div className="badge">Available for new opportunities</div>
            <h1 className="glitch" data-text="Senesh Fitzroy">Senesh Fitzroy</h1>
            <h2>Software Engineer & Researcher</h2>
            <div className="typing-wrapper">
              <p className="typing-text">I build exceptional digital experiences with cutting-edge technologies</p>
            </div>
            <div className="hero-buttons">
              <a href="#contact" className="btn primary-btn">
                Contact Me
                <span className="btn-icon"><i className="fas fa-arrow-right"></i></span>
              </a>
              <a href="#projects" className="btn secondary-btn">
                View Projects
                <span className="btn-icon"><i className="fas fa-code"></i></span>
              </a>
            </div>
            <div className="social-links">
              <a href="https://github.com/SeneshFitzroy" target="_blank" rel="noreferrer" className="social-hover">
                <i className="fab fa-github"></i>
              </a>
              <a href="https://linkedin.com/in/seneshfitzroy" target="_blank" rel="noreferrer" className="social-hover">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="mailto:seneshfitzroy@gmail.com" className="social-hover">
                <i className="fas fa-envelope"></i>
              </a>
            </div>
          </div>
          <div className="hero-image" ref={heroImageRef}>
            <div className="image-container">
              <div className="image-frame"></div>
              <div className="glow"></div>
            </div>
          </div>
        </div>
        <div className="scroll-indicator" ref={scrollIndicatorRef}>
          <a href="#about">
            <div className="mouse"></div>
            <span>Scroll Down</span>
          </a>
        </div>
        
        <div className="hero-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about section">
        <div className="section-container">
          <div className="section-header animate-on-scroll">
            <h2>About Me</h2>
            <div className="divider"></div>
          </div>
          <div className="about-content">
            <div className="about-text animate-on-scroll">
              <p>I'm an undergraduate studying BSc (Hons) Software Engineering at Plymouth University, UK. With a passion for creating innovative software solutions, I combine strong technical skills with a strategic mindset.</p>
              <p>Beyond coding, I'm also a researcher, model, entrepreneur, and fitness enthusiast. I'm deeply involved in sustainability initiatives and community projects.</p>
              <div className="key-points">
                <div className="key-point animate-on-scroll">
                  <div className="icon-wrapper">
                    <i className="fas fa-laptop-code"></i>
                  </div>
                  <h3>Software Engineer</h3>
                  <p>Building elegant solutions to complex problems</p>
                </div>
                <div className="key-point animate-on-scroll">
                  <div className="icon-wrapper">
                    <i className="fas fa-search"></i>
                  </div>
                  <h3>Researcher</h3>
                  <p>Exploring cutting-edge technologies</p>
                </div>
                <div className="key-point animate-on-scroll">
                  <div className="icon-wrapper">
                    <i className="fas fa-lightbulb"></i>
                  </div>
                  <h3>Entrepreneur</h3>
                  <p>Turning ideas into impactful ventures</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills section">
        <div className="section-container">
          <div className="section-header animate-on-scroll">
            <h2>My Skills</h2>
            <div className="divider"></div>
          </div>
          <div className="skills-content">
            <div className="skill-category animate-on-scroll">
              <h3>Programming Languages</h3>
              <div className="skill-tags">
                {skills.languages.map((skill, index) => (
                  <div key={index} className="skill-tag animate-on-scroll" style={{animationDelay: `${index * 100}ms`}}>
                    {skill}
                  </div>
                ))}
              </div>
            </div>
            <div className="skill-category animate-on-scroll">
              <h3>Frameworks & Libraries</h3>
              <div className="skill-tags">
                {skills.frameworks.map((skill, index) => (
                  <div key={index} className="skill-tag animate-on-scroll" style={{animationDelay: `${index * 100}ms`}}>
                    {skill}
                  </div>
                ))}
              </div>
            </div>
            <div className="skill-category animate-on-scroll">
              <h3>Tools & Technologies</h3>
              <div className="skill-tags">
                {skills.tools.map((skill, index) => (
                  <div key={index} className="skill-tag animate-on-scroll" style={{animationDelay: `${index * 100}ms`}}>
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="tech-background">
          <div className="tech-item"><i className="fab fa-react"></i></div>
          <div className="tech-item"><i className="fab fa-js-square"></i></div>
          <div className="tech-item"><i className="fab fa-node-js"></i></div>
          <div className="tech-item"><i className="fab fa-python"></i></div>
          <div className="tech-item"><i className="fab fa-java"></i></div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects section">
        <div className="section-container">
          <div className="section-header">
            <h2>Featured Projects</h2>
            <div className="divider"></div>
          </div>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <div key={index} className="project-card">
                <div className="project-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-tech">
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
                <div className="project-links">
                  {project.links.github && <a href={project.links.github} target="_blank" rel="noreferrer"><i className="fab fa-github"></i></a>}
                  {project.links.demo && <a href={project.links.demo} target="_blank" rel="noreferrer"><i className="fas fa-external-link-alt"></i></a>}
                  {project.links.website && <a href={project.links.website} target="_blank" rel="noreferrer"><i className="fas fa-globe"></i></a>}
                </div>
              </div>
            ))}
          </div>
          <div className="view-more">
            <a href="https://github.com/SeneshFitzroy" className="btn secondary-btn" target="_blank" rel="noreferrer">
              View More Projects <i className="fas fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="experience section">
        <div className="section-container">
          <div className="section-header">
            <h2>Experience & Education</h2>
            <div className="divider"></div>
          </div>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="timeline-date">2021 - Present</div>
                <h3>BSc (Hons) Software Engineering</h3>
                <p>Plymouth University, UK</p>
                <ul>
                  <li>Specializing in software development, systems design and project management</li>
                  <li>Research focus on innovative tech solutions</li>
                </ul>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="timeline-date">2023</div>
                <h3>Vice President</h3>
                <p>NSBM Circularity and Sustainability Community</p>
                <ul>
                  <li>Led sustainability initiatives and community projects</li>
                  <li>Organized workshops and events promoting eco-friendly practices</li>
                </ul>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="timeline-date">2023</div>
                <h3>Team Lead - PrimeUX</h3>
                <p>DEV[thon] 2.0 Competition</p>
                <ul>
                  <li>Led team to victory in UI Design Submission Round</li>
                  <li>Developed SafeTrack - a platform for Public Health Inspectors</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="achievements section">
        <div className="section-container">
          <div className="section-header">
            <h2>Achievements</h2>
            <div className="divider"></div>
          </div>
          <div className="achievements-grid">
            <div className="achievement-card">
              <div className="achievement-icon">
                <i className="fas fa-trophy"></i>
              </div>
              <h3>DEV[thon] 2.0 Winner</h3>
              <p>UI Design Submission Round</p>
            </div>
            <div className="achievement-card">
              <div className="achievement-icon">
                <i className="fas fa-award"></i>
              </div>
              <h3>IEEE Member</h3>
              <p>Contributing to tech advancement</p>
            </div>
            <div className="achievement-card">
              <div className="achievement-icon">
                <i className="fas fa-certificate"></i>
              </div>
              <h3>Community Service</h3>
              <p>Digital Hustle School Workshop</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact section">
        <div className="section-container">
          <div className="section-header">
            <h2>Get In Touch</h2>
            <div className="divider"></div>
          </div>
          <div className="contact-content">
            <div className="contact-info">
              <div className="contact-item">
                <i className="fas fa-envelope"></i>
                <span>seneshfitzroy@gmail.com</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-map-marker-alt"></i>
                <span>Sri Lanka</span>
              </div>
              <div className="contact-social">
                <a href="https://github.com/SeneshFitzroy" target="_blank" rel="noreferrer"><i className="fab fa-github"></i></a>
                <a href="https://linkedin.com/in/seneshfitzroy" target="_blank" rel="noreferrer"><i className="fab fa-linkedin"></i></a>
                <a href="#"><i className="fab fa-twitter"></i></a>
                <a href="#"><i className="fab fa-instagram"></i></a>
              </div>
            </div>
            <div className="contact-form">
              <form>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" name="name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" required />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" rows="5" required></textarea>
                </div>
                <button type="submit" className="btn primary-btn submit-btn">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-content">
          <p>© {new Date().getFullYear()} Senesh Fitzroy. All Rights Reserved.</p>
          <div className="footer-links">
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </footer>

      <div className={`back-to-top ${showBackToTop ? 'visible' : ''}`} onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
        <i className="fas fa-arrow-up"></i>
      </div>

      <style jsx global>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        
        :root {
          --primary: #3b82f6;
          --primary-dark: #2563eb;
          --primary-light: #60a5fa;
          --primary-gradient: linear-gradient(135deg, #3b82f6, #8b5cf6);
          --secondary: #10b981;
          --secondary-dark: #059669;
          --secondary-light: #34d399;
          --dark: #111827;
          --dark-medium: #1e293b;
          --light: #f8fafc;
          --light-medium: #f1f5f9;
          --gray: #6b7280;
          --text: #333;
          --text-light: #4b5563;
          --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
          --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.05), 0 2px 4px rgba(0, 0, 0, 0.05);
          --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.05), 0 5px 10px rgba(0, 0, 0, 0.05);
          --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04);
          --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          --cubic-bezier: cubic-bezier(0.4, 0, 0.2, 1);
          --cubic-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        body {
          font-family: 'Poppins', sans-serif;
          line-height: 1.6;
          color: var(--text);
          background: var(--light);
          overflow-x: hidden;
        }
        
        /* Dark Mode Styles */
        .dark-mode {
          --primary: #60a5fa;
          --primary-dark: #3b82f6;
          --primary-light: #93c5fd;
          --primary-gradient: linear-gradient(135deg, #60a5fa, #a78bfa);
          --secondary: #10b981;
          --secondary-dark: #059669;
          --secondary-light: #34d399;
          --dark: #f8fafc;
          --dark-medium: #f1f5f9;
          --light: #0f172a;
          --light-medium: #1e293b;
          --gray: #94a3b8;
          --text: #e2e8f0;
          --text-light: #cbd5e1;
          --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.2);
          --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(0, 0, 0, 0.1);
          --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.2), 0 5px 10px rgba(0, 0, 0, 0.1);
          --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.15);
        }
        
        .dark-mode .skill-tag {
          background: var(--dark-medium);
          box-shadow: var(--shadow-sm);
        }
        
        .dark-mode .key-point, 
        .dark-mode .project-card, 
        .dark-mode .achievement-card {
          background: var(--dark-medium);
          box-shadow: var(--shadow-md);
        }
        
        a {
          color: inherit;
          text-decoration: none;
          transition: var(--transition);
        }
        
        /* Animations */
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s var(--cubic-bezier), transform 0.8s var(--cubic-bezier);
        }
        
        .animate-on-scroll.animated {
          opacity: 1;
          transform: translateY(0);
        }
        
        .hero-text, .hero-image {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 1s var(--cubic-bezier), transform 1s var(--cubic-bezier);
        }
        
        .hero-text.animated {
          opacity: 1;
          transform: translateY(0);
        }
        
        .hero-image.animated {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.3s;
        }
        
        .scroll-indicator {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s var(--cubic-bezier), transform 0.8s var(--cubic-bezier);
        }
        
        .scroll-indicator.animated {
          opacity: 1;
          transform: translateY(0);
        }
        
        /* Particle Background */
        .particles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }
        
        .hero-gradient-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to bottom right, 
                     rgba(59, 130, 246, 0.1), 
                     rgba(139, 92, 246, 0.05),
                     rgba(16, 185, 129, 0.05));
          z-index: 2;
          pointer-events: none;
        }
        
        .dark-mode .hero-gradient-overlay {
          background: linear-gradient(to bottom right, 
                     rgba(96, 165, 250, 0.1), 
                     rgba(167, 139, 250, 0.05),
                     rgba(16, 185, 129, 0.05));
        }
        
        /* Navbar Styles */
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          background: rgba(248, 250, 252, 0.9);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
          z-index: 1000;
          backdrop-filter: blur(10px);
          transition: var(--transition);
        }
        
        .navbar-scrolled {
          background: rgba(248, 250, 252, 0.95);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          padding: 0.5rem 0;
        }
        
        .dark-mode .navbar {
          background: rgba(15, 23, 42, 0.9);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        }
        
        .dark-mode .navbar-scrolled {
          background: rgba(15, 23, 42, 0.95);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }
        
        .navbar-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .logo-container {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .logo-text {
          font-size: 1.2rem;
          font-weight: 600;
          display: none;
        }
        
        .logo-text span {
          color: var(--primary);
        }
        
        .navbar-scrolled .logo-text {
          display: block;
        }
        
        .logo {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--primary);
          background: var(--light-medium);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          transition: var(--transition);
          box-shadow: 0 0 10px rgba(59, 130, 246, 0.2);
        }
        
        .logo:after {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          background: var(--primary-gradient);
          opacity: 0;
          transition: var(--transition);
          border-radius: 50%;
          transform: scale(0);
        }
        
        .logo:hover:after {
          opacity: 1;
          transform: scale(1);
        }
        
        .logo:hover {
          color: white;
          transform: rotate(360deg);
        }
        
        .nav-links {
          display: flex;
          list-style: none;
          gap: 2rem;
        }
        
        .nav-links a {
          font-weight: 500;
          position: relative;
          padding: 0.5rem 0;
          color: var(--text);
        }
        
        .nav-links a:after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          background: var(--primary-gradient);
          bottom: -2px;
          left: 0;
          transition: width 0.4s cubic-bezier(0.65, 0, 0.35, 1);
        }
        
        .nav-links a:hover:after {
          width: 100%;
        }
        
        .theme-toggle {
          cursor: pointer;
          font-size: 1.2rem;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 0.5rem 1rem;
          border-radius: 30px;
          background: var(--light-medium);
          color: var(--primary);
          transition: var(--transition);
        }
        
        .theme-text {
          font-size: 0.8rem;
          font-weight: 500;
          display: none;
        }
        
        .navbar-scrolled .theme-text {
          display: block;
        }
        
        .theme-toggle:hover {
          background: var(--primary);
          color: var(--light);
          transform: translateY(-3px);
        }
        
        /* Mobile menu button */
        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 5px;
          padding: 5px;
          z-index: 1001;
        }
        
        .bar {
          width: 26px;
          height: 2px;
          background-color: var(--text);
          transition: var(--transition);
        }
        
        .menu-open .bar:nth-child(1) {
          transform: translateY(7px) rotate(45deg);
        }
        
        .menu-open .bar:nth-child(2) {
          opacity: 0;
        }
        
        .menu-open .bar:nth-child(3) {
          transform: translateY(-7px) rotate(-45deg);
        }
        
        /* Hero Section */
        .hero {
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          padding: 2rem;
          background: var(--light);
          overflow: hidden;
          z-index: 1;
        }
        
        .hero-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          position: relative;
          z-index: 2;
        }
        
        .hero-text {
          max-width: 600px;
          position: relative;
          z-index: 3;
        }
        
        .badge {
          display: inline-block;
          background: var(--light-medium);
          color: var(--primary);
          font-size: 0.8rem;
          padding: 0.5rem 1.2rem;
          border-radius: 30px;
          margin-bottom: 1.2rem;
          font-weight: 500;
          box-shadow: var (--shadow-sm);
          animation: pulse 2s infinite;
          transform: translateZ(0);
        }
        
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
          }
        }
        
        .hero h1 {
          font-size: 4.5rem;
          font-weight: 800;
          color: var(--dark);
          line-height: 1.1;
          margin-bottom: 1rem;
          position: relative;
          display: inline-block;
        }
        
        /* Glitch effect */
        .glitch {
          position: relative;
          animation: glitch-skew 1s infinite linear alternate-reverse;
        }
        
        .glitch::before,
        .glitch::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          animation: glitch-anim 2s infinite linear alternate-reverse;
        }
        
        .glitch::before {
          color: var(--primary);
          clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
          transform: translate(-0.025em, -0.0125em);
          opacity: 0.8;
        }
        
        .glitch::after {
          color: var(--secondary);
          clip-path: polygon(0 55%, 100% 55%, 100% 100%, 0 100%);
          transform: translate(0.025em, 0.0125em);
          opacity: 0.8;
        }
        
        @keyframes glitch-anim {
          0% {
            transform: translate(0);
          }
          20% {
            transform: translate(-3px, 3px);
          }
          40% {
            transform: translate(-3px, -3px);
          }
          60% {
            transform: translate(3px, 3px);
          }
          80% {
            transform: translate(3px, -3px);
          }
          100% {
            transform: translate(0);
          }
        }
        
        @keyframes glitch-skew {
          0% {
            transform: skew(0deg);
          }
          20% {
            transform: skew(0.5deg);
          }
          40% {
            transform: skew(0deg);
          }
          60% {
            transform: skew(-0.5deg);
          }
          80% {
            transform: skew(0.25deg);
          }
          100% {
            transform: skew(0deg);
          }
        }
        
        .hero h1:after {
          content: '';
          position: absolute;
          bottom: 5px;
          left: 0;
          width: 40%;
          height: 5px;
          background: var(--primary-gradient);
          border-radius: 5px;
        }
        
        .hero h2 {
          font-size: 1.8rem;
          font-weight: 600;
          color: var(--primary);
          margin-bottom: 1.5rem;
          opacity: 0.95;
        }
        
        /* Typing effect */
        .typing-wrapper {
          height: 2em;
          margin-bottom: 2rem;
        }
        
        .typing-text {
          font-size: 1.2rem;
          color: var(--text-light);
          line-height: 1.8;
          display: inline-block;
          position: relative;
          overflow: hidden;
          white-space: nowrap;
          animation: typing 4s steps(40, end) 1s forwards;
        }
        
        .typing-text:after {
          content: '|';
          position: absolute;
          right: -5px;
          animation: blink 1s step-end infinite;
        }
        
        @keyframes typing {
          from { width: 0; }
          to { width: 100%; }
        }
        
        @keyframes blink {
          from, to { opacity: 0; }
          50% { opacity: 1; }
        }
        
        .gradient-text {
          background: var(--primary-gradient);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        
        .hero-buttons {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
        }
        
        .btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 0.9rem 1.8rem;
          border-radius: 8px;
          font-weight: 500;
          transition: var(--transition);
          cursor: pointer;
          border: none;
          outline: none;
          position: relative;
          overflow: hidden;
          font-size: 0.9rem;
          z-index: 1;
        }
        
        .btn-icon {
          transition: var(--transition);
        }
        
        .primary-btn {
          background: var(--primary-gradient);
          color: white;
          box-shadow: var(--shadow-md);
        }
        
        .primary-btn:hover {
          transform: translateY(-3px);
          box-shadow: var(--shadow-lg);
        }
        
        .primary-btn:hover .btn-icon {
          transform: translateX(5px);
        }
        
        .primary-btn:after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 0;
          height: 100%;
          background: rgba(255, 255, 255, 0.2);
          transition: var(--transition);
          z-index: -1;
        }
        
        .primary-btn:hover:after {
          width: 100%;
        }
        
        .secondary-btn {
          background: transparent;
          color: var(--primary);
          border: 2px solid var(--primary);
          position: relative;
          z-index: 1;
        }
        
        .secondary-btn:after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 0%;
          height: 100%;
          background: var(--primary);
          transition: var(--transition);
          z-index: -1;
        }
        
        .secondary-btn:hover {
          color: white;
          transform: translateY(-3px);
        }
        
        .secondary-btn:hover .btn-icon {
          transform: translateX(5px);
        }
        
        .secondary-btn:hover:after {
          width: 100%;
        }
        
        .social-links {
          display: flex;
          gap: 1.5rem;
        }
        
        .social-hover {
          font-size: 1.5rem;
          color: var(--text-light);
          transition: var(--transition);
          position: relative;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          overflow: hidden;
        }
        
        .social-hover:before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: var(--primary-gradient);
          opacity: 0;
          transition: var(--transition);
          z-index: -1;
          transform: scale(0);
        }
        
        .social-hover i {
          position: relative;
          z-index: 1;
          transition: var(--transition);
        }
        
        .social-hover:hover {
          transform: translateY(-5px);
          color: white;
        }
        
        .social-hover:hover:before {
          opacity: 1;
          transform: scale(1);
        }
        
        .hero-image {
          flex: 0 0 40%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 3;
        }
        
        .image-container {
          width: 350px;
          height: 350px;
          background: url('/profile-image.jpg') center center/cover no-repeat;
          border-radius: 20px;
          box-shadow: var(--shadow-xl);
          position: relative;
          overflow: hidden;
          transform-style: preserve-3d;
          transition: var(--transition);
        }
        
        .image-frame {
          position: absolute;
          width: 100%;
          height: 100%;
          border: 5px solid rgba(59, 130, 246, 0.1);
          border-radius: 20px;
          top: 0;
          left: 0;
          z-index: 2;
        }
        
        .glow {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          background: radial-gradient(
            circle at 50% 50%,
            rgba(59, 130, 246, 0.3) 0%,
            rgba(59, 130, 246, 0) 70%
          );
          opacity: 0.5;
          transition: var(--transition);
          z-index: 1;
        }
        
        .image-container:hover {
          transform: translateY(-10px) rotateY(5deg) scale(1.02);
          box-shadow: var(--shadow-xl), 0 20px 40px rgba(59, 130, 246, 0.2);
        }
        
        .image-container:hover .glow {
          opacity: 0.8;
        }
        
        .image-container:before {
          content: '';
          position: absolute;
          top: -10px;
          left: -10px;
          width: calc(100% + 20px);
          height: calc(100% + 20px);
          border: 3px solid var(--primary);
          border-radius: 20px;
          z-index: 0;
          transition: var(--transition);
          opacity: 0.5;
        }
        
        .image-container:hover:before {
          top: -15px;
          left: -15px;
          width: calc(100% + 30px);
          height: calc(100% + 30px);
        }
        
        .scroll-indicator {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          text-align: center;
          z-index: 2;
        }
        
        .mouse {
          width: 30px;
          height: 50px;
          border: 2px solid var(--text-light);
          border-radius: 25px;
          margin: 0 auto 8px;
          position: relative;
        }
        
        .mouse:before {
          content: '';
          position: absolute;
          width: 8px;
          height: 8px;
          background: var(--primary);
          border-radius: 50%;
          top: 8px;
          left: 50%;
          transform: translateX(-50%);
          animation: scroll 2s infinite;
        }
        
        .scroll-indicator span {
          color: var(--text-light);
          font-size: 0.8rem;
          font-weight: 500;
          letter-spacing: 1px;
        }
        
        @keyframes scroll {
          0% { transform: translate(-50%, 0); opacity: 1; }
          80% { transform: translate(-50%, 25px); opacity: 0; }
          81% { transform: translate(-50%, 0); opacity: 0; }
          100% { transform: translate(-50%, 0); opacity: 1; }
        }
        
        /* Hero shapes */
        .hero-shapes .shape {
          position: absolute;
          border-radius: 50%;
          background: var(--primary-gradient);
          opacity: 0.1;
          filter: blur(10px);
          z-index: 0;
          animation: float 10s infinite alternate ease-in-out;
        }
        
        .shape-1 {
          width: 200px;
          height: 200px;
          top: 20%;
          left: 10%;
          animation-delay: 0s !important;
        }
        
        .shape-2 {
          width: 300px;
          height: 300px;
          top: 60%;
          left: 5%;
          background: linear-gradient(135deg, var(--primary), var(--secondary)) !important;
          animation-delay: 2s !important;
        }
        
        .shape-3 {
          width: 150px;
          height: 150px;
          top: 10%;
          right: 20%;
          background: linear-gradient(135deg, var(--secondary), var(--primary-light)) !important;
          animation-delay: 1s !important;
        }
        
        .shape-4 {
          width: 250px;
          height: 250px;
          bottom: 15%;
          right: 10%;
          animation-delay: 3s !important;
        }
        
        @keyframes float {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(20px, 20px);
          }
        }
        
        /* Section Styles */
        .section {
          padding: 7rem 2rem;
          position: relative;
          overflow: hidden;
        }
        
        .section:nth-child(odd) {
          background: var(--light);
        }
        
        .section:nth-child(even) {
          background: var(--light-medium);
        }
        
        .section-container {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }
        
        .section-header {
          text-align: center;
          margin-bottom: 4rem;
        }
        
        .section-header h2 {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--dark);
          position: relative;
          display: inline-block;
          transform: translateZ(0);
        }
        
        .section-header h2:before {
          content: '';
          position: absolute;
          bottom: -5px;
          left: -10px;
          width: 40px;
          height: 40px;
          background: var(--primary);
          opacity: 0.1;
          border-radius: 50%;
          z-index: -1;
        }
        
        .divider {
          width: 120px;
          height: 4px;
          background: var(--primary-gradient);
          margin: 1.2rem auto 0;
          border-radius: 2px;
          position: relative;
        }
        
        .divider:before, .divider:after {
          content: '';
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--primary);
          top: -2px;
        }
        
        .divider:before {
          left: 0;
        }
        
        .divider:after {
          right: 0;
        }
        
        /* Tech background */
        .tech-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          opacity: 0.03;
          pointer-events: none;
        }
        
        .tech-item {
          position: absolute;
          font-size: 5rem;
          opacity: 0.5;
        }
        
        .tech-item:nth-child(1) {
          top: 20%;
          left: 10%;
          animation: float 15s infinite alternate ease-in-out;
        }
        
        .tech-item:nth-child(2) {
          bottom: 30%;
          left: 20%;
          animation: float 18s infinite alternate-reverse ease-in-out;
        }
        
        .tech-item:nth-child(3) {
          top: 15%;
          right: 15%;
          animation: float 20s infinite alternate ease-in-out;
        }
        
        .tech-item:nth-child(4) {
          bottom: 20%;
          right: 25%;
          animation: float 17s infinite alternate-reverse ease-in-out;
        }
        
        .tech-item:nth-child(5) {
          bottom: 40%;
          left: 40%;
          animation: float 22s infinite alternate ease-in-out;
        }
        
        /* About Section */
        .about-content {
          display: flex;
          justify-content: space-between;
          gap: 4rem;
        }
        
        .about-text {
          max-width: 800px;
          margin: 0 auto;
        }
        
        .about-text p {
          margin-bottom: 1.5rem;
          font-size: 1.1rem;
          color: var(--text-light);
          line-height: 1.8;
        }
        
        .key-points {
          display: flex;
          justify-content: space-between;
          gap: 2rem;
          margin-top: 3rem;
        }
        
        .key-point {
          flex: 1;
          text-align: center;
          padding: 2.5rem 2rem;
          background: var(--light);
          border-radius: 16px;
          box-shadow: var(--shadow-md);
          transition: var(--transition);
          position: relative;
          z-index: 1;
          overflow: hidden;
          transform-style: preserve-3d;
        }
        
        .key-point:before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 5px;
          background: var(--primary-gradient);
          transition: var(--transition);
        }
        
        .key-point:after {
          content: '';
          position: absolute;
          width: 200%;
          height: 200%;
          background: var(--primary-gradient);
          left: -50%;
          top: -50%;
          border-radius: 40%;
          transform: translateZ(-1px) rotate(0deg);
          transition: var(--transition);
          z-index: -1;
          opacity: 0;
        }
        
        .key-point:hover {
          transform: translateY(-10px) translateZ(0);
          box-shadow: var(--shadow-xl);
        }
        
        .key-point:hover:before {
          height: 10px;
        }
        
        .key-point:hover:after {
          transform: translateZ(-1px) rotate(180deg);
          opacity: 0.05;
        }
        
        .icon-wrapper {
          width: 80px;
          height: 80px;
          background: var(--light-medium);
          color: var(--primary);
          font-size: 2rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
          position: relative;
          z-index: 1;
          overflow: hidden;
          transition: var(--transition);
          box-shadow: 0 10px 20px rgba(59, 130, 246, 0.15);
        }
        
        .icon-wrapper:before {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          background: var(--primary-gradient);
          transform: translateY(100%);
          transition: var(--transition);
          z-index: -1;
        }
        
        .key-point:hover .icon-wrapper {
          color: white;
          transform: rotateY(360deg);
        }
        
        .key-point:hover .icon-wrapper:before {
          transform: translateY(0);
        }
        
        .key-point h3 {
          font-size: 1.3rem;
          font-weight: 600;
          margin-bottom: 0.8rem;
          color: var(--dark);
        }
        
        .key-point p {
          color: var(--gray);
          margin-bottom: 0;
          font-size: 0.95rem;
        }
        
        /* Skills Section */
        .skills-content {
          display: flex;
          flex-direction: column;
          gap: 3rem;
        }
        
        .skill-category h3 {
          margin-bottom: 1.5rem;
          font-size: 1.4rem;
          font-weight: 600;
          color: var(--dark);
          position: relative;
          display: inline-block;
        }
        
        .skill-category h3:after {
          content: '';
          position: absolute;
          width: 50px;
          height: 3px;
          background: var(--primary-gradient);
          bottom: -8px;
          left: 0;
          border-radius: 3px;
        }
        
        .skill-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
        }
        
        .skill-tag {
          background: var(--light);
          border: 1px solid rgba(0,0,0,0.05);
          border-radius: 10px;
          padding: 0.8rem 1.5rem;
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--text);
          box-shadow: var(--shadow-sm);
          transition: var(--transition);
          position: relative;
          z-index: 1;
          overflow: hidden;
          transform: translateZ(0);
        }
        
        .skill-tag:before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: var(--primary-gradient);
          opacity: 0;
          transition: var(--transition);
          z-index: -1;
        }
        
        .skill-tag:hover {
          color: white;
          transform: translateY(-5px) scale(1.05);
          box-shadow: var(--shadow-md);
        }
        
        .skill-tag:hover:before {
          opacity: 1;
        }
        
        /* Projects Section */
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
        }
        
        .project-card {
          background: white;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        
        .project-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }
        
        .project-content {
          padding: 1.5rem;
          flex: 1;
        }
        
        .project-card h3 {
          font-size: 1.3rem;
          font-weight: 600;
          margin-bottom: 0.8rem;
          color: #111827;
        }
        
        .project-card p {
          color: #6b7280;
          margin-bottom: 1.5rem;
        }
        
        .project-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: auto;
        }
        
        .tech-tag {
          font-size: 0.8rem;
          background: #f3f4f6;
          padding: 0.3rem 0.6rem;
          border-radius: 4px;
          font-weight: 500;
          color: #4b5563;
        }
        
        .project-links {
          display: flex;
          justify-content: flex-end;
          padding: 1rem 1.5rem;
          background: #f9fafb;
          border-top: 1px solid #e5e7eb;
          gap: 1rem;
        }
        
        .project-links a {
          color: #6b7280;
          font-size: 1.2rem;
          transition: color 0.3s ease;
        }
        
        .project-links a:hover {
          color: #3b82f6;
        }
        
        .view-more {
          text-align: center;
          margin-top: 3rem;
        }
        
        /* Experience Section */
        .timeline {
          position: relative;
          max-width: 800px;
          margin: 0 auto;
        }
        
        .timeline:before {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          left: 20px;
          width: 2px;
          background: #e5e7eb;
        }
        
        .timeline-item {
          position: relative;
          padding-left: 60px;
          padding-bottom: 3rem;
        }
        
        .timeline-marker {
          position: absolute;
          left: 0;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #3b82f6;
          border: 4px solid white;
          box-shadow: 0 0 0 2px #3b82f6;
          top: 5px;
          z-index: 10;
        }
        
        .timeline-date {
          font-size: 0.9rem;
          font-weight: 500;
          color: #6b7280;
          margin-bottom: 0.5rem;
        }
        
        .timeline-content h3 {
          font-size: 1.3rem;
          font-weight: 600;
          margin-bottom: 0.3rem;
        }
        
        .timeline-content p {
          color: #4b5563;
          margin-bottom: 0.8rem;
        }
        
        .timeline-content ul {
          list-style-type: disc;
          padding-left: 1.5rem;
          color: #6b7280;
        }
        
        /* Achievements Section */
        .achievements-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 2rem;
        }
        
        .achievement-card {
          background: white;
          padding: 2rem;
          border-radius: 10px;
          text-align: center;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          transition: transform 0.3s ease;
        }
        
        .achievement-card:hover {
          transform: translateY(-5px);
        }
        
        .achievement-icon {
          width: 60px;
          height: 60px;
          background: #ecf0ff;
          color: #3b82f6;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
          font-size: 1.5rem;
        }
        
        .achievement-card h3 {
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }
        
        .achievement-card p {
          color: #6b7280;
        }
        
        /* Contact Section */
        .contact-content {
          display: flex;
          gap: 4rem;
          align-items: flex-start;
        }
        
        .contact-info {
          flex: 1;
        }
        
        .contact-item {
          display: flex;
          align-items: center;
          margin-bottom: 1.5rem;
        }
        
        .contact-item i {
          width: 40px;
          height: 40px;
          background: #ecf0ff;
          color: #3b82f6;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 1rem;
        }
        
        .contact-social {
          display: flex;
          gap: 1rem;
          margin-top: 2rem;
        }
        
        .contact-social a {
          width: 40px;
          height: 40px;
          background: #ecf0ff;
          color: #3b82f6;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          transition: all 0.3s ease;
        }
        
        .contact-social a:hover {
          background: #3b82f6;
          color: white;
          transform: translateY(-3px);
        }
        
        .contact-form {
          flex: 2;
        }
        
        .form-group {
          margin-bottom: 1.5rem;
        }
        
        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
        }
        
        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 0.8rem;
          border: 1px solid #e5e7eb;
          border-radius: 5px;
          font-family: inherit;
          transition: border-color 0.3s ease;
        }
        
        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #3b82f6;
        }
        
        .submit-btn {
          width: 100%;
        }
        
        /* Footer Styles */
        footer {
          background: #1f2937;
          color: white;
          padding: 2rem;
        }
        
        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .footer-links {
          display: flex;
          gap: 2rem;
        }
        
        .footer-links a {
          color: #d1d5db;
          transition: color 0.3s ease;
        }
        
        .footer-links a:hover {
          color: white;
        }
        
        /* Back to Top Button */
        .back-to-top {
          position: fixed;
          bottom: 30px;
          right: 30px;
          width: 50px;
          height: 50px;
          background: var(--primary-gradient);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          opacity: 0;
          visibility: hidden;
          transition: var(--transition);
          z-index: 999;
          box-shadow: var(--shadow-md);
          transform: translateY(20px);
        }
        
        .back-to-top.visible {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }
        
        .back-to-top:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-lg);
        }
        
        /* Responsive Styles */
        @media (max-width: 992px) {
          .hero h1 {
            font-size: 3.5rem;
          }
          
          .hero-content {
            flex-direction: column;
            text-align: center;
            gap: 3rem;
          }
          
          .hero-text {
            margin-bottom: 0;
          }
          
          .hero h1:after {
            left: 30%;
            width: 40%;
          }
          
          .hero-buttons {
            justify-content: center;
          }
          
          .social-links {
            justify-content: center;
          }
          
          .about-content {
            flex-direction: column;
          }
          
          .key-points {
            flex-direction: column;
          }

          .skill-category h3:after {
            left: calc(50% - 25px);
          }
          
          .skill-category h3 {
            display: block;
            text-align: center;
          }
          
          .skill-tags {
            justify-content: center;
          }
        }
        
        @media (max-width: 768px) {
          .navbar-container {
            padding: 1rem;
          }
          
          .mobile-menu-btn {
            display: flex;
          }
          
          .nav-links {
            position: fixed;
            top: 0;
            right: -100%;
            width: 80%;
            height: 100vh;
            background: var(--light);
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 1.5rem;
            transition: var(--transition);
            box-shadow: var(--shadow-lg);
          }
          
          .dark-mode .nav-links {
            background: var(--light);
          }
          
          .nav-links.show {
            right: 0;
          }
          
          .nav-links li {
            margin-left: 0;
          }
          
          .nav-links a {
            font-size: 1.2rem;
          }
          
          .section {
            padding: 5rem 1.5rem;
          }
          
          .hero h1 {
            font-size: 3rem;
          }
          
          .hero h2 {
            font-size: 1.4rem;
          }
          
          .hero-buttons {
            flex-direction: column;
            width: 100%;
          }
          
          .hero-buttons a {
            width: 100%;
            text-align: center;
            justify-content: center;
          }
          
          .image-container {
            width: 280px;
            height: 280px;
          }
          
          .section-header h2 {
            font-size: 2.2rem;
          }
          
          .footer-content {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }
          
          .footer-links {
            margin-top: 1rem;
            justify-content: center;
            flex-wrap: wrap;
          }
        }
        
        @media (max-width: 480px) {
          .hero h1 {
            font-size: 2.5rem;
          }
          
          .typing-text {
            font-size: 1rem;
          }
          
          .image-container {
            width: 240px;
            height: 240px;
          }
          
          .key-point {
            padding: 1.5rem 1rem;
          }
          
          .section-header h2 {
            font-size: 2rem;
          }
          
          .hero-shapes .shape {
            opacity: 0.05;
          }
        }
      `}</style>
    </div>
  );
}
