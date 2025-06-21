import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { toast } from 'react-hot-toast';
import CountUp from 'react-countup';
import confetti from 'canvas-confetti';

// Dynamic imports for 3D components (client-side only)
const Scene3D = dynamic(() => import('../components/Scene3D'), { ssr: false });
const LoadingScreen = dynamic(() => import('../components/LoadingScreen'), { ssr: false });
const Interactive3D = dynamic(() => import('../components/Interactive3D'), { ssr: false });

// Import advanced components
import {
  ScrollReveal,
  StaggerContainer,
  StaggerItem,
  FloatingElement,
  TypewriterText,
  ParallaxMouseEffect,
  MagneticButton3D,
  GlowingCard,
  AnimatedCounter,
  PulseButton,
  MorphingText,
  ParallaxSection
} from '../components/AdvancedAnimations';
import {
  HoverTiltCard,
  MouseFollowerDot,
  InfiniteScroll,
  AdvancedCursor
} from '../components/AdvancedInteractions';
import Certifications from '../components/Certifications';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Initialize loading
    const timer = setTimeout(() => {
      setLoading(false);
      // Show welcome toast
      setTimeout(() => {
        toast.success('🚀 Welcome to my Advanced Portfolio!', {
          duration: 4000,
          style: {
            background: '#1f2937',
            color: '#fff',
            border: '1px solid #3b82f6'
          }
        });
      }, 500);
    }, 2000);

    // Mouse tracking
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      clearTimeout(timer);
      if (typeof window !== 'undefined') {
        window.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  // Celebration function
  const celebrate = () => {
    if (typeof window !== 'undefined') {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      toast.success('🎉 Thanks for exploring my portfolio!');
    }
  };

  if (loading && typeof window !== 'undefined') {
    return <LoadingScreen />;
  }

  const projects = [
    {
      title: "AI-Powered Web Application",
      description: "Full-stack application with machine learning integration, real-time data processing, and advanced analytics dashboard.",
      tech: ["React", "Node.js", "TensorFlow", "PostgreSQL", "AWS"],
      image: "/assets/project-fallback.webp",
      gradient: "from-blue-400 to-purple-600"
    },
    {
      title: "3D Interactive Portfolio",
      description: "This very portfolio - showcasing advanced 3D graphics, animations, and modern web technologies.",
      tech: ["Next.js", "Three.js", "Framer Motion", "GSAP", "WebGL"],
      image: "/assets/project-fallback.webp",
      gradient: "from-purple-400 to-pink-600"
    },
    {
      title: "E-Commerce Platform",
      description: "Scalable e-commerce solution with microservices architecture, payment integration, and real-time inventory management.",
      tech: ["React", "Node.js", "MongoDB", "Redis", "Docker"],
      image: "/assets/project-fallback.webp",
      gradient: "from-green-400 to-blue-600"
    },
    {
      title: "IoT Data Dashboard",
      description: "Real-time IoT data visualization platform with predictive analytics and automated alerting systems.",
      tech: ["Vue.js", "Python", "InfluxDB", "Grafana", "Kubernetes"],
      image: "/assets/project-fallback.webp",
      gradient: "from-orange-400 to-red-600"
    }
  ];

  const skills = [
    { name: "React/Next.js", level: 95, icon: "⚛️" },
    { name: "TypeScript", level: 90, icon: "📘" },
    { name: "Node.js", level: 88, icon: "🟢" },
    { name: "Python", level: 85, icon: "🐍" },
    { name: "Three.js/WebGL", level: 80, icon: "🎮" },
    { name: "AI/ML", level: 82, icon: "🤖" },
    { name: "AWS/Cloud", level: 78, icon: "☁️" },
    { name: "DevOps", level: 75, icon: "⚙️" }
  ];
  return (
    <>
      <Head>
        <title>Senesh Fitzroy - Advanced Full-Stack Developer Portfolio</title>
        <meta name="description" content="Advanced Full-Stack Developer & AI Specialist - Creating cutting-edge web applications with modern technologies" />
        <meta name="keywords" content="Full-Stack Developer, AI Specialist, React, Next.js, Three.js, TypeScript, Node.js, Portfolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="Senesh Fitzroy - Advanced Full-Stack Developer" />
        <meta property="og:description" content="Creating stunning web experiences with cutting-edge technology" />
        <meta property="og:type" content="website" />
      </Head>

      {/* Advanced Cursor */}
      {typeof window !== 'undefined' && <AdvancedCursor />}
      {typeof window !== 'undefined' && <MouseFollowerDot />}

      <main className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
        
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center">
          <div className="absolute inset-0 z-0">
            {typeof window !== 'undefined' && <Scene3D />}
          </div>
          
          <ParallaxMouseEffect mousePosition={mousePosition}>
            <div className="relative z-10 text-center">
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, type: "spring" }}
              >
                <FloatingElement>
                  <motion.h1 
                    className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
                    whileHover={{ scale: 1.05 }}
                  >
                    <TypewriterText text="Senesh Fitzroy" />
                  </motion.h1>
                </FloatingElement>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <MorphingText 
                  texts={[
                    "Full-Stack Developer",
                    "AI Specialist", 
                    "3D Graphics Expert",
                    "Cloud Architect",
                    "Innovation Creator"
                  ]}
                  className="text-2xl md:text-3xl text-gray-300 mb-8"
                />
              </motion.div>

              <motion.div
                className="flex flex-wrap gap-4 justify-center mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                <MagneticButton3D onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}>
                  🚀 View Projects
                </MagneticButton3D>
                <PulseButton onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>
                  💬 Contact Me
                </PulseButton>
                <PulseButton onClick={celebrate} variant="outline">
                  🎉 Celebrate
                </PulseButton>
              </motion.div>

              {/* Stats */}
              <motion.div 
                className="grid grid-cols-3 gap-8 max-w-md mx-auto"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.9 }}
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">
                    <CountUp end={50} duration={2.5} />+
                  </div>
                  <div className="text-sm text-gray-400">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400">
                    <CountUp end={5} duration={2.5} />+
                  </div>
                  <div className="text-sm text-gray-400">Years Exp</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-pink-400">
                    <CountUp end={100} duration={2.5} />%
                  </div>
                  <div className="text-sm text-gray-400">Satisfaction</div>
                </div>
              </motion.div>
            </div>
          </ParallaxMouseEffect>
        </section>

        {/* About Section */}
        <ParallaxSection className="relative z-10 py-20 bg-black/20">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-5xl font-bold text-white mb-8">
                  About Me
                </h2>
                <p className="text-xl text-gray-300 leading-relaxed mb-8">
                  I'm a passionate full-stack developer who loves creating innovative digital experiences. 
                  With expertise in modern web technologies, AI/ML, and 3D graphics, I transform complex 
                  ideas into elegant, scalable solutions that make a real impact.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <GlowingCard>
                    <div className="text-3xl mb-2">🎯</div>
                    <div className="text-white font-semibold">Precision</div>
                  </GlowingCard>
                  <GlowingCard>
                    <div className="text-3xl mb-2">🚀</div>
                    <div className="text-white font-semibold">Innovation</div>
                  </GlowingCard>
                  <GlowingCard>
                    <div className="text-3xl mb-2">⚡</div>
                    <div className="text-white font-semibold">Performance</div>
                  </GlowingCard>
                  <GlowingCard>
                    <div className="text-3xl mb-2">🎨</div>
                    <div className="text-white font-semibold">Creativity</div>
                  </GlowingCard>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </ParallaxSection>

        {/* Skills Section */}
        <section className="relative z-10 py-20">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <h2 className="text-5xl font-bold text-center text-white mb-16">
                Technical Expertise
              </h2>
            </ScrollReveal>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {skills.map((skill, index) => (
                <ScrollReveal key={skill.name} delay={index * 0.1}>
                  <HoverTiltCard>
                    <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <span className="text-2xl mr-3">{skill.icon}</span>
                          <span className="text-white font-semibold">{skill.name}</span>
                        </div>
                        <span className="text-blue-400 font-bold">{skill.level}%</span>
                      </div>
                      <div className="bg-gray-700 rounded-full h-2">
                        <motion.div
                          className="bg-gradient-to-r from-blue-400 to-purple-600 h-2 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1.5, delay: index * 0.1 }}
                        />
                      </div>
                    </div>
                  </HoverTiltCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="relative z-10 py-20 bg-black/20">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <h2 className="text-5xl font-bold text-center text-white mb-16">
                Featured Projects
              </h2>
            </ScrollReveal>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <ScrollReveal key={index} delay={index * 0.2}>
                  <HoverTiltCard>
                    <motion.div 
                      className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 group"
                      whileHover={{ y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className={`h-48 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
                        <motion.div
                          className="absolute inset-0 bg-black/20"
                          whileHover={{ bg: 'transparent' }}
                        />
                        <div className="absolute bottom-4 left-4">
                          <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                        </div>
                      </div>
                      <div className="p-6">
                        <p className="text-gray-300 mb-4">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tech.map((tech, techIndex) => (
                            <span 
                              key={techIndex}
                              className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        <div className="flex gap-4">
                          <PulseButton size="sm">View Demo</PulseButton>
                          <PulseButton size="sm" variant="outline">View Code</PulseButton>
                        </div>
                      </div>
                    </motion.div>
                  </HoverTiltCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive 3D Section */}
        <section className="relative z-10 py-20">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <h2 className="text-5xl font-bold text-center text-white mb-16">
                Interactive Experience
              </h2>
            </ScrollReveal>
            <div className="max-w-4xl mx-auto">
              {typeof window !== 'undefined' && (
                <div className="h-96 rounded-xl overflow-hidden">
                  <Interactive3D />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Certifications Section */}
        <section className="relative z-10 py-20">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <h2 className="text-4xl font-bold text-center text-white mb-12">
                Certifications & Achievements
              </h2>
            </ScrollReveal>
            <Certifications />
          </div>
        </section>

        {/* Skills Section */}
        <section className="relative z-10 py-20">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <h2 className="text-4xl font-bold text-center text-white mb-12">
                Technical Skills
              </h2>
            </ScrollReveal>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <ScrollReveal direction="left" delay={0}>
                <div className="text-center">
                  <div className="text-5xl mb-4">⚛️</div>
                  <h3 className="text-xl font-bold text-white mb-2">Frontend</h3>
                  <p className="text-gray-300">React, Next.js, TypeScript, Tailwind CSS, Three.js</p>
                </div>
              </ScrollReveal>
              
              <ScrollReveal direction="left" delay={0.1}>
                <div className="text-center">
                  <div className="text-5xl mb-4">🔧</div>
                  <h3 className="text-xl font-bold text-white mb-2">Backend</h3>
                  <p className="text-gray-300">Node.js, Python, Firebase, PostgreSQL, MongoDB</p>
                </div>
              </ScrollReveal>
              
              <ScrollReveal direction="left" delay={0.2}>
                <div className="text-center">
                  <div className="text-5xl mb-4">🤖</div>
                  <h3 className="text-xl font-bold text-white mb-2">AI/ML</h3>
                  <p className="text-gray-300">TensorFlow, PyTorch, Computer Vision, NLP</p>
                </div>
              </ScrollReveal>
              
              <ScrollReveal direction="left" delay={0.3}>
                <div className="text-center">
                  <div className="text-5xl mb-4">☁️</div>
                  <h3 className="text-xl font-bold text-white mb-2">Cloud</h3>
                  <p className="text-gray-300">AWS, Azure, Docker, Kubernetes, DevOps</p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="relative z-10 py-20 bg-black/30">
          <div className="container mx-auto px-4 text-center">
            <ScrollReveal>
              <h2 className="text-4xl font-bold text-white mb-8">
                Let's Build Something Amazing Together
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Ready to bring your ideas to life with cutting-edge technology and innovative solutions.
              </p>
              <div className="space-x-4">
                <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
                  Get In Touch
                </button>
                <button className="px-8 py-3 border border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white font-semibold rounded-lg transition-colors">
                  Download Resume
                </button>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
    </>
  );
}
