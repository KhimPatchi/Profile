import { useEffect, useState, useRef, memo } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

// Memoized segment to prevent unnecessary re-renders
const DragonSegment = memo(({ index, x, y, totalSegments, rotation }) => {
  const getVertebraSize = () => {
    if (index === 0) return 24;
    if (index < 4) return 18 + index; // Faster transition to body
    if (index < 10) return 26 - (index - 4) * 0.8; // Compact robust section
    return Math.max(20 - (index - 10) * 3, 5); // Rapid tail tapering
  };

  const getRibSize = () => {
    if (index === 0 || index < 3 || index > 11) return 0;
    const progress = (index - 3) / 8;
    const curve = Math.sin(progress * Math.PI);
    return 35 + curve * 40; // Proportional rib span for shorter body
  };
  
  const vertebraSize = getVertebraSize();
  const ribSize = getRibSize();
  const opacity = 1 - (index / (totalSegments * 1.15));
  
  return (
    <motion.div
      className="fixed pointer-events-none z-[9999] flex items-center justify-center overflow-visible select-none will-change-transform"
      style={{
        x,
        y,
        width: vertebraSize,
        height: vertebraSize,
        opacity,
        rotate: rotation,
      }}
    >
      {index === 0 ? (
        <div className="relative flex items-center justify-center scale-[1.3] drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
            <svg viewBox="0 0 100 100" className="w-14 h-14">
                <defs>
                    <radialGradient id="skull-grad" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: '#cbd5e1', stopOpacity: 1 }} />
                    </radialGradient>
                </defs>
                <path d="M25,30 Q10,10 5,25 M25,70 Q10,90 5,75" fill="none" stroke="#94a3b8" strokeWidth="4" />
                <path d="M20,50 Q20,25 50,25 L75,35 L90,50 L75,65 L50,75 Q20,75 20,50 Z" fill="url(#skull-grad)" />
                <circle cx="65" cy="40" r="6" fill="#0f172a" />
                <circle cx="65" cy="40" r="2" fill="#ff0000" className="animate-pulse" />
                <path d="M75,65 L80,68 L85,65 L90,68" fill="none" stroke="#64748b" strokeWidth="1" />
            </svg>
        </div>
      ) : (
        <div className="relative w-full h-full flex items-center justify-center overflow-visible">
            {ribSize > 0 && (
                <div 
                   className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
                   style={{ width: ribSize, height: vertebraSize * 1.8 }}
                >
                    <div 
                        className="w-1/2 h-full border-l-[3px] border-t-[1.5px] border-white/30 rounded-tl-[100%] rounded-bl-[40%] shadow-[-2px_0_5px_rgba(0,0,0,0.5)]" 
                        style={{ transform: 'rotateY(30deg) skewY(-5deg)' }}
                    />
                    <div 
                        className="w-1/2 h-full border-r-[3px] border-t-[1.5px] border-white/30 rounded-tr-[100%] rounded-br-[40%] shadow-[2px_0_5px_rgba(0,0,0,0.5)]" 
                        style={{ transform: 'rotateY(-30deg) skewY(5deg)' }}
                    />
                </div>
            )}
            <div className="relative w-full h-[70%] z-10">
                <div 
                    className="w-full h-full bg-gradient-to-br from-white via-slate-200 to-slate-400 shadow-[0_4px_12px_rgba(0,0,0,0.6)]"
                    style={{
                        clipPath: 'polygon(0 40%, 15% 0, 85% 0, 100% 40%, 100% 60%, 85% 100%, 15% 100%, 0 60%)',
                    }}
                />
                <div 
                    className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full w-2 h-4 bg-slate-300"
                    style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
                />
            </div>
            <div className="absolute left-0 w-full h-[1.5px] bg-secondary/60 shadow-[0_0_8px_var(--color-secondary)] rotate-90 opacity-40" />
        </div>
      )}
    </motion.div>
  );
});

const CursorFollower = () => {
    const [isVisible, setIsVisible] = useState(false);
    const totalSegments = 14; 
    
    const targets = useRef(
        Array.from({ length: totalSegments }).map(() => ({
            x: useMotionValue(-500),
            y: useMotionValue(-500)
        }))
    ).current;

    const segmentSprings = useRef(
        Array.from({ length: totalSegments }).map((_, i) => {
            const config = { 
                stiffness: 220 - i * 5, 
                damping: 24 + i * 0.8,
                mass: 0.15 + i * 0.08
            };
            return {
                x: useSpring(targets[i].x, config),
                y: useSpring(targets[i].y, config)
            };
        })
    ).current;

    const [rotations, setRotations] = useState(new Array(totalSegments).fill(0));

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!isVisible) setIsVisible(true);
            
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            const dx = mouseX - targets[0].x.get();
            const dy = mouseY - targets[0].y.get();
            
            if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
                const angle = Math.atan2(dy, dx) * (180 / Math.PI);
                setRotations(prev => {
                    if (prev[0] === angle) return prev;
                    const newRots = [...prev];
                    newRots[0] = angle;
                    return newRots;
                });
            }

            targets[0].x.set(mouseX);
            targets[0].y.set(mouseY);
        };

        const unsubscribes = segmentSprings.slice(0, -1).map((spring, i) => {
            const unsubX = spring.x.on("change", (latestX) => {
                const latestY = spring.y.get();
                const curX = targets[i+1].x.get();
                const curY = targets[i+1].y.get();
                
                const dx = latestX - curX;
                const dy = latestY - curY;
                if (Math.abs(dx) > 0.2 || Math.abs(dy) > 0.2) {
                    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
                    setRotations(prev => {
                        if (prev[i+1] === angle) return prev;
                        const newRots = [...prev];
                        newRots[i+1] = angle;
                        return newRots;
                    });
                }
                
                targets[i+1].x.set(latestX);
                targets[i+1].y.set(latestY);
            });
            return () => unsubX();
        });

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            unsubscribes.forEach(unsub => unsub());
        };
    }, [isVisible, segmentSprings, targets]);

    if (!isVisible) return null;

    return (
        <div className="hidden lg:block fixed inset-0 pointer-events-none overflow-visible will-change-transform">
            {segmentSprings.map((spring, i) => (
                <DragonSegment 
                    key={i} 
                    index={i} 
                    x={spring.x} 
                    y={spring.y} 
                    totalSegments={totalSegments} 
                    rotation={rotations[i]}
                />
            )).reverse()}
        </div>
    );
};

export default CursorFollower;
