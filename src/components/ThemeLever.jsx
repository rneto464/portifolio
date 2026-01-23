import React from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const ThemeLever = () => {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] font-sans font-bold text-space-accent tracking-widest uppercase">MODE</span>

            <div
                className="relative w-14 h-28 bg-space-800 rounded-full border-2 border-space-accent/20 shadow-inner p-1 cursor-pointer group hover:border-space-accent/50 transition-colors"
                onClick={toggleTheme}
            >
                {/* Track Line */}
                <div className="absolute top-4 bottom-4 left-1/2 -translate-x-1/2 w-[2px] bg-black/40 rounded-full"></div>

                {/* Labels */}
                <span className={`absolute top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold z-0 ${isDark ? 'text-white drop-shadow-md' : 'text-gray-600'}`}>DARK</span>
                <span className={`absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] font-bold z-0 ${!isDark ? 'text-white drop-shadow-md' : 'text-gray-600'}`}>LITE</span>

                {/* Handle */}
                <motion.div
                    className="absolute left-1 w-10 h-10 bg-gradient-to-b from-gray-100 to-gray-300 rounded-full shadow-lg border border-white flex items-center justify-center z-10"
                    animate={{
                        top: isDark ? '4px' : 'calc(100% - 46px)'
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                    {isDark ? (
                        <Moon size={18} className="text-space-900 fill-current" />
                    ) : (
                        <Sun size={18} className="text-yellow-600 fill-current" />
                    )}
                </motion.div>
            </div>
        </div>
    );
};
