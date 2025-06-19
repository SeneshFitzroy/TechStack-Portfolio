import { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Text, Float, Stars, Environment, Preload } from '@react-three/drei';
import * as THREE from 'three';

// Animated 3D Sphere
function AnimatedSphere() {
  const meshRef = useRef();
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1, 64, 64]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#3b82f6"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.4}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
}

// Floating Particles
function FloatingParticles() {
  const particlesRef = useRef();
  const particleCount = 100;

  const positions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, []);

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.x = clock.getElapsedTime() * 0.05;
      particlesRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#8b5cf6" />
    </points>
  );
}

// 3D Text Component
function AnimatedText({ text, position }) {
  const textRef = useRef();

  useFrame(({ clock }) => {
    if (textRef.current) {
      textRef.current.rotation.y = Math.sin(clock.getElapsedTime()) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5}>
      <Text
        ref={textRef}
        position={position}
        fontSize={0.5}
        color="#10b981"
        anchorX="center"
        anchorY="middle"
      >
        {text}
      </Text>
    </Float>
  );
}

// Main 3D Scene
export default function Scene3D({ darkMode }) {
  return (
    <div style={{ height: '100vh', width: '100%', position: 'absolute', top: 0, left: 0, zIndex: -1 }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => {
          gl.setClearColor(darkMode ? 0x000000 : 0xffffff, 0);
        }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
        
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />
        
        <AnimatedSphere />
        <FloatingParticles />
        <AnimatedText text="Welcome" position={[-3, 2, 0]} />
        <AnimatedText text="Portfolio" position={[3, -2, 0]} />
        
        <Environment preset="sunset" />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={true}
          autoRotate
          autoRotateSpeed={0.5}
        />
        <Preload all />
      </Canvas>
    </div>
  );
}