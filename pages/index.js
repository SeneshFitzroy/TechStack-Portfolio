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
  const [activeSkillCategory, setActiveSkillCategory] = useState('languages');

  // Refs for DOM elements and animations
  const heroTextRef = useRef(null);
  const heroImageRef = useRef(null);
  const cursorRef = useRef(null);
  const cursorFollowerRef = useRef(null);

  // Projects data from GitHub
  const projects = [
    {
      title: "SafeServe-PHI-Manager",
      description: "A platform designed to modernize Public Health Inspector workflows with AI-enhanced features",
      image: "/assets/projects/safeserve.jpg",
      technologies: ["React", "Node.js", "Firebase", "AI"],
      github: "https://github.com/SeneshFitzroy/SafeServe-PHI-Manager.git",
      featured: true
    },
    {
      title: "Food-Inspector-App",
      description: "A C#-based application designed to streamline food inspections for Public Health Inspectors",
      image: "/assets/projects/food-inspector.jpg",
      technologies: ["C#", ".NET", "SQL"],
      github: "https://github.com/SeneshFitzroy/Food-Inspector-App-CSharp",
      featured: true
    },
    {
      title: "Team-Sync",
      description: "Mobile app for streamlining collaboration and task management for university group projects",
      image: "/assets/projects/team-sync.jpg",
      technologies: ["Flutter", "Dart", "Firebase"],
      github: "https://github.com/SeneshFitzroy/Team-Sync-Project-Management-Application",
      featured: true
    },
    {
      title: "Jewelify E-commerce",
      description: "Elegant online jewelry shopping platform with modern UI and seamless checkout",
      image: "/assets/projects/jewelify.jpg",
      technologies: ["HTML", "CSS", "Bootstrap", "PHP", "JavaScript"],
      github: "https://github.com/SeneshFitzroy/Jewelify-Ecommerce",
      featured: true
    }
  ];

  // Comprehensive skills data
  const skills = {
    languages: [
      { name: "JavaScript", icon: "fab fa-js-square", proficiency: 90 },
      { name: "TypeScript", icon: "fab fa-js", proficiency: 85 },
      { name: "Python", icon: "fab fa-python", proficiency: 80 },
      { name: "Java", icon: "fab fa-java", proficiency: 85 },
      { name: "C#", icon: "fab fa-microsoft", proficiency: 80 },
      { name: "HTML/CSS", icon: "fab fa-html5", proficiency: 95 },
      { name: "PHP", icon: "fab fa-php", proficiency: 75 },
      { name: "Dart", icon: "fas fa-code", proficiency: 70 }
    ],
    frameworks: [
      { name: "React", icon: "fab fa-react", proficiency: 90 },
      { name: "Next.js", icon: "fab fa-react", proficiency: 85 },
      { name: "Node.js", icon: "fab fa-node-js", proficiency: 85 },
      { name: "Flutter", icon: "fas fa-mobile-alt", proficiency: 75 },
      { name: "Express", icon: "fab fa-node-js", proficiency: 80 },
      { name: "Laravel", icon: "fab fa-laravel", proficiency: 70 },
      { name: "Bootstrap", icon: "fab fa-bootstrap", proficiency: 90 },
      { name: "Firebase", icon: "fas fa-fire", proficiency: 85 }
    ],
    tools: [
      { name: "Git", icon: "fab fa-git-alt", proficiency: 90 },
      { name: "GitHub", icon: "fab fa-github", proficiency: 95 },
      { name: "VS Code", icon: "fas fa-code", proficiency: 95 },
      { name: "Figma", icon: "fab fa-figma", proficiency: 80 },
      { name: "Adobe XD", icon: "fab fa-adobe", proficiency: 75 },
      { name: "MongoDB", icon: "fas fa-database", proficiency: 80 },
      { name: "MySQL", icon: "fas fa-database", proficiency: 85 },
      { name: "AWS", icon: "fab fa-aws", proficiency: 70 }
    ]
  };

  // Social media links
  const socialLinks = {
    professional: [
      { name: "Twitter", icon: "fab fa-x-twitter", url: "https://x.com/SeneshFitzroy" },
      { name: "LinkedIn", icon: "fab fa-linkedin-in", url: "https://linkedin.com/in/seneshfitzroy" },
      { name: "Stack Exchange", icon: "fab fa-stack-exchange", url: "https://meta.stackexchange.com/users/1710137/senesh-fitzroy" },
      { name: "Dev.to", icon: "fab fa-dev", url: "https://dev.to/seneshfitzroy" },
      { name: "GitHub", icon: "fab fa-github", url: "https://github.com/SeneshFitzroy" }
    ],
    social: [
      { name: "Facebook", icon: "fab fa-facebook-f", url: "https://web.facebook.com/dinura.senesh.9" },
      { name: "Instagram", icon: "fab fa-instagram", url: "https://instagram.com/seneshx" },
      { name: "TikTok", icon: "fab fa-tiktok", url: "https://www.tiktok.com/@seneshx" },
      { name: "Threads", icon: "fas fa-at", url: "https://www.threads.net/@seneshx" }
    ]
  };

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
        <title>Senesh Fitzroy - Strategic Project Manager | Software Developer</title>
        <meta name="description" content="Strategic Project Manager and Software Developer with expertise in full-stack development, project management, and digital transformation." />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" rel="stylesheet" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* External Scripts */}
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js" />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js" />
      <Script src="https://cdn.jsdelivr.net/npm/chart.js" />

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
            <li><a href="#skills" onClick={() => setIsMenuOpen(false)}>Skills</a></li>
            <li><a href="#projects" onClick={() => setIsMenuOpen(false)}>Projects</a></li>
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
            <div className="badge">BSc (Hons) Software Engineering | Plymouth University</div>
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
            <div className="hero-social">
              {socialLinks.professional.slice(0, 3).map((link, index) => (
                <a key={index} href={link.url} target="_blank" rel="noreferrer" className="hero-social-icon" aria-label={link.name}>
                  <i className={link.icon}></i>
                </a>
              ))}
            </div>
          </div>
          <div className="hero-image" ref={heroImageRef}>
            <img src="/assets/senesh.jpeg" alt="Senesh Fitzroy" />
          </div>
        </div>
        <div className="scroll-indicator">
          <span>Scroll Down</span>
          <div className="mouse"></div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about animate-on-scroll">
        <div className="section-container">
          <h2>About Me</h2>
          <p className="section-subtitle">
            Researcher | Model | Entrepreneur | Fitness Enthusiast
          </p>
          <div className="about-content">
            <div className="about-text">
              <p>
                I'm an undergraduate studying BSc (Hons) Software Engineering at Plymouth University, UK. 
                With a passion for creating innovative software solutions, I combine strong technical skills with a 
                strategic mindset to deliver impactful results.
              </p>
              <p>
                Currently working on SafeServe-PHI-Manager, I'm looking to collaborate on innovative software projects, 
                tech startups, and solutions in areas like project management, full-stack development, and digital transformation.
              </p>
              <div className="about-focus">
                <div className="focus-item">
                  <div className="focus-icon">
                    <i className="fas fa-lightbulb"></i>
                  </div>
                  <h3>Innovation</h3>
                </div>
                <div className="focus-item">
                  <div className="focus-icon">
                    <i className="fas fa-code-branch"></i>
                  </div>
                  <h3>Technology</h3>
                </div>
                <div className="focus-item">
                  <div className="focus-icon">
                    <i className="fas fa-chart-line"></i>
                  </div>
                  <h3>Strategy</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section with Interactive Elements */}
      <section id="skills" className="skills animate-on-scroll">
        <div className="section-container">
          <h2>My Skills</h2>
          <p className="section-subtitle">Expertise & Technical Proficiency</p>
          
          <div className="skills-tabs">
            <button 
              className={activeSkillCategory === 'languages' ? 'active' : ''} 
              onClick={() => setActiveSkillCategory('languages')}
            >
              <i className="fas fa-code"></i> Languages
            </button>
            <button 
              className={activeSkillCategory === 'frameworks' ? 'active' : ''} 
              onClick={() => setActiveSkillCategory('frameworks')}
            >
              <i className="fas fa-layer-group"></i> Frameworks
            </button>
            <button 
              className={activeSkillCategory === 'tools' ? 'active' : ''} 
              onClick={() => setActiveSkillCategory('tools')}
            >
              <i className="fas fa-tools"></i> Tools
            </button>
          </div>
          
          <div className="skills-content">
            {skills[activeSkillCategory].map((skill, index) => (
              <div key={index} className="skill-bar">
                <div className="skill-info">
                  <i className={skill.icon}></i>
                  <span>{skill.name}</span>
                </div>
                <div className="skill-progress">
                  <div className="skill-progress-bar" style={{width: `${skill.proficiency}%`}}>
                    <span>{skill.proficiency}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="skills-cloud">
            {Object.values(skills).flat().slice(0, 15).map((skill, index) => (
              <div 
                key={index}
                className="skill-tag" 
                style={{
                  '--size': `${0.8 + (skill.proficiency / 100) * 0.7}em`,
                  '--rotation': `${Math.random() * 10 - 5}deg`
                }}
              >
                {skill.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section with Cards */}
      <section id="projects" className="projects animate-on-scroll">
        <div className="section-container">
          <h2>Featured Projects</h2>
          <p className="section-subtitle">Recent Work & Contributions</p>
          
          <div className="projects-grid">
            {projects.map((project, index) => (
              <div key={index} className="project-card">
                <div className="project-image">
                  <div className="project-overlay">
                    <a href={project.github} target="_blank" rel="noreferrer" className="project-link">
                      <i className="fab fa-github"></i>
                    </a>
                  </div>
                </div>
                <div className="project-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-tech">
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="github-stats">
            <h3>GitHub Activity & Contributions</h3>
            <div className="stats-container">
              <div className="stat-item">
                <img src="https://github-readme-streak-stats.herokuapp.com/?user=SeneshFitzroy&theme=radical&hide_border=true" alt="GitHub Streak Stats" />
              </div>
              <div className="stat-item">
                <img src="https://github-profile-summary-cards.vercel.app/api/cards/repos-per-language?username=SeneshFitzroy&theme=radical" alt="Top Languages" />
              </div>
            </div>
            <a href="https://github.com/SeneshFitzroy" target="_blank" rel="noreferrer" className="github-profile-btn">
              <i className="fab fa-github"></i> View GitHub Profile
            </a>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="education animate-on-scroll">
        <div className="section-container">
          <h2>Education</h2>
          <p className="section-subtitle">Academic Background</p>
          
          <div className="timeline">
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
                  <li>Focus on project management and digital transformation</li>
                </ul>
              </div>
            </div>
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
                  <li>Strong foundation in computing concepts</li>
                  <li>Business Management and Mathematics</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="experience animate-on-scroll">
        <div className="section-container">
          <h2>Experience</h2>
          <p className="section-subtitle">Professional Journey</p>
          
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-date">Apr 2024 - Present</div>
              <div className="timeline-header">
                <div className="timeline-title">
                  <h3>Vice President</h3>
                  <p>NSBM Circularity and Sustainability Community</p>
                </div>
              </div>
              <div className="timeline-content">
                <ul>
                  <li>Led sustainability initiatives and campaigns</li>
                  <li>Promoted eco-conscious practices within campus</li>
                  <li>Organized awareness campaigns and workshops</li>
                  <li>Managed projects aligned with environmental goals</li>
                </ul>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-date">Feb 2024 - Present</div>
              <div className="timeline-header">
                <div className="timeline-title">
                  <h3>Media Coordinator</h3>
                  <p>Student Circle of Software Engineering - NSBM</p>
                </div>
              </div>
              <div className="timeline-content">
                <ul>
                  <li>Promoted software engineering events and workshops</li>
                  <li>Created engaging content for technical audiences</li>
                  <li>Managed event publicity across various media channels</li>
                  <li>Enhanced skills in media coordination and content creation</li>
                </ul>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-date">Feb 2024 - Present</div>
              <div className="timeline-header">
                <div className="timeline-title">
                  <h3>Assistant Marketing Director</h3>
                  <p>Students' Wellbeing Association of NSBM</p>
                </div>
              </div>
              <div className="timeline-content">
                <ul>
                  <li>Developed marketing strategies for student wellbeing initiatives</li>
                  <li>Created campaigns raising awareness about mental health</li>
                  <li>Organized wellness workshops and relaxation activities</li>
                  <li>Strengthened skills in marketing communication</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact animate-on-scroll">
        <div className="section-container">
          <h2>Get In Touch</h2>
          <p className="section-subtitle">Let's Connect & Collaborate</p>
          
          <div className="contact-container">
            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-icon">
                  <i className="fas fa-envelope"></i>
                </div>
                <div className="contact-text">
                  <h3>Email</h3>
                  <p><a href="mailto:seneshfitzroy@gmail.com">seneshfitzroy@gmail.com</a></p>
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
              
              <div className="contact-social-container">
                <h3>Professional Networks</h3>
                <div className="contact-social">
                  {socialLinks.professional.map((link, index) => (
                    <a key={index} href={link.url} target="_blank" rel="noreferrer" className="social-link" title={link.name}>
                      <i className={link.icon}></i>
                    </a>
                  ))}
                </div>
              </div>
              
              <div className="contact-social-container">
                <h3>Social Media</h3>
                <div className="contact-social">
                  {socialLinks.social.map((link, index) => (
                    <a key={index} href={link.url} target="_blank" rel="noreferrer" className="social-link" title={link.name}>
                      <i className={link.icon}></i>
                    </a>
                  ))}
                </div>
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
              <button type="submit" className="submit-btn">
                <span>Send Message</span>
                <i className="fas fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">SF</div>
          <p>🔥 Driven by innovation, technology, and strategic execution. 🚀</p>
          <div className="footer-links">
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#education">Education</a>
            <a href="#experience">Experience</a>
            <a href="#contact">Contact</a>
          </div>
          <div className="footer-social">
            {[...socialLinks.professional, ...socialLinks.social].slice(0, 5).map((link, index) => (
              <a key={index} href={link.url} target="_blank" rel="noreferrer" className="footer-social-link" title={link.name}>
                <i className={link.icon}></i>
              </a>
            ))}
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
