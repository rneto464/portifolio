import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const translations = {
    pt: {
        nav: {
            mission: "Controle da Missão",
            planets: "Planetas",
            skills: "Habilidades",
            about: "Sobre",
            contact: "Contato"
        },
        hero: {
            role: "Comandante da Missão",
            subtitle: "Engenheiro de Software em Formação | Full Stack Developer & Entusiasta de IA.",
            description: "Especialista em transformar problemas complexos em soluções digitais. Foco em arquiteturas escaláveis e inteligência artificial.",
            exploring: "Explorando arquiteturas escaláveis & Inteligência Artificial"
        },
        about: {
            title: "O Explorador",
            missionLog: "Sobre Mim",
            p1: "Estudante do 9º período de Engenharia de Software, combino a fundamentação acadêmica com uma forte experiência prática. Minha paixão é construir sistemas que resolvem dores reais — seja otimizando a gestão de uma assistência técnica ou criando novas formas de descobrir música através de IA.",
            p2: "Tenho proficiência em Python (FastAPI/Flask) e ecossistemas modernos de JavaScript (React Native/Next.js), sempre buscando a melhor ferramenta para o desafio, desde a arquitetura de banco de dados até a experiência final do usuário.",
            educationTitle: "Formação",
            education_degree: "Bacharelado em Engenharia de Software",
            university: "UNDB - Unidade de Ensino Superior Dom Bosco | Previsão: 2026",
            location: "Localização"
        },
        skills: {
            title: "Sistema Interativo",
            subtitle: "Constelações de Habilidades",
            interact: "Clique para Interagir",
            categories: {
                languages: "Linguagens",
                frameworks: "Frameworks",
                data: "Dados & IA",
                tools: "Ferramentas"
            }
        },
        projects: {
            coordinates: "Meus Projetos",
            subtitle: "Explorar Sistema",
            planet: "Planeta",
            launch: "Lançar Missão",
            source: "Código Fonte",
            items: [
                {
                    id: 'player-v2',
                    title: 'PlayerV2',
                    subtitle: 'Descoberta Musical com IA',
                    description: 'Uma evolução robusta de um player de música, focada em conectar o visual ao sonoro usando Inteligência Artificial.',
                },
                {
                    id: 'loja-v7',
                    title: 'LojaV7',
                    subtitle: 'Gestão Inteligente',
                    description: 'Sistema completo de gestão que resolve a complexidade financeira de assistências técnicas.',
                },
                {
                    id: 'saas-filas',
                    title: 'SaaS Gestão de Filas',
                    subtitle: 'Plataforma Multi-tenant',
                    description: 'Plataforma SaaS projetada para escalar. Atende múltiplos estabelecimentos simultaneamente.',
                },
                {
                    id: 'debateguard',
                    title: 'DebateGuard',
                    subtitle: 'Análise Lógica',
                    description: 'Aplicação web que promove o pensamento crítico identificando falácias lógicas.',
                }
            ]
        },
        contact: {
            endTransmission: "Fim da Transmissão",
            initialize: "Inicializar Contato",
            systemStatus: "STATUS DO SISTEMA: ONLINE"
        }
    },
    en: {
        nav: {
            mission: "Mission Control",
            planets: "Planets",
            skills: "Skills",
            about: "About",
            contact: "Contact"
        },
        hero: {
            role: "Mission Commander",
            subtitle: "Software Engineer in Training | Full Stack Developer & AI Enthusiast.",
            description: "Specializing in transforming complex problems into digital solutions. Focused on scalable architectures and Artificial Intelligence.",
            exploring: "Exploring scalable architectures & Artificial Intelligence"
        },
        about: {
            title: "The Explorer",
            missionLog: "About Me",
            p1: "Software Engineering student (9th semester) combining academic foundation with strong practical experience. My passion is building systems that solve real pains — whether optimizing technical support management or creating new ways to discover music through AI.",
            p2: "Proficient in Python (FastAPI/Flask) and modern JavaScript ecosystems (React Native/Next.js), always seeking the best tool for the challenge, from database architecture to the final user experience.",
            educationTitle: "Education",
            education_degree: "Bachelor in Software Engineering",
            university: "UNDB - Dom Bosco Higher Education Unit | Expected: 2026",
            location: "Location"
        },
        skills: {
            title: "Interactive System",
            subtitle: "Skill Constellations",
            interact: "Click to Interact",
            categories: {
                languages: "Languages",
                frameworks: "Frameworks",
                data: "Data & AI",
                tools: "Tools"
            }
        },
        projects: {
            coordinates: "My Projects",
            subtitle: "Explore System",
            planet: "Planet",
            launch: "Launch Mission",
            source: "Source Code",
            items: [
                {
                    id: 'player-v2',
                    title: 'PlayerV2',
                    subtitle: 'AI Music Discovery',
                    description: 'A robust evolution of a music player, focused on connecting visual to sound using Artificial Intelligence.',
                },
                {
                    id: 'loja-v7',
                    title: 'LojaV7',
                    subtitle: 'Smart Management',
                    description: 'Complete management system solving financial complexity for technical repair shops.',
                },
                {
                    id: 'saas-filas',
                    title: 'Queue SaaS',
                    subtitle: 'Multi-tenant Platform',
                    description: 'SaaS platform designed to scale. Serves multiple establishments simultaneously.',
                },
                {
                    id: 'debateguard',
                    title: 'DebateGuard',
                    subtitle: 'Logical Analysis',
                    description: 'Web application promoting critical thinking by identifying logical fallacies.',
                }
            ]
        },
        contact: {
            endTransmission: "End Transmission",
            initialize: "Initialize Contact",
            systemStatus: "SYSTEM STATUS: ONLINE"
        }
    }
};

export const LanguageProvider = ({ children }) => {
    const [lang, setLang] = useState('pt');

    const toggleLang = () => {
        setLang(prev => prev === 'pt' ? 'en' : 'pt');
    };

    return (
        <LanguageContext.Provider value={{ lang, toggleLang, t: translations[lang] }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
