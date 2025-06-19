import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text3D, Center, Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import { useRef, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';

function SkillOrb({ skill, position, index }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + index) * 0.2;
    }
  });

  const color = useMemo(() => {
    const colors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'];
    return colors[index % colors.length];
  }, [index]);

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh
        ref={meshRef}
        position={position}
        scale={hovered ? 1.2 : 1}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <Sphere args={[0.8, 32, 32]}>
          <MeshDistortMaterial
            color={color}
            distort={hovered ? 0.6 : 0.3}
            speed={2}
            transparent
            opacity={0.8}
          />
        </Sphere>
        <Center>
          <Text3D
            font="/fonts/helvetiker_regular.typeface.json"
            size={0.15}
            height={0.02}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.02}
            bevelSize={0.02}
            bevelOffset={0}
            bevelSegments={5}
          >
            {skill.name}
            <meshNormalMaterial />
          </Text3D>
        </Center>
      </mesh>
    </Float>
  );
}

function Skills3D({ skills }) {
  const allSkills = Object.values(skills).flat();
  
  const positions = useMemo(() => {
    return allSkills.map((_, index) => {
      const angle = (index / allSkills.length) * Math.PI * 2;
      const radius = 4 + Math.random() * 2;
      return [
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 4,
        Math.sin(angle) * radius
      ];
    });
  }, [allSkills.length]);

  return (
    <div className="skills-3d-container">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <pointLight position={[-10, -10, -10]} color="#8b5cf6" />
        
        {allSkills.map((skill, index) => (
          <SkillOrb
            key={skill.name}
            skill={skill}
            position={positions[index]}
            index={index}
          />
        ))}
      </Canvas>
    </div>
  );
}

function ProjectCard3D({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, rotateY: -30, z: -100 }}
      animate={{ opacity: 1, rotateY: 0, z: 0 }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      whileHover={{
        rotateY: 10,
        rotateX: 5,
        scale: 1.05,
        z: 50,
        transition: { duration: 0.3 }
      }}
      className="project-card-3d"
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      <motion.div
        className="project-card-inner"
        whileHover={{ rotateY: 180 }}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="project-card-front">
          <div className="project-glow"></div>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <div className="tech-stack">
            {project.technologies.map((tech, i) => (
              <span key={i} className="tech-tag-3d">{tech}</span>
            ))}
          </div>
        </div>
        <div className="project-card-back">
          <div className="project-details">
            <h4>Project Features</h4>
            <ul>
              <li>✨ Advanced Architecture</li>
              <li>🚀 High Performance</li>
              <li>📱 Responsive Design</li>
              <li>🔒 Secure Implementation</li>
            </ul>
            <motion.a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="view-project-btn"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              View on GitHub
            </motion.a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function InteractiveTimeline({ experiences }) {
  return (
    <div className="timeline-3d">
      {experiences.map((exp, index) => (
        <motion.div
          key={index}
          className="timeline-item-3d"
          initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.2, duration: 0.8 }}
          whileHover={{
            scale: 1.05,
            rotateX: 5,
            rotateY: index % 2 === 0 ? 5 : -5,
            transition: { duration: 0.3 }
          }}
        >
          <div className="timeline-content-3d">
            <motion.div
              className="timeline-date-3d"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: index * 0.2 + 0.3, type: 'spring' }}
            >
              {exp.startDate} - {exp.endDate}
            </motion.div>
            <h3>{exp.title}</h3>
            <p className="timeline-company">{exp.organization}</p>
            <ul className="timeline-responsibilities">
              {exp.responsibilities.map((resp, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 + i * 0.1 }}
                >
                  {resp}
                </motion.li>
              ))}
            </ul>
          </div>
          <div className="timeline-connector-3d"></div>
        </motion.div>
      ))}
    </div>
  );
}

export { Skills3D, ProjectCard3D, InteractiveTimeline };
