import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

// Constellation shapes definition
const constellationShapes = {
    languages: {
        points: [
            { x: 10, y: 60 }, { x: 30, y: 30 }, { x: 50, y: 50 }, { x: 70, y: 20 }, { x: 90, y: 40 }, { x: 80, y: 80 }
        ],
        connections: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]]
    },
    frameworks: {
        points: [
            { x: 20, y: 20 }, { x: 20, y: 80 }, { x: 50, y: 50 }, { x: 80, y: 20 }, { x: 80, y: 80 }, { x: 50, y: 90 }
        ],
        connections: [[0, 1], [0, 2], [2, 3], [3, 4], [1, 2], [2, 4], [1, 5], [4, 5]]
    },
    data: {
        points: [
            { x: 50, y: 10 }, { x: 20, y: 40 }, { x: 80, y: 40 }, { x: 50, y: 70 }, { x: 50, y: 90 }
        ],
        connections: [[0, 1], [0, 2], [1, 3], [2, 3], [3, 4]]
    },
    tools: {
        points: [
            { x: 50, y: 10 }, { x: 10, y: 50 }, { x: 90, y: 50 }, { x: 50, y: 90 }
        ],
        connections: [[0, 1], [0, 2], [1, 3], [2, 3]]
    }
};

const Constellation = ({ category, items, shape }) => {
    const [activeStar, setActiveStar] = useState(null);

    const starsToRender = items.slice(0, shape.points.length);
    const duration = 4 + Math.random() * 2;
    const yOffset = 5 + Math.random() * 10;

    return (
        <motion.div
            className="relative w-full aspect-square max-w-[400px] mx-auto group"
            animate={{
                y: [0, -yOffset, 0],
            }}
            transition={{
                duration: duration,
                repeat: Infinity,
                ease: "easeInOut"
            }}
        >
            <h3 className="absolute -top-12 left-1/2 -translate-x-1/2 text-2xl font-serif text-space-accent tracking-widest uppercase opacity-70 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                {category}
            </h3>

            <svg className="w-full h-full absolute inset-0 pointer-events-none z-0" viewBox="0 0 100 100">
                <motion.g
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 2, delay: 0.5 }}
                >
                    {shape.connections.map(([start, end], index) => {
                        const p1 = shape.points[start];
                        const p2 = shape.points[end];
                        return (
                            <motion.line
                                key={`${index}`}
                                x1={p1.x}
                                y1={p1.y}
                                x2={p2.x}
                                y2={p2.y}
                                stroke="var(--text-secondary)"
                                strokeOpacity="0.3"
                                strokeWidth="0.5"
                                initial={{ pathLength: 0 }}
                                whileInView={{ pathLength: 1 }}
                                transition={{ duration: 1.5, delay: index * 0.1 }}
                            />
                        );
                    })}
                </motion.g>
            </svg>

            {starsToRender.map((item, index) => {
                const point = shape.points[index];
                const isActive = activeStar === index;

                return (
                    <div
                        key={item}
                        className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
                        style={{ left: `${point.x}%`, top: `${point.y}%` }}
                    >
                        <motion.div
                            className="relative cursor-pointer"
                            onHoverStart={() => setActiveStar(index)}
                            onHoverEnd={() => setActiveStar(null)}
                            onClick={() => setActiveStar(isActive ? null : index)}
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            whileHover={{ scale: 1.5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <div className={`w-3 h-3 md:w-4 md:h-4 rounded-full bg-[var(--text-primary)] 
                ${isActive ? 'shadow-[0_0_25px_8px_rgba(208,214,249,0.9)] scale-125' : 'shadow-[0_0_10px_2px_rgba(255,255,255,0.4)]'} 
                transition-all duration-300`}></div>
                        </motion.div>

                        <AnimatePresence>
                            {(isActive || window.innerWidth < 768) && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                                    animate={{ opacity: 1, y: 5, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.8 }}
                                    className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-30"
                                >
                                    <span className="text-sm font-sans text-white font-semibold bg-space-800/60 shadow-lg px-3 py-1 rounded-full border border-space-accent/40 backdrop-blur-md whitespace-nowrap">
                                        {item}
                                    </span>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className={`absolute top-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] md:text-xs font-sans tracking-wider pointer-events-none transition-all duration-300 ${isActive ? 'opacity-0' : 'opacity-60 text-[var(--text-secondary)]'}`}>
                            {item}
                        </div>
                    </div>
                );
            })}
        </motion.div>
    );
};

export const Skills = () => {
    const { t } = useLanguage();

    const skillsData = [
        {
            category: t.skills.categories.languages,
            items: ["Python", "JavaScript", "TypeScript", "SQL", "Java", "C#"],
            shape: constellationShapes.languages
        },
        {
            category: t.skills.categories.frameworks,
            items: ["FastAPI", "Flask", "Django", "Node.js", "React", "Next.js"],
            shape: constellationShapes.frameworks
        },
        {
            category: t.skills.categories.data,
            items: ["PostgreSQL", "Supabase", "Gemini API", "OpenAI", "SQLAlchemy"],
            shape: constellationShapes.data
        },
        {
            category: t.skills.categories.tools,
            items: ["Git", "Docker", "Linux", "Tailwind"],
            shape: constellationShapes.tools
        }
    ];

    return (
        <section className="py-32 relative">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-center mb-24"
                >
                    <h2 className="text-sm font-sans tracking-[0.3em] text-space-accent uppercase mb-4">{t.skills.interact}</h2>
                    <h3 className="text-4xl md:text-5xl font-serif text-[var(--text-primary)]">{t.skills.subtitle}</h3>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-32 px-4 md:px-20">
                    {skillsData.map((group) => (
                        <Constellation
                            key={group.category}
                            category={group.category}
                            items={group.items}
                            shape={group.shape}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};
