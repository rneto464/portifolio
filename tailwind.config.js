/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                space: {
                    900: 'var(--space-900)',
                    800: 'var(--space-800)',
                    accent: 'var(--space-accent)',
                },
                primary: 'var(--text-primary)',
                secondary: 'var(--text-secondary)',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                serif: ['Bellefair', 'serif'],
            },
        },
    },
    plugins: [],
}
