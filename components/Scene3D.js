import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, Sphere, MeshDistortMaterial, Float, Text3D, Center, Environment } from '@react-three/drei';
import { useRef, useMemo, useState } from 'react';
import { Vector3, Color, MathUtils } from 'three';
import * as THREE from 'three';

function FloatingGeometry({ position, speed = 1, scale = 1 }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01 * speed;
      meshRef.current.rotation.y += 0.01 * speed;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh
        ref={meshRef}
        position={position}
        scale={hovered ? scale * 1.2 : scale}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <icosahedronGeometry args={[1, 0]} />
        <MeshDistortMaterial
          color={hovered ? "#3b82f6" : "#8b5cf6"}
          distort={0.6}
          speed={2}
          roughness={0.1}
        />
      </mesh>
    </Float>
  );
}

function ParticleField() {
  const points = useRef();
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.x = state.clock.elapsedTime * 0.05;
      points.current.rotation.y = state.clock.elapsedTime * 0.075;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#8b5cf6" transparent opacity={0.6} />
    </points>
  );
}

function AnimatedSphere() {
  const sphereRef = useRef();
  
  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      sphereRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Sphere ref={sphereRef} args={[2, 64, 64]} position={[0, 0, 0]}>
      <MeshDistortMaterial
        color="#3b82f6"
        distort={0.4}
        speed={2}
        transparent
        opacity={0.8}
        wireframe
      />
    </Sphere>
  );
}

function Scene3D({ darkMode }) {
  return (
    <div className="scene-3d-container">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 50 }}
        style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1
        }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[0, 10, 0]} intensity={0.5} color="#3b82f6" />
        
        <Stars 
          radius={50} 
          depth={50} 
          count={1000} 
          factor={4} 
          saturation={0} 
          fade 
          speed={1}
        />
        
        <ParticleField />
        
        <FloatingGeometry position={[-5, 2, -5]} speed={0.8} scale={0.8} />
        <FloatingGeometry position={[5, -2, -3]} speed={1.2} scale={1.2} />
        <FloatingGeometry position={[0, 0, -8]} speed={1} scale={1} />
        <FloatingGeometry position={[-3, -3, 2]} speed={0.6} scale={0.6} />
        <FloatingGeometry position={[4, 4, 1]} speed={1.4} scale={0.9} />
        
        <AnimatedSphere />
        
        <Environment preset="night" />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
    </div>
  );
}

export default Scene3D;
