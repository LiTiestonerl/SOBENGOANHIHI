import React from 'react';
import { motion } from 'framer-motion';

const Background: React.FC = () => {
  // Floating elements configuration
  const floatingIcons = ['💖', '✨', '🌸', '☁️', '🎀', '💫'];

  return (
    <div className="fixed inset-0 w-full h-full -z-10 overflow-hidden bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100">
      {/* Animated Gradient Blobs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob animation-delay-4000"></div>

      {/* Floating Particles */}
      {floatingIcons.map((icon, index) => (
        <motion.div
          key={index}
          className="absolute text-2xl select-none pointer-events-none opacity-60"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight + 100,
            scale: 0.5,
          }}
          animate={{
            y: [null, Math.random() * -100],
            x: [null, Math.random() * 50 - 25],
            rotate: [0, Math.random() * 360],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        >
          {icon}
        </motion.div>
      ))}
      
      {/* Noise overlay for texture (optional, keeping it clean for now) */}
    </div>
  );
};

export default Background;