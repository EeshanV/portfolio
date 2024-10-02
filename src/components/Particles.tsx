"use client"

import React, { useState, useEffect } from 'react'
import { motion, useSpring } from 'framer-motion'

const Particle = () => {
  const [windowSize, setWindowSize] = useState({ width: typeof window !== 'undefined' ? window.innerWidth : 1920, height: typeof window !== 'undefined' ? window.innerHeight : 1080 });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const x = useSpring(Math.random() * windowSize.width, {
    damping: 50,
    stiffness: 20,
    mass: 0.5
  });

  const y = useSpring(Math.random() * windowSize.height, {
    damping: 50,
    stiffness: 20,
    mass: 0.5
  });

  useEffect(() => {
    const updatePosition = () => {
      const newX = x.get() + (Math.random() - 0.5) * 4;
      const newY = y.get() + (Math.random() - 0.5) * 4;

      if (newX > 0 && newX < windowSize.width) x.set(newX);
      if (newY > 0 && newY < windowSize.height) y.set(newY);
    };

    const intervalId = setInterval(updatePosition, 30);
    return () => clearInterval(intervalId);
  }, [x, y, windowSize]);

  return (
    <motion.div
      className="absolute w-1 h-1 bg-[#64FFDA] rounded-full"
      style={{ x, y }}
    />
  );
};

export const Particles = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-0 opacity-20">
      {[...Array(50)].map((_, i) => (
        <Particle key={i} />
      ))}
    </div>
  );
};