import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import Typewriter from 'typewriter-effect';
import toast, { Toaster } from 'react-hot-toast';
import confetti from 'canvas-confetti';
import AOS from 'aos';

// Dynamic imports for 3D components (client-side only)
const Scene3D = dynamic(() => import('../components/Scene3D'), { ssr: false });
const Interactive3D = dynamic(() => import('../components/Interactive3D'), { ssr: false });
const LoadingScreen = dynamic(() => import('../components/LoadingScreen'), { ssr: false });

// Import advanced components
import { 
  MagneticButton3D, 
  AdvancedCursor, 
  ParticleBackground, 
  TiltCard,
  SmoothScroll,
  ParallaxMouseEffect
} from '../components/AdvancedInteractions';
import {
  ScrollReveal,
  StaggerContainer,
  StaggerItem,
  FloatingElement,
  TypewriterText,
  MorphingShape
} from '../components/AdvancedAnimations';
import Certifications from '../components/Certifications';

// Enhanced certificationsData with more entries
const certificationsData = {
  "Professional Memberships": [
    { title: "Certificate of IEEE Membership", issuer: "IEEE", issued: "Mar 2025", link: "#" },
    { title: "Certificate of Membership for IEEE Women in Engineering (WIE)", issuer: "IEEE", issued: "Mar 2025", link: "#" },
    { title: "Certificate of Membership for the IEEE Circuits and Systems Society (CAS)", issuer: "IEEE", issued: "Mar 2025", link: "#" },
  ],
  "AI & Machine Learning": [
    { title: "AI Masterclass: ChatGPT Prompt Engineering", issuer: "UniAthena", issued: "Sep 2023", link: "#" },
    { title: "Introduction to Artificial Intelligence", issuer: "Great Learning", issued: "2023", link: "#" },
    { title: "Machine Learning Specialization", issuer: "Stanford Online", issued: "2023", link: "#" },
    { title: "Deep Learning with TensorFlow", issuer: "DeepLearning.AI", issued: "2023", link: "#" },
  ],
  "Cloud & DevOps": [
    { title: "AWS Solutions Architect", issuer: "Amazon Web Services", issued: "2024", link: "#" },
    { title: "Azure Fundamentals", issuer: "Microsoft", issued: "2023", link: "#" },
    { title: "Docker & Kubernetes", issuer: "Docker Inc.", issued: "2023", link: "#" },
    { title: "CI/CD Pipeline Mastery", issuer: "GitLab", issued: "2023", link: "#" },
  ],
  "Web Development": [
    { title: "React Advanced Patterns", issuer: "Meta", issued: "2024", link: "#" },
    { title: "Next.js Full Stack", issuer: "Vercel", issued: "2024", link: "#" },
    { title: "TypeScript Expert", issuer: "Microsoft", issued: "2023", link: "#" },
    { title: "Node.js Performance", issuer: "Node.js Foundation", issued: "2023", link: "#" },
  ]
};

// Enhanced projects data with more projects
const projects = [
  {
    id: 1,
    title: "SafeServe-PHI-Manager",
    description: "Advanced AI-powered platform for Public Health Inspector workflows with real-time analytics, predictive modeling, and automated report generation",
    technologies: ["React", "Node.js", "AI/ML", "TensorFlow", "Firebase", "WebRTC"],
    github: "https://github.com/SeneshFitzroy/SafeServe-PHI-Manager.git",
    demo: "#",
    category: "full-stack",
    featured: true,
    status: "completed",
    year: "2024"
  },
  {
    id: 2,
    title: "Neural Finance Predictor",
    description: "Deep learning system for cryptocurrency and stock market prediction using LSTM networks and sentiment analysis",
    technologies: ["Python", "TensorFlow", "React", "D3.js", "WebSocket", "PostgreSQL"],
    github: "#",
    demo: "#",
    category: "ai-ml",
    featured: true,
    status: "in-progress",
    year: "2024"
  },
  {
    id: 3,
    title: "AR Shopping Experience",
    description: "Augmented reality mobile app for virtual try-on experiences with real-time 3D rendering and physics simulation",
    technologies: ["React Native", "ARCore", "Three.js", "WebGL", "Firebase", "Stripe"],
    github: "#",
    demo: "#",
    category: "mobile",
    featured: true,
    status: "completed",
    year: "2024"
  },
  {
    id: 4,
    title: "Quantum Computing Simulator",
    description: "Web-based quantum circuit simulator with visual programming interface and real quantum hardware integration",
    technologies: ["TypeScript", "WebGL", "Qiskit", "Python", "Docker", "Kubernetes"],
    github: "#",
    demo: "#",
    category: "research",
    featured: true,
    status: "completed",
    year: "2024"
  },
  {
    id: 5,
    title: "Team-Sync Pro",
    description: "Advanced project management platform with AI-powered task optimization and real-time collaboration features",
    technologies: ["Flutter", "Dart", "Firebase", "WebRTC", "TensorFlow Lite"],
    github: "https://github.com/SeneshFitzroy/Team-Sync-Project-Management-Application",
    demo: "#",
    category: "mobile",
    featured: false,
    status: "completed",
    year: "2023"
  },
  {
    id: 6,
    title: "Blockchain Voting System",
    description: "Secure, transparent voting platform using blockchain technology with zero-knowledge proofs for privacy",
    technologies: ["Solidity", "Web3.js", "React", "IPFS", "MetaMask", "Hardhat"],
    github: "#",
    demo: "#",
    category: "blockchain",
    featured: false,
    status: "completed",
    year: "2023"
  }
];

// Enhanced skills data
const skills = {
  languages: [
    { name: "JavaScript", icon: "fab fa-js-square", proficiency: 95, category: "expert" },
    { name: "TypeScript", icon: "fab fa-js-square", proficiency: 92, category: "expert" },
    { name: "Python", icon: "fab fa-python", proficiency: 90, category: "expert" },
    { name: "Java", icon: "fab fa-java", proficiency: 85, category: "advanced" },
    { name: "C#", icon: "fab fa-microsoft", proficiency: 85, category: "advanced" },
    { name: "Solidity", icon: "fab fa-ethereum", proficiency: 78, category: "intermediate" },
    { name: "Rust", icon: "fab fa-rust", proficiency: 70, category: "intermediate" },
    { name: "Go", icon: "fab fa-google", proficiency: 65, category: "intermediate" }
  ],
  frameworks: [
    { name: "React", icon: "fab fa-react", proficiency: 95, category: "expert" },
    { name: "Next.js", icon: "fas fa-bolt", proficiency: 92, category: "expert" },
    { name: "Node.js", icon: "fab fa-node-js", proficiency: 90, category: "expert" },
    { name: "Vue.js", icon: "fab fa-vuejs", proficiency: 85, category: "advanced" },
    { name: "Angular", icon: "fab fa-angular", proficiency: 80, category: "advanced" },
    { name: "React Native", icon: "fab fa-react", proficiency: 88, category: "advanced" },
    { name: "Flutter", icon: "fas fa-mobile-alt", proficiency: 85, category: "advanced" },
    { name: "Express.js", icon: "fas fa-server", proficiency: 90, category: "expert" }
  ],
  tools: [
    { name: "Docker", icon: "fab fa-docker", proficiency: 88, category: "advanced" },
    { name: "Kubernetes", icon: "fas fa-dharmachakra", proficiency: 82, category: "advanced" },
    { name: "AWS", icon: "fab fa-aws", proficiency: 85, category: "advanced" },
    { name: "Azure", icon: "fab fa-microsoft", proficiency: 80, category: "advanced" },
    { name: "TensorFlow", icon: "fas fa-brain", proficiency: 85, category: "advanced" },
    { name: "MongoDB", icon: "fas fa-database", proficiency: 90, category: "expert" },
    { name: "PostgreSQL", icon: "fas fa-database", proficiency: 88, category: "advanced" },
    { name: "Redis", icon: "fas fa-memory", proficiency: 82, category: "advanced" }
  ]
};

// Enhanced social links
const socialLinks = {
  professional: [
    { name: "GitHub", icon: "fab fa-github", url: "https://github.com/SeneshFitzroy", color: "#333" },
    { name: "LinkedIn", icon: "fab fa-linkedin-in", url: "https://www.linkedin.com/in/senesh-fitzroy-812151263/", color: "#0077B5" },
    { name: "Twitter", icon: "fab fa-twitter", url: "https://x.com/SeneshFitzroy", color: "#1DA1F2" },
    { name: "Dev.to", icon: "fab fa-dev", url: "https://dev.to/seneshfitzroy", color: "#0A0A0A" },
    { name: "Stack Overflow", icon: "fab fa-stack-overflow", url: "#", color: "#F58025" },
    { name: "Medium", icon: "fab fa-medium", url: "#", color: "#12100E" }
  ],
  social: [
    { name: "Instagram", icon: "fab fa-instagram", url: "https://instagram.com/seneshx", color: "#E4405F" },
    { name: "YouTube", icon: "fab fa-youtube", url: "#", color: "#FF0000" },
    { name: "TikTok", icon: "fab fa-tiktok", url: "https://www.tiktok.com/@seneshx", color: "#000000" },
    { name: "Discord", icon: "fab fa-discord", url: "#", color: "#5865F2" }
  ]
};

export default function Home() {
  // State management
  const [darkMode, setDarkMode] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSkillCategory, setActiveSkillCategory] = useState('languages');
  const [activeProjectFilter, setActiveProjectFilter] = useState('all');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Refs
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const heroParallax = useTransform(scrollYProgress, [0, 1], [0, -500]);

  // Initialize AOS and handle loading
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-out-cubic',
      once: true
    });

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Mouse tracking
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Filter projects
  const filteredProjects = projects.filter(project => 
    activeProjectFilter === 'all' || project.category === activeProjectFilter
  );

  // Handle contact form
  const handleContact = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    toast.success('Message sent successfully! I\'ll get back to you soon.');
  };

  return (
    <AnimatePresence>
      <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
        <Head>
          <title>Senesh Fitzroy - Advanced Full Stack Developer & AI Engineer</title>
          <meta name="description" content="Innovative full-stack developer specializing in AI, blockchain, and cutting-edge web technologies. Building the future with code." />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
          <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
          <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet" />
          <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet" />
        </Head>

        {/* Loading Screen */}
        <LoadingScreen 
          isLoading={isLoading} 
          onLoadingComplete={() => setIsLoading(false)} 
        />

        {/* Interactive Cursor */}
        <AdvancedCursor />

        {/* 3D Background Scene */}
        <Scene3D darkMode={darkMode} />

        {/* Floating Particles Background */}
        <div className="particles-bg">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="particle"
              initial={{
                x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : Math.random() * 1200,
                y: typeof window !== 'undefined' ? Math.random() * window.innerHeight : Math.random() * 800,
                scale: 0
              }}
              animate={{
                y: [null, -100],
                scale: [0, 1, 0],
                rotate: 360
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                delay: Math.random() * 5
              }}
              style={{
                position: 'absolute',
                width: Math.random() * 4 + 2,
                height: Math.random() * 4 + 2,
                background: `hsl(${Math.random() * 60 + 200}, 70%, 60%)`,
                borderRadius: '50%'
              }}
            />
          ))}
        </div>

        {/* Navigation */}
        <motion.nav 
          className="nav-container glass-card"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, delay: 3.5 }}
        >
          <div className="nav-content">
            <motion.div 
              className="nav-logo"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <span className="holographic">SF</span>
            </motion.div>

            <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
              {['About', 'Skills', 'Projects', 'Certifications', 'Contact'].map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="nav-link"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 3.5 + index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>

            <div className="nav-actions">
              <MagneticButton3D
                className="theme-toggle"
                onClick={() => setDarkMode(!darkMode)}
              >
                <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'}`}></i>
              </MagneticButton3D>
              
              <button 
                className="mobile-menu-toggle"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <i className="fas fa-bars"></i>
              </button>
            </div>
          </div>
        </motion.nav>

        {/* Hero Section */}
        <section ref={heroRef} className="hero-section" id="home">
          <motion.div 
            className="hero-bg"
            style={{ y: heroParallax }}
          />
          
          <div className="hero-container">
            <div className="hero-content">
              <ScrollReveal direction="up">
                <motion.div className="hero-badge floating">
                  <span>🚀 Available for exciting projects</span>
                </motion.div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.2}>
                <h1 className="hero-title">
                  <span className="hero-greeting">Hello, I'm</span>
                  <span className="hero-name neon-text">Senesh Fitzroy</span>
                  <div className="hero-typed">
                    <Typewriter
                      options={{
                        strings: [
                          'Full Stack Developer',
                          'AI/ML Engineer',
                          'Blockchain Developer',
                          'Cloud Architect',
                          'UI/UX Designer'
                        ],
                        autoStart: true,
                        loop: true,
                        delay: 50,
                        deleteSpeed: 30
                      }}
                    />
                  </div>
                </h1>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.4}>
                <p className="hero-description">
                  Crafting next-generation digital experiences with cutting-edge technologies. 
                  Specializing in AI-powered applications, blockchain solutions, and immersive 
                  3D web experiences that push the boundaries of what's possible.
                </p>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.6}>
                <div className="hero-stats">
                  <div className="stat-item">
                    <CountUp end={50} duration={2} suffix="+" className="stat-number" />
                    <span className="stat-label">Projects Completed</span>
                  </div>
                  <div className="stat-item">
                    <CountUp end={25} duration={2} suffix="+" className="stat-number" />
                    <span className="stat-label">Certifications</span>
                  </div>
                  <div className="stat-item">
                    <CountUp end={3} duration={2} suffix="+" className="stat-number" />
                    <span className="stat-label">Years Experience</span>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.8}>
                <div className="hero-actions">
                  <MagneticButton3D className="btn-primary">
                    <span>View My Work</span>
                    <i className="fas fa-arrow-right"></i>
                  </MagneticButton3D>
                  
                  <MagneticButton3D className="btn-secondary">
                    <span>Download CV</span>
                    <i className="fas fa-download"></i>
                  </MagneticButton3D>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={1.0}>
                <div className="hero-social">
                  {socialLinks.professional.map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      className="social-link"
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 4 + index * 0.1 }}
                      whileHover={{ 
                        scale: 1.2, 
                        boxShadow: `0 0 20px ${social.color}40` 
                      }}
                      style={{ '--social-color': social.color }}
                    >
                      <i className={social.icon}></i>
                    </motion.a>
                  ))}
                </div>
              </ScrollReveal>
            </div>

            <div className="hero-visual">
              <ParallaxMouseEffect intensity={0.1}>
                <div className="hero-3d-container">
                  <MorphingShape className="morphing-blob-1" />
                  <FloatingElement intensity={0.5}>
                    <div className="hero-avatar glass-card">
                      <div className="avatar-inner">
                        <span className="avatar-text holographic">SF</span>
                      </div>
                    </div>
                  </FloatingElement>
                  <MorphingShape className="morphing-blob-2" />
                </div>
              </ParallaxMouseEffect>
            </div>
          </div>

          {/* Scroll Indicator */}
          <motion.div 
            className="scroll-indicator"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span>Scroll to explore</span>
            <i className="fas fa-chevron-down"></i>
          </motion.div>
        </section>

        {/* Skills Section */}
        <section className="skills-section" id="skills">
          <div className="container">
            <ScrollReveal direction="up">
              <div className="section-header">
                <h2 className="section-title holographic">Technical Expertise</h2>
                <p className="section-subtitle">
                  Mastering cutting-edge technologies to build tomorrow's solutions
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
              <div className="skills-filters">
                {Object.keys(skills).map((category) => (
                  <MagneticButton3D
                    key={category}
                    className={`filter-btn ${activeSkillCategory === category ? 'active' : ''}`}
                    onClick={() => setActiveSkillCategory(category)}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </MagneticButton3D>
                ))}
              </div>
            </ScrollReveal>

            <StaggerContainer stagger={0.1}>
              <div className="skills-grid">
                {skills[activeSkillCategory]?.map((skill, index) => (
                  <StaggerItem key={skill.name}>
                    <TiltCard className="skill-card card-3d">
                      <div className="skill-icon">
                        <i className={skill.icon}></i>
                      </div>
                      <h3 className="skill-name">{skill.name}</h3>
                      <div className="skill-bar">
                        <motion.div 
                          className="skill-progress"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.proficiency}%` }}
                          transition={{ duration: 1.5, delay: index * 0.1 }}
                        />
                      </div>
                      <span className="skill-percentage">{skill.proficiency}%</span>
                      <div className={`skill-badge badge-${skill.category}`}>
                        {skill.category}
                      </div>
                    </TiltCard>
                  </StaggerItem>
                ))}
              </div>
            </StaggerContainer>

            {/* 3D Skills Visualization */}
            <ScrollReveal direction="up" delay={0.4}>
              <div className="skills-3d-container">
                <Interactive3D.SkillsGalaxy skills={skills} />
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Projects Section */}
        <section className="projects-section" id="projects">
          <div className="container">
            <ScrollReveal direction="up">
              <div className="section-header">
                <h2 className="section-title neon-text">Featured Projects</h2>
                <p className="section-subtitle">
                  Innovative solutions that showcase the power of modern technology
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
              <div className="project-filters">
                {['all', 'full-stack', 'ai-ml', 'mobile', 'blockchain', 'research'].map((filter) => (
                  <MagneticButton3D
                    key={filter}
                    className={`filter-btn ${activeProjectFilter === filter ? 'active' : ''}`}
                    onClick={() => setActiveProjectFilter(filter)}
                  >
                    {filter === 'ai-ml' ? 'AI/ML' : filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </MagneticButton3D>
                ))}
              </div>
            </ScrollReveal>

            <StaggerContainer stagger={0.2}>
              <div className="projects-grid">
                {filteredProjects.map((project, index) => (
                  <StaggerItem key={project.id}>
                    <TiltCard className={`project-card glass-card ${project.featured ? 'featured' : ''}`}>
                      <div className="project-header">
                        <div className="project-status">
                          <span className={`status-badge ${project.status}`}>
                            {project.status}
                          </span>
                          <span className="project-year">{project.year}</span>
                        </div>
                        {project.featured && (
                          <div className="featured-badge">
                            <i className="fas fa-star"></i>
                            Featured
                          </div>
                        )}
                      </div>

                      <div className="project-content">
                        <h3 className="project-title">{project.title}</h3>
                        <p className="project-description">{project.description}</p>
                        
                        <div className="project-tech">
                          {project.technologies.map((tech, techIndex) => (
                            <motion.span 
                              key={tech}
                              className="tech-tag"
                              initial={{ opacity: 0, scale: 0 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.1 + techIndex * 0.05 }}
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>
                      </div>

                      <div className="project-actions">
                        <MagneticButton3D 
                          className="btn-outline"
                          onClick={() => typeof window !== 'undefined' && window.open(project.github, '_blank')}
                        >
                          <i className="fab fa-github"></i>
                          Code
                        </MagneticButton3D>
                        
                        <MagneticButton3D 
                          className="btn-primary"
                          onClick={() => typeof window !== 'undefined' && window.open(project.demo, '_blank')}
                        >
                          <i className="fas fa-external-link-alt"></i>
                          Demo
                        </MagneticButton3D>
                      </div>

                      <div className="project-overlay">
                        <div className="overlay-content">
                          <i className="fas fa-rocket"></i>
                          <span>View Project</span>
                        </div>
                      </div>
                    </TiltCard>
                  </StaggerItem>
                ))}
              </div>
            </StaggerContainer>

            {/* 3D Projects Gallery */}
            <ScrollReveal direction="up" delay={0.4}>
              <div className="projects-3d-container">
                <Interactive3D.Projects3DGallery projects={filteredProjects.slice(0, 4)} />
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Certifications Section */}
        <section className="certifications-section" id="certifications">
          <div className="container">
            <ScrollReveal direction="up">
              <div className="section-header">
                <h2 className="section-title holographic">Certifications & Achievements</h2>
                <p className="section-subtitle">
                  Continuous learning and professional development in cutting-edge technologies
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
              <Certifications certificationsData={certificationsData} />
            </ScrollReveal>
          </div>
        </section>

        {/* Contact Section */}
        <section className="contact-section" id="contact">
          <div className="container">
            <ScrollReveal direction="up">
              <div className="section-header">
                <h2 className="section-title neon-text">Let's Build Something Amazing</h2>
                <p className="section-subtitle">
                  Ready to turn your ideas into reality? Let's collaborate and create the future together.
                </p>
              </div>
            </ScrollReveal>

            <div className="contact-content">
              <ScrollReveal direction="left" delay={0.2}>
                <div className="contact-info">
                  <div className="contact-card glass-card">
                    <div className="contact-icon">
                      <i className="fas fa-envelope"></i>
                    </div>
                    <h3>Email Me</h3>
                    <p>seneshfitzroy@gmail.com</p>
                  </div>

                  <div className="contact-card glass-card">
                    <div className="contact-icon">
                      <i className="fas fa-phone"></i>
                    </div>
                    <h3>Call Me</h3>
                    <p>+94 70 123 4567</p>
                  </div>

                  <div className="contact-card glass-card">
                    <div className="contact-icon">
                      <i className="fas fa-map-marker-alt"></i>
                    </div>
                    <h3>Location</h3>
                    <p>Colombo, Sri Lanka</p>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="right" delay={0.4}>
                <div className="contact-form-container">
                  <form className="contact-form glass-card">
                    <div className="form-group">
                      <label htmlFor="name">Name</label>
                      <input type="text" id="name" name="name" required />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input type="email" id="email" name="email" required />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="subject">Subject</label>
                      <input type="text" id="subject" name="subject" required />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="message">Message</label>
                      <textarea id="message" name="message" rows="5" required></textarea>
                    </div>

                    <MagneticButton3D 
                      className="btn-primary btn-full"
                      onClick={handleContact}
                      type="button"
                    >
                      <span>Send Message</span>
                      <i className="fas fa-paper-plane"></i>
                    </MagneticButton3D>
                  </form>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <div className="container">
            <div className="footer-content">
              <div className="footer-brand">
                <h3 className="holographic">Senesh Fitzroy</h3>
                <p>Building the future with innovative technology solutions</p>
              </div>

              <div className="footer-social">
                {[...socialLinks.professional, ...socialLinks.social].map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    className="footer-social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ 
                      scale: 1.2, 
                      boxShadow: `0 0 20px ${social.color}40` 
                    }}
                    style={{ '--social-color': social.color }}
                  >
                    <i className={social.icon}></i>
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="footer-bottom">
              <p>&copy; 2024 Senesh Fitzroy. All rights reserved.</p>
              <p>Made with <i className="fas fa-heart" style={{ color: '#e74c3c' }}></i> and cutting-edge technology</p>
            </div>
          </div>
        </footer>

        {/* Toaster for notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'rgba(0, 0, 0, 0.8)',
              color: '#fff',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }
          }}
        />

        {/* Custom Styles */}
        <style jsx>{`
          .app {
            font-family: 'Space Grotesk', sans-serif;
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
            color: #ffffff;
            min-height: 100vh;
            overflow-x: hidden;
            position: relative;
          }

          /* Navigation Styles */
          .nav-container {
            position: fixed;
            top: 1rem;
            left: 50%;
            transform: translateX(-50%);
            width: 90%;
            max-width: 1200px;
            z-index: 1000;
            padding: 1rem 2rem;
            border-radius: 20px;
          }

          .nav-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .nav-logo {
            font-size: 1.5rem;
            font-weight: bold;
            cursor: pointer;
          }

          .nav-links {
            display: flex;
            gap: 2rem;
            list-style: none;
          }

          .nav-link {
            color: #ffffff;
            text-decoration: none;
            font-weight: 500;
            transition: all 0.3s ease;
            position: relative;
          }

          .nav-link:hover {
            color: #3b82f6;
          }

          .nav-actions {
            display: flex;
            align-items: center;
            gap: 1rem;
          }

          .theme-toggle {
            padding: 0.5rem;
            border-radius: 10px;
          }

          .mobile-menu-toggle {
            display: none;
            background: none;
            border: none;
            color: #ffffff;
            font-size: 1.2rem;
            cursor: pointer;
          }

          /* Hero Section */
          .hero-section {
            min-height: 100vh;
            display: flex;
            align-items: center;
            position: relative;
            overflow: hidden;
          }

          .hero-container {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 4rem;
            align-items: center;
          }

          .hero-content {
            z-index: 2;
          }

          .hero-badge {
            display: inline-block;
            padding: 0.5rem 1rem;
            background: rgba(59, 130, 246, 0.1);
            border: 1px solid rgba(59, 130, 246, 0.3);
            border-radius: 50px;
            color: #3b82f6;
            font-size: 0.9rem;
            margin-bottom: 2rem;
          }

          .hero-title {
            font-size: 4rem;
            font-weight: 700;
            line-height: 1.1;
            margin-bottom: 2rem;
          }

          .hero-greeting {
            display: block;
            font-size: 1.5rem;
            color: #94a3b8;
            margin-bottom: 0.5rem;
          }

          .hero-name {
            display: block;
            background: linear-gradient(45deg, #3b82f6, #8b5cf6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }

          .hero-typed {
            font-size: 2rem;
            color: #10b981;
            margin-top: 1rem;
          }

          .hero-description {
            font-size: 1.2rem;
            color: #94a3b8;
            line-height: 1.6;
            margin-bottom: 3rem;
          }

          .hero-stats {
            display: flex;
            gap: 3rem;
            margin-bottom: 3rem;
          }

          .stat-item {
            text-align: center;
          }

          .stat-number {
            display: block;
            font-size: 2.5rem;
            font-weight: 700;
            color: #3b82f6;
          }

          .stat-label {
            font-size: 0.9rem;
            color: #94a3b8;
          }

          .hero-actions {
            display: flex;
            gap: 1rem;
            margin-bottom: 3rem;
          }

          .btn-primary {
            background: linear-gradient(45deg, #3b82f6, #8b5cf6);
            color: white;
            padding: 1rem 2rem;
            border-radius: 12px;
            border: none;
            font-weight: 600;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            transition: all 0.3s ease;
          }

          .btn-secondary {
            background: rgba(255, 255, 255, 0.1);
            color: white;
            padding: 1rem 2rem;
            border-radius: 12px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            font-weight: 600;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            transition: all 0.3s ease;
          }

          .hero-social {
            display: flex;
            gap: 1rem;
          }

          .social-link {
            width: 50px;
            height: 50px;
            border-radius: 12px;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            text-decoration: none;
            transition: all 0.3s ease;
          }

          .hero-visual {
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .hero-3d-container {
            position: relative;
            width: 400px;
            height: 400px;
          }

          .hero-avatar {
            width: 200px;
            height: 200px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            z-index: 2;
          }

          .avatar-inner {
            font-size: 3rem;
            font-weight: bold;
          }

          .morphing-blob-1,
          .morphing-blob-2 {
            position: absolute;
            width: 150px;
            height: 150px;
            opacity: 0.3;
          }

          .morphing-blob-1 {
            top: 0;
            right: 0;
          }

          .morphing-blob-2 {
            bottom: 0;
            left: 0;
            background: linear-gradient(45deg, #10b981, #06d6a0) !important;
          }

          .scroll-indicator {
            position: absolute;
            bottom: 2rem;
            left: 50%;
            transform: translateX(-50%);
            text-align: center;
            color: #94a3b8;
          }

          /* Section Styles */
          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem;
          }

          .section-header {
            text-align: center;
            margin-bottom: 4rem;
          }

          .section-title {
            font-size: 3rem;
            font-weight: 700;
            margin-bottom: 1rem;
          }

          .section-subtitle {
            font-size: 1.2rem;
            color: #94a3b8;
            max-width: 600px;
            margin: 0 auto;
          }

          /* Skills Section */
          .skills-section {
            padding: 8rem 0;
          }

          .skills-filters {
            display: flex;
            justify-content: center;
            gap: 1rem;
            margin-bottom: 4rem;
          }

          .filter-btn {
            padding: 0.75rem 1.5rem;
            border-radius: 10px;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: white;
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .filter-btn.active {
            background: linear-gradient(45deg, #3b82f6, #8b5cf6);
          }

          .skills-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 2rem;
          }

          .skill-card {
            padding: 2rem;
            text-align: center;
            position: relative;
          }

          .skill-icon {
            font-size: 3rem;
            color: #3b82f6;
            margin-bottom: 1rem;
          }

          .skill-name {
            font-size: 1.2rem;
            font-weight: 600;
            margin-bottom: 1rem;
          }

          .skill-bar {
            width: 100%;
            height: 8px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 4px;
            overflow: hidden;
            margin-bottom: 0.5rem;
          }

          .skill-progress {
            height: 100%;
            background: linear-gradient(45deg, #3b82f6, #8b5cf6);
            border-radius: 4px;
          }

          .skill-percentage {
            font-size: 0.9rem;
            color: #94a3b8;
          }

          .skill-badge {
            position: absolute;
            top: 1rem;
            right: 1rem;
            padding: 0.25rem 0.5rem;
            border-radius: 6px;
            font-size: 0.7rem;
            text-transform: uppercase;
            font-weight: 600;
          }

          .badge-expert {
            background: rgba(16, 185, 129, 0.2);
            color: #10b981;
          }

          .badge-advanced {
            background: rgba(59, 130, 246, 0.2);
            color: #3b82f6;
          }

          .badge-intermediate {
            background: rgba(139, 92, 246, 0.2);
            color: #8b5cf6;
          }

          /* Projects Section */
          .projects-section {
            padding: 8rem 0;
          }

          .projects-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 2rem;
          }

          .project-card {
            padding: 2rem;
            position: relative;
            overflow: hidden;
            cursor: pointer;
          }

          .project-card.featured {
            border: 2px solid rgba(59, 130, 246, 0.3);
          }

          .project-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
          }

          .status-badge {
            padding: 0.25rem 0.5rem;
            border-radius: 6px;
            font-size: 0.7rem;
            text-transform: uppercase;
            font-weight: 600;
          }

          .status-badge.completed {
            background: rgba(16, 185, 129, 0.2);
            color: #10b981;
          }

          .status-badge.in-progress {
            background: rgba(59, 130, 246, 0.2);
            color: #3b82f6;
          }

          .featured-badge {
            display: flex;
            align-items: center;
            gap: 0.25rem;
            color: #fbbf24;
            font-size: 0.8rem;
          }

          .project-title {
            font-size: 1.3rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
          }

          .project-description {
            color: #94a3b8;
            line-height: 1.6;
            margin-bottom: 1rem;
          }

          .project-tech {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin-bottom: 2rem;
          }

          .tech-tag {
            padding: 0.25rem 0.5rem;
            background: rgba(59, 130, 246, 0.1);
            border: 1px solid rgba(59, 130, 246, 0.3);
            border-radius: 6px;
            font-size: 0.8rem;
            color: #3b82f6;
          }

          .project-actions {
            display: flex;
            gap: 1rem;
          }

          .btn-outline {
            background: transparent;
            border: 1px solid rgba(255, 255, 255, 0.3);
            color: white;
            padding: 0.75rem 1.5rem;
            border-radius: 8px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            transition: all 0.3s ease;
          }

          /* Contact Section */
          .contact-section {
            padding: 8rem 0;
          }

          .contact-content {
            display: grid;
            grid-template-columns: 1fr 2fr;
            gap: 4rem;
          }

          .contact-info {
            display: flex;
            flex-direction: column;
            gap: 2rem;
          }

          .contact-card {
            padding: 2rem;
            text-align: center;
          }

          .contact-icon {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: linear-gradient(45deg, #3b82f6, #8b5cf6);
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1rem;
            font-size: 1.5rem;
          }

          .contact-form {
            padding: 3rem;
          }

          .form-group {
            margin-bottom: 2rem;
          }

          .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            color: #94a3b8;
          }

          .form-group input,
          .form-group textarea {
            width: 100%;
            padding: 1rem;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 8px;
            color: white;
            font-size: 1rem;
          }

          .btn-full {
            width: 100%;
          }

          /* Footer */
          .footer {
            padding: 4rem 0 2rem;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
          }

          .footer-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2rem;
          }

          .footer-brand h3 {
            margin-bottom: 0.5rem;
          }

          .footer-social {
            display: flex;
            gap: 1rem;
          }

          .footer-social-link {
            width: 40px;
            height: 40px;
            border-radius: 8px;
            background: rgba(255, 255, 255, 0.1);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            text-decoration: none;
            transition: all 0.3s ease;
          }

          .footer-bottom {
            text-align: center;
            padding-top: 2rem;
            border-top: 1px solid rgba(255, 255, 255, 0.05);
            color: #94a3b8;
          }

          .footer-bottom p {
            margin-bottom: 0.5rem;
          }

          /* Responsive Design */
          @media (max-width: 768px) {
            .nav-links {
              display: none;
            }

            .mobile-menu-toggle {
              display: block;
            }

            .hero-container {
              grid-template-columns: 1fr;
              text-align: center;
            }

            .hero-title {
              font-size: 2.5rem;
            }

            .hero-stats {
              justify-content: center;
            }

            .contact-content {
              grid-template-columns: 1fr;
            }

            .footer-content {
              flex-direction: column;
              gap: 2rem;
            }
          }

          /* Particles background */
          .particles-bg {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
          }

          .particle {
            position: absolute;
            pointer-events: none;
          }
        `}</style>
      </div>
    </AnimatePresence>
  );
}
