import React, { useRef, useMemo, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  OrbitControls, 
  Float, 
  Html,
  ContactShadows,
  Environment
} from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView } from 'framer-motion';

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
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-primary/40" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Html>
  );
};

// Cinematic Trace Lines (3D only)
const TraceLines = ({ factorRef }) => {
    const groupRef = useRef();
    const linePairs = useMemo(() => {
        const pairs = [];
        for (let i = 0; i < 20; i++) {
            const theta = (i / 20) * Math.PI * 2;
            const phi = (Math.random() - 0.5) * Math.PI;
            const start = new THREE.Vector3().setFromSphericalCoords(1.8, phi, theta);
            const end = start.clone().multiplyScalar(1.3 + Math.random() * 0.4);
            pairs.push({ start, end });
        }
        return pairs;
    }, []);

    useFrame(() => {
        const factor = factorRef.current;
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.001;
            groupRef.current.visible = factor > 0.2;
            
            groupRef.current.children.forEach((child) => {
                if (child.type === 'Group') {
                    child.children[0].material.emissiveIntensity = 4 * factor;
                    child.children[0].material.opacity = factor * 0.6;
                    child.children[1].material.emissiveIntensity = 6 * factor;
                    child.children[1].material.opacity = factor;
                }
            });
        }
    });

    return (
        <group ref={groupRef}>
            {linePairs.map((p, i) => (
                <group key={i}>
                    <mesh position={p.start.clone().lerp(p.end, 0.5)}>
                        <boxGeometry args={[0.006, 0.006, p.start.distanceTo(p.end)]} />
                        <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" transparent />
                    </mesh>
                    <mesh position={p.end}>
                        <sphereGeometry args={[0.015, 8, 8]} />
                        <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" transparent />
                    </mesh>
                </group>
            ))}
        </group>
    );
};

// Optimized Headphone Part
const HeadphonePart = ({ 
    type = 'box', 
    args = [1, 1, 1], 
    position = [0, 0, 0], 
    rotation = [0, 0, 0], 
    color = "#0a0a0a", 
    metalness = 0.95, 
    roughness = 0.1,
    explodedPos = [0, 0, 0],
    isPCB = false,
    factorRef
}) => {
    const meshRef = useRef();
    const startVec = useMemo(() => new THREE.Vector3(...position), [position]);
    const endVec = useMemo(() => new THREE.Vector3(...explodedPos), [explodedPos]);
    
    useFrame(() => {
        if (meshRef.current) {
            const factor = factorRef.current;
            meshRef.current.position.lerpVectors(startVec, endVec, factor);
            meshRef.current.material.emissiveIntensity = isPCB ? 2 * factor : 0;
        }
    });

    return (
        <mesh ref={meshRef} rotation={rotation}>
            {type === 'box' && <boxGeometry args={args} />}
            {type === 'sphere' && <sphereGeometry args={args} />}
            {type === 'cylinder' && <cylinderGeometry args={args} />}
            {type === 'torus' && <torusGeometry args={args} />}
            
            <meshStandardMaterial 
                color={isPCB ? "#011401" : color} 
                metalness={metalness} 
                roughness={roughness}
                emissive={isPCB ? "#10b981" : "#000"}
            />
        </mesh>
    );
};

const HeadphonesScene = ({ factorRef, factorVisible }) => {
    return (
        <group rotation={[0.4, -0.6, 0]} scale={1.3}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.6}>
                <HeadphonePart 
                    type="torus" 
                    args={[1.5, 0.08, 16, 100, Math.PI]} 
                    rotation={[0, 0, Math.PI / 2]} 
                    color="#050505" 
                    position={[0, 0, 0]}
                    explodedPos={[0, 1.6, 0]}
                    factorRef={factorRef}
                />

                <group>
                    <HeadphonePart 
                        type="cylinder" 
                        args={[0.8, 0.8, 0.3, 64]} 
                        position={[-1.5, 0.1, 0]} 
                        rotation={[0, 0, Math.PI / 2]} 
                        color="#0f0f0f" 
                        explodedPos={[-2.6, 0.5, 0]}
                        factorRef={factorRef}
                    />
                    <Tooltip 
                        position={[-4.5, 1.4, 0]} 
                        active={factorVisible > 0.85} 
                        title="Quantum Audio" 
                        description="48-bit lossless spatial mapping." 
                    />
                </group>

                <group>
                    <HeadphonePart 
                        type="cylinder" 
                        args={[0.8, 0.8, 0.3, 64]} 
                        position={[1.5, 0.1, 0]} 
                        rotation={[0, 0, -Math.PI / 2]} 
                        color="#0f0f0f" 
                        explodedPos={[2.6, 0.5, 0]}
                        factorRef={factorRef}
                    />
                    <HeadphonePart 
                        type="box" 
                        args={[0.05, 0.55, 0.55]} 
                        position={[1.8, 0.1, 0]} 
                        isPCB={true}
                        explodedPos={[4.0, 1.0, 0.5]}
                        factorRef={factorRef}
                    />
                    <Tooltip 
                        position={[5.2, 1.8, 0.6]} 
                        active={factorVisible > 0.85} 
                        title="Neural Engine" 
                        description="AI-driven real-time transparency logic." 
                    />
                </group>
                <TraceLines factorRef={factorRef} />
            </Float>
            <ContactShadows position={[0, -3, 0]} opacity={0.4} scale={15} blur={3} far={4.5} />
            <pointLight position={[-5, 5, 5]} intensity={0.5} color="#8b5cf6" />
        </group>
    );
};

const ProductAnimation = () => {
  const containerRef = useRef(null);
  const factorRef = useRef(0);
  const [factorVisible, setFactorVisible] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const isInView = useInView(containerRef, { 
    margin: "200px 0px 200px 0px", // Pre-load when near
    once: false 
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Transform scroll into 0-1 range for central explosion
  const animationFactor = useTransform(smoothProgress, [0.35, 0.65], [0, 1]);

  return (
    <div 
        ref={containerRef} 
        style={{ position: 'relative' }} // Hardcoded to override CSS issues
        className="w-full h-full min-h-[550px] lg:min-h-[750px] rounded-[4rem] overflow-hidden bg-[#020202] border border-white/5 shadow-2xl group"
    >
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 via-transparent to-blue-500/5 opacity-50" />
      </div>

      <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-white/20 font-mono text-xs tracking-widest animate-pulse">BOOTING_CORE_ENGINE...</div>}>
        {isInView && (
            <Canvas 
                camera={{ position: [0, 0, 11], fov: 32 }}
                dpr={[1, 1.5]} // Limit resolution for performance
                gl={{ 
                    antialias: true, 
                    powerPreference: "default",
                    alpha: false,
                    stencil: false,
                    depth: true
                }}
            >
              <color attach="background" args={["#020202"]} />
              <ambientLight intensity={0.7} />
              <pointLight position={[10, 10, 10]} intensity={1.5} />
              <directionalLight position={[-10, 20, 10]} intensity={2} color="#8b5cf6" />
              
              <OrbitControls enableZoom={false} enablePan={false} makeDefault />

              <SceneController 
                  animationFactor={animationFactor} 
                  onUpdate={v => {
                      factorRef.current = v;
                      if (Math.abs(factorVisible - v) > 0.05) setFactorVisible(v);
                  }} 
              />

              <HeadphonesScene factorRef={factorRef} factorVisible={factorVisible} />
            </Canvas>
        )}
      </Suspense>

      {/* Simplified HUD */}
      <div className="absolute top-12 left-12 z-10 pointer-events-none select-none">
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                <span className="text-[14px] font-black text-white uppercase tracking-[0.4em] font-outfit">H-X CINEMATIC</span>
            </div>
            <div className="text-[10px] font-mono text-primary/60 uppercase tracking-widest leading-none">STATUS: {factorVisible > 0.5 ? 'EXPLODED_VIEW' : 'SYNCHRONIZED'}</div>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10">
        <div className="bg-white/5 backdrop-blur-xl px-10 py-3 rounded-full border border-white/10">
           <span className="text-[11px] font-bold text-white/40 uppercase tracking-[0.4em]">Precision Engineering</span>
        </div>
      </div>
    </div>
  );
};

// Helper to keep the frame loop clean
const SceneController = ({ animationFactor, onUpdate }) => {
    useFrame(() => {
        const val = animationFactor.get();
        onUpdate(val);
    });
    return null;
};

export default ProductAnimation;
