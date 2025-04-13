import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';
import Script from 'next/script';
import Certifications from '../components/Certifications';
import Image from 'next/image';

// Updated certificationsData with reorganized categories
const certificationsData = {
  "Professional Memberships": [
    { title: "Certificate of IEEE Membership", issuer: "IEEE", issued: "Mar 2025", link: "https://www.linkedin.com/in/senesh-fitzroy-812151263/" },
    { title: "Certificate of Membership for IEEE Women in Engineering (WIE)", issuer: "IEEE", issued: "Mar 2025", link: "https://www.linkedin.com/in/senesh-fitzroy-812151263/" },
    { title: "Certificate of Membership for the IEEE Circuits and Systems Society (CAS)", issuer: "IEEE", issued: "Mar 2025", link: "https://www.linkedin.com/in/senesh-fitzroy-812151263/" },
  ],
  "Workshops & Development": [
    { title: "FigMate UI/UX Figma Workshop", issuer: "NSBM Green University", issued: "Mar 2025", link: "https://www.linkedin.com/in/senesh-fitzroy-812151263/" },
    { title: "Certificate of Participation in SkillShare: Build Your Professional Portfolio", issuer: "IEEE Student Branch", issued: "Feb 2025", link: "https://www.linkedin.com/in/senesh-fitzroy-812151263/" },
    { title: "Pixels 2 Podium Workshop", issuer: "Hackathon Hub NSBM", issued: "Feb 2025", link: "https://www.linkedin.com/in/senesh-fitzroy-812151263/" },
  ],
  "Digital Marketing & Technology": [
    { title: "Social Media Marketing Certified", issuer: "HubSpot Academy", issued: "Oct 2023", link: "https://www.linkedin.com/in/senesh-fitzroy-812151263/" },
    { title: "Ai Masterclass: ChatGPT Prompt Engineering", issuer: "UniAthena", issued: "Sep 2023", link: "https://www.linkedin.com/in/senesh-fitzroy-812151263/" },
    { title: "Email Marketing Certified", issuer: "HubSpot Academy", issued: "Sep 2023", link: "https://www.linkedin.com/in/senesh-fitzroy-812151263/" },
  ],
  "IT Certifications": [
    { title: "Front End Development - HTML", issuer: "Great Learning" },
    { title: "HTML Certified", issuer: "Eduba" },
    { title: "Introduction to Blockchain", issuer: "BitDegree" },
    { title: "Computer Fundamentals Certified", issuer: "StudySection" },
  ],
  "AI, Machine Learning & Data Science": [
    { title: "AI Masterclass: ChatGPT Prompt Engineering and Applications", issuer: "UniAthena" },
    { title: "Introduction to Artificial Intelligence", issuer: "Great Learning" },
    { title: "Introduction to Machine Learning US", issuer: "Great Learning" },
    { title: "Artificial Intelligence (AI)", issuer: "Great Learning" },
  ],
};

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

  // Projects data - updated to remove image references
  const projects = [
    {
      title: "SafeServe-PHI-Manager",
      description: "A platform designed to modernize Public Health Inspector workflows with AI-enhanced features",
      technologies: ["React", "Node.js", "Firebase", "AI"],
      github: "https://github.com/SeneshFitzroy/SafeServe-PHI-Manager.git",
      category: "full-stack",
      featured: true
    },
    {
      title: "Food-Inspector-App",
      description: "A C#-based application designed to streamline food inspections for Public Health Inspectors",
      technologies: ["C#", ".NET", "SQL"],
      github: "https://github.com/SeneshFitzroy/Food-Inspector-App-CSharp",
      category: "desktop",
      featured: true
    },
    {
      title: "Team-Sync",
      description: "Mobile app for streamlining collaboration and task management for university group projects",
      technologies: ["Flutter", "Dart", "Firebase"],
      github: "https://github.com/SeneshFitzroy/Team-Sync-Project-Management-Application",
      category: "mobile",
      featured: true
    },
    {
      title: "Jewelify E-commerce",
      description: "Elegant online jewelry shopping platform with modern UI and seamless checkout experience",
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
      { name: "LinkedIn", icon: "fab fa-linkedin-in", url: "https://www.linkedin.com/in/senesh-fitzroy-812151263/" },
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
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      document.body.classList.toggle('dark-mode', newMode);
      return newMode;
    });
  };

  useEffect(() => {
    // Apply dark mode class on initial load if darkMode is true
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const experienceData = [
    {
      title: "Vice President",
      organization: "NSBM Circularity and Sustainability Community",
      startDate: "Apr 2024",
      endDate: "Present",
      responsibilities: [
        "Led sustainability initiatives and campaigns",
        "Promoted eco-conscious practices within campus",
        "Organized awareness campaigns and workshops",
        "Managed projects aligned with environmental goals",
      ],
    },
    {
      title: "Media Coordinator",
      organization: "Student Circle of Software Engineering - NSBM",
      startDate: "Feb 2024",
      endDate: "2025", // Updated end date
      responsibilities: [
        "Promoted software engineering events and workshops",
        "Created engaging content for technical audiences",
        "Managed event publicity across various media channels",
        "Enhanced skills in media coordination and content creation",
      ],
    },
    {
      title: "Assistant Marketing Director",
      organization: "Students' Wellbeing Association of NSBM",
      startDate: "Feb 2024",
      endDate: "2025", // Updated end date
      responsibilities: [
        "Developed marketing strategies for student wellbeing initiatives",
        "Created campaigns raising awareness about mental health",
        "Organized wellness workshops and relaxation activities",
        "Strengthened skills in marketing communication",
      ],
    },
  ];

  // Toggle menu function
  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
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
              <a href="https://tinyurl.com/SeneshCV" target="_blank" rel="noreferrer" className="hero-btn secondary-btn">
                View CV <i className="fas fa-external-link-alt"></i>
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
            <Image 
              src="/assets/senesh.jpeg" 
              alt="Senesh Fitzroy" 
              width={300} 
              height={300} 
              priority
              className="profile-image"
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

      {/* Projects Section with Advanced Filtering - removed images */}
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
                <div className="project-accent-border"></div>
                <div className="project-content">
                  <span className="project-category-tag">{project.category}</span>
                  <h3>{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <div className="project-tech">
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                  <div className="project-github-link">
                    <a href={project.github} target="_blank" rel="noreferrer">
                      <span className="github-btn">
                        <i className="fab fa-github"></i> View Project
                      </span>
                    </a>
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

      {/* Education Section - Redesigned without images */}
      <section id="education" className="education animate-on-scroll">
        <div className="section-container">
          <h2>Education</h2>
          <p className="section-subtitle">Academic Background</p>
          
          <div className="education-cards">
            <div className="education-card">
              <div className="education-card-header">
                <div className="education-icon nsbm">
                  <i className="fas fa-university"></i>
                </div>
                <div className="education-details">
                  <h3>NSBM Green University</h3>
                  <div className="education-info">
                    <span className="education-program">Computing Foundation Programme</span>
                    <span className="education-date"><i className="far fa-calendar-alt"></i> Sep 2022 - Sep 2023</span>
                  </div>
                </div>
              </div>
              <div className="education-card-content">
                <div className="education-highlights">
                  <div className="highlight-item">
                    <i className="fas fa-laptop-code"></i>
                    <span>Programming Fundamentals</span>
                  </div>
                  <div className="highlight-item">
                    <i className="fas fa-database"></i>
                    <span>Database Systems</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="education-card">
              <div className="education-card-header">
                <div className="education-icon plymouth">
                  <i className="fas fa-graduation-cap"></i>
                </div>
                <div className="education-details">
                  <h3>University of Plymouth</h3>
                  <div className="education-info">
                    <span className="education-program">BSc (Hons) Software Engineering</span>
                    <span className="education-date"><i className="far fa-calendar-alt"></i> Sep 2023 - Present</span>
                  </div>
                </div>
              </div>
              <div className="education-card-content">
                <div className="education-highlights">
                  <div className="highlight-item">
                    <i className="fas fa-code-branch"></i>
                    <span>Software Development</span>
                  </div>
                  <div className="highlight-item">
                    <i className="fas fa-project-diagram"></i>
                    <span>Project Management</span>
                  </div>
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
              <div className="timeline-date">Feb 2024 - 2025</div>
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
              <div className="timeline-date">Feb 2024 - 2025</div>
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

      {/* Certifications Section - Updated with View More button and 84+ mention */}
      <section id="certifications" className="certifications animate-on-scroll">
        <div className="section-container">
          <h2>Certifications</h2>
          <p className="section-subtitle">Professional Development & Achievements</p>
          
          <div className="certification-counter">
            <div className="counter-badge">84+</div>
            <span>Professional Certifications</span>
          </div>
          
          <div className="certifications-grid">
            {Object.entries(certificationsData).map(([category, items]) => (
              <div key={category} className="cert-category">
                <div className="cert-category-header">
                  <h3>{category}</h3>
                </div>
                <div className="cert-items">
                  {items.map((cert, index) => (
                    <div key={index} className="cert-item">
                      <h4>{cert.title}</h4>
                      <div className="cert-meta">
                        <span className="cert-issuer">{cert.issuer}</span>
                        <span className="cert-issued">{cert.issued}</span>
                      </div>
                      <a href={cert.link} target="_blank" rel="noreferrer" className="cert-view-btn">
                        View Credential <i className="fas fa-external-link-alt"></i>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="view-more-container">
            <a href="https://www.linkedin.com/in/senesh-fitzroy-812151263/" target="_blank" rel="noreferrer" className="view-more-btn">
              <span>View All Certifications on LinkedIn</span>
              <i className="fab fa-linkedin"></i>
            </a>
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

        /* Enhanced Projects Section */
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }

        .project-card {
          position: relative;
          background: var(--card-bg);
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 5px 15px rgba(0,0,0,0.05);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          border: 1px solid rgba(220, 220, 220, 0.2);
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .dark-mode .project-card {
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
          border-color: rgba(50, 50, 50, 0.3);
        }

        .project-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.1);
        }

        .dark-mode .project-card:hover {
          box-shadow: 0 15px 30px rgba(0,0,0,0.3);
        }

        .project-accent-border {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, var(--primary), var(--secondary));
        }

        .project-content {
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .project-card h3 {
          color: var(--text-color);
          font-size: 1.4rem;
          margin-bottom: 1rem;
          font-weight: 600;
          margin-top: 0.5rem;
        }

        .project-description {
          color: var(--text-color-light);
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 1.5rem;
          flex-grow: 1;
        }

        .project-category-tag {
          text-transform: uppercase;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 1px;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          background: var(--primary);
          color: white;
          display: inline-block;
          margin-bottom: 0.5rem;
          align-self: flex-start;
        }

        .project-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .tech-tag {
          font-size: 0.75rem;
          padding: 0.35rem 0.75rem;
          background: var(--light-medium);
          color: var(--text-dark);
          border-radius: 20px;
          font-weight: 500;
        }

        .dark-mode .tech-tag {
          background: var(--dark-medium);
          color: var(--text-light);
        }

        .project-github-link {
          margin-top: auto;
          text-align: center;
        }

        .github-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-weight: 500;
          background: var(--card-bg);
          border: 1.5px solid var(--primary);
          color: var(--primary);
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          transition: all 0.3s ease;
          font-size: 0.9rem;
          width: 100%;
          cursor: pointer;
        }

        .github-btn:hover {
          background: var(--primary);
          color: white;
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(59, 130, 246, 0.3);
        }

        .dark-mode .github-btn {
          box-shadow: 0 5px 15px rgba(59, 130, 246, 0.1);
        }

        .dark-mode .github-btn:hover {
          box-shadow: 0 5px 15px rgba(59, 130, 246, 0.4);
        }

        /* Improved project card typography */
        .project-card h3, .project-description {
          font-family: 'Poppins', sans-serif;
        }

        .project-card h3 {
          letter-spacing: -0.01em;
        }

        @media (max-width: 768px) {
          .projects-grid {
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 1.5rem;
          }
          
          .project-content {
            padding: 1.25rem;
          }
          
          .project-card h3 {
            font-size: 1.25rem;
          }
        }

        /* Enhanced Education Section */
        .education-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }

        .education-card {
          background: var(--card-bg);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 5px 20px rgba(0,0,0,0.08);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border: 1px solid rgba(220, 220, 220, 0.2);
        }

        .dark-mode .education-card {
          box-shadow: 0 5px 20px rgba(0,0,0,0.2);
          border-color: rgba(50, 50, 50, 0.3);
        }

        .education-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 30px rgba(0,0,0,0.15);
        }

        .dark-mode .education-card:hover {
          box-shadow: 0 12px 30px rgba(0,0,0,0.3);
        }

        .education-card-header {
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1.25rem;
          border-bottom: 1px solid rgba(220, 220, 220, 0.2);
        }

        .dark-mode .education-card-header {
          border-bottom-color: rgba(50, 50, 50, 0.3);
        }

        .education-icon {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          color: white;
          flex-shrink: 0;
        }

        .education-icon.nsbm {
          background: linear-gradient(135deg, #076633, #54a054);
          box-shadow: 0 5px 15px rgba(7, 102, 51, 0.3);
        }

        .education-icon.plymouth {
          background: linear-gradient(135deg, #0057b8, #00a0dc);
          box-shadow: 0 5px 15px rgba(0, 87, 184, 0.3);
        }

        .education-details {
          flex: 1;
        }

        .education-details h3 {
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
          color: var(--text-color);
          font-weight: 600;
        }

        .education-info {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .education-program {
          font-weight: 500;
          color: var(--text-color);
          font-size: 0.95rem;
        }

        .education-date {
          font-size: 0.85rem;
          color: var (--text-color-light);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .education-card-content {
          padding: 1.5rem;
        }

        .education-highlights {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .highlight-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .highlight-item i {
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: var(--light-medium);
          color: var(--primary);
          font-size: 0.9rem;
        }

        .dark-mode .highlight-item i {
          background: var(--dark-medium);
          color: var(--secondary);
        }

        @media (max-width: 768px) {
          .education-cards {
            grid-template-columns: 1fr;
          }
          
          .education-card-header {
            padding: 1.25rem;
          }
          
          .education-card-content {
            padding: 1.25rem;
          }
          
          .education-icon {
            width: 50px;
            height: 50px;
            font-size: 1.25rem;
          }
        }

        /* Certifications Section Styling */
        .certifications-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1.5rem;
          margin-top: 2rem;
        }
        
        .certifications-link {
          text-align: center;
          margin-bottom: 2rem;
        }
        
        .certifications-link a {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: var(--primary);
          color: white;
          border-radius: 8px;
          font-weight: 500;
          transition: all 0.3s ease;
          box-shadow: 0 4px 10px rgba(59, 130, 246, 0.2);
        }
        
        .certifications-link a:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 15px rgba(59, 130, 246, 0.3);
        }
        
        .cert-category {
          background: var(--card-bg);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
          border: 1px solid rgba(0, 0, 0, 0.05);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .dark-mode .cert-category {
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        
        .cert-category:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
        }
        
        .dark-mode .cert-category:hover {
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        }
        
        .cert-category-header {
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          padding: 1.25rem;
          color: white;
        }
        
        .cert-category-header h3 {
          margin: 0;
          font-size: 1.3rem;
          font-weight: 600;
        }
        
        .cert-items {
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        
        .cert-item {
          padding-bottom: 1.25rem;
          border-bottom: 1px solid rgba(0, 0, 0, 0.08);
          position: relative;
        }
        
        .dark-mode .cert-item {
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }
        
        .cert-item:last-child {
          padding-bottom: 0;
          border-bottom: none;
        }
        
        .cert-item h4 {
          margin: 0 0 0.5rem 0;
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--text-color);
          line-height: 1.4;
        }
        
        .cert-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }
        
        .cert-issuer {
          color: var(--text-color);
          font-weight: 500;
          font-size: 0.9rem;
        }
        
        .cert-issued {
          color: var(--text-color-light);
          font-size: 0.85rem;
        }
        
        .cert-view-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 0.75rem;
          background: transparent;
          border: 1px solid var(--primary);
          color: var(--primary);
          border-radius: 6px;
          font-size: 0.85rem;
          font-weight: 600;
          transition: all 0.2s ease;
        }
        
        .cert-view-btn:hover {
          background: var(--primary);
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 3px 8px rgba(59, 130, 246, 0.2);
        }
        
        @media (max-width: 768px) {
          .certifications-grid {
            grid-template-columns: 1fr;
          }
        }

        /* Enhanced Certifications Section */
        .certification-counter {
          text-align: center;
          margin-bottom: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
        }
        
        .counter-badge {
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          color: white;
          font-size: 1.8rem;
          font-weight: 700;
          padding: 0.5rem 1.2rem;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
        }
        
        .certification-counter span {
          font-size: 1.2rem;
          color: var(--text-color);
        }
        
        .view-more-container {
          text-align: center;
          margin-top: 3rem;
        }
        
        .view-more-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          background: linear-gradient(135deg, #0077b5, #00a0dc);
          color: white;
          padding: 1rem 2rem;
          border-radius: 8px;
          font-weight: 600;
          font-size: 1.1rem;
          box-shadow: 0 5px 15px rgba(0, 119, 181, 0.25);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .view-more-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(0, 119, 181, 0.3);
        }
        
        .view-more-btn i {
          font-size: 1.3rem;
        }
        
        /* Improved cert-category styling */
        .cert-category {
          background: var(--card-bg);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.06);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border: 1px solid rgba(0, 0, 0, 0.05);
        }
        
        .dark-mode .cert-category {
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
          border-color: rgba(50, 50, 50, 0.3);
        }
        
        /* ...existing styles... */
      `}</style>
    </div>
  );
}
