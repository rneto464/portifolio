import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { RocketLever } from './RocketLever';


export const Navigation = () => {
    const { t } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: t.nav.planets, href: '#projects' },
        { name: t.nav.skills, href: '#skills' },
        { name: t.nav.about, href: '#about' },
        { name: t.nav.contact, href: '#contact' },
    ];

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-space-900/70 backdrop-blur-xl border-b border-light-white/5 py-2 shadow-lg' : 'bg-transparent py-6'}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                <div className="flex items-center gap-8">
                    <a href="#" className="text-2xl font-serif tracking-widest text-[var(--text-primary)] uppercase font-bold relative group">
                        RNETO <span className="text-space-accent">DEV</span>
                        <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-space-accent to-transparent transition-all duration-300 group-hover:w-full"></span>
                    </a>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="font-sans text-xs uppercase tracking-[0.2em] text-primary hover:text-space-accent transition-colors relative group py-2"
                            >
                                {link.name}
                                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-space-accent transition-all duration-300 group-hover:w-full opacity-50"></span>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Levers (Desktop) */}
                <div className="hidden md:flex gap-4 scale-75 origin-right">
                    <RocketLever />

                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-primary hover:text-space-accent transition-colors"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="md:hidden bg-space-900/95 backdrop-blur-xl border-b border-space-accent/20 overflow-hidden"
                    >
                        <div className="flex flex-col p-8 space-y-6 text-center items-center">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="font-serif text-xl text-primary hover:text-space-accent transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </a>
                            ))}

                            <div className="mt-8 pt-8 border-t border-white/10 w-full flex justify-center gap-6">
                                <RocketLever />

                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};
