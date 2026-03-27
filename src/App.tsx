/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal as TerminalIcon, Github, Linkedin, Mail, Globe, Cpu, Shield, Code, Award, BookOpen, Briefcase, User, Search, Settings, AppWindow, Trash2, LayoutGrid, FileText, HardDrive, Compass } from 'lucide-react';

const MacIcon = ({ 
  src, 
  fallbackIcon: FallbackIcon, 
  alt, 
  className = "", 
  gradient = "from-gray-100 to-gray-300" 
}: { 
  src: string, 
  fallbackIcon: any, 
  alt: string, 
  className?: string,
  gradient?: string
}) => {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className={`rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg border border-white/20 ${className}`}>
        <FallbackIcon className="text-gray-700 w-1/2 h-1/2" />
      </div>
    );
  }

  return (
    <img 
      src={src} 
      alt={alt} 
      className={className}
      onError={() => setError(true)}
      referrerPolicy="no-referrer"
    />
  );
};

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 800);
          return 100;
        }
        // Simulate realistic macOS loading (starts fast, slows down at the end)
        const increment = prev < 80 ? Math.random() * 15 : Math.random() * 3;
        return Math.min(prev + increment, 100);
      });
    }, 250);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div 
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 bg-black flex flex-col items-center justify-center z-[1000]"
    >
      <div className="mb-16 drop-shadow-2xl">
        <svg 
          viewBox="0 0 172 172" 
          className="w-20 h-20 fill-white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M118.256,86.004c0.043,21.844,17.888,29.132,18.146,29.218c-0.172,0.516-2.838,9.718-9.331,19.178 c-5.633,8.17-11.481,16.34-20.64,16.512c-8.987,0.172-11.868-5.289-22.145-5.289c-10.277,0-13.468,5.117-22.145,5.461 c-8.815,0.344-15.523-8.858-21.199-17.028c-11.61-16.727-20.468-47.128-8.428-68.026c5.977-10.363,16.619-16.942,28.143-17.114 c8.815-0.172,17.114,5.977,22.489,5.977c5.375,0,15.394-7.396,25.929-6.321c4.429,0.172,16.856,1.763,24.854,13.459 C133.736,52.159,118.213,63.425,118.256,86.004z M100.281,37.369c4.73-5.719,7.912-13.674,7.052-21.629 c-6.837,0.258-15.093,4.515-19.995,10.234c-4.386,5.031-8.213,13.115-7.181,20.898C87.897,47.431,95.551,43.089,100.281,37.369z" />
        </svg>
      </div>
      <div className="w-56 h-1.5 bg-[#333] rounded-full overflow-hidden border border-white/5">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className="h-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)]"
        />
      </div>
    </motion.div>
  );
};

const RESUME_DATA = {
  name: "Muhammad Raza Abbas",
  title: "BS Cybersecurity | MUET '27 | IEEE member",
  location: "Hyderabad, Sindh, Pakistan",
  summary: "Cybersecurity undergraduate at Mehran University of Engineering & Technology with a strong interest in network security, system defense, and real-world cyber threats. Hands-on experience through hackathons, technical workshops, and Cisco Packet Tracer labs, covering routing, switching, DHCP, DNS, OSPF, and server configurations.",
  experience: [
    {
      company: "Cyber Security Society MUET",
      role: "President",
      period: "October 2025 - Present",
      description: "Leading the society to promote cybersecurity awareness and technical skills among students."
    },
    {
      company: "AWS Cloud Club Mehran UET",
      role: "Video Production",
      period: "June 2025 - Present",
      description: "Managing video content and production for the AWS Cloud Club."
    },
    {
      company: "Google Developers Group On Campus - MUET Jamshoro",
      role: "Production",
      period: "September 2024 - June 2025",
      description: "Contributed to production tasks for GDG events and content."
    }
  ],
  education: [
    {
      school: "Mehran University of Engineering and Technology",
      degree: "Bachelor's degree, Cyber Security",
      period: "August 2023 - May 2027"
    },
    {
      school: "Government Degree Science College Gambat",
      degree: "Intermediate, Engineering",
      period: "August 2020 - May 2022"
    },
    {
      school: "Bahria Foundation College Ranipur",
      degree: "Matriculation, Engineering",
      period: "September 2007 - May 2020"
    }
  ],
  skills: [
    "Videography", "Video Editing", "Image Editing", "PacketTracer", "Wireshark", "Linux", "Network Security", "Routing & Switching"
  ],
  certifications: [
    "Excel Basics for Data Analysis",
    "National Freelance Training Program (NFTP)",
    "Data Visualization and Dashboards with Excel and Cognos",
    "Introduction to Computers and Operating Systems and Security",
    "Certified Cybersecurity Educator Professional (CCEP)"
  ],
  contact: {
    email: "abbasi541973@gmail.com",
    linkedin: "linkedin.com/in/muhammad-raza-abbas-a56068248"
  }
};

type HistoryItem = {
  type: 'command' | 'output';
  content: React.ReactNode;
};

export default function App() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isBooting, setIsBooting] = useState(true);
  const [isSystemLoading, setIsSystemLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isSystemLoading) {
      const bootSequence = async () => {
        await new Promise(r => setTimeout(r, 500));
        addOutput("Initializing system...");
        await new Promise(r => setTimeout(r, 300));
        addOutput("Loading MuhammadRazaAbbas_OS v1.0.0...");
        await new Promise(r => setTimeout(r, 400));
        addOutput("Establishing secure connection to MUET servers...");
        await new Promise(r => setTimeout(r, 600));
        addOutput("Welcome to the Terminal Portfolio of Muhammad Raza Abbas.");
        addOutput("Type 'help' to see available commands.");
        setIsBooting(false);
      };
      bootSequence();
    }
  }, [isSystemLoading]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const addOutput = (content: React.ReactNode) => {
    setHistory(prev => [...prev, { type: 'output', content }]);
  };

  const handleCommand = (cmd: string) => {
    const cleanCmd = cmd.trim().toLowerCase();
    setHistory(prev => [...prev, { type: 'command', content: `guest@mra-portfolio:~$ ${cmd}` }]);

    switch (cleanCmd) {
      case 'help':
        addOutput(
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div className="text-orange-400">about</div><div>Learn more about me</div>
            <div className="text-orange-400">exp</div><div>Work experience</div>
            <div className="text-orange-400">edu</div><div>Educational background</div>
            <div className="text-orange-400">skills</div><div>Technical skills</div>
            <div className="text-orange-400">certs</div><div>Certifications</div>
            <div className="text-orange-400">contact</div><div>Get in touch</div>
            <div className="text-orange-400">whoami</div><div>Current user info</div>
            <div className="text-orange-400">ls</div><div>List sections</div>
            <div className="text-orange-400">clear</div><div>Clear terminal</div>
          </div>
        );
        break;
      case 'about':
        addOutput(
          <div className="mt-2 space-y-2">
            <p className="text-blue-400 font-bold">{RESUME_DATA.name}</p>
            <p className="text-purple-400 italic">{RESUME_DATA.title}</p>
            <p className="text-gray-300 leading-relaxed">{RESUME_DATA.summary}</p>
            <p className="text-gray-500 text-sm flex items-center gap-2"><Globe size={14} /> {RESUME_DATA.location}</p>
          </div>
        );
        break;
      case 'exp':
        addOutput(
          <div className="mt-2 space-y-4">
            {RESUME_DATA.experience.map((exp, i) => (
              <div key={i} className="border-l-2 border-blue-500 pl-4 py-1">
                <div className="flex justify-between items-start">
                  <p className="text-green-400 font-bold">{exp.role}</p>
                  <span className="text-gray-500 text-xs">{exp.period}</span>
                </div>
                <p className="text-blue-300 text-sm">{exp.company}</p>
                <p className="text-gray-400 text-sm mt-1">{exp.description}</p>
              </div>
            ))}
          </div>
        );
        break;
      case 'edu':
        addOutput(
          <div className="mt-2 space-y-4">
            {RESUME_DATA.education.map((edu, i) => (
              <div key={i} className="border-l-2 border-purple-500 pl-4 py-1">
                <div className="flex justify-between items-start">
                  <p className="text-green-400 font-bold">{edu.school}</p>
                  <span className="text-gray-500 text-xs">{edu.period}</span>
                </div>
                <p className="text-purple-300 text-sm">{edu.degree}</p>
              </div>
            ))}
          </div>
        );
        break;
      case 'skills':
        addOutput(
          <div className="mt-2 flex flex-wrap gap-2">
            {RESUME_DATA.skills.map((skill, i) => (
              <span key={i} className="px-2 py-1 bg-gray-800 text-orange-300 rounded text-xs border border-gray-700">
                {skill}
              </span>
            ))}
          </div>
        );
        break;
      case 'certs':
        addOutput(
          <div className="mt-2 space-y-2">
            {RESUME_DATA.certifications.map((cert, i) => (
              <div key={i} className="flex items-start gap-2">
                <Award size={14} className="text-yellow-500 mt-1 flex-shrink-0" />
                <span className="text-gray-300 text-sm">{cert}</span>
              </div>
            ))}
          </div>
        );
        break;
      case 'contact':
        addOutput(
          <div className="mt-2 space-y-2">
            <div className="flex items-center gap-2">
              <Mail size={16} className="text-blue-400" />
              <a href={`mailto:${RESUME_DATA.contact.email}`} className="text-gray-300 hover:text-blue-400 underline">{RESUME_DATA.contact.email}</a>
            </div>
            <div className="flex items-center gap-2">
              <Linkedin size={16} className="text-blue-400" />
              <a href={`https://${RESUME_DATA.contact.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400 underline">LinkedIn Profile</a>
            </div>
          </div>
        );
        break;
      case 'whoami':
        addOutput(
          <div className="mt-2 flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center border-2 border-blue-500">
              <User size={24} className="text-blue-300" />
            </div>
            <div>
              <p className="text-blue-400 font-bold">{RESUME_DATA.name}</p>
              <p className="text-gray-500 text-xs">Cybersecurity Professional</p>
            </div>
          </div>
        );
        break;
      case 'ls':
        addOutput(
          <div className="mt-2 grid grid-cols-3 gap-2 text-blue-400">
            <div>about/</div>
            <div>experience/</div>
            <div>education/</div>
            <div>skills/</div>
            <div>certifications/</div>
            <div>contact/</div>
          </div>
        );
        break;
      case 'clear':
        setHistory([]);
        break;
      case '':
        break;
      default:
        addOutput(<span className="text-red-400">Command not found: {cleanCmd}. Type 'help' for available commands.</span>);
    }
    
    // Focus input after command
    setTimeout(() => inputRef.current?.focus(), 10);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      handleCommand(input);
      setInput('');
    }
  };

  return (
    <>
      <AnimatePresence>
        {isSystemLoading && (
          <LoadingScreen onComplete={() => setIsSystemLoading(false)} />
        )}
      </AnimatePresence>

      <div className="h-screen desktop-bg relative overflow-hidden flex flex-col font-sans">
      {/* macOS Notch */}
      <div className="mac-notch hidden lg:block"></div>

      {/* Top Menu Bar */}
      <div className="menu-bar h-7 w-full flex items-center justify-between px-3 sm:px-4 text-white text-[11px] sm:text-[12px] font-medium z-50">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex items-center">
            <svg 
              viewBox="0 0 172 172" 
              className="w-4 h-4 fill-white"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M118.256,86.004c0.043,21.844,17.888,29.132,18.146,29.218c-0.172,0.516-2.838,9.718-9.331,19.178 c-5.633,8.17-11.481,16.34-20.64,16.512c-8.987,0.172-11.868-5.289-22.145-5.289c-10.277,0-13.468,5.117-22.145,5.461 c-8.815,0.344-15.523-8.858-21.199-17.028c-11.61-16.727-20.468-47.128-8.428-68.026c5.977-10.363,16.619-16.942,28.143-17.114 c8.815-0.172,17.114,5.977,22.489,5.977c5.375,0,15.394-7.396,25.929-6.321c4.429,0.172,16.856,1.763,24.854,13.459 C133.736,52.159,118.213,63.425,118.256,86.004z M100.281,37.369c4.73-5.719,7.912-13.674,7.052-21.629 c-6.837,0.258-15.093,4.515-19.995,10.234c-4.386,5.031-8.213,13.115-7.181,20.898C87.897,47.431,95.551,43.089,100.281,37.369z" />
            </svg>
          </div>
          <div className="font-bold hidden xs:block">Finder</div>
          <div className="hidden md:block">File</div>
          <div className="hidden md:block">Edit</div>
          <div className="hidden md:block">View</div>
          <div className="hidden lg:block">Go</div>
          <div className="hidden lg:block">Window</div>
          <div className="hidden lg:block">Help</div>
        </div>
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="hidden xs:inline">🔋 91%</span>
            <span>📶</span>
            <span className="hidden xs:inline">🔊</span>
          </div>
          <div className="font-semibold whitespace-nowrap">Sat 20 May 12:03</div>
        </div>
      </div>

      {/* Desktop Content */}
      <div className="flex-1 relative p-2 sm:p-6 flex flex-col items-end gap-2 sm:gap-4 overflow-hidden">
        {/* Desktop Icons (Top Right) */}
        <div className="flex flex-col gap-1 sm:gap-2 z-10">
          <div className="desktop-icon" onClick={() => handleCommand('whoami')}>
            <MacIcon 
              src="https://cdn.jsdelivr.net/gh/Pravasith/macOS-Big-Sur-Icons@main/Hard%20Drive.png" 
              fallbackIcon={HardDrive}
              alt="Mac" 
              className="w-10 h-10 sm:w-14 sm:h-14 drop-shadow-md"
              gradient="from-gray-400 to-gray-600"
            />
            <span>Macintosh HD</span>
          </div>
          <div className="desktop-icon" onClick={() => handleCommand('about')}>
            <MacIcon 
              src="https://cdn.jsdelivr.net/gh/Pravasith/macOS-Big-Sur-Icons@main/Safari.png" 
              fallbackIcon={Compass}
              alt="Safari" 
              className="w-8 h-8 sm:w-12 sm:h-12 drop-shadow-md"
              gradient="from-blue-400 to-blue-600"
            />
            <span>About Me</span>
          </div>
          <div className="desktop-icon" onClick={() => handleCommand('exp')}>
            <MacIcon 
              src="https://cdn.jsdelivr.net/gh/Pravasith/macOS-Big-Sur-Icons@main/Preview.png" 
              fallbackIcon={FileText}
              alt="Resume" 
              className="w-8 h-8 sm:w-12 sm:h-12 drop-shadow-md"
              gradient="from-white to-gray-200"
            />
            <span>Resume.pdf</span>
          </div>
        </div>

        {/* Terminal Window (Centered) */}
        <div className="absolute inset-x-0 top-20 bottom-24 sm:inset-0 flex items-center justify-center z-20 pointer-events-none px-2 sm:px-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="w-full max-w-4xl h-full sm:h-[550px] bg-[#161b22]/90 backdrop-blur-xl rounded-xl mac-window-shadow border border-[#30363d] overflow-hidden flex flex-col pointer-events-auto"
            onClick={() => inputRef.current?.focus()}
          >
            {/* Terminal Header */}
            <div className="bg-[#21262d] px-3 sm:px-4 py-1.5 sm:py-2 flex items-center justify-between border-b border-[#30363d] flex-shrink-0">
              <div className="flex items-center gap-2 overflow-hidden">
                <div className="flex gap-1.5 sm:gap-2 flex-shrink-0">
                  <div className="w-2.5 h-2.5 sm:w-3 h-3 rounded-full bg-[#ff5f56] border border-black/10"></div>
                  <div className="w-2.5 h-2.5 sm:w-3 h-3 rounded-full bg-[#ffbd2e] border border-black/10"></div>
                  <div className="w-2.5 h-2.5 sm:w-3 h-3 rounded-full bg-[#27c93f] border border-black/10"></div>
                </div>
                <div className="ml-2 sm:ml-4 flex items-center gap-2 text-gray-400 text-[9px] sm:text-xs font-medium truncate">
                  <TerminalIcon size={10} className="sm:w-[14px] sm:h-[14px]" />
                  <span className="truncate font-mono">mra@portfolio — -zsh</span>
                </div>
              </div>
              <div className="text-gray-500 text-[8px] sm:text-[10px] uppercase tracking-widest font-bold hidden xs:block font-mono">
                Secure Shell
              </div>
            </div>

            {/* Terminal Body */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-3 sm:p-6 font-mono text-[10px] sm:text-sm space-y-1.5 sm:space-y-2 scroll-smooth"
            >
              <AnimatePresence mode="popLayout">
                {history.map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`${item.type === 'command' ? 'text-green-400' : 'text-gray-300'} break-words`}
                  >
                    {item.content}
                  </motion.div>
                ))}
              </AnimatePresence>

              {!isBooting && (
                <form onSubmit={handleSubmit} className="flex items-start sm:items-center gap-1.5 sm:gap-2 mt-1.5 sm:mt-2">
                  <span className="text-green-400 flex-shrink-0 whitespace-nowrap">guest@mra:~$</span>
                  <div className="flex-1 relative flex items-center">
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      autoFocus
                      className="w-full bg-transparent outline-none text-gray-300 border-none p-0 focus:ring-0"
                      spellCheck={false}
                      autoComplete="off"
                    />
                    {input === '' && <span className="cursor flex-shrink-0"></span>}
                  </div>
                </form>
              )}
            </div>

            {/* Terminal Footer */}
            <div className="bg-[#0d1117] px-3 sm:px-4 py-1 border-t border-[#30363d] flex justify-between items-center text-[8px] sm:text-[10px] text-gray-500 flex-shrink-0 font-mono">
              <div className="flex gap-2 sm:gap-4">
                <span className="flex items-center gap-1"><Shield size={10} /> Secure</span>
                <span className="flex items-center gap-1"><Cpu size={10} /> MUET_OS</span>
              </div>
              <div>UTF-8</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* macOS Dock */}
      <div className="fixed bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 z-50 w-max max-w-[95vw]">
        <div className="dock-container overflow-x-auto no-scrollbar">
          <div className="dock-item" onClick={() => handleCommand('ls')}>
            <MacIcon 
              src="https://cdn.jsdelivr.net/gh/Pravasith/macOS-Big-Sur-Icons@main/Finder.png" 
              fallbackIcon={Search}
              alt="Finder" 
              className="w-8 h-8 sm:w-12 sm:h-12 flex-shrink-0"
              gradient="from-blue-200 to-blue-400"
            />
          </div>
          <div className="dock-item" onClick={() => handleCommand('help')}>
            <MacIcon 
              src="https://cdn.jsdelivr.net/gh/Pravasith/macOS-Big-Sur-Icons@main/Launchpad.png" 
              fallbackIcon={LayoutGrid}
              alt="Launchpad" 
              className="w-8 h-8 sm:w-12 sm:h-12 flex-shrink-0"
              gradient="from-gray-100 to-gray-300"
            />
          </div>
          <div className="dock-item" onClick={() => handleCommand('exp')}>
            <MacIcon 
              src="https://cdn.jsdelivr.net/gh/Pravasith/macOS-Big-Sur-Icons@main/Notes.png" 
              fallbackIcon={FileText}
              alt="Notes" 
              className="w-8 h-8 sm:w-12 sm:h-12 flex-shrink-0"
              gradient="from-yellow-200 to-yellow-400"
            />
          </div>
          <div className="dock-item" onClick={() => handleCommand('about')}>
            <MacIcon 
              src="https://cdn.jsdelivr.net/gh/Pravasith/macOS-Big-Sur-Icons@main/Safari.png" 
              fallbackIcon={Compass}
              alt="Safari" 
              className="w-8 h-8 sm:w-12 sm:h-12 flex-shrink-0"
              gradient="from-blue-400 to-blue-600"
            />
          </div>
          <div className="dock-item" onClick={() => handleCommand('skills')}>
            <MacIcon 
              src="https://cdn.jsdelivr.net/gh/Pravasith/macOS-Big-Sur-Icons@main/System%20Preferences.png" 
              fallbackIcon={Settings}
              alt="Settings" 
              className="w-8 h-8 sm:w-12 sm:h-12 flex-shrink-0"
              gradient="from-gray-300 to-gray-500"
            />
          </div>
          <div className="dock-item" onClick={() => handleCommand('certs')}>
            <MacIcon 
              src="https://cdn.jsdelivr.net/gh/Pravasith/macOS-Big-Sur-Icons@main/App%20Store.png" 
              fallbackIcon={AppWindow}
              alt="App Store" 
              className="w-8 h-8 sm:w-12 sm:h-12 flex-shrink-0"
              gradient="from-blue-500 to-blue-700"
            />
          </div>
          <div className="dock-item" onClick={() => handleCommand('contact')}>
            <MacIcon 
              src="https://cdn.jsdelivr.net/gh/Pravasith/macOS-Big-Sur-Icons@main/Mail.png" 
              fallbackIcon={Mail}
              alt="Mail" 
              className="w-8 h-8 sm:w-12 sm:h-12 flex-shrink-0"
              gradient="from-blue-100 to-blue-300"
            />
          </div>
          <div className="dock-item active" onClick={() => handleCommand('help')}>
            <MacIcon 
              src="https://cdn.jsdelivr.net/gh/Pravasith/macOS-Big-Sur-Icons@main/Terminal.png" 
              fallbackIcon={TerminalIcon}
              alt="Terminal" 
              className="w-8 h-8 sm:w-12 sm:h-12 flex-shrink-0"
              gradient="from-gray-800 to-black"
            />
          </div>
          <div className="w-[1px] h-8 bg-white/20 mx-0.5 sm:mx-1 flex-shrink-0"></div>
          <div className="dock-item" onClick={() => handleCommand('clear')}>
            <MacIcon 
              src="https://cdn.jsdelivr.net/gh/Pravasith/macOS-Big-Sur-Icons@main/Trash.png" 
              fallbackIcon={Trash2}
              alt="Trash" 
              className="w-8 h-8 sm:w-12 sm:h-12 flex-shrink-0"
              gradient="from-gray-200 to-gray-400"
            />
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
