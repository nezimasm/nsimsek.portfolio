import { Project, JourneyEvent } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'odysee',
    title: 'Odysee Cultural Center',
    category: 'Brand Identity & Spatial Wayfinding',
    year: '2026',
    client: 'Odysee Cultural Foundation',
    role: 'Lead Visual Designer',
    description: 'A modular, architectural visual identity designed around geometric typography and light-responsive colors. Includes custom typography and spatial wayfinding.',
    summary: 'Designing a dynamic physical-digital identity system for Istanbul’s newest multi-disciplinary art center, utilizing adaptive typography grids and geometric spatial markers.',
    accentColor: '#1A365D', // Deep Architectural Blue
    textColor: '#F5F5F7',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    tags: ['Brand Strategy', 'Type Design', 'Wayfinding', 'Interactive Kiosk'],
    details: {
      problem: 'Odysee needed a unified identity that bridges its physical gallery halls in Istanbul with its progressive online digital archive. The branding had to be recognizable across concrete walls, digital kiosks, and screen-printed posters, while remaining highly adaptive to different art exhibitions.',
      solution: 'We developed a variable geometric grid system based on the architectural layout of the building. The logo itself expands and contracts depending on the medium, while a custom typeface, "Odysee Mono", was designed for wayfinding plates and digital interfaces.',
      features: [
        'Variable layout grids mapping structural gallery blueprints',
        'Custom modular wayfinding signage printed on raw anodized aluminum',
        'Dynamic website & interactive touch kiosks for digital exhibition catalogs',
        'Minimalist editorial booklet set printed on sustainable cotton paper'
      ],
      concept: 'The core concept, "Light as Communication", focuses on how shadows and typography interact with physical spaces. The signage plates feature laser-cut lettering that casts shifting shadows as daylight changes throughout the galleries.'
    },
    interactiveType: 'typography'
  },
  {
    id: 'kinetic-monologue',
    title: 'The Kinetic Monologue',
    category: 'Book Design & Experimental Typography',
    year: '2025',
    client: 'Istanbul Fine Arts Press',
    role: 'Editorial Director & Typographer',
    description: 'A premium 300-page publication exploring the relationship between spoken word and kinetic typography, bound with an experimental multi-layered screen-printed cover.',
    summary: 'An editorial masterpiece mapping speech cadence, volume, and emotion to tactile print layout. Winner of the GMK National Book Design Award.',
    accentColor: '#8E24AA', // Rich plum
    textColor: '#F5F5F7',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=1200&q=80',
    tags: ['Editorial', 'Print Production', 'Experimental Type', 'Creative Binding'],
    details: {
      problem: 'Visualizing temporal vocal characteristics like pauses, stutters, and crescendos in a static, two-dimensional book format without losing structural elegance.',
      solution: 'Using Swiss-style grids, variable font weights, and shifting paragraph columns to create a "rhythmic timeline" on the printed page. Pages feature custom french-fold binding with hidden fluorescent ink elements.',
      features: [
        'Hand-numbered limited edition of 150 copies with debossed spine',
        'Fluorescent screen-printed accents only visible under custom lighting',
        'Varying paper weights (from 60gsm tracing sheets to 250gsm raw cotton)',
        'Comprehensive timeline mapping spoken transcripts to geometric layouts'
      ],
      concept: 'Cadence on Cotton: The rhythm of human speech translated into mechanical ink strokes, making silent pages speak visually.'
    },
    interactiveType: 'layout'
  },
  {
    id: 'vitra-archive',
    title: 'Vitra Digital Archive',
    category: 'Interactive Web Exhibition',
    year: '2026',
    client: 'Vitra Regional Office',
    role: 'Interaction Designer & Art Director',
    description: 'An immersive digital archive honoring mid-century industrial furniture designs, utilizing modular horizontal grids and elegant fluid animations.',
    summary: 'A highly functional, Awwwards-inspired museum platform built to preserve and display Vitra’s mid-century physical furniture collection online.',
    accentColor: '#121212', // Pure obsidian
    textColor: '#F9F6F0',
    image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80',
    tags: ['Web Design', 'UI/UX', 'Digital Archive', 'Motion Choreography'],
    details: {
      problem: 'Traditional design databases are dry and tabular. Vitra wanted an experience that replicates the spatial grandeur and tactile joy of walking through their design museum in Weil am Rhein.',
      solution: 'We engineered an interactive layout where furniture pieces are presented as 3D-feeling responsive cards. Smooth inertial scrolling, micro-scale hover reactions, and minimal serif typography evoke the classic modernist aesthetic of the designs.',
      features: [
        'Fluid, responsive horizontal grid inspired by modernist architectural lines',
        'Immersive zoom interfaces showcasing micro-textures of wood, leather, and steel',
        'Interactive timeline mapping mid-century design evolutions from 1950 to 1980',
        'Fully compliant, accessible digital index with high-contrast editorial modes'
      ],
      concept: 'Modernism in Motion: Adapting Swiss typography and clean grids into responsive digital gestures and layouts.'
    },
    interactiveType: 'color'
  },
  {
    id: 'aura-soundscape',
    title: 'Aura Soundscape',
    category: 'Generative Visual Identity',
    year: '2025',
    client: 'Aura Avant-Garde Records',
    role: 'Generative Artist',
    description: 'A dynamic, sound-reactive branding system that converts acoustic frequencies and decibel variations into beautifully organized vector typographic poster art.',
    summary: 'An experimental, code-driven brand system translating industrial noise, ambient drones, and electronic synths into generative print layouts.',
    accentColor: '#D35400', // Terracotta orange
    textColor: '#121212',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
    tags: ['Generative Design', 'Creative Coding', 'Acoustic Visuals', 'Live Posters'],
    details: {
      problem: 'Record labels need a way to maintain visual brand consistency across thousands of digital releases without relying on static templates or manual illustrations for every artist.',
      solution: 'We built a custom web applet that listens to a song and extracts pitch, tempo, and rhythm. The applet automatically creates customized vector poster layouts, album art, and social assets using a set of generative design rules.',
      features: [
        'Real-time frequency parsing translating audio stems to SVG vector path forms',
        'Dynamic typographic layouts utilizing variable font stretch and tracking',
        'Instant high-resolution print-ready SVG and PDF export functions',
        'A collection of 20 bespoke brand color maps derived from natural soundscapes'
      ],
      concept: 'Listen to the Design: A project where the designer steps back and acts as the builder of the rules, letting the music finish the layout.'
    },
    interactiveType: 'typography'
  },
  {
    id: 'nidus-coop',
    title: 'Nidus Co-living',
    category: 'Sustainable Packaging & Brand System',
    year: '2024',
    client: 'Nidus Sustainable Housing',
    role: 'Packaging Designer & Identity Specialist',
    description: 'A cohesive visual identity, sustainable packaging system, and brand handbook created for an eco-conscious modular urban co-housing community.',
    summary: 'Eco-conscious structural cardboard design, vegetable-ink letterpress print collateral, and comprehensive editorial brand manual.',
    accentColor: '#2C5E3B', // Moss green
    textColor: '#F4F3EF',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    tags: ['Sustainable Print', 'Packaging Design', 'Brand Standards', 'Letterpress'],
    details: {
      problem: 'Nidus wanted packaging and branding that felt highly modern and architectural, while adhering strictly to zero-waste, plastic-free material limitations.',
      solution: 'We designed zero-glue die-cut structural packages from recycled unbleached cardboard. The graphics are hand-stamped or letterpressed using organic soy inks, creating an earthy yet premium luxury feel.',
      features: [
        'Custom folding structures that hold items securely without adhesives',
        'Soy-ink letterpress branding on textured paper salvaged from coffee cups',
        'Detailed modular brand manual documenting sustainable print material rules',
        'Elegant typographic system pairing monospaced technical grids with premium serifs'
      ],
      concept: 'Tactile Architecture: Using raw, unrefined organic materials to construct elegant, high-contrast structural designs.'
    },
    interactiveType: 'layout'
  }
];

export const JOURNEY: JourneyEvent[] = [
  {
    id: 'yildiz-edu',
    type: 'education',
    title: 'Communication Design',
    organization: 'Yıldız Teknik Üniversitesi',
    period: 'Istanbul, Turkey',
    location: '2022 — 2026',
    description: [
      'Focusing on computational typography, geometric print systems, and tactile communication.',
      'Developing variable layouts and digital visual exhibition experiments.'
    ],
    skills: ['Typography', 'Grid Systems', 'Interaction Design']
  },
  {
    id: 'architecht-intern',
    type: 'internship',
    title: 'Creative UI/UX & Brand Intern',
    organization: 'Architecht Internship',
    period: 'Istanbul, Turkey',
    location: '2025 (6 Months)',
    description: [
      'Crafted high-fidelity web experiences and modular spatial brand systems.',
      'Synthesized complex interfaces into clean, responsive interaction patterns.'
    ],
    skills: ['Interaction Design', 'Design Systems', 'Figma']
  },
  {
    id: 'second-intern',
    type: 'internship',
    title: 'Visual Identity & Motion Intern',
    organization: 'Second Internship',
    period: 'Istanbul, Turkey',
    location: '2024 (3 Months)',
    description: [
      'Assisted in creating editorial monograph books and kinetic screen experiments.',
      'Developed fluid vector assets and high-end motion guidelines.'
    ],
    skills: ['Motion Design', 'Editorial Systems', 'Brand Assets']
  },
  {
    id: 'student-clubs',
    type: 'club',
    title: 'Art Director & Community Lead',
    organization: 'Student Clubs & Design Circles',
    period: 'Istanbul, Turkey',
    location: '2023 — Present',
    description: [
      'Curating indie student design showcases and visual typography meetups.',
      'Bridging fine arts foundations with experimental, code-driven Web canvases.'
    ],
    skills: ['Curation', 'Event Identity', 'Community Leadership']
  }
];

export const MANIFESTO_TEXTS = [
  "Design is not the decoration of a surface.",
  "It is the architectural formulation of communication.",
  "Every serif carries a history; every pixel commands a purpose.",
  "We don't create noise. We synthesize clarity from complexity.",
  "Inspired by raw material tactile honesty and digital grid fluidity."
];
