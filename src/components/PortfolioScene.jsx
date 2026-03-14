import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  OrbitControls,
  Float,
  Html,
  ContactShadows,
  Environment,
  Text,
  PerspectiveCamera,
  Stars,
  Grid,
  MeshDistortMaterial,
  MeshWobbleMaterial
} from '@react-three/drei';
import * as THREE from 'three';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';

// Tooltip component (React based)
const Tooltip = ({ position, title, description, active }) => {
  return (
    <Html position={position} center distanceFactor={10} zIndexRange={[100, 0]}>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 15, filter: 'blur(15px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.8, y: 15, filter: 'blur(15px)' }}
            className="pointer-events-none select-none"
          >
            <div className="bg-black/95 backdrop-blur-3xl p-6 rounded-[2rem] border border-primary/40 min-w-[220px] shadow-[0_0_50px_rgba(124,58,237,0.25)] ring-1 ring-white/10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse shadow-[0_0_15px_#7c3aed]" />
                <h4 className="text-[13px] font-black text-white uppercase tracking-[0.25em] font-outfit">{title}</h4>
              </div>
              <p className="text-[12px] text-gray-400 leading-relaxed font-medium tracking-tight mb-3 opacity-80">{description}</p>
              <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '60%' }}
                  className="h-full bg-primary/50"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Html>
  );
};

// 3D Coordinate Grid Component with Scanning Pulse
const BackgroundGrid = () => {
  const gridRef = useRef();
  useFrame(({ clock }) => {
    if (gridRef.current) {
      gridRef.current.position.z = -20 + Math.sin(clock.elapsedTime * 0.2) * 2;
    }
  });

  return (
    <group ref={gridRef} position={[0, -10, -20]} rotation={[Math.PI / 2.2, 0, 0]}>
      <Grid
        infiniteGrid
        sectionSize={5}
        sectionThickness={1.5}
        sectionColor="#7c3aed"
        cellSize={1}
        cellThickness={0.5}
        cellColor="#3b82f6"
        fadeDistance={100}
        fadeStrength={5}
        side={THREE.DoubleSide}
        opacity={0.15}
      />
      {/* Scanning Pulse Overlay */}
      <mesh position={[0, 0, 0.05]}>
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial color="#7c3aed" transparent opacity={0.02} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

// Procedural Data Motes (Particles)
const DataMotes = ({ count = 150 }) => {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    const s = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 60;
      p[i * 3 + 1] = (Math.random() - 0.5) * 80;
      p[i * 3 + 2] = (Math.random() - 0.5) * 40;
      s[i] = Math.random() * 2;
    }
    return { positions: p, scales: s };
  }, [count]);

  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.1) * 2;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={points.positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.08} color="#3b82f6" transparent opacity={0.4} sizeAttenuation />
    </points>
  );
};

// Vertical Code Streams (Matrix-style tech)
const CodeStreams = () => {
  const items = [...Array(10)];
  return (
    <group>
      {items.map((_, i) => (
        <Float key={i} speed={2} rotationIntensity={0.2} floatIntensity={0.5} position={[(Math.random() - 0.5) * 40, (Math.random() - 0.5) * 60, -15 - Math.random() * 10]}>
          <Text
            fontSize={0.4}
            color="#7c3aed"
            maxWidth={1}
            lineHeight={0.8}
            textAlign="left"
            opacity={0.1}
          >
            {Math.random() > 0.5 ? "01011001" : "SYSTEM_LKD"}
          </Text>
        </Float>
      ))}
    </group>
  );
};

// Floating Tech Schematics (Ultra-Clean line-work)
const TechSchematix = () => {
  const torusGeo = useMemo(() => new THREE.TorusGeometry(1, 0.001, 3, 3), []);
  return (
    <group position={[0, 0, -10]}>
      {[...Array(3)].map((_, i) => (
        <group key={i} position={[(Math.random() - 0.5) * 40, (Math.random() - 0.5) * 40, -5]}>
          <mesh rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]} geometry={torusGeo} scale={Math.random() * 4 + 2}>
            <meshBasicMaterial wireframe color="#7c3aed" transparent opacity={0.02} />
          </mesh>
        </group>
      ))}
    </group>
  );
};

// Floating Panel Wrapper for HTML Content
const FloatingPanel = ({ children, position, rotation, scale = 1, teardownFactor }) => {
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      const factor = typeof teardownFactor === 'number' ? teardownFactor : (teardownFactor?.get ? teardownFactor.get() : 0);

      const targetY = position[1] - (factor * 60);
      const distanceToCenter = Math.abs(targetY);
      const focus = Math.max(0, 1 - (distanceToCenter / 15));

      meshRef.current.position.y = targetY;
      meshRef.current.scale.setScalar(0.8 + (focus * 0.2));
    }
  });

  return (
    <group ref={meshRef} rotation={rotation} scale={scale}>
      <Html
        transform
        distanceFactor={8}
        position={[0, 0, 0]}
        className="pointer-events-auto"
      >
        <div className="w-[1200px] pointer-events-auto opacity-90 transition-opacity duration-500 hover:opacity-100">
          {children}
        </div>
      </Html>
    </group>
  );
};

// Floating Technical Status Labels
const TechnicalAnnotations = () => {
  const statuses = ["SYNC_ESTABLISHED", "LATENCY_2MS", "CORE_LOAD_15%", "ENCRYPT_AES256", "BUFFER_READY"];
  return (
    <group>
      {[...Array(6)].map((_, i) => (
        <group key={i} position={[(Math.random() - 0.5) * 40, (Math.random() - 0.5) * 40, -10]}>
          <Text
            fontSize={0.2}
            color="#3b82f6"
            opacity={0.3}
            anchorX="left"
          >
            {`> ${statuses[i % statuses.length]}`}
          </Text>
          {/* Tiny pulsing dot */}
          <mesh position={[-0.2, 0.1, 0]}>
            <sphereGeometry args={[0.02, 8, 8]} />
            <MeshWobbleMaterial color="#3b82f6" speed={5} factor={10} />
          </mesh>
        </group>
      ))}
    </group>
  );
};

// Neon Concentric Rails (Refined into Energy Beams)
const CircuitLines = ({ teardownFactor }) => {
  const groupRef = useRef();
  const torusGeo = useMemo(() => new THREE.TorusGeometry(1, 0.004, 8, 64), []);

  useFrame((state) => {
    if (groupRef.current) {
      const factor = typeof teardownFactor === 'number' ? teardownFactor : (teardownFactor?.get ? teardownFactor.get() : 0);
      groupRef.current.children.forEach((line, i) => {
        line.material.opacity = (0.04 + factor * 0.12);
        line.material.emissiveIntensity = 0.5 + (factor * 2);
        line.rotation.z = state.clock.elapsedTime * (i % 2 === 0 ? 0.05 : -0.05);
      });
    }
  });

  return (
    <group ref={groupRef}>
      {[...Array(6)].map((_, i) => {
        const radius = 20 + (i * 4);
        return (
          <mesh key={i} position={[0, 0, -15]} rotation={[Math.PI / 2.2, 0, 0]} geometry={torusGeo} scale={radius}>
            <meshStandardMaterial
              color={i % 2 === 0 ? "#7c3aed" : "#3b82f6"}
              emissive={i % 2 === 0 ? "#7c3aed" : "#3b82f6"}
              transparent
              depthWrite={false}
            />
          </mesh>
        );
      })}

      {/* Vertical Connector Threads */}
      {[...Array(4)].map((_, i) => (
        <mesh key={`thread-${i}`} position={[(i - 1.5) * 6, 0, -5]}>
          <capsuleGeometry args={[0.005, 100, 4, 8]} />
          <meshBasicMaterial color="#7c3aed" transparent opacity={0.05} />
        </mesh>
      ))}
    </group>
  );
};

const PortfolioScene = ({ children }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 25,
    mass: 1.5,
    restDelta: 0.0001
  });

  // factor 0 = hub, factor 1 = fully exploded
  const teardownFactor = smoothProgress;

  return (
    <div className="fixed inset-0 z-0 bg-[#020202]">
      {/* 16:9 Cinematic Border Overlay - Thinner for better fit */}
      <div className="absolute inset-0 z-50 pointer-events-none border-[30px] border-black/90" />
      <div className="absolute inset-[30px] z-50 pointer-events-none border border-white/5" />

      <Canvas
        shadows
        gl={{ antialias: true, alpha: false, stencil: false }}
        dpr={[1, 1.5]}
      >
        <color attach="background" args={["#020202"]} />
        <PerspectiveCamera makeDefault position={[0, 0, 25]} fov={35} />

        <Suspense fallback={null}>
          <Environment preset="night" />
          <ambientLight intensity={1.5} />
          <pointLight position={[20, 20, 20]} intensity={500} color="#7c3aed" />
          <pointLight position={[-20, -20, 10]} intensity={500} color="#3b82f6" />
          <spotLight position={[0, 50, 20]} angle={0.4} penumbra={1} intensity={2500} color="#7c3aed" castShadow />

          <SceneContent teardownFactor={teardownFactor} sections={children} />

          <BackgroundGrid />
          <DataMotes count={250} />
          <CodeStreams />
          <TechSchematix />
          <TechnicalAnnotations />
          <CircuitLines teardownFactor={teardownFactor} />

          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          <ContactShadows position={[0, -15, 0]} opacity={0.6} scale={100} blur={2.5} far={20} color="#7c3aed" />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 2.2}
        />
      </Canvas>

      <div className="absolute top-20 left-20 z-10 pointer-events-none select-none">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-[14px] font-black text-white uppercase tracking-[0.5em]">SYST_ELE_NAV</span>
          </div>
          <div className="h-[1px] w-32 bg-white/20" />
          <div className="flex items-center gap-4">
            <div className="h-24 w-[2px] bg-white/5 relative overflow-hidden">
              <motion.div
                style={{ height: useTransform(teardownFactor, [0, 1], ['0%', '100%']) }}
                className="absolute top-0 left-0 w-full bg-primary"
              />
            </div>
            <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest leading-relaxed">
              DEPTH: SYNC_ESTABLISHED <br />
              SYNC: VERTICAL_LOCKED <br />
              STATUS: SECURE_TRANSIT
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Component to handle the frame loop for teardown
const SceneContent = ({ teardownFactor, sections }) => {
  const factorRef = useRef(0);

  useFrame(() => {
    factorRef.current = teardownFactor.get();
  });

  // Vertical Sequential Column
  // Panels are stacked vertically with 15 units spacing
  const panelConfigs = [
    { pos: [0, 0, 0], rot: [0, 0, 0] },     // Hero
    { pos: [0, 15, -5], rot: [0, 0, 0] },   // About
    { pos: [0, 30, -10], rot: [0, 0, 0] },  // Skills
    { pos: [0, 45, -15], rot: [0, 0, 0] },  // Projects
    { pos: [0, 60, -20], rot: [0, 0, 0] },  // Certs
  ];

  return (
    <group>


      {sections.map((section, i) => (
        <FloatingPanel
          key={i}
          position={panelConfigs[i]?.pos || [0, 0, 0]}
          rotation={panelConfigs[i]?.rot || [0, 0, 0]}
          offset={panelConfigs[i]?.offset || [0, 0, 0]}
          teardownFactor={teardownFactor}
        >
          {section}
        </FloatingPanel>
      ))}
    </group>
  );
};

export default PortfolioScene;
