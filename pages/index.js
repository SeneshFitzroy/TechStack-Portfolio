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
  const [activeTab, setActiveTab] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  // Refs for DOM elements and animations
  const heroTextRef = useRef(null);
  const heroImageRef = useRef(null);
  const cursorRef = useRef(null);
  const cursorFollowerRef = useRef(null);
  const pageRef = useRef(null);

  // Projects data
  const projects = [
    {
      title: "SafeServe-PHI-Manager",
      description: "A platform designed to modernize Public Health Inspector workflows with AI-enhanced features",
      image: "/assets/projects/safeserve.jpg",
      technologies: ["React", "Node.js", "Firebase", "AI"],
      github: "https://github.com/SeneshFitzroy/SafeServe-PHI-Manager.git",
      category: "full-stack",
      featured: true
    },
    {
      title: "Food-Inspector-App",
      description: "A C#-based application designed to streamline food inspections for Public Health Inspectors",
      image: "/assets/projects/food-inspector.jpg",
      technologies: ["C#", ".NET", "SQL"],
      github: "https://github.com/SeneshFitzroy/Food-Inspector-App-CSharp",
      category: "desktop",
      featured: true
    },
    {
      title: "Team-Sync",
      description: "Mobile app for streamlining collaboration and task management for university group projects",
      image: "/assets/projects/team-sync.jpg",
      technologies: ["Flutter", "Dart", "Firebase"],
      github: "https://github.com/SeneshFitzroy/Team-Sync-Project-Management-Application",
      category: "mobile",
      featured: true
    },
    {
      title: "Jewelify E-commerce",
      description: "Elegant online jewelry shopping platform with modern UI and seamless checkout experience",
      image: "/assets/projects/jewelify.jpg",
      technologies: ["HTML", "CSS", "Bootstrap", "PHP", "JavaScript"],
      github: "https://github.com/SeneshFitzroy/Jewelify-Ecommerce",
      category: "web",
      featured: true
    }
  ];

  // Updated comprehensive skills data based on README
  const skills = {
    languages: [
      { name: "JavaScript", icon: "fab fa-js-square", proficiency: 95 },
      { name: "Python", icon: "fab fa-python", proficiency: 90 },
      { name: "Java", icon: "fab fa-java", proficiency: 85 },
      { name: "C#", icon: "fab fa-microsoft", proficiency: 85 },
      { name: "HTML/CSS", icon: "fab fa-html5", proficiency: 90 },
      { name: "PHP", icon: "fab fa-php", proficiency: 80 },
      { name: "C", icon: "fas fa-code", proficiency: 75 },
      { name: "Dart", icon: "fas fa-mobile-alt", proficiency: 75 }
    ],
    frameworks: [
      { name: "React", icon: "fab fa-react", proficiency: 90 },
      { name: "Next.js", icon: "fab fa-react", proficiency: 85 },
      { name: "Node.js", icon: "fab fa-node-js", proficiency: 85 },
      { name: "Express", icon: "fab fa-node-js", proficiency: 80 },
      { name: "Laravel", icon: "fab fa-laravel", proficiency: 75 },
      { name: "Firebase", icon: "fas fa-fire", proficiency: 85 },
      { name: "Flutter", icon: "fas fa-mobile-alt", proficiency: 80 },
      { name: "Bootstrap", icon: "fab fa-bootstrap", proficiency: 85 },
      { name: "Chart.js", icon: "fas fa-chart-bar", proficiency: 75 },
      { name: "React Native", icon: "fab fa-react", proficiency: 75 }
    ],
    tools: [
      { name: "Git", icon: "fab fa-git-alt", proficiency: 90 },
      { name: "GitHub", icon: "fab fa-github", proficiency: 95 },
      { name: "VS Code", icon: "fas fa-code", proficiency: 95 },
      { name: "AWS", icon: "fab fa-aws", proficiency: 75 },
      { name: "Azure", icon: "fab fa-microsoft", proficiency: 70 },
      { name: "MongoDB", icon: "fas fa-database", proficiency: 80 },
      { name: "Figma", icon: "fab fa-figma", proficiency: 80 },
      { name: "Adobe PS/AI", icon: "fab fa-adobe", proficiency: 75 },
      { name: "Linux", icon: "fab fa-linux", proficiency: 70 },
      { name: "Oracle", icon: "fas fa-database", proficiency: 70 },
      { name: "SQLite", icon: "fas fa-database", proficiency: 75 }
    ]
  };

  // Updated social media links with additional connections from README
  const socialLinks = {
    professional: [
      { name: "Twitter", icon: "fab fa-x-twitter", url: "https://x.com/SeneshFitzroy" },
      { name: "LinkedIn", icon: "fab fa-linkedin-in", url: "https://linkedin.com/in/seneshfitzroy" },
      { name: "Stack Exchange", icon: "fab fa-stack-exchange", url: "https://meta.stackexchange.com/users/1710137/senesh-fitzroy" },
      { name: "Dev.to", icon: "fab fa-dev", url: "https://dev.to/seneshfitzroy" },
      { name: "GitHub", icon: "fab fa-github", url: "https://github.com/SeneshFitzroy" },
      { name: "IEEE", icon: "fas fa-university", url: "https://www.ieee.org" },
      { name: "Styava", icon: "fas fa-code", url: "https://styava.dev/profile/profileoverview" },
      { name: "IBM", icon: "fas fa-building", url: "https://www.ibm.com" }
    ],
    social: [
      { name: "Facebook", icon: "fab fa-facebook-f", url: "https://web.facebook.com/dinura.senesh.9" },
      { name: "Instagram", icon: "fab fa-instagram", url: "https://instagram.com/seneshx" },
      { name: "TikTok", icon: "fab fa-tiktok", url: "https://www.tiktok.com/@seneshx" },
      { name: "Threads", icon: "fas fa-at", url: "https://www.threads.net/@seneshx" }
    ]
  };

  // Page loading effect
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  // Handle scroll events - updated for faster animations
  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollY(position);
      setShowBackToTop(position > 500);
      
      // Animate elements with faster transitions
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach(elem => {
        const rect = elem.getBoundingClientRect();
        // Increased threshold to trigger animations earlier when scrolling
        const isVisible = rect.top < window.innerHeight - 50;
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
    if (typeof window !== 'undefined' && window.innerWidth > 1024) {
      const handleMouseMove = (e) => {
        setCursorPosition({ x: e.clientX, y: e.clientY });
        
        setTimeout(() => {
          setCursorFollowerPosition({ x: e.clientX, y: e.clientY });
        }, 100);
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
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

  // Initialize animations - updated for faster transitions
  useEffect(() => {
    // Create starfield effect
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

    // Initialize GSAP animations with faster durations
    if (typeof window !== 'undefined' && window.gsap) {
      const gsap = window.gsap;
      
      if (window.ScrollTrigger) {
        gsap.registerPlugin(window.ScrollTrigger);
      }
      
      // Hero animations - faster
      if (heroTextRef.current && heroImageRef.current) {
        gsap.fromTo(
          heroTextRef.current,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' } // Reduced duration
        );
        
        gsap.fromTo(
          heroImageRef.current,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 1.0, delay: 0.3, ease: 'power3.out' } // Reduced duration and delay
        );
      }
      
      // Timeline animations - faster
      const timelineItems = document.querySelectorAll('.timeline-item');
      if (timelineItems.length && window.ScrollTrigger) {
        timelineItems.forEach(item => {
          gsap.fromTo(
            item,
            { opacity: 0, x: -50 },
            {
              opacity: 1,
              x: 0,
              duration: 0.6, // Reduced duration
              scrollTrigger: {
                trigger: item,
                start: 'top 90%', // Trigger earlier
                toggleActions: 'play none none none', // Play animation immediately
              }
            }
          );
        });
      }

      // Skill bars animation - faster
      const skillBars = document.querySelectorAll('.skill-progress-bar');
      skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        
        gsap.to(bar, {
          width: width,
          duration: 0.8, // Reduced duration
          ease: 'power2.out',
          scrollTrigger: {
            trigger: bar,
            start: 'top 95%', // Trigger earlier
            toggleActions: 'play none none none', // Play animation immediately
          }
        });
      });
    }
    
    // Initialize stars
    createStars();
  }, [activeSkillCategory]);

  // Filter projects
  const filteredProjects = activeTab === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeTab);

  // Toggle functions
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={`${darkMode ? 'dark-mode' : ''} ${isLoading ? 'loading' : ''}`} ref={pageRef}>
      {isLoading && (
        <div className="loading-screen">
          <div className="loader"></div>
          <p>Loading amazing stuff...</p>
        </div>
      )}
      
      <Head>
        <title>Senesh Fitzroy - Strategic Project Manager | Software Developer</title>
        <meta name="description" content="Strategic Project Manager and Software Developer with expertise in full-stack development, project management, and digital transformation." />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" rel="stylesheet" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* External Scripts */}
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js" strategy="afterInteractive" />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js" strategy="afterInteractive" />

      {/* Custom Cursor */}
      <div className="cursor" ref={cursorRef}></div>
      <div className="cursor-follower" ref={cursorFollowerRef}></div>

      {/* Navigation */}
      <nav className={`navbar ${scrollY > 50 ? 'navbar-scrolled' : ''}`}>
        <div className="navbar-container">
          <div className="logo-container">
            <img 
              src="/assets/senesh.jpeg" 
              alt="Senesh Fitzroy Portrait" 
              className="profile-logo"
              onError={(e) => {
                e.target.onerror = null; 
                e.target.src = "/assets/profile-fallback.png";
              }}
            />
            <span className="logo-text">Senesh Fitzroy</span>
          </div>
          
          <button className={`mobile-menu-btn ${isMenuOpen ? 'menu-open' : ''}`} onClick={toggleMenu} aria-label="Toggle menu">
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
          
          <button className="theme-toggle" onClick={toggleDarkMode} aria-label="Toggle dark mode">
            <i className={darkMode ? "fas fa-sun" : "fas fa-moon"}></i>
          </button>
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
              <a href="/assets/SeneshFitzroy-CV.pdf" target="_blank" className="hero-btn secondary-btn" download>
                Download CV <i className="fas fa-download"></i>
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
            <img 
              src="/assets/senesh.jpeg" 
              alt="Senesh Fitzroy" 
              onError={(e) => {
                e.target.onerror = null; 
                e.target.src = "/assets/profile-fallback.png";
              }} 
            />
            <div className="image-decoration"></div>
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
            Researcher | Model | Entrepreneur | Fitness Enthusiast | Announcer
          </p>
          <div className="about-content">
            <div className="about-text">
              <p>
                I'm an undergraduate studying BSc (Hons) Software Engineering at Plymouth University, UK. 
                With a passion for creating innovative software solutions, I combine strong technical skills with a 
                strategic mindset to deliver impactful results.
              </p>
              <p>
                I'm looking to collaborate on innovative software projects, 
                tech startups, and solutions in areas like project management, full-stack development, and digital transformation.
              </p>
              <div className="about-focus">
                <div className="focus-item">
                  <div className="focus-icon">
                    <i className="fas fa-lightbulb"></i>
                  </div>
                  <h3>Innovation</h3>
                  <p>Turning ideas into reality</p>
                </div>
                <div className="focus-item">
                  <div className="focus-icon">
                    <i className="fas fa-code-branch"></i>
                  </div>
                  <h3>Technology</h3>
                  <p>Building the future</p>
                </div>
                <div className="focus-item">
                  <div className="focus-icon">
                    <i className="fas fa-chart-line"></i>
                  </div>
                  <h3>Strategy</h3>
                  <p>Planning for success</p>
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
                  <div 
                    className="skill-progress-bar" 
                    style={{width: `${skill.proficiency}%`}}
                    data-value={skill.proficiency}
                  >
                    <span>{skill.proficiency}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Remove duplicate skills list and keep only the cloud visualization */}
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

      {/* Projects Section with Advanced Filtering */}
      <section id="projects" className="projects animate-on-scroll">
        <div className="section-container">
          <h2>Featured Projects</h2>
          <p className="section-subtitle">Recent Work & Contributions</p>
          
          <div className="project-categories">
            <button 
              className={activeTab === 'all' ? 'active' : ''}
              onClick={() => setActiveTab('all')}
            >
              All Projects
            </button>
            <button 
              className={activeTab === 'full-stack' ? 'active' : ''}
              onClick={() => setActiveTab('full-stack')}
            >
              Full Stack
            </button>
            <button 
              className={activeTab === 'web' ? 'active' : ''}
              onClick={() => setActiveTab('web')}
            >
              Web
            </button>
            <button 
              className={activeTab === 'mobile' ? 'active' : ''}
              onClick={() => setActiveTab('mobile')}
            >
              Mobile
            </button>
            <button 
              className={activeTab === 'desktop' ? 'active' : ''}
              onClick={() => setActiveTab('desktop')}
            >
              Desktop
            </button>
          </div>
          
          <div className="projects-grid">
            {filteredProjects.map((project, index) => (
              <div key={index} className="project-card">
                <div className="project-image">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src = "/assets/project-fallback.jpg";
                    }}
                  />
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
          
          <div className="project-cta">
            <a href="https://github.com/SeneshFitzroy" target="_blank" rel="noreferrer" className="cta-btn">
              <i className="fab fa-github"></i> View More Projects on GitHub
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
                <img 
                  src="/assets/nsbm-logo.png" 
                  alt="NSBM Logo" 
                  className="timeline-logo" 
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = "https://www.nsbm.ac.lk/wp-content/uploads/2019/09/NSBM-Logo.png";
                  }} 
                />
                <div className="timeline-title">
                  <h3>NSBM Green University</h3>
                  <p>Computing Foundation Programme (Sep 2022 - Sep 2023)</p>
                </div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-header">
                <img 
                  src="/assets/plymouth-logo.png" 
                  alt="Plymouth Logo" 
                  className="timeline-logo" 
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = "https://www.plymouth.ac.uk/themes/custom/plym_bootstrap/logo.svg";
                  }} 
                />
                <div className="timeline-title">
                  <h3>University of Plymouth</h3>
                  <p>BSc (Hons) Software Engineering (Sep 2023 - Present)</p>
                </div>
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
            
            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
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

      {/* Add additional CSS for new features */}
      <style jsx global>{`
        /* Loading Screen */
        .loading-screen {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #1e293b, #0f172a);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          z-index: 9999;
        }

        .loader {
          width: 48px;
          height: 48px;
          border: 5px solid #fff;
          border-bottom-color: var(--primary);
          border-radius: 50%;
          display: inline-block;
          box-sizing: border-box;
          animation: rotation 1s linear infinite;
          margin-bottom: 20px;
        }

        .loading-screen p {
          color: white;
          font-size: 1.2rem;
          letter-spacing: 2px;
        }

        @keyframes rotation {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Project Categories */
        .project-categories {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .project-categories button {
          padding: 0.5rem 1.5rem;
          background: var(--light-medium);
          border: none;
          border-radius: 30px;
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--text-dark);
          transition: var(--transition);
        }

        .dark-mode .project-categories button {
          background: var(--dark-medium);
          color: var(--text-light);
        }

        .project-categories button:hover {
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.05);
        }

        .dark-mode .project-categories button:hover {
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }

        .project-categories button.active {
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          color: white;
          box-shadow: 0 5px 15px rgba(59, 130, 246, 0.2);
        }

        /* Enhanced hero image decoration */
        .image-decoration {
          position: absolute;
          top: -10px;
          right: -10px;
          bottom: -10px;
          left: -10px;
          border: 2px dashed rgba(59, 130, 246, 0.3);
          border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
          z-index: -1;
          animation: rotate 20s linear infinite;
        }

        @keyframes rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* CTA button */
        .project-cta {
          text-align: center;
          margin-top: 3rem;
        }

        .cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 2rem;
          background: linear-gradient(135deg, #2ea043, #56d364);
          color: white;
          border-radius: 8px;
          font-weight: 500;
          transition: var(--transition);
          box-shadow: 0 5px 15px rgba(46, 160, 67, 0.2);
        }

        .cta-btn:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(46, 160, 67, 0.3);
        }

        /* Theme toggle improvement */
        .theme-toggle {
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        /* Better focus items */
        .focus-item p {
          font-size: 0.9rem;
          margin-top: 0.5rem;
          color: var(--gray);
        }

        /* GitHub Stats Section */
        .github-stats-container {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          margin-top: 2rem;
        }

        .github-stat-card {
          background: var(--card-bg);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .dark-mode .github-stat-card {
          box-shadow: 0 10px 25px rgba(0,0,0,0.3);
        }

        .github-stat-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(0,0,0,0.2);
        }

        .github-stat-img {
          width: 100%;
          height: auto;
          display: block;
        }

        .github-stats-row {
          display: flex;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .half-width {
          flex: 1 1 calc(50% - 1rem);
          min-width: 300px;
        }

        .github-cta {
          text-align: center;
          margin-top: 3rem;
        }

        @media (max-width: 768px) {
          .github-stats-row {
            flex-direction: column;
          }
          
          .half-width {
            flex: 1 1 100%;
          }
        }

        /* Fix image issues */
        .timeline-logo {
          max-width: 80px;
          height: 40px;
          object-fit: contain;
          background-color: white;
          padding: 5px;
          border-radius: 4px;
        }

        .hero-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
        }

        /* Enhanced animation speeds */
        .animate-on-scroll {
          transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94); /* Faster transition */
        }

        .animate-on-scroll.animated {
          transform: translateY(0);
          opacity: 1;
        }

        .animate-on-scroll:not(.animated) {
          transform: translateY(30px); /* Reduced distance */
          opacity: 0;
        }

        /* Education and Experience sections - enhanced for faster animations */
        .timeline-item {
          transition: transform 0.5s ease, opacity 0.5s ease; /* Faster transition */
        }

        @keyframes slideInFromLeft {
          0% {
            transform: translateX(-30px); /* Reduced distance */
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .timeline-item.animated {
          animation: slideInFromLeft 0.6s ease forwards; /* Faster animation */
        }

        /* Skill bars animation - faster */
        .skill-progress-bar {
          transition: width 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94); /* Faster transition */
        }
      `}</style>
    </div>
  );
}
