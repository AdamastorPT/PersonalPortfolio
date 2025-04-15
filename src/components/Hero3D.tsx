import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, useTexture, Html, Environment } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { TextureLoader } from 'three';
import { Logo3D } from './Logo3D';

function Globe() {
  const globeRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  const [
    earthMap,
    earthNormalMap,
    earthSpecularMap,
    earthCloudsMap
  ] = useLoader(TextureLoader, [
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg',
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg',
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg',
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png'
  ]);

  const atmosphereMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          gl_FragColor = vec4(0.3, 0.6, 1.0, 1.0) * intensity;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide
    });
  }, []);

  useFrame((state) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.0005;
      const t = state.clock.getElapsedTime();
      globeRef.current.rotation.x = Math.sin(t / 8) * 0.02;
    }
  });

  return (
    <group>
      <mesh scale={[1.2, 1.2, 1.2]}>
        <sphereGeometry args={[1, 64, 64]} />
        <primitive object={atmosphereMaterial} attach="material" />
      </mesh>

      <mesh
        ref={globeRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? [1.05, 1.05, 1.05] : [1, 1, 1]}
      >
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhongMaterial
          map={earthMap}
          normalMap={earthNormalMap}
          specularMap={earthSpecularMap}
          shininess={5}
        />
      </mesh>

      <mesh scale={[1.003, 1.003, 1.003]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhongMaterial
          map={earthCloudsMap}
          transparent={true}
          opacity={0.4}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

function Key({ position, size = [0.12, 0.01, 0.12] }: { position: [number, number, number]; size?: [number, number, number] }) {
  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshPhysicalMaterial
        color="#2a2a2a"
        metalness={0.8}
        roughness={0.4}
        clearcoat={0.5}
        clearcoatRoughness={0.3}
      />
    </mesh>
  );
}

function Laptop() {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  const createKeyboard = () => {
    const keys = [];
    const keySize = 0.08;
    const gap = 0.015;
    const rows = 6;
    const keysPerRow = 15;
    const keyboardWidth = (keySize + gap) * keysPerRow - gap;
    const keyboardHeight = (keySize + gap) * rows - gap;
    const startX = -keyboardWidth / 2;
    const startY = -keyboardHeight / 2;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < keysPerRow; col++) {
        const x = startX + col * (keySize + gap);
        const y = startY + row * (keySize + gap);
        keys.push(
          <Key
            key={`key-${row}-${col}`}
            position={[x, 0.001, y]}
            size={[keySize, 0.008, keySize]}
          />
        );
      }
    }
    return keys;
  };

  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.getElapsedTime();
      groupRef.current.position.y = Math.sin(t * 0.5) * 0.05;
    }
  });

  return (
    <group
      ref={groupRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.02 : 1}
    >
      {/* Base/Bottom part */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[3, 0.08, 2]} />
        <meshPhysicalMaterial
          color="#1a1a1a"
          metalness={0.9}
          roughness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.2}
          reflectivity={1}
        />
      </mesh>

      {/* Keyboard base */}
      <mesh position={[0, 0.04, 0]} castShadow>
        <boxGeometry args={[2.8, 0.001, 1.8]} />
        <meshPhysicalMaterial
          color="#252525"
          metalness={0.7}
          roughness={0.3}
          clearcoat={0.5}
          clearcoatRoughness={0.4}
        />
      </mesh>

      {/* Individual keys */}
      <group position={[0, 0.041, -0.2]}>
        {createKeyboard()}
      </group>

      {/* Trackpad */}
      <mesh position={[0, 0.042, 0.5]} castShadow>
        <boxGeometry args={[0.8, 0.001, 0.5]} />
        <meshPhysicalMaterial
          color="#1a1a1a"
          metalness={0.5}
          roughness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.1}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Screen assembly */}
      <group position={[0, 0.6, -0.9]} rotation={[-0.5, 0, 0]}>
        {/* Screen frame */}
        <mesh castShadow>
          <boxGeometry args={[3, 1.4, 0.08]} />
          <meshPhysicalMaterial
            color="#1a1a1a"
            metalness={0.9}
            roughness={0.2}
            clearcoat={1}
            clearcoatRoughness={0.2}
            reflectivity={1}
          />
        </mesh>

        {/* Logo */}
        <mesh position={[0, -0.8, -0.041]}>
          <circleGeometry args={[0.08, 32]} />
          <meshPhysicalMaterial
            color="#1a1a1a"
            metalness={0.9}
            roughness={0.2}
            clearcoat={1}
            clearcoatRoughness={0.2}
            reflectivity={1}
          />
        </mesh>

        {/* Dobradiças do laptop */}

      </group>
    </group>
  );
}

function WebDesignScene() {
  return (
    <>
      <Environment preset="apartment" intensity={0.7} />
      <group>
        <Laptop />
        
        {/* Enhanced lighting setup */}
        <ambientLight intensity={0.5} />
        <spotLight
          position={[5, 5, 5]}
          angle={0.3}
          penumbra={1}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-5, 5, -5]} intensity={0.5} />
        <pointLight position={[0, 5, 5]} intensity={0.3} color="#8b5cf6" />
      </group>
    </>
  );
}

function AboutSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-8 shadow-xl">
          <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            About Me
          </h3>
          <p className="text-gray-700 leading-relaxed mb-6 text-lg">
          My name is João Oliveira, a 21-year-old Front-End Developer based in Coimbra, Portugal. I am currently pursuing a degree in Multimedia, while actively working on sharpening my skills and knowledge in web development.
          <p>______________________________</p>
          With over five years of experience in programming, I have cultivated a strong foundation in front-end technologies through a self-taught journey, combined with academic studies. I am passionate about crafting intuitive, accessible, and responsive user interfaces, and I take pride in writing clean, maintainable code.
          <p>______________________________</p>
          Driven by curiosity and continuous learning, I am constantly exploring new tools, frameworks, and best practices to stay up to date in the ever-evolving tech landscape. I strive to bridge the gap between design and development, delivering user-focused digital experiences that are both functional and visually engaging.
          
          </p>
          <div className="flex flex-wrap gap-3 mb-8">
            <span className="px-4 py-2 bg-purple-100 text-purple-600 rounded-full text-sm font-medium">
              Problem Solver
            </span>
            <span className="px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
              Tech Enthusiast
            </span>
            <span className="px-4 py-2 bg-indigo-100 text-indigo-600 rounded-full text-sm font-medium">
              Creative Thinker
            </span>
          </div>
          <div className="space-y-4">
            <h4 className="text-xl font-semibold text-gray-800">My Focus Areas</h4>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-700">
                <span className="w-2 h-2 bg-purple-600 rounded-full mr-3"></span>
                Modern Web Applications
              </li>
              <li className="flex items-center text-gray-700">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                Responsive Design / 3D Implementation
              </li>
              <li className="flex items-center text-gray-700">
                <span className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></span>
                Performance Optimization
              </li>
              <li className="flex items-center text-gray-700">
                <span className="w-2 h-2 bg-violet-600 rounded-full mr-3"></span>
                Website Development
              </li>
            </ul>
          </div>
        </div>
        <div className="relative h-[400px] lg:h-[600px]">
          <Canvas
            camera={{ position: [0, 2, 5], fov: 45 }}
            className="absolute inset-0"
            shadows
          >
            <WebDesignScene />
            <OrbitControls
              enableZoom={true}
              minDistance={3}
              maxDistance={10}
              enablePan={false}
              minPolarAngle={Math.PI / 3}
              maxPolarAngle={Math.PI / 2}
            />
          </Canvas>
        </div>
      </div>
    </motion.div>
  );
}

export default function Hero3D() {
  return (
    <section id="home" className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="relative min-h-screen">
        <div className="absolute inset-0">
          <Canvas camera={{ position: [0, 0, 3], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <Globe />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.3}
              minPolarAngle={Math.PI / 2.5}
              maxPolarAngle={Math.PI / 1.5}
            />
            
          </Canvas>
        </div>
        
        <div className="relative z-10 flex items-center justify-center min-h-screen bg-gradient-to-b from-white/90 via-white/50 to-transparent">
          <div className="text-center px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0, 0.71, 0.2, 1.01]
              }}
              className="mb-8"
            >
              <span className="inline-block px-4 py-1.5 bg-purple-100 text-purple-600 rounded-full text-sm font-medium mb-4">
                Front-End Developer
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-600 animate-gradient"
            >
              Crafting Digital
              <br />
              Experiences
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto"
            >
              Transforming ideas into elegant, scalable, and user-centric applications
              that make a difference.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a
                href="#projects"
                className="bg-purple-600 text-white px-8 py-3 rounded-full hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center space-x-2 shadow-lg hover:shadow-purple-500/25"
              >
                View My Work
              </a>
              <a
                href="#contact"
                className="bg-white text-purple-600 px-8 py-3 rounded-full hover:bg-purple-50 transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center space-x-2 border-2 border-purple-600"
              >
                Let's Connect
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      <AboutSection />
    </section>
  );
}