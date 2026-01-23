import React from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { ProjectPlanets } from './components/ProjectPlanets';
import { Skills } from './components/Skills';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { StarBackground } from './components/StarBackground';
import { LanguageProvider } from './context/LanguageContext';

function AppContent() {
  return (
    <div className="min-h-screen bg-space-900 text-white overflow-hidden relative selection:bg-space-accent selection:text-space-900">
      <Navigation />

      {/* Dynamic Star Field / Galaxy Background */}
      <StarBackground />

      {/* Main Content */}
      <main className="relative z-10 w-full overflow-x-hidden">
        <section id="hero"><Hero /></section>
        <section id="about"><About /></section>
        <section id="skills"><Skills /></section>
        <section id="projects"><ProjectPlanets /></section>
        <section id="contact"><Contact /></section>
      </main>
    </div>
  );
}

import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
