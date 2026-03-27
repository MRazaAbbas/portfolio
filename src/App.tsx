/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal as TerminalIcon, Github, Linkedin, Mail, Globe, Cpu, Shield, Code, Award, BookOpen, Briefcase, User } from 'lucide-react';

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
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
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
  }, []);

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
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      handleCommand(input);
      setInput('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-2 sm:p-4 bg-[#0d1117]">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-4xl h-[85vh] sm:h-[600px] bg-[#161b22] rounded-lg shadow-2xl border border-[#30363d] overflow-hidden flex flex-col"
        onClick={() => inputRef.current?.focus()}
      >
        {/* Terminal Header */}
        <div className="bg-[#21262d] px-3 sm:px-4 py-2 flex items-center justify-between border-b border-[#30363d] flex-shrink-0">
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="flex gap-1.5 flex-shrink-0">
              <div className="w-2.5 h-2.5 sm:w-3 h-3 rounded-full bg-[#ff5f56]"></div>
              <div className="w-2.5 h-2.5 sm:w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
              <div className="w-2.5 h-2.5 sm:w-3 h-3 rounded-full bg-[#27c93f]"></div>
            </div>
            <div className="ml-2 sm:ml-4 flex items-center gap-2 text-gray-400 text-[10px] sm:text-xs font-medium truncate">
              <TerminalIcon size={12} className="sm:w-[14px] sm:h-[14px]" />
              <span className="truncate">mra@portfolio — -zsh</span>
            </div>
          </div>
          <div className="text-gray-500 text-[8px] sm:text-[10px] uppercase tracking-widest font-bold hidden xs:block">
            Secure Shell
          </div>
        </div>

        {/* Terminal Body */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-4 sm:p-6 font-mono text-xs sm:text-sm space-y-2 scroll-smooth"
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
            <form onSubmit={handleSubmit} className="flex items-start sm:items-center gap-2 mt-2">
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
        <div className="bg-[#0d1117] px-3 sm:px-4 py-1 border-t border-[#30363d] flex justify-between items-center text-[8px] sm:text-[10px] text-gray-500 flex-shrink-0">
          <div className="flex gap-3 sm:gap-4">
            <span className="flex items-center gap-1"><Shield size={10} /> Secure</span>
            <span className="flex items-center gap-1"><Cpu size={10} /> MUET_OS</span>
          </div>
          <div>UTF-8</div>
        </div>
      </motion.div>

      {/* Background Decorative Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}
