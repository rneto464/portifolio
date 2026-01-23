import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Contact = () => {
    const { t } = useLanguage();

    return (
        <section className="py-32 bg-gradient-to-b from-space-900 to-black text-center relative">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-space-accent/30 to-transparent"></div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="container mx-auto px-6"
            >
                <h2 className="text-sm font-sans tracking-[0.3em] text-space-accent uppercase mb-4">{t.contact.endTransmission}</h2>
                <h3 className="text-4xl md:text-5xl font-serif text-[var(--text-primary)] mb-12">{t.contact.initialize}</h3>

                <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center max-w-4xl mx-auto">
                    <a href="mailto:rneto2126@gmail.com" className="group flex flex-col items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-space-800 border border-space-accent/20 flex items-center justify-center group-hover:bg-space-accent group-hover:text-space-900 transition-all duration-300 shadow-md">
                            <Mail size={24} className="text-white" />
                        </div>
                        <span className="text-[var(--text-secondary)] group-hover:text-space-accent font-sans text-sm tracking-widest uppercase transition-colors">Email</span>
                    </a>

                    <a href="https://linkedin.com/in/rnetodev-362956238" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-space-800 border border-space-accent/20 flex items-center justify-center group-hover:bg-space-accent group-hover:text-space-900 transition-all duration-300 shadow-md">
                            <Linkedin size={24} className="text-white" />
                        </div>
                        <span className="text-[var(--text-secondary)] group-hover:text-space-accent font-sans text-sm tracking-widest uppercase transition-colors">LinkedIn</span>
                    </a>

                    <a href="https://github.com/rneto464" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-space-800 border border-space-accent/20 flex items-center justify-center group-hover:bg-space-accent group-hover:text-space-900 transition-all duration-300 shadow-md">
                            <Github size={24} className="text-white" />
                        </div>
                        <span className="text-[var(--text-secondary)] group-hover:text-space-accent font-sans text-sm tracking-widest uppercase transition-colors">GitHub</span>
                    </a>
                </div>

                <footer className="mt-32 text-[var(--text-secondary)] text-xs font-sans tracking-widest">
                    © 2026 RAIMUNDO NETO | {t.contact.systemStatus}
                </footer>
            </motion.div>
        </section>
    );
};
