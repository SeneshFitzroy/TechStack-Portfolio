import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  Sphere, 
  Box, 
  Torus, 
  Text3D, 
  Float, 
  MeshWobbleMaterial, 
  MeshDistortMaterial,
  OrbitControls,
  Environment,
  ContactShadows,
  PresentationControls
} from '@react-three/drei';
import * as THREE from 'three';

// Interactive Skill Orb
function SkillOrb({ position, color, label, skill }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.3;
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.2;
      
      if (hovered) {
        meshRef.current.scale.setScalar(1.2);
      } else {
        meshRef.current.scale.setScalar(1);
      }
    }
  });

  return (
    <group position={position}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <Sphere
          ref={meshRef}
          args={[0.5, 32, 32]}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onClick={() => setClicked(!clicked)}
        >
          <MeshWobbleMaterial
            color={hovered ? '#ffffff' : color}
            attach="material"
            factor={clicked ? 0.8 : 0.3}
            speed={2}
            roughness={0.2}
            metalness={0.8}
          />
        </Sphere>
        
        {hovered && (
          <Text
            position={[0, 0.8, 0]}
            fontSize={0.2}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
          >
            {label}
          </Text>
        )}
      </Float>
    </group>
  );
}

// Project Card 3D
function ProjectCard3D({ position, project, index }) {
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() + index) * 0.1;
    }
  });

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.3}>
        <Box args={[2, 1.2, 0.1]} scale={hovered ? 1.1 : 1}>
          <MeshDistortMaterial
            color={hovered ? '#3b82f6' : '#1e293b'}
            attach="material"
            distort={0.2}
            speed={2}
            roughness={0.4}
            metalness={0.6}
          />
        </Box>
        
        <Text
          position={[0, 0.3, 0.06]}
          fontSize={0.15}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          maxWidth={1.8}
        >
          {project.title}
        </Text>
        
        <Text
          position={[0, 0, 0.06]}
          fontSize={0.08}
          color="#94a3b8"
          anchorX="center"
          anchorY="middle"
          maxWidth={1.8}
        >
          {project.description.substring(0, 50)}...
        </Text>
        
        <Text
          position={[0, -0.3, 0.06]}
          fontSize={0.06}
          color="#10b981"
          anchorX="center"
          anchorY="middle"
          maxWidth={1.8}
        >
          {project.technologies.join(' • ')}
        </Text>
      </Float>
    </group>
  );
}

// Skills Galaxy
export function SkillsGalaxy({ skills }) {
  const skillsArray = Object.entries(skills).flatMap(([category, items]) => 
    items.map(skill => ({ ...skill, category }))
  );

  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 60 }}
      style={{ height: '500px' }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
      
      {skillsArray.map((skill, index) => {
        const angle = (index / skillsArray.length) * Math.PI * 2;
        const radius = 4;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const z = (Math.random() - 0.5) * 3;
        
        return (
          <SkillOrb
            key={index}
            position={[x, y, z]}
            color={`hsl(${index * 30}, 70%, 60%)`}
            label={skill.name}
            skill={skill}
          />
        );
      })}
      
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
      <Environment preset="sunset" />
    </Canvas>
  );
}

// Projects 3D Gallery
export function Projects3DGallery({ projects }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 75 }}
      style={{ height: '600px' }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={1} />
      
      {projects.map((project, index) => {
        const x = (index % 2) * 4 - 2;
        const y = Math.floor(index / 2) * 2 - 1;
        const z = 0;
        
        return (
          <ProjectCard3D
            key={index}
            position={[x, y, z]}
            project={project}
            index={index}
          />
        );
      })}
      
      <ContactShadows opacity={0.4} scale={10} blur={1} far={10} resolution={256} color="#000000" />
      <PresentationControls
        enabled={true}
        global={false}
        cursor={true}
        snap={false}
        speed={1}
        zoom={1}
        rotation={[0, 0, 0]}
        polar={[-Math.PI / 4, Math.PI / 4]}
        azimuth={[-Math.PI / 4, Math.PI / 4]}
      >
        <OrbitControls enableZoom={false} />
      </PresentationControls>
      <Environment preset="city" />
    </Canvas>
  );
}

// Floating Logo 3D
export function FloatingLogo3D() {
  const groupRef = useRef();

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.5;
      groupRef.current.position.y = Math.sin(clock.getElapsedTime()) * 0.2;
    }
  });

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      style={{ height: '200px', width: '200px' }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      
      <group ref={groupRef}>
        <Torus args={[1, 0.3, 16, 100]}>
          <MeshWobbleMaterial
            color="#3b82f6"
            attach="material"
            factor={0.6}
            speed={2}
            roughness={0.1}
            metalness={0.8}
          />
        </Torus>
        
        <Sphere args={[0.5, 32, 32]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color="#10b981"
            attach="material"
            distort={0.3}
            speed={2}
            roughness={0.2}
            metalness={0.6}
          />
        </Sphere>
      </group>
      
      <Environment preset="dawn" />
    </Canvas>
  );
}