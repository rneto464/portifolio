import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/projects';
import { ExternalLink, Github, X, Pause, Play } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const ProjectPlanets = () => {
    const { t } = useLanguage();

    const localizedProjects = projects.map((p, index) => ({
        ...p,
        ...t.projects.items[index]
    }));

    const [selectedProject, setSelectedProject] = useState(null);
    const [isPaused, setIsPaused] = useState(false);
    const [manualPause, setManualPause] = useState(false);
    const [showToast, setShowToast] = useState(false); // Feedback state
    const [rotation, setRotation] = useState(0);
    const requestRef = useRef();

    // Physics constants
    const speed = 0.002;
    const radiusX = 550;
    const radiusY = 120;

    const animate = () => {
        // Only rotate if not hovered (isPaused), not manually paused, and no modal open
        if (!isPaused && !manualPause && !selectedProject) {
            setRotation(prev => (prev + speed) % (Math.PI * 2));
        }
        requestRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current);
    }, [isPaused, manualPause, selectedProject]);

    // Keyboard navigation handlers
    const handleKeyDown = (e, project) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setSelectedProject(project);
        }
    };

    return (
        <section className="py-20 min-h-screen flex flex-col justify-center items-center relative overflow-hidden perspective-[1000px]">

            {/* Controls & Title */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-0 flex flex-col items-center">
                <div className="w-[1px] h-[1px] bg-white shadow-[0_0_150px_80px_rgba(255,255,255,0.1)] rounded-full mb-10"></div>

                <div className="mt-20 flex flex-col items-center gap-2">
                    <h2 className="text-4xl md:text-5xl font-serif text-white tracking-widest uppercase drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] whitespace-nowrap">
                        {t.projects.coordinates}
                    </h2>
                    <span className="text-xs font-sans text-space-accent tracking-[0.5em] uppercase opacity-70 mb-6">
                        {t.projects.subtitle}
                    </span>

                    {/* Accessibility: Manual Orbit Toggle */}
                    <button
                        onClick={() => setManualPause(!manualPause)}
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-space-800/50 border border-white/10 text-white/70 hover:bg-space-800 hover:text-white transition-all text-xs uppercase tracking-wider backdrop-blur-md pointer-events-auto z-10"
                        aria-label={manualPause ? "Resume Orbit" : "Pause Orbit"}
                    >
                        {manualPause ? <Play size={12} /> : <Pause size={12} />}
                        {manualPause ? "RESUME SYSTEM" : "PAUSE SYSTEM"}
                    </button>
                </div>
            </div>

            {/* Orbit Container */}
            <div className="relative w-full h-[600px] flex items-center justify-center pointer-events-none">
                {/* Note: Planet pointer-events-auto handles interaction */}

                <div className="absolute w-[1100px] h-[240px] border border-white/10 rounded-[100%] opacity-30"></div>

                {localizedProjects.map((project, index) => {
                    const angle = rotation + (index * (Math.PI * 2 / localizedProjects.length));
                    const x = Math.cos(angle) * radiusX;
                    const y = Math.sin(angle) * radiusY;
                    const scale = (Math.sin(angle) + 1.5) / 2.5;
                    const z = Math.sin(angle);
                    const visualScale = 0.6 + (z + 1) * 0.4;
                    const zIndex = Math.floor((z + 1) * 100);

                    return (
                        <motion.div
                            key={project.id}
                            className="absolute flex flex-col items-center justify-center group pointer-events-auto focus:outline-none"
                            style={{
                                x,
                                y,
                                zIndex,
                                scale: visualScale
                            }}
                            // Hover Pause
                            onMouseEnter={() => setIsPaused(true)}
                            onMouseLeave={() => setIsPaused(false)}
                            // Keyboard Focus Pause
                            onFocus={() => setIsPaused(true)}
                            onBlur={() => setIsPaused(false)}
                            onClick={() => setSelectedProject(project)}
                            onKeyDown={(e) => handleKeyDown(e, project)}
                            tabIndex={0}
                            role="button"
                            aria-label={`View details for project ${project.title}`}
                            // Fitts Law: Expand visual and hit area
                            whileHover={{ scale: visualScale * 1.2, zIndex: 1000 }}
                            whileFocus={{ scale: visualScale * 1.2, zIndex: 1000 }}
                        >
                            {/* Transparent Hitbox Extender for Fitts Law */}
                            <div className="absolute inset-[-20px] rounded-full z-0"></div>

                            {/* Visual Planet */}
                            <div className={`w-32 h-32 rounded-full bg-gradient-to-br ${project.color} shadow-[0_0_30px_-5px_rgba(255,255,255,0.3)] relative flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:shadow-[0_0_50px_10px_rgba(255,255,255,0.5)] z-10`}>
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
                                <project.icon className="w-12 h-12 text-white/90 drop-shadow-md" />
                            </div>

                            <div className={`mt-4 text-center transition-all duration-300 ${z > 0 ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 group-focus:opacity-100'} bg-space-900/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 z-20`}>
                                <h4 className="text-xs font-serif text-white whitespace-nowrap">{project.title}</h4>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Selected Project Details Overlay (Z-Index Fixed to 2000) */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
                        onClick={() => setSelectedProject(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 50 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 50 }}
                            className="bg-space-900 border border-space-accent/30 rounded-2xl max-w-2xl w-full p-8 relative shadow-[0_0_100px_rgba(0,0,0,0.5)]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-white p-2"
                                aria-label="Close details"
                            >
                                <X />
                            </button>

                            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
                                <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${selectedProject.color} shadow-lg shrink-0 flex items-center justify-center`}>
                                    <selectedProject.icon className="w-10 h-10 text-white" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-3xl font-serif text-white mb-2">{selectedProject.title}</h3>
                                    <p className="text-space-accent text-sm uppercase tracking-widest mb-4">{selectedProject.subtitle}</p>
                                    <p className="text-gray-300 leading-relaxed mb-6">{selectedProject.description}</p>

                                    <div className="flex flex-wrap gap-2 mb-8 justify-center md:justify-start">
                                        {selectedProject.tech.map(t => (
                                            <span key={t} className="px-3 py-1 bg-white/5 rounded text-xs text-gray-400 border border-white/10">
                                                {t}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex gap-4 justify-center md:justify-start">
                                        <a href={selectedProject.liveLink || '#'} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 bg-white text-space-900 px-6 py-2 rounded-full font-bold hover:bg-space-accent transition-colors text-sm ${!selectedProject.liveLink || selectedProject.liveLink === '#' ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`}>
                                            {t.projects.launch} <ExternalLink size={16} />
                                        </a>
                                        <a href={selectedProject.sourceLink || '#'} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 px-6 py-2 rounded-full border border-white/20 hover:bg-white/10 transition-colors text-sm text-white ${!selectedProject.sourceLink || selectedProject.sourceLink === '#' ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`}>
                                            <Github size={16} /> {t.projects.source}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};
