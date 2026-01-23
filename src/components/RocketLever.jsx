import React from 'react';
import { motion } from 'framer-motion';
import { Rocket } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const RocketLever = () => {
    const { lang, toggleLang } = useLanguage();
    const isEn = lang === 'en';

    return (
        <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] font-sans font-bold text-space-accent tracking-widest uppercase">LANG</span>

            <div
                className="relative w-14 h-28 bg-space-800 rounded-full border-2 border-space-accent/20 shadow-inner p-1 cursor-pointer group hover:border-space-accent/50 transition-colors"
                onClick={toggleLang}
            >
                {/* Track Line */}
                <div className="absolute top-4 bottom-4 left-1/2 -translate-x-1/2 w-[2px] bg-black/40 rounded-full"></div>

                {/* Labels */}
                <span className={`absolute top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold z-0 ${isEn ? 'text-white drop-shadow-md' : 'text-gray-600'}`}>EN</span>
                <span className={`absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] font-bold z-0 ${!isEn ? 'text-white drop-shadow-md' : 'text-gray-600'}`}>PT</span>

                {/* Handle */}
                <motion.div
                    className="absolute left-1 w-10 h-10 bg-gradient-to-b from-gray-100 to-gray-300 rounded-full shadow-lg border border-white flex items-center justify-center z-10"
                    animate={{
                        top: isEn ? '4px' : 'calc(100% - 46px)', // 28*4 = 112px height? No h-28 is 7rem=112px. 
                        // h-28 = 112px. p-1 = 4px. top-4px. bottom-4px. 
                        // let's stick to safe calc.
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                    <Rocket
                        size={18}
                        className={`text-space-900 transition-transform duration-300 ${isEn ? '-rotate-45' : 'rotate-[135deg]'}`}
                        fill="currentColor"
                    />
                </motion.div>
            </div>
        </div>
    );
};
