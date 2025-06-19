import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';
import Script from 'next/script';
import dynamic from 'next/dynamic';
import Certifications from '../components/Certifications';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Dynamic imports for 3D components (to avoid SSR issues)
const Scene3D = dynamic(() => import('../components/Scene3D'), { ssr: false });
const LoadingScreen = dynamic(() => import('../components/LoadingScreen'), { ssr: false });
const Interactive3D = dynamic(() => import('../components/Interactive3D'), { ssr: false });

// Import advanced components
import {
  MagneticButton,
  ScrollReveal,
  ParallaxText,
  StaggerContainer,
  StaggerItem,
  MorphingShape,
  FloatingElement,
  GlitchText,
  AnimatedProgressBar,
  TypewriterText
} from '../components/AdvancedAnimations';

import {
  AdvancedCursor,
  ParticleBackground,
  ScrollProgress,
  FloatingActionButton,
  RevealOnScroll,
  TiltCard
} from '../components/AdvancedInteractions';

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
  const [activeSkillCategory, setActiveSkillCategory] = useState('languages');
  const [activeTab, setActiveTab] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  // Refs for DOM elements
  const heroTextRef = useRef(null);
  const heroImageRef = useRef(null);
  const pageRef = useRef(null);

  // Projects data
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

  // Skills data
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

  // Social media links
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

  // Utility functions
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const filteredProjects = activeTab === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeTab);

  // Effects
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollY(position);
      setShowBackToTop(position > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`portfolio-container ${darkMode ? 'dark-mode' : ''}`} ref={pageRef}>
      
      {/* Advanced Loading Screen */}
      <LoadingScreen 
        isLoading={isLoading} 
        onLoadingComplete={() => setIsLoading(false)} 
      />
      
      {/* Advanced Cursor */}
      <AdvancedCursor />
      
      {/* Scroll Progress */}
      <ScrollProgress />
      
      {/* Particle Background */}
      <ParticleBackground darkMode={darkMode} />
      
      {/* 3D Background Scene */}
      <Scene3D darkMode={darkMode} />
      
      <Head>
        <title>Senesh Fitzroy - Strategic Project Manager | Software Developer</title>
        <meta name="description" content="Strategic Project Manager and Software Developer with expertise in full-stack development, project management, and digital transformation." />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" rel="stylesheet" />
        <link href="/styles/advanced-3d.css" rel="stylesheet" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Navigation */}
      <motion.nav 
        className={`navbar glass-card ${scrollY > 50 ? 'navbar-scrolled' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="navbar-container">
          <motion.div 
            className="logo-container"
            whileHover={{ scale: 1.05 }}
          >
            <MagneticButton className="logo cursor-pointer">
              <GlitchText className="logo-text neon-text">SF</GlitchText>
            </MagneticButton>
          </motion.div>
          
          <div className={`navbar-menu ${isMenuOpen ? 'navbar-menu-open' : ''}`}>
            <MagneticButton className="navbar-link" onClick={() => scrollToSection('home')}>
              Home
            </MagneticButton>
            <MagneticButton className="navbar-link" onClick={() => scrollToSection('about')}>
              About
            </MagneticButton>
            <MagneticButton className="navbar-link" onClick={() => scrollToSection('skills')}>
              Skills
            </MagneticButton>
            <MagneticButton className="navbar-link" onClick={() => scrollToSection('projects')}>
              Projects
            </MagneticButton>
            <MagneticButton className="navbar-link" onClick={() => scrollToSection('certifications')}>
              Certifications
            </MagneticButton>
            <MagneticButton className="navbar-link" onClick={() => scrollToSection('contact')}>
              Contact
            </MagneticButton>
          </div>

          <div className="navbar-controls">
            <MagneticButton
              className="theme-toggle btn-3d"
              onClick={toggleDarkMode}
              aria-label="Toggle theme"
            >
              <motion.i 
                className={darkMode ? "fas fa-sun" : "fas fa-moon"}
                animate={{ rotate: darkMode ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </MagneticButton>
            
            <MagneticButton
              className="menu-toggle magnetic"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </MagneticButton>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section with Advanced 3D */}
      <section id="home" className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <ScrollReveal direction="left">
              <div className="hero-text" ref={heroTextRef}>
                <ParallaxText speed={0.3}>
                  <motion.h1 
                    className="hero-title"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                  >
                    <TypewriterText text="Hi, I'm " delay={0.5} />
                    <span className="neon-text holographic">Senesh Fitzroy</span>
                  </motion.h1>
                </ParallaxText>
                
                <ParallaxText speed={0.5}>
                  <motion.h2 
                    className="hero-subtitle"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1.5 }}
                  >
                    <TypewriterText text="Strategic Project Manager & Software Developer" delay={2} />
                  </motion.h2>
                </ParallaxText>
                
                <ParallaxText speed={0.7}>
                  <motion.p 
                    className="hero-description"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 2.5 }}
                  >
                    <TypewriterText 
                      text="Transforming ideas into innovative digital solutions with cutting-edge technology and strategic project management expertise." 
                      delay={4}
                    />
                  </motion.p>
                </ParallaxText>

                <StaggerContainer>
                  <motion.div 
                    className="hero-buttons"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 3 }}
                  >
                    <StaggerItem>
                      <MagneticButton className="btn btn-primary btn-3d glow-effect" onClick={() => scrollToSection('projects')}>
                        <FloatingElement intensity={0.5}>
                          <span>View My Work</span>
                          <i className="fas fa-rocket"></i>
                        </FloatingElement>
                      </MagneticButton>
                    </StaggerItem>
                    
                    <StaggerItem delay={0.2}>
                      <MagneticButton className="btn btn-secondary btn-3d glow-effect" onClick={() => scrollToSection('contact')}>
                        <FloatingElement intensity={0.3}>
                          <span>Get In Touch</span>
                          <i className="fas fa-paper-plane"></i>
                        </FloatingElement>
                      </MagneticButton>
                    </StaggerItem>
                  </motion.div>
                </StaggerContainer>

                <StaggerContainer>
                  <motion.div 
                    className="hero-social"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 3.5 }}
                  >
                    {socialLinks.professional.slice(0, 4).map((social, index) => (
                      <StaggerItem key={index} delay={index * 0.1}>
                        <MagneticButton
                          className="social-link glass-card glow-effect"
                          onClick={() => window.open(social.url, '_blank')}
                        >
                          <FloatingElement intensity={0.2}>
                            <i className={social.icon}></i>
                          </FloatingElement>
                        </MagneticButton>
                      </StaggerItem>
                    ))}
                  </motion.div>
                </StaggerContainer>
              </div>
            </ScrollReveal>
          </div>

          <div className="hero-visual">
            <ScrollReveal direction="right">
              <TiltCard className="hero-image-container card-3d transform-3d">
                <div className="hero-3d-container">
                  <MorphingShape className="morph-bg morph-shape" />
                  <FloatingElement intensity={1}>
                    <motion.div 
                      className="hero-image-wrapper glow-effect"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 1.5, delay: 1, type: "spring", stiffness: 100 }}
                    >
                      <Image
                        src="/assets/senesh.webp"
                        alt="Senesh Fitzroy"
                        width={400}
                        height={400}
                        className="hero-image"
                        priority
                      />
                    </motion.div>
                  </FloatingElement>
                </div>
              </TiltCard>
            </ScrollReveal>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 4 }}
        >
          <MagneticButton onClick={() => scrollToSection('about')}>
            <div className="scroll-arrow float-animation">
              <i className="fas fa-chevron-down"></i>
            </div>
          </MagneticButton>
        </motion.div>
      </section>

      {/* About Section with 3D Effects */}
      <section id="about" className="about-section">
        <div className="section-container">
          <RevealOnScroll>
            <motion.h2 
              className="section-title neon-text"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              About Me
            </motion.h2>
            <motion.p 
              className="section-subtitle holographic"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Researcher | Model | Entrepreneur | Fitness Enthusiast | Announcer
            </motion.p>
          </RevealOnScroll>

          <div className="about-content">
            <StaggerContainer>
              <motion.div 
                className="about-text glass-card"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <StaggerItem>
                  <p>
                    I'm an undergraduate studying BSc (Hons) Software Engineering at Plymouth University, UK. 
                    With a passion for creating innovative software solutions, I combine strong technical skills with a 
                    strategic mindset to deliver impactful results.
                  </p>
                </StaggerItem>
                <StaggerItem delay={0.2}>
                  <p>
                    I'm looking to collaborate on innovative software projects, 
                    tech startups, and solutions in areas like project management, full-stack development, and digital transformation.
                  </p>
                </StaggerItem>
              </motion.div>
            </StaggerContainer>

            <StaggerContainer>
              <div className="about-focus">
                {[
                  { icon: "fas fa-lightbulb", title: "Innovation", desc: "Turning ideas into reality" },
                  { icon: "fas fa-code-branch", title: "Technology", desc: "Building the future" },
                  { icon: "fas fa-chart-line", title: "Strategy", desc: "Planning for success" }
                ].map((item, index) => (
                  <StaggerItem key={index} delay={index * 0.2}>
                    <TiltCard className="focus-item glass-card card-3d">
                      <FloatingElement intensity={0.3}>
                        <div className="focus-icon glow-effect">
                          <i className={item.icon}></i>
                        </div>
                        <h3 className="neon-text">{item.title}</h3>
                        <p>{item.desc}</p>
                      </FloatingElement>
                    </TiltCard>
                  </StaggerItem>
                ))}
              </div>
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* Skills Section with 3D Galaxy */}
      <section id="skills" className="skills-section">
        <div className="section-container">
          <RevealOnScroll>
            <h2 className="section-title neon-text">My Skills</h2>
            <p className="section-subtitle holographic">Expertise & Technical Proficiency</p>
          </RevealOnScroll>
          
          {/* 3D Skills Galaxy */}
          <motion.div 
            className="skills-3d-container"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <Interactive3D.SkillsGalaxy skills={skills} />
          </motion.div>
          
          <div className="skills-tabs">
            {Object.keys(skills).map((category) => (
              <MagneticButton
                key={category}
                className={`skill-tab btn-3d ${activeSkillCategory === category ? 'active glow-effect' : ''}`}
                onClick={() => setActiveSkillCategory(category)}
              >
                <i className={`fas fa-${category === 'languages' ? 'code' : category === 'frameworks' ? 'layer-group' : 'tools'}`}></i>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </MagneticButton>
            ))}
          </div>
          
          <StaggerContainer>
            <div className="skills-content">
              {skills[activeSkillCategory].map((skill, index) => (
                <StaggerItem key={index} delay={index * 0.1}>
                  <TiltCard className="skill-item glass-card card-3d">
                    <div className="skill-info">
                      <i className={skill.icon}></i>
                      <span>{skill.name}</span>
                    </div>
                    <AnimatedProgressBar progress={skill.proficiency} className="skill-progress glow-effect" />
                    <span className="skill-percentage neon-text">{skill.proficiency}%</span>
                  </TiltCard>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* Projects Section with 3D Gallery */}
      <section id="projects" className="projects-section">
        <div className="section-container">
          <RevealOnScroll>
            <h2 className="section-title neon-text">Featured Projects</h2>
            <p className="section-subtitle holographic">Recent Work & Contributions</p>
          </RevealOnScroll>
          
          {/* 3D Projects Gallery */}
          <motion.div 
            className="projects-3d-container"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <Interactive3D.Projects3DGallery projects={projects} />
          </motion.div>
          
          <div className="project-categories">
            {['all', 'full-stack', 'web', 'mobile', 'desktop'].map((category) => (
              <MagneticButton
                key={category}
                className={`project-tab btn-3d ${activeTab === category ? 'active glow-effect' : ''}`}
                onClick={() => setActiveTab(category)}
              >
                {category === 'all' ? 'All Projects' : category.charAt(0).toUpperCase() + category.slice(1)}
              </MagneticButton>
            ))}
          </div>
          
          <StaggerContainer>
            <div className="projects-grid">
              {filteredProjects.map((project, index) => (
                <StaggerItem key={index} delay={index * 0.2}>
                  <TiltCard className="project-card glass-card card-3d">
                    <FloatingElement intensity={0.2}>
                      <div className="project-content">
                        <span className="project-category-tag glow-effect">{project.category}</span>
                        <h3 className="neon-text">{project.title}</h3>
                        <p className="project-description">{project.description}</p>
                        <div className="project-tech">
                          {project.technologies.map((tech, idx) => (
                            <span key={idx} className="tech-tag glass-card">{tech}</span>
                          ))}
                        </div>
                        <MagneticButton
                          className="project-link btn-3d glow-effect"
                          onClick={() => window.open(project.github, '_blank')}
                        >
                          <i className="fab fa-github"></i> View Project
                        </MagneticButton>
                      </div>
                    </FloatingElement>
                  </TiltCard>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
          
          <motion.div 
            className="project-cta"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <MagneticButton 
              className="cta-btn btn-3d glow-effect"
              onClick={() => window.open('https://github.com/SeneshFitzroy', '_blank')}
            >
              <i className="fab fa-github"></i> View More Projects on GitHub
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="certifications-section">
        <div className="section-container">
          <RevealOnScroll>
            <h2 className="section-title neon-text">Certifications</h2>
            <p className="section-subtitle holographic">Professional Development & Achievements</p>
          </RevealOnScroll>
          
          <motion.div 
            className="certification-counter"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="counter-badge glow-effect neon-text">84+</div>
            <span className="holographic">Professional Certifications</span>
          </motion.div>
          
          <StaggerContainer>
            <div className="certifications-grid">
              {Object.entries(certificationsData).map(([category, items], categoryIndex) => (
                <StaggerItem key={category} delay={categoryIndex * 0.2}>
                  <TiltCard className="cert-category glass-card card-3d">
                    <div className="cert-category-header glow-effect">
                      <h3 className="neon-text">{category}</h3>
                    </div>
                    <div className="cert-items">
                      {items.map((cert, index) => (
                        <motion.div 
                          key={index} 
                          className="cert-item"
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                        >
                          <h4>{cert.title}</h4>
                          <div className="cert-meta">
                            <span className="cert-issuer">{cert.issuer}</span>
                            <span className="cert-issued">{cert.issued}</span>
                          </div>
                          <MagneticButton
                            className="cert-view-btn btn-3d"
                            onClick={() => window.open(cert.link, '_blank')}
                          >
                            View Credential <i className="fas fa-external-link-alt"></i>
                          </MagneticButton>
                        </motion.div>
                      ))}
                    </div>
                  </TiltCard>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
          
          <motion.div 
            className="view-more-container"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <MagneticButton 
              className="view-more-btn btn-3d glow-effect"
              onClick={() => window.open('https://www.linkedin.com/in/senesh-fitzroy-812151263/', '_blank')}
            >
              <span>View All Certifications on LinkedIn</span>
              <i className="fab fa-linkedin"></i>
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      {/* Contact Section with 3D Elements */}
      <section id="contact" className="contact-section">
        <div className="section-container">
          <RevealOnScroll>
            <h2 className="section-title neon-text">Get In Touch</h2>
            <p className="section-subtitle holographic">Let's Connect & Collaborate</p>
          </RevealOnScroll>
          
          <div className="contact-container">
            <StaggerContainer>
              <div className="contact-info">
                <StaggerItem>
                  <TiltCard className="contact-item glass-card card-3d">
                    <div className="contact-icon glow-effect">
                      <i className="fas fa-envelope"></i>
                    </div>
                    <div className="contact-text">
                      <h3 className="neon-text">Email</h3>
                      <p><a href="mailto:seneshfitzroy@gmail.com">seneshfitzroy@gmail.com</a></p>
                    </div>
                  </TiltCard>
                </StaggerItem>
                
                <StaggerItem delay={0.2}>
                  <TiltCard className="contact-item glass-card card-3d">
                    <div className="contact-icon glow-effect">
                      <i className="fas fa-map-marker-alt"></i>
                    </div>
                    <div className="contact-text">
                      <h3 className="neon-text">Location</h3>
                      <p>Sri Lanka</p>
                    </div>
                  </TiltCard>
                </StaggerItem>
              </div>
            </StaggerContainer>
            
            <StaggerContainer>
              <div className="contact-social-container">
                <h3 className="neon-text">Professional Networks</h3>
                <div className="contact-social">
                  {socialLinks.professional.map((link, index) => (
                    <StaggerItem key={index} delay={index * 0.1}>
                      <MagneticButton
                        className="social-link glass-card glow-effect"
                        onClick={() => window.open(link.url, '_blank')}
                        title={link.name}
                      >
                        <FloatingElement intensity={0.2}>
                          <i className={link.icon}></i>
                        </FloatingElement>
                      </MagneticButton>
                    </StaggerItem>
                  ))}
                </div>
              </div>
            </StaggerContainer>
            
            <StaggerContainer>
              <div className="contact-social-container">
                <h3 className="neon-text">Social Media</h3>
                <div className="contact-social">
                  {socialLinks.social.map((link, index) => (
                    <StaggerItem key={index} delay={index * 0.1}>
                      <MagneticButton
                        className="social-link glass-card glow-effect"
                        onClick={() => window.open(link.url, '_blank')}
                        title={link.name}
                      >
                        <FloatingElement intensity={0.2}>
                          <i className={link.icon}></i>
                        </FloatingElement>
                      </MagneticButton>
                    </StaggerItem>
                  ))}
                </div>
              </div>
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* Footer with 3D Effects */}
      <footer className="footer glass-card">
        <div className="footer-content">
          <motion.div 
            className="footer-logo glow-effect"
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.8 }}
          >
            <GlitchText className="neon-text">SF</GlitchText>
          </motion.div>
          <p className="holographic">🔥 Driven by innovation, technology, and strategic execution. 🚀</p>
          <div className="footer-links">
            {['about', 'skills', 'projects', 'certifications', 'contact'].map((link, index) => (
              <MagneticButton 
                key={link}
                onClick={() => scrollToSection(link)}
                className="footer-link"
              >
                {link.charAt(0).toUpperCase() + link.slice(1)}
              </MagneticButton>
            ))}
          </div>
          <div className="footer-social">
            {[...socialLinks.professional, ...socialLinks.social].slice(0, 5).map((link, index) => (
              <MagneticButton
                key={index}
                className="footer-social-link glow-effect"
                onClick={() => window.open(link.url, '_blank')}
                title={link.name}
              >
                <FloatingElement intensity={0.1}>
                  <i className={link.icon}></i>
                </FloatingElement>
              </MagneticButton>
            ))}
          </div>
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} Senesh Fitzroy. All Rights Reserved.</p>
          </div>
        </div>
      </footer>

      {/* Floating Action Button */}
      <FloatingActionButton
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        icon={<i className="fas fa-arrow-up"></i>}
        label="Back to Top"
      />
    </div>
  );
}
