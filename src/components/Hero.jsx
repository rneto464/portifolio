import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Hero = () => {
    const { t } = useLanguage();

    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 300], [0, 100]);
    const y2 = useTransform(scrollY, [0, 300], [0, -50]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    return (
        <section className="min-h-screen flex flex-col justify-center items-center text-center relative overflow-hidden px-4">

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                style={{ y: y1, opacity }}
                className="z-10 relative"
            >
                <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="inline-block"
                >
                    <h2 className="text-space-accent uppercase tracking-[0.5em] mb-6 font-sans text-sm md:text-base bg-space-800/30 backdrop-blur-sm py-2 px-6 rounded-full border border-white/5 mx-auto">
                        {t.hero.role}
                    </h2>
                </motion.div>

                <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-space-accent/50 mb-8 drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                    RAIMUNDO NETO
                </h1>

                <p className="text-gray-300 max-w-2xl mx-auto text-lg md:text-xl font-sans leading-relaxed tracking-wide mix-blend-screen">
                    {t.hero.subtitle}
                    <br />
                    <span className="text-space-accent text-sm mt-4 block opacity-80">{t.hero.exploring}</span>
                </p>
            </motion.div>

            <motion.div
                style={{ y: y2 }}
                className="absolute bottom-0 w-full h-[60vh] bg-gradient-to-t from-space-900 via-space-800/20 to-transparent z-0 pointer-events-none"
            />

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce"
            >
                <ChevronDown className="text-space-accent/50" />
            </motion.div>

        </section>
    );
};
