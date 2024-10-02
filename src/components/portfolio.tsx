"use client"

import React, { useState, useEffect, useRef } from 'react'
import { motion, useScroll, AnimatePresence } from 'framer-motion'
import { ChevronRight, Shield, Code, Send, Lock, Server, Brain, Globe, Home, Briefcase, Wrench } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { FaGithub} from 'react-icons/fa'
import { FaBuilding, FaNewspaper, FaRobot, FaTree, FaHackerrank } from 'react-icons/fa'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { Particles } from './Particles'

// New color palette
const colors = {
  background: '#0A192F',  // Dark blue background
  text: {
    primary: '#E6F1FF',   // Light blue-white
    secondary: '#8892B0', // Muted blue-gray
  },
  accent: {
    primary: '#64FFDA',   // Cyan (keep this as it works well)
    secondary: '#58A6FF', // Bright blue
    tertiary: '#10B981',  // Green (keep this as it works well for variety)
  }
};

const GlitchChar = ({ char, isGlitching }: { char: string; isGlitching: boolean }) => {
  if (!isGlitching) {
    return <div>{char}</div>
  }
  return (
    <div className="relative">
      <motion.div
        className="absolute top-0 left-0 text-[#FF00FF] opacity-80"
        animate={{
          x: [0, -2, 2, -1, 1, 0],
          y: [0, 1, -1, 2, -2, 0],
        }}
        transition={{ duration: 0.5, repeat: Infinity }}
      >
        {char}
      </motion.div>
      <motion.div
        className="absolute top-0 left-0 text-[#00FFFF] opacity-80"
        animate={{
          x: [0, 2, -2, 1, -1, 0],
          y: [0, -1, 1, -2, 2, 0],
        }}
        transition={{ duration: 0.5, repeat: Infinity }}
      >
        {char}
      </motion.div>
      <motion.div className="relative text-[#E6F1FF]">
        {char}
      </motion.div>
    </div>
  )
}

interface Experience {
  company: string;
  role: string;
  startDate: string;
  endDate: string | 'Present';
  description: string;
  link: string;
  githubRepo?: string;
}

const ExperienceCard = ({ experience, index }: { experience: Experience; index: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const iconMap = {
    "IRISET": FaBuilding,
    "InfoSec WriteUps Publication": FaNewspaper,
    "TheBinaryBot": FaRobot,
    "Palmtree Analytics": FaTree,
    "hackerats.com": FaHackerrank
  };

  const Icon = iconMap[experience.company as keyof typeof iconMap] || FaBuilding;

  const handleIconClick = (e: React.MouseEvent, link: string) => {
    e.stopPropagation();
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  const formatDate = (date: string | 'Present') => {
    return date === 'Present' ? 'Present' : new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <motion.div
      className={`flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center mb-16`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
    >
      <motion.div
        className={`w-1/4 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}
        initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: index * 0.2 + 0.2 }}
      >
        <div className={`text-[${colors.accent.primary}] font-bold font-['Orbitron'] text-sm`}>
          {formatDate(experience.startDate)} - {formatDate(experience.endDate)}
        </div>
      </motion.div>
      <div className="w-8 flex justify-center">
        <div className={`w-4 h-4 rounded-full bg-[${colors.accent.primary}]`}></div>
      </div>
      <motion.div
        className={`w-3/4 ${index % 2 === 0 ? 'pl-8' : 'pr-8'}`}
        whileHover={{ scale: 1.02 }}
      >
        <motion.div 
          className="bg-black p-6 rounded-lg border border-white cursor-pointer relative z-10"
          onClick={() => setIsExpanded(!isExpanded)}
          whileHover={{
            boxShadow: '0 4px 6px rgba(255, 255, 255, 0.1)',
            transition: { duration: 0.2 }
          }}
        >
          <div className="flex items-center mb-2">
            <div 
              className={`text-[${colors.accent.primary}] mr-2 cursor-pointer hover:text-[${colors.accent.secondary}] transition-colors duration-300 flex items-center`}
              onClick={(e) => handleIconClick(e, experience.link)}
            >
              <Icon size={24} />
              <FaExternalLinkAlt size={12} className="ml-1" />
            </div>
            <h3 className={`text-xl font-bold font-['Orbitron'] text-[${colors.accent.primary}]`}>{experience.company}</h3>
          </div>
          <p className={`text-[${colors.text.secondary}] mb-2`}>{experience.role}</p>
          <AnimatePresence initial={false}>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className={`text-[${colors.text.primary}] mt-4`}>{experience.description}</p>
                {experience.githubRepo && (
                  <div className="mt-4">
                    <a
                      href={experience.githubRepo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-[${colors.accent.primary}] hover:text-[${colors.accent.secondary}] transition-colors duration-300 flex items-center`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FaGithub size={20} className="mr-2" />
                      View GitHub Repository
                    </a>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const AnimatedHeading = ({ text }: { text: string }) => {
  return (
    <motion.h2 
      className={`text-4xl font-bold mb-16 relative font-['Orbitron'] text-center overflow-hidden`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <span className={`relative z-10 text-[${colors.text.primary}]`}>
        {text.split('').map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.03 }}
            viewport={{ once: true }}
          >
            {char}
          </motion.span>
        ))}
      </span>
      <motion.span
        className={`absolute inset-0 bg-gradient-to-r from-[${colors.accent.primary}] to-[${colors.accent.secondary}]`}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        style={{ originX: 0 }}
      />
    </motion.h2>
  );
};

const ExperienceSection = React.forwardRef<HTMLElement>((props, ref) => {
  const experiences = [
    {
      company: "IRISET",
      role: "Project Intern",
      startDate: "2024-04-01",
      endDate: "2024-06-30",
      description: "Developed an internal site for course and lecture management using Django (Python). Implemented SQLite database and designed frontend with HTML, CSS, and JavaScript. Incorporated a discussion forum for faculty and trainees.",
      link: "https://iriset.indianrailways.gov.in/",
      githubRepo: "https://github.com/EeshanV/IRISET"
    },
    {
      company: "InfoSec WriteUps Publication",
      role: "Ambassador",
      startDate: "2023-11-01",
      endDate: "Present",
      description: "Part of a 15-member team creating weekly cybersecurity newsletters to curate and disseminate current information security trends and developments.",
      link: "https://infosecwriteups.com/"
    },
    {
      company: "TheBinaryBot",
      role: "Social Media Manager",
      startDate: "2023-09-01",
      endDate: "2023-12-31",
      description: "Created engaging and informative content related to cybersecurity for TheBinaryBot's Twitter and LinkedIn accounts.",
      link: "https://twitter.com/thebinarybot"
    },
    {
      company: "Palmtree Analytics",
      role: "Intern",
      startDate: "2023-05-01",
      endDate: "2023-06-30",
      description: "Developed a Python-powered recruitment platform with frontend and backend components. Improved resume processing and candidate identification using machine learning techniques.",
      link: "https://palm-tree.in/",
      githubRepo: "https://github.com/EeshanV/_ResumeClassification"
    },
    {
      company: "hackerats.com",
      role: "Mentor",
      startDate: "2022-10-01",
      endDate: "2023-01-31",
      description: "Guided individuals in Cryptography, Linux Privilege Escalation, and Basic Web Security. Created challenging tasks to enhance participants' skills.",
      link: "https://www.youtube.com/watch?v=JD0I_lhGxWI"
    }
  ].sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());

  return (
    <section ref={ref} className="py-16 px-8 md:px-16 lg:px-24 relative pb-32">
      <AnimatedHeading text="Professional Experience" />
      <div className="relative mt-16">
        <div 
          className="absolute left-1/2 transform -translate-x-1/2"
          style={{
            width: '2px',
            top: '-40px', // Extends 40px above the first card
            bottom: '-100px', // Extends 100px below the last card
            background: 'linear-gradient(to top, #64FFDA ,#64FFDA, #FF00FF ,#FF00FF, #FF00FF, #FFA500, #FFA500, #FFA500)',
            zIndex: 0,
          }}
        />
        {experiences.map((exp, index) => (
          <ExperienceCard key={index} experience={exp} index={index} />
        ))}
      </div>
    </section>
  );
});

ExperienceSection.displayName = 'ExperienceSection';

const Divider = () => (
  <div className="w-full py-8">
    <div className="w-full h-px bg-gradient-to-r from-transparent via-[#64FFDA] to-transparent opacity-50"></div>
  </div>
);

export const Portfolio = () => {
  const cursorRef = useRef<HTMLDivElement>(null)

  const [characters, setCharacters] = useState<string[]>([])
  const [isGlitching, setIsGlitching] = useState(true)

  const [showHeroText, setShowHeroText] = useState(false)
  const [heroText, setHeroText] = useState("")
  const [showParagraphAndButton, setShowParagraphAndButton] = useState(false)
  const [showCursor, setShowCursor] = useState(true)

  const router = useRouter();

  const [activeSection, setActiveSection] = useState('hero')
  const heroSectionRef = useRef<HTMLElement>(null)
  const experienceSectionRef = useRef<HTMLElement>(null)
  const arsenalSectionRef = useRef<HTMLElement>(null)

  const scrollToSection = (sectionRef: React.RefObject<HTMLElement>) => {
    const navbarHeight = 64; // Adjust this value to match your navbar height
    const yOffset = -navbarHeight; 
    const element = sectionRef.current;
    const y = element ? element.getBoundingClientRect().top + window.pageYOffset + yOffset : 0;
    window.scrollTo({top: y, behavior: 'smooth'});
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      // const heroSection = heroSectionRef.current?.offsetTop ?? 0;
      const experienceSection = experienceSectionRef.current?.offsetTop ?? 0;
      const arsenalSection = arsenalSectionRef.current?.offsetTop ?? 0;

      if (scrollPosition < experienceSection) {
        setActiveSection('hero');
      } else if (scrollPosition >= experienceSection && scrollPosition < arsenalSection) {
        setActiveSection('experience');
      } else {
        setActiveSection('arsenal');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleContactClick = () => {
    router.push('/contact');
  };

  useEffect(() => {
    const symbols = ['!', '@', '#', '$', '%', '^', '&', '*', '-', '+', '=', '<', '>', '?', '/', '~']
    const randomSymbols = Array.from({ length: 6 }, () => 
      symbols[Math.floor(Math.random() * symbols.length)]
    )
    setCharacters(randomSymbols)

    const targetWord = "EESHAN"
    const fullText = "Hacker | Developer | Student" // Added space here
    const glitchDuration = 1500
    const transitionDelay = 700
    const eeshanAnimationDuration = targetWord.length * 500 // 500ms per character
    const heroTextDuration = fullText.length * 100 // 100ms per character

    // Calculate the delay for hero text to start so both animations end together
    const heroTextDelay = Math.max(0, eeshanAnimationDuration - heroTextDuration)

    // Stop glitching effect
    setTimeout(() => {
      setIsGlitching(false)
    }, glitchDuration)

    // Start transitioning to EESHAN
    targetWord.split('').forEach((char, index) => {
      setTimeout(() => {
        setCharacters(prev => {
          const newChars = [...prev]
          newChars[index] = char
          return newChars
        })
      }, glitchDuration + transitionDelay + index * 500)
    })

    // Start hero text typing animation with calculated delay
    setTimeout(() => {
      setShowHeroText(true)
    }, glitchDuration + transitionDelay + heroTextDelay)

    // Show paragraph and button 0.7 seconds after both animations end
    const delayAfterAnimations = 700 // 0.7 seconds
    const totalAnimationDuration = glitchDuration + transitionDelay + eeshanAnimationDuration + delayAfterAnimations
    
    setTimeout(() => {
      setShowParagraphAndButton(true)
    }, totalAnimationDuration)
  }, [])

  useEffect(() => {
    if (showHeroText) {
      const fullText = "Hacker | Developer | Student" // Added space here
      let i = 0
      const typingInterval = setInterval(() => {
        if (i < fullText.length) {
          setHeroText(fullText.slice(0, i + 1))
          i++
        } else {
          clearInterval(typingInterval)
          // Start blinking cursor after typing is complete
          const cursorInterval = setInterval(() => {
            setShowCursor(prev => !prev)
          }, 500) // Blink every 500ms
          return () => clearInterval(cursorInterval)
        }
      }, 100) // Adjust typing speed here

      return () => clearInterval(typingInterval)
    }
  }, [showHeroText])

  // const charVariants = {
  //   initial: { opacity: 1 },
  //   animate: { 
  //     opacity: [1, 0.7, 1],
  //     scale: [1, 1.05, 1],
  //     rotate: [0, -2, 2, 0],
  //     transition: { 
  //       duration: 0.3,
  //       times: [0, 0.5, 1],
  //       repeat: Infinity,
  //       repeatType: "reverse"
  //     }
  //   }
  // };

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        const cursorSize = 32;
        cursorRef.current.style.left = `${e.clientX - cursorSize / 2}px`;
        cursorRef.current.style.top = `${e.clientY - cursorSize / 2}px`;
      }
    }
    window.addEventListener('mousemove', moveCursor)
    return () => window.removeEventListener('mousemove', moveCursor)
  }, [])


  // const svgVariants = {
  //   initial: { opacity: 1 },
  //   animate: { opacity: 1 },
  // };

  // const pathVariants = {
  //   initial: { d: getRandomShape() },
  //   animate: ({ letter, index }: { letter: string; index: number }) => ({
  //     d: getLetterPath(letter),
  //     transition: { duration: 1, ease: "easeInOut", delay: index * 0.2 }
  //   })
  // };

  return (
    <div className={`min-h-screen bg-[${colors.background}] text-[${colors.text.primary}] relative overflow-hidden font-sans`}>
      <Particles />
      
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-40 p-4 flex justify-between items-center backdrop-blur-sm bg-opacity-70 bg-${colors.background}`}>
        <div className="flex">
          {characters.map((char, index) => (
            <motion.div
              key={index}
              className="text-4xl font-bold mx-1"
              variants={{
                initial: { opacity: 1 },
                animate: {
                  opacity: [1, 0.7, 1],
                  scale: [1, 1.05, 1],
                  rotate: [0, -2, 2, 0],
                  transition: {
                    duration: 0.3,
                    times: [0, 0.5, 1],
                    repeat: Infinity,
                    repeatType: "reverse" as const
                  }
                }
              }}
              initial="initial"
              animate={isGlitching ? "animate" : "initial"}
            >
              <GlitchChar char={char} isGlitching={isGlitching} />
            </motion.div>
          ))}
        </div>
      </header>

      {/* Fixed Navigation */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50">
        <div className="flex flex-col space-y-4">
          <button
            onClick={() => scrollToSection(heroSectionRef)}
            className={`p-2 rounded-full ${activeSection === 'hero' ? `bg-[${colors.accent.primary}]` : `bg-[${colors.background}]`} border border-[${colors.accent.primary}]`}
          >
            <Home size={24} className={activeSection === 'hero' ? `text-black` : `text-[${colors.accent.primary}]`} />
          </button>
          <button
            onClick={() => scrollToSection(experienceSectionRef)}
            className={`p-2 rounded-full ${activeSection === 'experience' ? `bg-[${colors.accent.primary}]` : `bg-[${colors.background}]`} border border-[${colors.accent.primary}]`}
          >
            <Briefcase size={24} className={activeSection === 'experience' ? `text-black` : `text-[${colors.accent.primary}]`} />
          </button>
          <button
            onClick={() => scrollToSection(arsenalSectionRef)}
            className={`p-2 rounded-full ${activeSection === 'arsenal' ? `bg-[${colors.accent.primary}]` : `bg-[${colors.background}]`} border border-[${colors.accent.primary}]`}
          >
            <Wrench size={24} className={activeSection === 'arsenal' ? `text-black` : `text-[${colors.accent.primary}]`} />
          </button>
        </div>
      </div>

    
      {/* Hero Section */}
      <section ref={heroSectionRef} className="min-h-screen flex flex-col items-center justify-center p-8 relative">
        {/* Large stylized background element */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
          <svg width="100%" height="100%" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#FFFFFF" strokeWidth="0.7">
              <animate attributeName="r" from="0" to="45" dur="2s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>
        
        <div className="max-w-3xl text-center z-10">
          <AnimatePresence>
            {showHeroText && (
              <motion.h3
                className={`text-4xl font-bold mb-4 font-['Orbitron'] text-[${colors.text.primary}]`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {heroText}
                <span 
                  className={`
                    inline-block w-[2px] h-[1.2em] align-middle ml-1
                    ${showCursor ? 'opacity-100' : 'opacity-0'}
                    transition-opacity duration-100
                    bg-current
                  `}
                />
              </motion.h3>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {showParagraphAndButton && (
              <>
                <motion.p
                  className={`text-xl mb-8 text-[${colors.text.secondary}]`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  Passionate about cybersecurity and software development. 
                  Creating secure and innovative solutions.
                </motion.p>
                <motion.div
                  className="flex justify-center relative mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <motion.button
                    className={`
                      px-6 py-3 font-bold font-['Syncopate']
                      bg-transparent border-2 border-[${colors.text.primary}]
                      hover:bg-[${colors.text.primary}] hover:text-[${colors.background}]
                      transition-all duration-300 
                      flex items-center justify-center
                      text-lg
                      relative
                      button-shadow
                    `}
                    onClick={handleContactClick}
                  >
                    <span className="mr-2">Reach Out
                    </span>
                    <Send size={18} />
                  </motion.button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer text-[${colors.accent.primary}]`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1, repeat: Infinity, repeatType: 'reverse' }}
          onClick={() => scrollToSection(experienceSectionRef)}
        >
          <ChevronRight size={24} className="transform rotate-90" />
        </motion.div>
      </section>

      <Divider />

      {/* Experience Section */}
      <ExperienceSection ref={experienceSectionRef} />

      <Divider />

      {/* Skills Section */}
      <section ref={arsenalSectionRef} className="pt-20 px-8 md:px-16 lg:px-24 py-16 relative"> {/* Updated padding */}
        <AnimatedHeading text="Tech Arsenal" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { 
              icon: <Shield size={48} />, 
              title: 'Cyber Defense', 
              skills: ['Zero Trust Architecture', 'Cloud Security', 'Incident Response', 'Vulnerability Assessment', 'Network Security']
            },
            { 
              icon: <Code size={48} />, 
              title: 'Development', 
              skills: ['Python', 'Django', 'Flask', 'HTML/CSS', 'SQL', 'Git', 'Web Development']
            },
            { 
              icon: <Lock size={48} />, 
              title: 'Security Analysis', 
              skills: ['Malware Analysis', 'Web Application Security', 'Broken Access Control', 'Insecure Direct Object Reference']
            },
            { 
              icon: <Server size={48} />, 
              title: 'System & Network', 
              skills: ['Linux', 'Windows', 'Networking', 'Linux Privilege Escalation', 'Windows Internals']
            },
            { 
              icon: <Brain size={48} />, 
              title: 'Data & AI', 
              skills: ['Data Science', 'Machine Learning', 'Malware Classification AI']
            },
            { 
              icon: <Globe size={48} />, 
              title: 'Web & Cloud', 
              skills: ['Web Development', 'Zscaler Zero Trust Exchange', 'Cloud Security', 'Information Security']
            },
          ].map((category, index) => (
            <motion.div
              key={index}
              className="bg-black p-6 rounded-lg border border-[#64FFDA]"
              whileHover={{ 
                scale: 1.02, 
                boxShadow: '0 4px 6px rgba(100, 255, 218, 0.1)',
                borderColor: colors.accent.secondary,
                transition: { duration: 0.3, ease: 'easeInOut' }
              }}
              transition={{ duration: 0.3 }}
            >
              <div className={`text-[${colors.accent.primary}] mb-4`}>{category.icon}</div>
              <h3 className={`text-xl font-bold mb-2 font-['Orbitron'] text-[${colors.text.primary}]`}>{category.title}</h3>
              <ul className="space-y-1">
                {category.skills.map((skill, skillIndex) => (
                  <li key={skillIndex} className={`text-[${colors.text.secondary}]`}>{skill}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      <Divider />

      {/* Footer */}
      <footer className={`py-8 px-4 text-center relative`}>
        <p className={`text-[${colors.text.secondary}]`}>&copy; 2024 Eeshan. All rights reserved.</p>
      </footer>
    </div>
  )
}
