"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Twitter, ArrowLeft, Rss } from 'lucide-react';
import Link from 'next/link';
import { Particles } from '../../components/Particles';

const colors = {
  background: '#0A192F',
  text: {
    primary: '#E6F1FF',
    secondary: '#8892B0',
  },
  accent: {
    primary: '#64FFDA',
    secondary: '#58A6FF',
  }
};

const ContactPage = () => {
  const contactLinks = [
    { icon: <Mail size={24} />, text: 'Email', href: 'mailto:eeshanvsk@gmail.com' },
    { icon: <Linkedin size={24} />, text: 'LinkedIn', href: 'https://www.linkedin.com/in/eeshan' },
    { icon: <Github size={24} />, text: 'GitHub', href: 'https://github.com/EeshanV' },
    { icon: <Twitter size={24} />, text: 'Twitter', href: 'https://twitter.com/_EeshanV' },
  ];

  return (
    <div className={`min-h-screen bg-[${colors.background}] text-[${colors.text.primary}] flex flex-col items-center justify-center p-8 relative overflow-hidden`}>
      <Particles />
      <motion.div
        className="w-full max-w-md bg-[#0A192F]/80 p-8 rounded-lg backdrop-blur-sm border border-[#64FFDA]/30 shadow-lg relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          className="text-3xl font-bold mb-8 text-center flex items-center justify-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Rss className="inline-block mr-2 text-[#64FFDA]" /> Connect with me
        </motion.h1>
        <div className="flex flex-col items-center space-y-6">
          {contactLinks.map((link, index) => (
            <motion.div
              key={link.text}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={link.href} target="_blank" rel="noopener noreferrer" 
                className={`flex items-center justify-center space-x-4 text-xl text-[${colors.text.secondary}] hover:text-[${colors.accent.primary}] transition-all duration-300 transform hover:scale-105`}>
                {link.icon}
                <span>{link.text}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
      <motion.div
        className="mt-8 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Link href="/" className={`text-[${colors.accent.primary}] hover:text-[${colors.accent.secondary}] flex items-center transition-colors duration-300`}>
          <ArrowLeft className="mr-2" size={18} />
          <span className="hover:underline">Back to Home</span>
        </Link>
      </motion.div>
    </div>
  );
};

export default ContactPage;