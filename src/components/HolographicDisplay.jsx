import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useRef, useEffect, Suspense } from 'react';

function EyeModel() {
  const groupRef = useRef();

  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = 0;
    }
  }, []);

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Sclera (White of the eye) */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1.2, 64, 64]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#1a1a2e"
          emissiveIntensity={0.1}
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>

      {/* Iris and Pupil (Detailed) */}
      <mesh position={[0, 0, 1.15]}>
        {/* Iris */}
        <cylinderGeometry args={[0.5, 0.5, 0.2, 64]} />
        <meshStandardMaterial
          color="#6B4423"
          emissive="#00d4ff"
          emissiveIntensity={0.3}
          metalness={0.2}
          roughness={0.3}
        />
      </mesh>

      {/* Pupil */}
      <mesh position={[0, 0, 1.2]}>
        <circleGeometry args={[0.25, 64]} />
        <meshStandardMaterial
          color="#000000"
          emissive="#00d4ff"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Light reflection (Corneal reflection) */}
      <mesh position={[0.15, 0.15, 1.25]}>
        <sphereGeometry args={[0.12, 32, 32]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={0.8}
        />
      </mesh>

      {/* Cornea (transparent layer) */}
      <mesh position={[0, 0, 1.18]}>
        <sphereGeometry args={[0.55, 64, 64]} />
        <meshStandardMaterial
          color="#e8f4f8"
          transparent={true}
          opacity={0.1}
          metalness={0.8}
          roughness={0.1}
          emissive="#00d4ff"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Retinal blood vessels pattern */}
      <mesh position={[0, 0, 1.21]}>
        <sphereGeometry args={[0.48, 64, 64]} />
        <meshStandardMaterial
          color="#ff4444"
          wireframe={true}
          transparent={true}
          opacity={0.3}
          emissive="#ff4444"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Upper eyelid */}
      <mesh position={[0, 0.6, 0.5]}>
        <boxGeometry args={[2.5, 0.3, 0.1]} />
        <meshStandardMaterial
          color="#8B7355"
          emissive="#1a1a2e"
          emissiveIntensity={0.05}
        />
      </mesh>

      {/* Lower eyelid */}
      <mesh position={[0, -0.6, 0.5]}>
        <boxGeometry args={[2.5, 0.3, 0.1]} />
        <meshStandardMaterial
          color="#8B7355"
          emissive="#1a1a2e"
          emissiveIntensity={0.05}
        />
      </mesh>

      {/* Optic nerve connection visualization */}
      <mesh position={[0, 0, -0.8]}>
        <coneGeometry args={[0.3, 0.8, 32]} />
        <meshStandardMaterial
          color="#00d4ff"
          wireframe={true}
          emissive="#00d4ff"
          emissiveIntensity={0.4}
          transparent={true}
          opacity={0.6}
        />
      </mesh>

      {/* Vitreous humor glow */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1.0, 64, 64]} />
        <meshStandardMaterial
          color="#4a90e2"
          wireframe={true}
          transparent={true}
          opacity={0.15}
          emissive="#00d4ff"
          emissiveIntensity={0.2}
        />
      </mesh>
    </group>
  );
}

function AnimatedParticles() {
  const particlesRef = useRef();

  useEffect(() => {
    let animationId;
    const animate = () => {
      if (particlesRef.current) {
        particlesRef.current.rotation.z += 0.001;
        particlesRef.current.rotation.x += 0.0005;
      }
      animationId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <group ref={particlesRef}>
      {/* Orbiting diagnostic particles */}
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[Math.cos(i) * 2, Math.sin(i) * 1.5, 0.5]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial 
            emissive="#00ff88" 
            emissiveIntensity={0.8}
            color="#00ff88"
          />
        </mesh>
      ))}
    </group>
  );
}

function LoadingFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-ink to-ink/80">
      <div className="text-center">
        <div className="text-4xl mb-4">👁️</div>
        <p className="text-white/70">Loading 3D Eye Model...</p>
      </div>
    </div>
  );
}

export default function HolographicDisplay() {
  try {
    return (
      <div className="w-full h-full bg-gradient-to-b from-ink to-ink/80">
        <Suspense fallback={<LoadingFallback />}>
          <Canvas gl={{ antialias: true, alpha: true }}>
            <PerspectiveCamera makeDefault position={[0, 0, 3.5]} fov={75} />
            <color attach="background" args={['#0B1F3A']} />
            
            {/* Advanced Lighting for realistic eye */}
            <ambientLight intensity={0.4} color="#ffffff" />
            <pointLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
            <pointLight position={[-5, -5, 3]} intensity={0.8} color="#00d4ff" />
            <pointLight position={[0, 0, 3]} intensity={1.2} color="#ffffff" />
            <directionalLight position={[10, 10, 5]} intensity={0.8} color="#ffffff" />

            {/* 3D Eye Model */}
            <EyeModel />
            <AnimatedParticles />

            {/* Controls */}
            <OrbitControls 
              enableZoom={true}
              enablePan={true}
              autoRotate={true}
              autoRotateSpeed={1}
              minDistance={2}
              maxDistance={6}
            />
          </Canvas>
        </Suspense>
      </div>
    );
  } catch (error) {
    console.error('3D Visualization Error:', error);
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-ink to-ink/80">
        <div className="text-center">
          <p className="text-red-400">3D Visualization Unavailable</p>
          <p className="text-white/50 text-sm mt-2">Please refresh the page</p>
        </div>
      </div>
    );
  }
}
