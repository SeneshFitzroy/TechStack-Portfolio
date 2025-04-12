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
  const [activeTab, setActiveTab] = useState('all');

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

  // Projects data
  const projects = [
    {
      title: "SafeServe-PHI-Manager",
      description: "A web-based platform designed to modernize and optimize Public Health Inspector workflows",
      technologies: ["React", "Node.js", "Firebase", "AI"],
      category: "web",
      image: "/assets/projects/safeserve.jpg", 
      github: "https://github.com/SeneshFitzroy/SafeServe-PHI-Manager.git"
    },
    {
      title: "Food-Inspector-App",
      description: "C#-based application designed to streamline food inspections",
      technologies: ["C#", ".NET", "SQL"],
      category: "desktop",
      image: "/assets/projects/food-inspector.jpg",
      github: "https://github.com/SeneshFitzroy/Food-Inspector-App-CSharp"
    },
    {
      title: "Team-Sync",
      description: "Mobile app for streamlining collaboration and task management for university group projects",
      technologies: ["Flutter", "Dart", "Firebase"],
      category: "mobile",
      image: "/assets/projects/team-sync.jpg",
      github: "https://github.com/SeneshFitzroy/Team-Sync-Project-Management-Application"
    },
    {
      title: "Jewelify E-commerce",
      description: "Elegant online jewelry shopping platform",
      technologies: ["HTML", "CSS", "Bootstrap", "PHP", "JavaScript"],
      category: "web",
      image: "/assets/projects/jewelify.jpg",
      github: "https://github.com/SeneshFitzroy/Jewelify-Ecommerce"
    },
    {
      title: "Arduino Projects",
      description: "Various Arduino-based projects for microcontroller programming and sensor interfacing",
      technologies: ["Arduino", "C++", "IoT"],
      category: "other",
      image: "/assets/projects/arduino.jpg",
      github: "https://github.com/SeneshFitzroy/Arduino-Projects"
    }
  ];

  // Skills data
  const skills = {
    languages: [
      { name: 'JavaScript', icon: 'fab fa-js' },
      { name: 'TypeScript', icon: 'fab fa-js' },
      { name: 'Python', icon: 'fab fa-python' },
      { name: 'Java', icon: 'fab fa-java' },
      { name: 'C#', icon: 'fab fa-microsoft' },
      { name: 'Dart', icon: 'fas fa-code' },
      { name: 'PHP', icon: 'fab fa-php' },
      { name: 'HTML5', icon: 'fab fa-html5' },
      { name: 'CSS3', icon: 'fab fa-css3-alt' },
      { name: 'C', icon: 'fas fa-code' }
    ],
    frameworks: [
      { name: 'React', icon: 'fab fa-react' },
      { name: 'Node.js', icon: 'fab fa-node-js' },
      { name: 'Express', icon: 'fab fa-node-js' },
      { name: 'Flutter', icon: 'fas fa-mobile-alt' },
      { name: 'Bootstrap', icon: 'fab fa-bootstrap' },
      { name: 'Laravel', icon: 'fab fa-laravel' },
      { name: 'React Native', icon: 'fab fa-react' }
    ],
    tools: [
      { name: 'Git', icon: 'fab fa-git-alt' },
      { name: 'GitHub', icon: 'fab fa-github' },
      { name: 'AWS', icon: 'fab fa-aws' },
      { name: 'Azure', icon: 'fab fa-microsoft' },
      { name: 'Firebase', icon: 'fas fa-fire' },
      { name: 'MongoDB', icon: 'fas fa-database' },
      { name: 'MySQL', icon: 'fas fa-database' },
      { name: 'Oracle', icon: 'fas fa-database' },
      { name: 'SQLite', icon: 'fas fa-database' },
      { name: 'Figma', icon: 'fab fa-figma' },
      { name: 'Adobe XD', icon: 'fab fa-adobe' },
      { name: 'Photoshop', icon: 'fab fa-adobe' },
      { name: 'Illustrator', icon: 'fab fa-adobe' },
      { name: 'Arduino', icon: 'fas fa-microchip' },
      { name: 'Linux', icon: 'fab fa-linux' }
    ]
  };

  // Social connections data
  const socialConnections = {
    professional: [
      { name: 'Twitter', url: 'https://x.com/SeneshFitzroy', icon: 'fab fa-twitter' },
      { name: 'LinkedIn', url: 'https://linkedin.com/in/seneshfitzroy', icon: 'fab fa-linkedin-in' },
      { name: 'Stack Exchange', url: 'https://meta.stackexchange.com/users/1710137/senesh-fitzroy', icon: 'fab fa-stack-exchange' },
      { name: 'Dev.to', url: 'https://dev.to/seneshfitzroy', icon: 'fab fa-dev' },
      { name: 'IEEE', url: 'https://www.ieee.org', icon: 'fas fa-university' },
      { name: 'Styava', url: 'https://styava.dev/profile/profileoverview', icon: 'fas fa-code' },
      { name: 'IBM', url: 'https://www.ibm.com', icon: 'fas fa-briefcase' }
    ],
    social: [
      { name: 'Facebook', url: 'https://web.facebook.com/dinura.senesh.9', icon: 'fab fa-facebook-f' },
      { name: 'Instagram', url: 'https://instagram.com/seneshx', icon: 'fab fa-instagram' },
      { name: 'TikTok', url: 'https://www.tiktok.com/@seneshx', icon: 'fab fa-tiktok' },
      { name: 'Threads', url: 'https://www.threads.net/@seneshx', icon: 'fab fa-instagram' }
    ]
  };

  // Filter projects
  const filteredProjects = activeTab === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeTab);

  return (
    <div className={darkMode ? 'dark-mode' : ''}>
      <Head>
        <title>Senesh Fitzroy - Strategic Project Manager & Software Developer</title>
        <meta name="description" content="Portfolio of Senesh Fitzroy, a software developer and strategic project manager with expertise in full-stack development, project management, and digital transformation." />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* External Scripts */}
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js" />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js" />
      <Script src="https://cdn.jsdelivr.net/npm/vanilla-tilt@1.7.0/dist/vanilla-tilt.min.js" />
      <Script id="init-tilt" strategy="afterInteractive">
        {`
          if (typeof VanillaTilt !== 'undefined') {
            VanillaTilt.init(document.querySelectorAll(".tilt-element"), {
              max: 15,
              speed: 400,
              glare: true,
              "max-glare": 0.2,
            });
          }
        `}
      </Script>

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
            <li><a href="#experience" onClick={() => setIsMenuOpen(false)}>Experience</a></li>
            <li><a href="#education" onClick={() => setIsMenuOpen(false)}>Education</a></li>
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
            <div className="badge">Available for new opportunities</div>
            <h1 data-text="Senesh Fitzroy">Senesh Fitzroy</h1>
            <h2>Strategic Project Manager & Software Developer</h2>
            <div className="typing-wrapper">
              <p className="typing-text">Driving innovation through technology and strategic execution.</p>
            </div>
            <div className="hero-buttons">
              <a href="#contact" className="hero-btn primary-btn">
                Contact Me <i className="fas fa-arrow-right"></i>
              </a>
              <a href="#projects" className="hero-btn secondary-btn">
                View Projects <i className="fas fa-code"></i>
              </a>
            </div>
            <div className="hero-socials">
              <a href="https://github.com/SeneshFitzroy" target="_blank" rel="noreferrer" className="social-icon">
                <i className="fab fa-github"></i>
              </a>
              <a href="https://linkedin.com/in/seneshfitzroy" target="_blank" rel="noreferrer" className="social-icon">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="mailto:seneshfitzroy@gmail.com" className="social-icon">
                <i className="fas fa-envelope"></i>
              </a>
            </div>
          </div>
          <div className="hero-image" ref={heroImageRef}>
            <div className="image-wrapper tilt-element">
              <img src="/assets/senesh.jpeg" alt="Senesh Fitzroy" />
            </div>
          </div>
        </div>
        <div className="scroll-indicator">
          <span>Scroll Down</span>
          <div className="mouse">
            <div className="wheel"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about animate-on-scroll">
        <h2>About Me</h2>
        <div className="section-decoration">
          <div className="decoration-line"></div>
          <div className="decoration-icon"><i className="fas fa-user"></i></div>
          <div className="decoration-line"></div>
        </div>
        <div className="about-content">
          <div className="about-image tilt-element">
            <img src="/assets/senesh-about.jpg" alt="Senesh Fitzroy" />
          </div>
          <div className="about-text">
            <p className="intro-text">Hello! I'm <span className="highlight">Senesh Fitzroy</span>, a software developer and strategic project manager based in Sri Lanka.</p>
            
            <p>I'm currently pursuing a BSc (Hons) in Software Engineering at Plymouth University, UK, where I combine strong technical skills with a strategic mindset. Beyond coding, I'm also a researcher, model, entrepreneur, and fitness enthusiast deeply involved in sustainability initiatives and community projects.</p>
            
            <p>I'm currently working on <a href="https://github.com/SeneshFitzroy/SafeServe-PHI-Manager.git" target="_blank" rel="noreferrer" className="text-link">SafeServe-PHI-Manager</a>, and I'm always looking for opportunities to collaborate on innovative software projects, tech startups, and solutions in areas like project management, full-stack development, and digital transformation.</p>
            
            <div className="about-details">
              <div className="detail-item">
                <span className="detail-title"><i className="fas fa-envelope"></i> Email:</span>
                <span className="detail-info">seneshfitzroy@gmail.com</span>
              </div>
              <div className="detail-item">
                <span className="detail-title"><i className="fas fa-map-marker-alt"></i> Location:</span>
                <span className="detail-info">Sri Lanka</span>
              </div>
              <div className="detail-item">
                <span className="detail-title"><i className="fas fa-graduation-cap"></i> Education:</span>
                <span className="detail-info">BSc (Hons) Software Engineering, Plymouth University, UK</span>
              </div>
              <div className="detail-item">
                <span className="detail-title"><i className="fas fa-file-alt"></i> Resume:</span>
                <a href="/assets/CV.pdf" download className="cv-button">Download CV</a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="about-cards">
          <div className="about-card animate-on-scroll tilt-element">
            <div className="about-card-icon">
              <i className="fas fa-code"></i>
            </div>
            <h3>Software Development</h3>
            <p>Proficient in multiple programming languages and frameworks, creating elegant solutions to complex problems.</p>
          </div>
          <div className="about-card animate-on-scroll tilt-element">
            <div className="about-card-icon">
              <i className="fas fa-tasks"></i>
            </div>
            <h3>Project Management</h3>
            <p>Experienced in leading cross-functional teams and delivering projects on time and within budget.</p>
          </div>
          <div className="about-card animate-on-scroll tilt-element">
            <div className="about-card-icon">
              <i className="fas fa-lightbulb"></i>
            </div>
            <h3>Research & Innovation</h3>
            <p>Committed to staying at the forefront of technology and driving digital transformation through research.</p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills animate-on-scroll">
        <h2>My Skills</h2>
        <div className="section-decoration">
          <div className="decoration-line"></div>
          <div className="decoration-icon"><i className="fas fa-laptop-code"></i></div>
          <div className="decoration-line"></div>
        </div>
        
        <div className="skills-categories">
          <div className="skill-category">
            <div className="skill-header">
              <i className="fas fa-code"></i>
              <h3>Programming Languages</h3>
            </div>
            <div className="skill-tags">
              {skills.languages.map((skill, index) => (
                <div key={`lang-${index}`} className="skill-tag animate-on-scroll" style={{animationDelay: `${index * 100}ms`}}>
                  <i className={skill.icon}></i> {skill.name}
                </div>
              ))}
            </div>
          </div>
          
          <div className="skill-category">
            <div className="skill-header">
              <i className="fas fa-layer-group"></i>
              <h3>Frameworks & Libraries</h3>
            </div>
            <div className="skill-tags">
              {skills.frameworks.map((skill, index) => (
                <div key={`frame-${index}`} className="skill-tag animate-on-scroll" style={{animationDelay: `${index * 100}ms`}}>
                  <i className={skill.icon}></i> {skill.name}
                </div>
              ))}
            </div>
          </div>
          
          <div className="skill-category">
            <div className="skill-header">
              <i className="fas fa-tools"></i>
              <h3>Tools & Technologies</h3>
            </div>
            <div className="skill-tags">
              {skills.tools.map((skill, index) => (
                <div key={`tool-${index}`} className="skill-tag animate-on-scroll" style={{animationDelay: `${index * 100}ms`}}>
                  <i className={skill.icon}></i> {skill.name}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="github-stats">
          <h3>GitHub Stats</h3>
          <div className="stats-grid">
            <div className="stats-card tilt-element">
              <h4>Activity</h4>
              <img src="https://github-readme-streak-stats.herokuapp.com/?user=SeneshFitzroy&theme=radical&hide_border=true" alt="GitHub Stats" />
            </div>
            <div className="stats-card tilt-element">
              <h4>Languages</h4>
              <img src="https://github-profile-summary-cards.vercel.app/api/cards/repos-per-language?username=SeneshFitzroy&theme=radical" alt="Skills" />
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects animate-on-scroll">
        <h2>My Projects</h2>
        <div className="section-decoration">
          <div className="decoration-line"></div>
          <div className="decoration-icon"><i className="fas fa-folder-open"></i></div>
          <div className="decoration-line"></div>
        </div>
        
        <div className="project-filters">
          <button 
            className={`filter-btn ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All
          </button>
          <button 
            className={`filter-btn ${activeTab === 'web' ? 'active' : ''}`}
            onClick={() => setActiveTab('web')}
          >
            Web
          </button>
          <button 
            className={`filter-btn ${activeTab === 'mobile' ? 'active' : ''}`}
            onClick={() => setActiveTab('mobile')}
          >
            Mobile
          </button>
          <button 
            className={`filter-btn ${activeTab === 'desktop' ? 'active' : ''}`}
            onClick={() => setActiveTab('desktop')}
          >
            Desktop
          </button>
          <button 
            className={`filter-btn ${activeTab === 'other' ? 'active' : ''}`}
            onClick={() => setActiveTab('other')}
          >
            Other
          </button>
        </div>
        
        <div className="projects-grid">
          {filteredProjects.map((project, index) => (
            <div key={`project-${index}`} className="project-card tilt-element animate-on-scroll" style={{animationDelay: `${index * 100}ms`}}>
              <div className="project-image">
                <img src={project.image} alt={project.title} />
                <div className="project-overlay">
                  <div className="project-links">
                    <a href={project.github} target="_blank" rel="noreferrer" className="project-link">
                      <i className="fab fa-github"></i>
                    </a>
                    {project.demo && (
                      <a href={project.demo} target="_blank" rel="noreferrer" className="project-link">
                        <i className="fas fa-external-link-alt"></i>
                      </a>
                    )}
                  </div>
                </div>
              </div>
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tech">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={`tech-${index}-${techIndex}`} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="view-more">
          <a href="https://github.com/SeneshFitzroy" className="btn secondary-btn" target="_blank" rel="noreferrer">
            View More on GitHub <i className="fas fa-arrow-right"></i>
          </a>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="experience animate-on-scroll">
        <h2>Experience</h2>
        <div className="section-decoration">
          <div className="decoration-line"></div>
          <div className="decoration-icon"><i className="fas fa-briefcase"></i></div>
          <div className="decoration-line"></div>
        </div>
        
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
                <li>Led sustainability initiatives and campaigns focused on waste reduction and eco-conscious practices</li>
                <li>Coordinated community engagement projects to promote environmental awareness</li>
                <li>Organized awareness campaigns and collaborated with teams to drive sustainability efforts</li>
              </ul>
              <div className="timeline-skills">
                <span className="tag">Sustainability</span>
                <span className="tag">Team Leadership</span>
                <span className="tag">Environmental Sustainability</span>
              </div>
            </div>
          </div>
          
          <div className="timeline-item">
            <div className="timeline-header">
              <div className="timeline-title">
                <h3>Media Coordinator</h3>
                <p>Student Circle of Software Engineering - NSBM (Feb 2024 - Present)</p>
              </div>
            </div>
            <div className="timeline-content">
              <ul>
                <li>Promoted software engineering events and workshops through various media channels</li>
                <li>Created engaging content to showcase the value of software engineering practices</li>
                <li>Managed event publicity for technical workshops covering coding, software development, and emerging technologies</li>
              </ul>
              <div className="timeline-skills">
                <span className="tag">Software Development</span>
                <span className="tag">Digital Marketing</span>
                <span className="tag">Team Leadership</span>
                <span className="tag">Social Media Management</span>
              </div>
            </div>
          </div>
          
          <div className="timeline-item">
            <div className="timeline-header">
              <div className="timeline-title">
                <h3>Assistant Marketing Director</h3>
                <p>Students' Wellbeing Association of NSBM (Feb 2024 - Present)</p>
              </div>
            </div>
            <div className="timeline-content">
              <ul>
                <li>Developed and executed marketing strategies for student well-being and mental health initiatives</li>
                <li>Designed campaigns to raise awareness about mental health and stress management</li>
                <li>Organized and promoted wellness workshops and mental health talks</li>
              </ul>
              <div className="timeline-skills">
                <span className="tag">Marketing</span>
                <span className="tag">Digital Marketing</span>
                <span className="tag">Marketing Strategy</span>
              </div>
            </div>
          </div>
          
          <div className="timeline-item">
            <div className="timeline-header">
              <div className="timeline-title">
                <h3>Member</h3>
                <p>Hackathon Hub NSBM (Sep 2024 - Present)</p>
              </div>
            </div>
            <div className="timeline-content">
              <ul>
                <li>Participated in workshops covering coding, problem-solving, and tech trends</li>
                <li>Served as Publicity Lead and Main Announcer for events like AlgoXplore 1.0</li>
                <li>Contributed to organizing hackathon events and tech competitions</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="education animate-on-scroll">
        <h2>Education</h2>
        <div className="section-decoration">
          <div className="decoration-line"></div>
          <div className="decoration-icon"><i className="fas fa-graduation-cap"></i></div>
          <div className="decoration-line"></div>
        </div>
        
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
                <li>Specializing in software development, systems design and project management</li>
                <li>Research focus on innovative tech solutions</li>
                <li>Advanced studies in software architecture and application development</li>
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
                <li>Completed essential courses including Computer Applications, Programming Fundamentals, and Web Design and Development</li>
                <li>Studied Programming in Python, Network Fundamentals, and ICT Project Management</li>
                <li>Developed a strong base in computing concepts and professional skills</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Connections Section */}
      <section id="connections" className="connections animate-on-scroll">
        <h2>Connect With Me</h2>
        <div className="section-decoration">
          <div className="decoration-line"></div>
          <div className="decoration-icon"><i className="fas fa-network-wired"></i></div>
          <div className="decoration-line"></div>
        </div>
        
        <div className="connections-container">
          <div className="connection-group">
            <h3><i className="fas fa-briefcase"></i> Professional Connections</h3>
            <div className="connection-links">
              {socialConnections.professional.map((connection, index) => (
                <a 
                  key={`prof-${index}`} 
                  href={connection.url} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="connection-item tilt-element"
                  title={connection.name}
                >
                  <i className={connection.icon}></i>
                  <span>{connection.name}</span>
                </a>
              ))}
            </div>
          </div>
          
          <div className="connection-group">
            <h3><i className="fas fa-users"></i> Social Connections</h3>
            <div className="connection-links">
              {socialConnections.social.map((connection, index) => (
                <a 
                  key={`social-${index}`} 
                  href={connection.url} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="connection-item tilt-element"
                  title={connection.name}
                >
                  <i className={connection.icon}></i>
                  <span>{connection.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact animate-on-scroll">
        <h2>Get In Touch</h2>
        <div className="section-decoration">
          <div className="decoration-line"></div>
          <div className="decoration-icon"><i className="fas fa-paper-plane"></i></div>
          <div className="decoration-line"></div>
        </div>
        
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
            <div className="contact-item">
              <div className="contact-icon">
                <i className="fas fa-file-alt"></i>
              </div>
              <div className="contact-text">
                <h3>Resume</h3>
                <p><a href="/assets/CV.pdf" download className="resume-link">Download CV</a></p>
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
              <input type="text" className="form-control" id="subject" placeholder=" " required />
              <label htmlFor="subject" className="form-label">Subject</label>
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
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <span>SF</span>
          </div>
          <p className="footer-tagline">🔥 Driven by innovation, technology, and strategic execution. 🚀</p>
          <div className="footer-links">
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#experience">Experience</a>
            <a href="#education">Education</a>
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
            <a href="https://instagram.com/seneshx" target="_blank" rel="noreferrer" className="footer-social-link">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} Senesh Fitzroy. All Rights Reserved.</p>
          </div>
        </div>
        
        <div className="footer-shapes">
          <div className="footer-shape shape-1"></div>
          <div className="footer-shape shape-2"></div>
          <div className="footer-shape shape-3"></div>
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
