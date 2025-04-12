import Head from 'next/head';
import { useState, useEffect } from 'react';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

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
        <div className="loader"></div>
        <style jsx>{`
          .loading-screen {
            height: 100vh;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #0f172a;
          }
          .loader {
            border: 5px solid rgba(255, 255, 255, 0.1);
            border-top: 5px solid #3498db;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="portfolio">
      <Head>
        <title>Senesh Fitzroy - Software Engineer</title>
        <meta name="description" content="Senesh Fitzroy - Software Engineer, Researcher, Entrepreneur and Model" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
      </Head>

      {/* Navigation */}
      <nav className="navbar">
        <div className="navbar-container">
          <div className="logo">SF</div>
          <ul className="nav-links">
            <li><a href="#about">About</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#experience">Experience</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <div className="theme-toggle">
            <i className="fas fa-moon"></i>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <div className="badge">Available for new opportunities</div>
            <h1>Senesh Fitzroy</h1>
            <h2>Software Engineer & Researcher</h2>
            <p>I build exceptional digital experiences with cutting-edge technologies</p>
            <div className="hero-buttons">
              <a href="#contact" className="btn primary-btn">Contact Me</a>
              <a href="#projects" className="btn secondary-btn">View Projects</a>
            </div>
            <div className="social-links">
              <a href="https://github.com/SeneshFitzroy" target="_blank" rel="noreferrer"><i className="fab fa-github"></i></a>
              <a href="https://linkedin.com/in/seneshfitzroy" target="_blank" rel="noreferrer"><i className="fab fa-linkedin"></i></a>
              <a href="mailto:seneshfitzroy@gmail.com"><i className="fas fa-envelope"></i></a>
            </div>
          </div>
          <div className="hero-image">
            <div className="image-container"></div>
          </div>
        </div>
        <div className="scroll-indicator">
          <a href="#about">
            <div className="mouse"></div>
            <span>Scroll Down</span>
          </a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about section">
        <div className="section-container">
          <div className="section-header">
            <h2>About Me</h2>
            <div className="divider"></div>
          </div>
          <div className="about-content">
            <div className="about-text">
              <p>I'm an undergraduate studying BSc (Hons) Software Engineering at Plymouth University, UK. With a passion for creating innovative software solutions, I combine strong technical skills with a strategic mindset.</p>
              <p>Beyond coding, I'm also a researcher, model, entrepreneur, and fitness enthusiast. I'm deeply involved in sustainability initiatives and community projects.</p>
              <div className="key-points">
                <div className="key-point">
                  <i className="fas fa-laptop-code"></i>
                  <h3>Software Engineer</h3>
                  <p>Building elegant solutions to complex problems</p>
                </div>
                <div className="key-point">
                  <i className="fas fa-search"></i>
                  <h3>Researcher</h3>
                  <p>Exploring cutting-edge technologies</p>
                </div>
                <div className="key-point">
                  <i className="fas fa-lightbulb"></i>
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
          <div className="section-header">
            <h2>My Skills</h2>
            <div className="divider"></div>
          </div>
          <div className="skills-content">
            <div className="skill-category">
              <h3>Programming Languages</h3>
              <div className="skill-tags">
                {skills.languages.map((skill, index) => (
                  <div key={index} className="skill-tag">{skill}</div>
                ))}
              </div>
            </div>
            <div className="skill-category">
              <h3>Frameworks & Libraries</h3>
              <div className="skill-tags">
                {skills.frameworks.map((skill, index) => (
                  <div key={index} className="skill-tag">{skill}</div>
                ))}
              </div>
            </div>
            <div className="skill-category">
              <h3>Tools & Technologies</h3>
              <div className="skill-tags">
                {skills.tools.map((skill, index) => (
                  <div key={index} className="skill-tag">{skill}</div>
                ))}
              </div>
            </div>
          </div>
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

      <style jsx global>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        body {
          font-family: 'Inter', sans-serif;
          line-height: 1.6;
          color: #333;
          background: #f9fafb;
        }
        
        a {
          color: inherit;
          text-decoration: none;
        }
        
        /* Navbar Styles */
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          background: rgba(255, 255, 255, 0.95);
          box-shadow: 0 1px 10px rgba(0, 0, 0, 0.05);
          z-index: 1000;
          backdrop-filter: blur(10px);
        }
        
        .navbar-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .logo {
          font-size: 1.5rem;
          font-weight: 700;
          color: #3b82f6;
          background: #ecf0ff;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .nav-links {
          display: flex;
          list-style: none;
        }
        
        .nav-links li {
          margin-left: 2rem;
        }
        
        .nav-links a {
          font-weight: 500;
          position: relative;
        }
        
        .nav-links a:after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          background: #3b82f6;
          bottom: -5px;
          left: 0;
          transition: width 0.3s ease;
        }
        
        .nav-links a:hover:after {
          width: 100%;
        }
        
        .theme-toggle {
          cursor: pointer;
          font-size: 1.2rem;
        }
        
        /* Hero Section */
        .hero {
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          padding: 2rem;
          background: linear-gradient(135deg, #f9fafb 0%, #ecf0ff 100%);
        }
        
        .hero-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }
        
        .hero-text {
          max-width: 600px;
        }
        
        .badge {
          display: inline-block;
          background: #ecf0ff;
          color: #3b82f6;
          font-size: 0.8rem;
          padding: 0.5rem 1rem;
          border-radius: 30px;
          margin-bottom: 1rem;
          font-weight: 500;
        }
        
        .hero h1 {
          font-size: 3.5rem;
          font-weight: 800;
          color: #111827;
          line-height: 1.1;
          margin-bottom: 1rem;
        }
        
        .hero h2 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #3b82f6;
          margin-bottom: 1.5rem;
        }
        
        .hero p {
          font-size: 1.2rem;
          color: #4b5563;
          margin-bottom: 2rem;
        }
        
        .hero-buttons {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
        }
        
        .btn {
          display: inline-block;
          padding: 0.8rem 1.5rem;
          border-radius: 5px;
          font-weight: 500;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        
        .primary-btn {
          background: #3b82f6;
          color: white;
          box-shadow: 0 4px 6px rgba(59, 130, 246, 0.25);
        }
        
        .primary-btn:hover {
          background: #2563eb;
          transform: translateY(-2px);
          box-shadow: 0 6px 10px rgba(59, 130, 246, 0.3);
        }
        
        .secondary-btn {
          background: transparent;
          color: #3b82f6;
          border: 2px solid #3b82f6;
        }
        
        .secondary-btn:hover {
          background: rgba(59, 130, 246, 0.1);
          transform: translateY(-2px);
        }
        
        .social-links {
          display: flex;
          gap: 1.5rem;
        }
        
        .social-links a {
          font-size: 1.5rem;
          color: #4b5563;
          transition: color 0.3s ease;
        }
        
        .social-links a:hover {
          color: #3b82f6;
        }
        
        .hero-image {
          flex: 0 0 40%;
        }
        
        .image-container {
          width: 350px;
          height: 350px;
          background: url('/profile-image.jpg') center center/cover no-repeat;
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          position: relative;
        }
        
        .image-container:before {
          content: '';
          position: absolute;
          top: -10px;
          left: -10px;
          width: 100%;
          height: 100%;
          border: 2px solid #3b82f6;
          border-radius: 20px;
          z-index: -1;
        }
        
        .scroll-indicator {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          text-align: center;
        }
        
        .mouse {
          width: 26px;
          height: 40px;
          border: 2px solid #4b5563;
          border-radius: 20px;
          margin: 0 auto 8px;
          position: relative;
        }
        
        .mouse:before {
          content: '';
          position: absolute;
          width: 4px;
          height: 8px;
          background: #4b5563;
          border-radius: 2px;
          top: 8px;
          left: 50%;
          transform: translateX(-50%);
          animation: scroll 1.5s infinite;
        }
        
        .scroll-indicator span {
          color: #4b5563;
          font-size: 0.8rem;
          font-weight: 500;
        }
        
        @keyframes scroll {
          0% { transform: translate(-50%, 0); opacity: 1; }
          100% { transform: translate(-50%, 15px); opacity: 0; }
        }
        
        /* Section Styles */
        .section {
          padding: 6rem 2rem;
        }
        
        .section:nth-child(even) {
          background: white;
        }
        
        .section-container {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .section-header {
          text-align: center;
          margin-bottom: 3rem;
        }
        
        .section-header h2 {
          font-size: 2rem;
          font-weight: 700;
          color: #111827;
        }
        
        .divider {
          width: 80px;
          height: 4px;
          background: #3b82f6;
          margin: 1rem auto 0;
          border-radius: 2px;
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
          color: #4b5563;
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
          padding: 2rem;
          background: white;
          border-radius: 10px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          transition: transform 0.3s ease;
        }
        
        .key-point:hover {
          transform: translateY(-10px);
        }
        
        .key-point i {
          font-size: 2rem;
          color: #3b82f6;
          margin-bottom: 1rem;
        }
        
        .key-point h3 {
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }
        
        .key-point p {
          color: #6b7280;
          margin-bottom: 0;
        }
        
        /* Skills Section */
        .skills-content {
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
        }
        
        .skill-category h3 {
          margin-bottom: 1rem;
          font-size: 1.3rem;
          font-weight: 600;
        }
        
        .skill-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
        }
        
        .skill-tag {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 5px;
          padding: 0.5rem 1rem;
          font-size: 0.9rem;
          font-weight: 500;
          color: #4b5563;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
        }
        
        .skill-tag:hover {
          background: #3b82f6;
          color: white;
          transform: translateY(-2px);
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
        
        /* Responsive Styles */
        @media (max-width: 992px) {
          .hero h1 {
            font-size: 3rem;
          }
          
          .hero-content {
            flex-direction: column;
            text-align: center;
          }
          
          .hero-text {
            margin-bottom: 3rem;
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
          
          .contact-content {
            flex-direction: column;
          }
          
          .key-points {
            flex-direction: column;
          }
        }
        
        @media (max-width: 768px) {
          .navbar-container {
            padding: 1rem;
          }
          
          .nav-links {
            display: none;
          }
          
          .section {
            padding: 4rem 1.5rem;
          }
          
          .hero h1 {
            font-size: 2.5rem;
          }
          
          .footer-content {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }
          
          .footer-links {
            margin-top: 1rem;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}
