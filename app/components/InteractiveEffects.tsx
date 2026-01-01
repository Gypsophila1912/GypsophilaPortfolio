import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

interface Particle {
  id: number;
  x: number;
  y: number;
  char: string;
}

const chars = ["0", "1", "{", "}", "<", ">"];

export function InteractiveEffects() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [clickEffect, setClickEffect] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const removeParticle = useCallback((id: number) => {
    setParticles((prev) => prev.filter((p) => p.id !== id));
  }, []);

  useEffect(() => {
    let particleId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      // Increased frequency - 15% chance
      if (Math.random() > 0.85) {
        const newParticle = {
          id: particleId++,
          x: e.clientX,
          y: e.clientY,
          char: chars[Math.floor(Math.random() * chars.length)],
        };
        setParticles((prev) => [...prev, newParticle]);
        setTimeout(() => removeParticle(newParticle.id), 800);
      }
    };

    const handleClick = (e: MouseEvent) => {
      // Show simple click effect
      setClickEffect({ x: e.clientX, y: e.clientY });
      setTimeout(() => setClickEffect(null), 400);

      // Reduced burst particles from 6 to 4
      for (let i = 0; i < 4; i++) {
        const angle = (Math.PI * 2 * i) / 4;
        const distance = 30;
        const newParticle = {
          id: particleId++,
          x: e.clientX + Math.cos(angle) * distance,
          y: e.clientY + Math.sin(angle) * distance,
          char: chars[Math.floor(Math.random() * chars.length)],
        };
        setParticles((prev) => [...prev, newParticle]);
        setTimeout(() => removeParticle(newParticle.id), 600);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
    };
  }, [removeParticle]);

  return (
    <>
      {/* Particles - max 10 */}
      <AnimatePresence>
        {particles.slice(-10).map((particle) => (
          <motion.div
            key={particle.id}
            className="fixed pointer-events-none z-40 text-green-400 font-mono text-sm"
            style={{
              left: particle.x,
              top: particle.y,
            }}
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 0, y: -20 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            {particle.char}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Simple click effect */}
      {clickEffect && (
        <motion.div
          className="fixed pointer-events-none z-40"
          style={{
            left: clickEffect.x - 25,
            top: clickEffect.y - 25,
          }}
          initial={{ opacity: 0.8 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="w-12 h-12 border-2 border-green-400 rounded-full" />
        </motion.div>
      )}
    </>
  );
}
