import React from 'react';
import { motion } from 'framer-motion';
import { User, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const About = () => {
    const { t } = useLanguage();

    return (
        <section className="py-32 relative">
            <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative"
                >
                    <div className="w-full aspect-square rounded-2xl bg-gradient-to-tr from-space-800 to-space-900 border border-space-accent/20 flex items-center justify-center p-8 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-space-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <User className="w-32 h-32 text-space-accent/50" />

                        <div className="absolute bottom-8 left-8 bg-black/40 backdrop-blur-md p-4 rounded-lg border border-white/10">
                            <div className="flex items-center gap-2 text-space-accent mb-1">
                                <MapPin size={16} />
                                <span className="text-xs uppercase tracking-wider">{t.about.location}</span>
                            </div>
                            <p className="text-white font-serif">São Luís, Maranhão</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-sm font-sans tracking-[0.3em] text-space-accent uppercase mb-4">{t.about.title}</h2>
                    <h3 className="text-4xl md:text-5xl font-serif text-[var(--text-primary)] mb-8">{t.about.missionLog}</h3>

                    <div className="space-y-6 text-[var(--text-secondary)] font-sans leading-relaxed">
                        <p>{t.about.p1}</p>
                        <p>{t.about.p2}</p>
                    </div>

                    <div className="mt-12 pt-8 border-t border-space-accent/10">
                        <h4 className="text-[var(--text-primary)] font-serif mb-4">{t.about.educationTitle}</h4>
                        <div className="flex flex-col gap-2">
                            <span className="text-space-accent text-lg">{t.about.education_degree}</span>
                            <span className="text-[var(--text-secondary)]">{t.about.university}</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
