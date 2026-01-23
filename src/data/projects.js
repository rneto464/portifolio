import { Music, ShoppingBag, Users, ShieldAlert } from 'lucide-react';

export const projects = [
    {
        id: 'player-v2',
        title: 'PlayerV2',
        subtitle: 'AI Music Discovery',
        description: 'Uma evolução robusta de um player de música, focada em conectar o visual ao sonoro.',
        icon: Music,
        color: 'from-purple-500 to-pink-500',
        tech: ['Python', 'Flask', 'Google Vision API', 'Gemini API', 'Spotify API'],
        liveLink: '#',
        sourceLink: '#',
        features: [
            'Recomendação Inteligente via Gemini',
            'Análise de atmosfera de imagens',
            'Suporte nativo ao Spotify e YouTube'
        ]
    },
    {
        id: 'loja-v7',
        title: 'LojaV7',
        subtitle: 'Gestão Inteligente',
        description: 'Sistema completo de gestão que resolve a complexidade financeira de assistências técnicas.',
        icon: ShoppingBag,
        color: 'from-blue-500 to-cyan-500',
        tech: ['Python', 'FastAPI', 'Supabase', 'Tailwind CSS'],
        liveLink: '#',
        sourceLink: 'https://github.com/rneto464/Lojav7',
        features: [
            'Cálculo de margens de lucro',
            'Rastreabilidade de peças',
            'Dashboards em tempo real'
        ]
    },
    {
        id: 'saas-filas',
        title: 'SaaS Gestão de Filas',
        subtitle: 'Multi-tenant Platform',
        description: 'Plataforma SaaS projetada para escalar. Atende múltiplos estabelecimentos simultaneamente.',
        icon: Users,
        color: 'from-green-500 to-emerald-500',
        tech: ['Python', 'Multi-tenant', 'Mobile Integration'],
        liveLink: '#',
        sourceLink: '#',
        features: [
            'Personalização White-label',
            'Fluxos distintos (Quiosque/Mobile)',
            'Escalabilidade horizontal'
        ]
    },
    {
        id: 'debateguard',
        title: 'DebateGuard',
        subtitle: 'Análise Lógica',
        description: 'Aplicação web que promove o pensamento crítico identificando falácias lógicas.',
        icon: ShieldAlert,
        color: 'from-red-500 to-orange-500',
        tech: ['Next.js', 'Supabase', 'Gamification'],
        liveLink: '#',
        sourceLink: '#',
        features: [
            'Identificação de falácias',
            'Gamificação',
            'Alta performance com Next.js'
        ]
    }
];
