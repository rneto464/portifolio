import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

export const StarBackground = () => {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: 0, y: 0 });
    const { theme } = useTheme();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId;
        let stars = [];
        let width = 0;
        let height = 0;

        // Theme colors
        const isDark = theme === 'dark';
        const bgColor = isDark ? '#0b0d17' : '#CCDBE2'; // space-900 vs Winter Blue-Grey
        const starColor = isDark ? '255, 255, 255' : '67, 85, 101'; // White vs Slate (#435565)

        const handleMouseMove = (e) => {
            mouseRef.current.x = e.clientX;
            mouseRef.current.y = e.clientY;
        };
        window.addEventListener('mousemove', handleMouseMove);

        const init = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;

            const starCount = Math.floor((width * height) / 3000);
            stars = [];
            for (let i = 0; i < starCount; i++) {
                stars.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    z: Math.random() * 2 + 0.5,
                    size: Math.random() * 1.5,
                    speed: Math.random() * 0.2 + 0.05
                });
            }
        };

        const draw = () => {
            // Clear with Theme Background
            ctx.fillStyle = bgColor;
            ctx.fillRect(0, 0, width, height);

            if (isDark) {
                // Dark Mode Nebula
                const g1 = ctx.createRadialGradient(width * 0.2, height * 0.3, 0, width * 0.3, height * 0.4, width);
                g1.addColorStop(0, 'rgba(29, 24, 84, 0.2)');
                g1.addColorStop(1, 'rgba(0,0,0,0)');
                ctx.fillStyle = g1;
                ctx.fillRect(0, 0, width, height);

                const g2 = ctx.createRadialGradient(width * 0.8, height * 0.8, 0, width * 0.8, height * 0.8, width * 0.6);
                g2.addColorStop(0, 'rgba(60, 20, 80, 0.15)');
                g2.addColorStop(1, 'rgba(0,0,0,0)');
                ctx.fillStyle = g2;
                ctx.fillRect(0, 0, width, height);
            } else {
                // Light Mode Atmosphere (Clouds/Day)
                const g1 = ctx.createRadialGradient(width * 0.5, 0, 0, width * 0.5, 0, height);
                g1.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
                g1.addColorStop(1, 'rgba(255, 255, 255, 0)');
                ctx.fillStyle = g1;
                ctx.fillRect(0, 0, width, height);
            }

            stars.forEach(star => {
                ctx.beginPath();

                const offsetX = (mouseRef.current.x - width / 2) * 0.02 * (1 / star.z);
                const offsetY = (mouseRef.current.y - height / 2) * 0.02 * (1 / star.z);

                const xPos = star.x + offsetX;
                const yPos = star.y + offsetY;

                const brightness = 1 - (star.z / 3);
                ctx.fillStyle = `rgba(${starColor}, ${brightness})`;

                ctx.arc(xPos, yPos, star.size, 0, Math.PI * 2);
                ctx.fill();
            });

            animationFrameId = window.requestAnimationFrame(draw);
        };

        const handleResize = () => {
            init();
        };

        init();
        draw();

        window.addEventListener('resize', handleResize);

        return () => {
            window.cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [theme]); // Re-run when theme changes

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 w-full h-full pointer-events-none transition-opacity duration-1000"
        />
    );
};
