import React, { useState, useEffect, useRef } from 'react';

const App = () => {
    // ═══════════════════════════════════════════════════════════════
    // STATE MANAGEMENT
    // ═══════════════════════════════════════════════════════════════
    const [serviceType, setServiceType] = useState('bundle');
    const [trackCount, setTrackCount] = useState(1);
    const [sessionState, setSessionState] = useState(0);
    const [vocalTuning, setVocalTuning] = useState(false);
    const [genre, setGenre] = useState('');
    const [clientName, setClientName] = useState('');
    const [clientEmail, setClientEmail] = useState('');
    const [projectNotes, setProjectNotes] = useState('');
    const [showQuoteModal, setShowQuoteModal] = useState(false);
    const [quoteSent, setQuoteSent] = useState(false);
    const [activeSection, setActiveSection] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);

    // Animation on mount
    useEffect(() => {
        setIsLoaded(true);
    }, []);

    // ═══════════════════════════════════════════════════════════════
    // PRICING ALGORITHM - Transparent & Professional
    // ═══════════════════════════════════════════════════════════════
    const PRICING = {
        mix: { base: 300, premium: 450 },      // Rango real
        master: { base: 100, premium: 175 },   // Rango real  
        bundle: { base: 380, premium: 550 },   // Descuento bundle ~15%
        tuning: 50,
        messyFee: 1.20,    // 20% - más razonable
        chaosFee: 1.40,    // 40% - justificado
        volumeDiscount: {  // Descuento por volumen
            3: 0.95,       // 5% off 3+ tracks
            5: 0.90,       // 10% off 5+ tracks
            8: 0.85,       // 15% off 8+ tracks
        }
    };

    const GENRES = [
        { id: 'lofi', name: 'Lo-Fi / Chill Hop', icon: '🎧' },
        { id: 'latin', name: 'Latin Soul / R&B', icon: '🔥' },
        { id: 'hiphop', name: 'Hip-Hop / Trap', icon: '🎤' },
        { id: 'electronic', name: 'Electronic / House', icon: '⚡' },
        { id: 'indie', name: 'Indie / Alternative', icon: '🎸' },
        { id: 'other', name: 'Otro género', icon: '🎵' },
    ];

    const calculateTotal = () => {
        const pricing = PRICING[serviceType];
        let basePrice = sessionState === 0 ? pricing.base : pricing.premium;
        
        // Session state multiplier
        let multiplier = 1;
        if (sessionState === 1) multiplier = PRICING.messyFee;
        if (sessionState === 2) multiplier = PRICING.chaosFee;
        
        // Volume discount
        let volumeMultiplier = 1;
        if (trackCount >= 8) volumeMultiplier = PRICING.volumeDiscount[8];
        else if (trackCount >= 5) volumeMultiplier = PRICING.volumeDiscount[5];
        else if (trackCount >= 3) volumeMultiplier = PRICING.volumeDiscount[3];
        
        let subtotal = (basePrice * multiplier * trackCount) * volumeMultiplier;
        
        if (vocalTuning) {
            subtotal += (PRICING.tuning * trackCount);
        }
        
        return {
            subtotal: Math.round(subtotal),
            savings: trackCount >= 3 ? Math.round((basePrice * multiplier * trackCount) - subtotal) : 0,
            perTrack: Math.round(subtotal / trackCount),
            timeline: trackCount <= 2 ? '3-5 días' : trackCount <= 5 ? '5-8 días' : '10-14 días'
        };
    };

    const quote = calculateTotal();

    // ═══════════════════════════════════════════════════════════════
    // WHATSAPP INTEGRATION - The Money Maker
    // ═══════════════════════════════════════════════════════════════
    const generateWhatsAppMessage = () => {
        const serviceName = serviceType === 'mix' ? 'Mixing' : serviceType === 'master' ? 'Mastering' : 'Mix & Master Bundle';
        const genreName = GENRES.find(g => g.id === genre)?.name || 'No especificado';
        const sessionStatus = sessionState === 0 ? 'Stems limpios' : sessionState === 1 ? 'Algo desordenado (+20%)' : 'Necesita organización (+40%)';
        
        const message = `🎵 *SOLICITUD DE COTIZACIÓN - SONIDO IGNACIO*

👤 *Cliente:* ${clientName || 'No especificado'}
📧 *Email:* ${clientEmail || 'No especificado'}

📋 *DETALLES DEL PROYECTO:*
• Servicio: ${serviceName}
• Tracks: ${trackCount}
• Género: ${genreName}
• Estado de sesión: ${sessionStatus}
• Vocal Tuning: ${vocalTuning ? 'Sí (+$50/track)' : 'No'}

💰 *ESTIMADO:* $${quote.subtotal} USD
${quote.savings > 0 ? `🎁 Ahorro por volumen: $${quote.savings} USD` : ''}
⏱️ *Tiempo estimado:* ${quote.timeline}

📝 *Notas:*
${projectNotes || 'Sin notas adicionales'}

---
Generado desde sonidoignacio.com`;

        return encodeURIComponent(message);
    };

    const handleWhatsAppSubmit = () => {
        const message = generateWhatsAppMessage();
        // Número de WhatsApp de Ignacio (placeholder - cambiar por el real)
        const phoneNumber = '573001234567'; // Formato: código país + número
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
        setQuoteSent(true);
        setShowQuoteModal(false);
    };

    const handleEmailSubmit = () => {
        const serviceName = serviceType === 'mix' ? 'Mixing' : serviceType === 'master' ? 'Mastering' : 'Mix & Master Bundle';
        const subject = encodeURIComponent(`Cotización ${serviceName} - ${trackCount} track(s) - $${quote.subtotal}`);
        const body = generateWhatsAppMessage().replace(/%0A/g, '%0D%0A');
        window.open(`mailto:ignacio@sonidoignacio.com?subject=${subject}&body=${body}`, '_blank');
    };

    // Smooth scroll
    const scrollToSection = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActiveSection(id);
    };

    // ═══════════════════════════════════════════════════════════════
    // TESTIMONIALS DATA
    // ═══════════════════════════════════════════════════════════════
    const testimonials = [
        {
            name: "Carlos M.",
            role: "Artista Lo-Fi",
            text: "El mejor mix que he recibido. Captura la esencia del género sin perder claridad.",
            rating: 5
        },
        {
            name: "María G.",
            role: "Cantautora",
            text: "Profesional, puntual, y el resultado superó mis expectativas. 100% recomendado.",
            rating: 5
        },
        {
            name: "DJ Pulse",
            role: "Productor House",
            text: "Entrega rápida y el master suena increíble en cualquier sistema.",
            rating: 5
        }
    ];

    // ═══════════════════════════════════════════════════════════════
    // FAQ DATA
    // ═══════════════════════════════════════════════════════════════
    const faqs = [
        {
            q: "¿Cuántas revisiones incluye el precio?",
            a: "Cada servicio incluye 2 rondas de revisiones sin costo adicional. Revisiones extras tienen un costo de $25 USD cada una."
        },
        {
            q: "¿Qué formato de archivos necesitas?",
            a: "Stems en WAV o AIFF a 24-bit, mínimo 44.1kHz. Para mastering, un bounce estéreo con -6dB de headroom."
        },
        {
            q: "¿Cómo funciona el pago?",
            a: "50% al iniciar, 50% antes de entregar los archivos finales. Acepto PayPal, Wise, y cripto (USDT/USDC)."
        },
        {
            q: "¿Trabajas con artistas internacionales?",
            a: "¡Claro! Trabajo con artistas de todo el mundo. La comunicación es principalmente en español e inglés."
        }
    ];

    const [openFaq, setOpenFaq] = useState(null);

    return (
        <div className={`min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Syne:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
                
                :root {
                    --accent: #00ff88;
                    --accent-dim: #00ff8833;
                    --surface: #141419;
                    --surface-light: #1e1e26;
                    --text-dim: #6b7280;
                    --gradient-main: linear-gradient(135deg, #00ff88 0%, #00d4ff 100%);
                }
                
                * {
                    font-family: 'Space Grotesk', sans-serif;
                }
                
                .font-display {
                    font-family: 'Syne', sans-serif;
                }
                
                .font-mono {
                    font-family: 'JetBrains Mono', monospace;
                }
                
                /* Gradient Text */
                .gradient-text {
                    background: var(--gradient-main);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
                
                /* Glow Effects */
                .glow {
                    box-shadow: 0 0 30px rgba(0, 255, 136, 0.3);
                }
                
                .glow-text {
                    text-shadow: 0 0 30px rgba(0, 255, 136, 0.5);
                }
                
                /* Custom Scrollbar */
                ::-webkit-scrollbar {
                    width: 8px;
                }
                ::-webkit-scrollbar-track {
                    background: #0a0a0f;
                }
                ::-webkit-scrollbar-thumb {
                    background: #00ff88;
                    border-radius: 4px;
                }
                
                /* Glass Effect */
                .glass {
                    background: rgba(20, 20, 25, 0.8);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                }
                
                /* Animated Border */
                .animated-border {
                    position: relative;
                    background: var(--surface);
                }
                .animated-border::before {
                    content: '';
                    position: absolute;
                    inset: -2px;
                    border-radius: inherit;
                    padding: 2px;
                    background: var(--gradient-main);
                    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
                    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
                    -webkit-mask-composite: xor;
                    mask-composite: exclude;
                    opacity: 0;
                    transition: opacity 0.3s;
                }
                .animated-border:hover::before {
                    opacity: 1;
                }
                
                /* Range Slider */
                input[type=range] {
                    -webkit-appearance: none;
                    background: transparent;
                    width: 100%;
                }
                input[type=range]::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    height: 24px;
                    width: 24px;
                    border-radius: 50%;
                    background: #00ff88;
                    cursor: pointer;
                    margin-top: -10px;
                    box-shadow: 0 0 20px rgba(0, 255, 136, 0.5);
                    transition: transform 0.2s, box-shadow 0.2s;
                }
                input[type=range]::-webkit-slider-thumb:hover {
                    transform: scale(1.2);
                    box-shadow: 0 0 30px rgba(0, 255, 136, 0.8);
                }
                input[type=range]::-webkit-slider-runnable-track {
                    width: 100%;
                    height: 4px;
                    cursor: pointer;
                    background: linear-gradient(90deg, #00ff88 0%, #1e1e26 100%);
                    border-radius: 2px;
                }
                
                /* Pulse Animation */
                @keyframes pulse-glow {
                    0%, 100% { box-shadow: 0 0 20px rgba(0, 255, 136, 0.4); }
                    50% { box-shadow: 0 0 40px rgba(0, 255, 136, 0.8); }
                }
                .pulse-glow {
                    animation: pulse-glow 2s ease-in-out infinite;
                }
                
                /* Fade In Up */
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .fade-in-up {
                    animation: fadeInUp 0.8s ease-out forwards;
                }
                .delay-1 { animation-delay: 0.1s; opacity: 0; }
                .delay-2 { animation-delay: 0.2s; opacity: 0; }
                .delay-3 { animation-delay: 0.3s; opacity: 0; }
                .delay-4 { animation-delay: 0.4s; opacity: 0; }
                .delay-5 { animation-delay: 0.5s; opacity: 0; }
                
                /* Noise Texture Overlay */
                .noise-overlay::after {
                    content: '';
                    position: fixed;
                    inset: 0;
                    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
                    opacity: 0.03;
                    pointer-events: none;
                    z-index: 1000;
                }
            `}</style>

            {/* Noise Overlay */}
            <div className="noise-overlay"></div>

            {/* ═══════════════════════════════════════════════════════════════ */}
            {/* NAVIGATION */}
            {/* ═══════════════════════════════════════════════════════════════ */}
            <nav className="fixed top-0 left-0 right-0 z-50 glass">
                <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00ff88] to-[#00d4ff] flex items-center justify-center font-display font-bold text-black">
                            SI
                        </div>
                        <span className="font-display font-semibold hidden sm:block">SONIDO IGNACIO</span>
                    </div>
                    
                    <div className="flex items-center gap-6">
                        <button onClick={() => scrollToSection('services')} className="text-sm text-gray-400 hover:text-[#00ff88] transition-colors hidden md:block">
                            Servicios
                        </button>
                        <button onClick={() => scrollToSection('calculator')} className="text-sm text-gray-400 hover:text-[#00ff88] transition-colors hidden md:block">
                            Cotizador
                        </button>
                        <button onClick={() => scrollToSection('faq')} className="text-sm text-gray-400 hover:text-[#00ff88] transition-colors hidden md:block">
                            FAQ
                        </button>
                        <button 
                            onClick={() => scrollToSection('calculator')}
                            className="px-4 py-2 bg-[#00ff88] text-black font-semibold rounded-lg hover:bg-[#00ff88]/90 transition-all hover:scale-105"
                        >
                            Cotizar Ahora
                        </button>
                    </div>
                </div>
            </nav>

            {/* ═══════════════════════════════════════════════════════════════ */}
            {/* HERO SECTION */}
            {/* ═══════════════════════════════════════════════════════════════ */}
            <section className="min-h-screen flex items-center justify-center relative px-4 pt-20">
                {/* Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00ff88]/10 rounded-full blur-[100px]"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00d4ff]/10 rounded-full blur-[100px]"></div>
                </div>
                
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <div className="fade-in-up delay-1">
                        <span className="inline-block px-4 py-2 rounded-full bg-[#00ff88]/10 text-[#00ff88] text-sm font-medium mb-6 border border-[#00ff88]/20">
                            🎧 Especialista en Lo-Fi • Latin Soul • Chill Hop
                        </span>
                    </div>
                    
                    <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 fade-in-up delay-2">
                        Tu música merece<br/>
                        <span className="gradient-text glow-text">sonar increíble</span>
                    </h1>
                    
                    <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-2xl mx-auto fade-in-up delay-3">
                        Mixing & Mastering profesional desde Medellín para el mundo. 
                        Emoción sobre perfección técnica.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center fade-in-up delay-4">
                        <button 
                            onClick={() => scrollToSection('calculator')}
                            className="px-8 py-4 bg-[#00ff88] text-black font-bold rounded-xl hover:bg-white transition-all hover:scale-105 pulse-glow flex items-center justify-center gap-2"
                        >
                            Calcular Presupuesto
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                        </button>
                        <button 
                            onClick={() => scrollToSection('services')}
                            className="px-8 py-4 bg-transparent border border-gray-700 text-white font-semibold rounded-xl hover:border-[#00ff88] hover:text-[#00ff88] transition-all"
                        >
                            Ver Servicios
                        </button>
                    </div>
                    
                    {/* Stats */}
                    <div className="mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto fade-in-up delay-5">
                        <div className="text-center">
                            <div className="text-3xl font-bold gradient-text">500+</div>
                            <div className="text-sm text-gray-500">Tracks Mezclados</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold gradient-text">15+</div>
                            <div className="text-sm text-gray-500">Países</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold gradient-text">4.9★</div>
                            <div className="text-sm text-gray-500">Rating</div>
                        </div>
                    </div>
                </div>
                
                {/* Scroll Indicator */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════ */}
            {/* SERVICES SECTION */}
            {/* ═══════════════════════════════════════════════════════════════ */}
            <section id="services" className="py-24 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
                            Servicios
                        </h2>
                        <p className="text-gray-400 text-lg">Cada proyecto es único. Cada precio es justo.</p>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Mixing */}
                        <div className="animated-border rounded-2xl p-8 hover:bg-[#1a1a22] transition-all group">
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#00ff88]/20 to-[#00d4ff]/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="4" y1="21" y2="14"/><line x1="4" x2="4" y1="10" y2="3"/><line x1="12" x2="12" y1="21" y2="12"/><line x1="12" x2="12" y1="8" y2="3"/><line x1="20" x2="20" y1="21" y2="16"/><line x1="20" x2="20" y1="12" y2="3"/><line x1="2" x2="6" y1="14" y2="14"/><line x1="10" x2="14" y1="8" y2="8"/><line x1="18" x2="22" y1="16" y2="16"/></svg>
                            </div>
                            <h3 className="text-2xl font-bold mb-3">Mixing</h3>
                            <p className="text-gray-400 mb-6">Balance, profundidad y emoción. Cada instrumento en su lugar perfecto.</p>
                            <div className="flex items-baseline gap-2 mb-4">
                                <span className="text-3xl font-bold gradient-text">$300</span>
                                <span className="text-gray-500">- $450 USD</span>
                            </div>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li className="flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="2"><path d="M20 6 9 17l-5-5"/></svg>
                                    2 revisiones incluidas
                                </li>
                                <li className="flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="2"><path d="M20 6 9 17l-5-5"/></svg>
                                    Stems individuales
                                </li>
                                <li className="flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="2"><path d="M20 6 9 17l-5-5"/></svg>
                                    Entrega 3-5 días
                                </li>
                            </ul>
                        </div>
                        
                        {/* Mastering */}
                        <div className="animated-border rounded-2xl p-8 hover:bg-[#1a1a22] transition-all group">
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#00ff88]/20 to-[#00d4ff]/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>
                            </div>
                            <h3 className="text-2xl font-bold mb-3">Mastering</h3>
                            <p className="text-gray-400 mb-6">Loudness competitivo sin sacrificar dinámica. Listo para streaming.</p>
                            <div className="flex items-baseline gap-2 mb-4">
                                <span className="text-3xl font-bold gradient-text">$100</span>
                                <span className="text-gray-500">- $175 USD</span>
                            </div>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li className="flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="2"><path d="M20 6 9 17l-5-5"/></svg>
                                    2 revisiones incluidas
                                </li>
                                <li className="flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="2"><path d="M20 6 9 17l-5-5"/></svg>
                                    Múltiples formatos
                                </li>
                                <li className="flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="2"><path d="M20 6 9 17l-5-5"/></svg>
                                    Entrega 24-48h
                                </li>
                            </ul>
                        </div>
                        
                        {/* Bundle - Featured */}
                        <div className="relative rounded-2xl p-8 bg-gradient-to-br from-[#00ff88]/10 to-[#00d4ff]/10 border border-[#00ff88]/30 group">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#00ff88] text-black text-xs font-bold rounded-full">
                                MEJOR VALOR
                            </div>
                            <div className="w-14 h-14 rounded-xl bg-[#00ff88] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M2 12h20"/><circle cx="12" cy="12" r="10"/></svg>
                            </div>
                            <h3 className="text-2xl font-bold mb-3">Mix + Master</h3>
                            <p className="text-gray-400 mb-6">El paquete completo. De stems crudos a master listo para release.</p>
                            <div className="flex items-baseline gap-2 mb-4">
                                <span className="text-3xl font-bold gradient-text">$380</span>
                                <span className="text-gray-500 line-through">$500</span>
                                <span className="text-[#00ff88] text-sm font-bold">-15%</span>
                            </div>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li className="flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="2"><path d="M20 6 9 17l-5-5"/></svg>
                                    Todo incluido
                                </li>
                                <li className="flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="2"><path d="M20 6 9 17l-5-5"/></svg>
                                    3 revisiones incluidas
                                </li>
                                <li className="flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="2"><path d="M20 6 9 17l-5-5"/></svg>
                                    Prioridad en cola
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════ */}
            {/* CALCULATOR SECTION - THE MONEY MAKER */}
            {/* ═══════════════════════════════════════════════════════════════ */}
            <section id="calculator" className="py-24 px-4 bg-[#0d0d12]">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
                            Cotizador <span className="gradient-text">Instantáneo</span>
                        </h2>
                        <p className="text-gray-400 text-lg">Configura tu proyecto y obtén un estimado al instante</p>
                    </div>
                    
                    <div className="grid lg:grid-cols-5 gap-8">
                        {/* Left: Form */}
                        <div className="lg:col-span-3 space-y-8">
                            {/* Service Type */}
                            <div className="glass rounded-2xl p-6">
                                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                    <span className="w-8 h-8 rounded-lg bg-[#00ff88]/20 text-[#00ff88] flex items-center justify-center text-sm font-bold">1</span>
                                    ¿Qué servicio necesitas?
                                </h3>
                                <div className="grid grid-cols-3 gap-3">
                                    {[
                                        { id: 'mix', label: 'Mixing', price: '$300+' },
                                        { id: 'master', label: 'Mastering', price: '$100+' },
                                        { id: 'bundle', label: 'Mix + Master', price: '$380+', featured: true }
                                    ].map(service => (
                                        <button
                                            key={service.id}
                                            onClick={() => setServiceType(service.id)}
                                            className={`relative p-4 rounded-xl border-2 transition-all ${
                                                serviceType === service.id 
                                                    ? 'border-[#00ff88] bg-[#00ff88]/10' 
                                                    : 'border-gray-800 hover:border-gray-700'
                                            }`}
                                        >
                                            {service.featured && (
                                                <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-[#00ff88] text-black text-[10px] font-bold rounded-full">
                                                    DEAL
                                                </span>
                                            )}
                                            <div className="font-semibold">{service.label}</div>
                                            <div className="text-sm text-gray-500">{service.price}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Track Count */}
                            <div className="glass rounded-2xl p-6">
                                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                    <span className="w-8 h-8 rounded-lg bg-[#00ff88]/20 text-[#00ff88] flex items-center justify-center text-sm font-bold">2</span>
                                    ¿Cuántos tracks?
                                </h3>
                                <div className="flex items-center gap-6">
                                    <input 
                                        type="range" 
                                        min="1" 
                                        max="12" 
                                        value={trackCount} 
                                        onChange={(e) => setTrackCount(parseInt(e.target.value))}
                                        className="flex-1"
                                    />
                                    <div className="w-20 h-20 rounded-2xl bg-[#00ff88]/10 border border-[#00ff88]/30 flex items-center justify-center">
                                        <span className="text-4xl font-bold gradient-text">{trackCount}</span>
                                    </div>
                                </div>
                                {trackCount >= 3 && (
                                    <div className="mt-3 px-3 py-2 bg-[#00ff88]/10 rounded-lg text-sm text-[#00ff88] flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20"/><path d="m17 5-5-3-5 3"/><path d="m17 19-5 3-5-3"/></svg>
                                        {trackCount >= 8 ? '15%' : trackCount >= 5 ? '10%' : '5%'} descuento por volumen aplicado
                                    </div>
                                )}
                            </div>
                            
                            {/* Session State */}
                            <div className="glass rounded-2xl p-6">
                                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                    <span className="w-8 h-8 rounded-lg bg-[#00ff88]/20 text-[#00ff88] flex items-center justify-center text-sm font-bold">3</span>
                                    Estado de tu sesión
                                </h3>
                                <div className="grid grid-cols-3 gap-3">
                                    {[
                                        { id: 0, label: 'Organizada', desc: 'Stems limpios y nombrados', emoji: '✨' },
                                        { id: 1, label: 'Algo messy', desc: '+20% por organización', emoji: '📁' },
                                        { id: 2, label: 'Caótica', desc: '+40% por limpieza', emoji: '🔥' }
                                    ].map(state => (
                                        <button
                                            key={state.id}
                                            onClick={() => setSessionState(state.id)}
                                            className={`p-4 rounded-xl border-2 transition-all text-left ${
                                                sessionState === state.id 
                                                    ? 'border-[#00ff88] bg-[#00ff88]/10' 
                                                    : 'border-gray-800 hover:border-gray-700'
                                            }`}
                                        >
                                            <div className="text-2xl mb-2">{state.emoji}</div>
                                            <div className="font-semibold text-sm">{state.label}</div>
                                            <div className="text-xs text-gray-500">{state.desc}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Genre */}
                            <div className="glass rounded-2xl p-6">
                                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                    <span className="w-8 h-8 rounded-lg bg-[#00ff88]/20 text-[#00ff88] flex items-center justify-center text-sm font-bold">4</span>
                                    Género musical
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {GENRES.map(g => (
                                        <button
                                            key={g.id}
                                            onClick={() => setGenre(g.id)}
                                            className={`p-3 rounded-xl border-2 transition-all flex items-center gap-2 ${
                                                genre === g.id 
                                                    ? 'border-[#00ff88] bg-[#00ff88]/10' 
                                                    : 'border-gray-800 hover:border-gray-700'
                                            }`}
                                        >
                                            <span>{g.icon}</span>
                                            <span className="text-sm font-medium">{g.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Extras */}
                            <div className="glass rounded-2xl p-6">
                                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                    <span className="w-8 h-8 rounded-lg bg-[#00ff88]/20 text-[#00ff88] flex items-center justify-center text-sm font-bold">5</span>
                                    Extras
                                </h3>
                                <label className="flex items-center justify-between p-4 rounded-xl border-2 border-gray-800 hover:border-gray-700 cursor-pointer transition-all">
                                    <div>
                                        <div className="font-semibold">Vocal Tuning</div>
                                        <div className="text-sm text-gray-500">Corrección de pitch profesional</div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-[#00ff88] font-semibold">+$50/track</span>
                                        <div className={`w-12 h-7 rounded-full transition-all ${vocalTuning ? 'bg-[#00ff88]' : 'bg-gray-700'} relative`}>
                                            <div className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-all ${vocalTuning ? 'left-6' : 'left-1'}`}></div>
                                        </div>
                                        <input type="checkbox" className="hidden" checked={vocalTuning} onChange={() => setVocalTuning(!vocalTuning)} />
                                    </div>
                                </label>
                            </div>
                        </div>
                        
                        {/* Right: Quote Summary */}
                        <div className="lg:col-span-2">
                            <div className="glass rounded-2xl p-6 sticky top-24">
                                <div className="text-center pb-6 border-b border-gray-800">
                                    <div className="text-sm text-gray-500 mb-2">Tu estimado</div>
                                    <div className="text-5xl font-bold gradient-text mb-1">${quote.subtotal}</div>
                                    <div className="text-sm text-gray-500">USD</div>
                                </div>
                                
                                <div className="py-6 space-y-3 border-b border-gray-800 font-mono text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">{serviceType.toUpperCase()} × {trackCount}</span>
                                        <span>Base</span>
                                    </div>
                                    {sessionState > 0 && (
                                        <div className="flex justify-between text-yellow-500">
                                            <span>Organización</span>
                                            <span>+{sessionState === 1 ? '20' : '40'}%</span>
                                        </div>
                                    )}
                                    {vocalTuning && (
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">Vocal Tuning × {trackCount}</span>
                                            <span>${PRICING.tuning * trackCount}</span>
                                        </div>
                                    )}
                                    {quote.savings > 0 && (
                                        <div className="flex justify-between text-[#00ff88]">
                                            <span>Descuento volumen</span>
                                            <span>-${quote.savings}</span>
                                        </div>
                                    )}
                                </div>
                                
                                <div className="py-6 space-y-4">
                                    <div className="flex items-center gap-3 text-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                                        <span className="text-gray-400">Tiempo estimado:</span>
                                        <span className="font-semibold">{quote.timeline}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M2 12h20"/></svg>
                                        <span className="text-gray-400">Por track:</span>
                                        <span className="font-semibold">${quote.perTrack} USD</span>
                                    </div>
                                </div>
                                
                                <button 
                                    onClick={() => setShowQuoteModal(true)}
                                    className="w-full py-4 bg-[#00ff88] text-black font-bold rounded-xl hover:bg-white transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                                    Solicitar por WhatsApp
                                </button>
                                
                                <button 
                                    onClick={handleEmailSubmit}
                                    className="w-full py-3 mt-3 border border-gray-700 text-gray-300 font-semibold rounded-xl hover:border-[#00ff88] hover:text-[#00ff88] transition-all flex items-center justify-center gap-2"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                                    Enviar por Email
                                </button>
                                
                                <p className="text-xs text-center text-gray-600 mt-4">
                                    Este es un estimado. El precio final se confirma después de revisar tu proyecto.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════ */}
            {/* TESTIMONIALS */}
            {/* ═══════════════════════════════════════════════════════════════ */}
            <section className="py-24 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
                            Lo que dicen <span className="gradient-text">los artistas</span>
                        </h2>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-6">
                        {testimonials.map((t, i) => (
                            <div key={i} className="glass rounded-2xl p-6">
                                <div className="flex items-center gap-1 mb-4">
                                    {[...Array(t.rating)].map((_, j) => (
                                        <svg key={j} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#00ff88" stroke="#00ff88" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                    ))}
                                </div>
                                <p className="text-gray-300 mb-6">"{t.text}"</p>
                                <div>
                                    <div className="font-semibold">{t.name}</div>
                                    <div className="text-sm text-gray-500">{t.role}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════ */}
            {/* FAQ SECTION */}
            {/* ═══════════════════════════════════════════════════════════════ */}
            <section id="faq" className="py-24 px-4 bg-[#0d0d12]">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
                            Preguntas <span className="gradient-text">Frecuentes</span>
                        </h2>
                    </div>
                    
                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <div key={i} className="glass rounded-xl overflow-hidden">
                                <button 
                                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                    className="w-full p-6 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                                >
                                    <span className="font-semibold pr-4">{faq.q}</span>
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        width="20" 
                                        height="20" 
                                        viewBox="0 0 24 24" 
                                        fill="none" 
                                        stroke="currentColor" 
                                        strokeWidth="2" 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round"
                                        className={`flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`}
                                    >
                                        <path d="m6 9 6 6 6-6"/>
                                    </svg>
                                </button>
                                {openFaq === i && (
                                    <div className="px-6 pb-6 text-gray-400">
                                        {faq.a}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════ */}
            {/* FOOTER */}
            {/* ═══════════════════════════════════════════════════════════════ */}
            <footer className="py-16 px-4 border-t border-gray-800">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-12 mb-12">
                        <div className="md:col-span-2">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#00ff88] to-[#00d4ff] flex items-center justify-center font-display font-bold text-black text-lg">
                                    SI
                                </div>
                                <div>
                                    <div className="font-display font-bold text-xl">SONIDO IGNACIO</div>
                                    <div className="text-sm text-gray-500">Mixing & Mastering</div>
                                </div>
                            </div>
                            <p className="text-gray-400 max-w-sm">
                                Ingeniero de audio basado en Medellín, Colombia. Especializado en Lo-Fi, Latin Soul, y Chill Hop para artistas globales.
                            </p>
                        </div>
                        
                        <div>
                            <h4 className="font-semibold mb-4">Contacto</h4>
                            <div className="space-y-3 text-gray-400">
                                <a href="mailto:ignacio@sonidoignacio.com" className="flex items-center gap-2 hover:text-[#00ff88] transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                                    ignacio@sonidoignacio.com
                                </a>
                                <a href="https://wa.me/573001234567" className="flex items-center gap-2 hover:text-[#00ff88] transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                                    WhatsApp
                                </a>
                            </div>
                        </div>
                        
                        <div>
                            <h4 className="font-semibold mb-4">Redes</h4>
                            <div className="flex gap-3">
                                <a href="#" className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-[#00ff88] hover:text-black transition-all">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                                </a>
                                <a href="#" className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-[#00ff88] hover:text-black transition-all">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
                                </a>
                                <a href="#" className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-[#00ff88] hover:text-black transition-all">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a9 9 0 1 0 9 9"/><path d="M12 3v6"/><circle cx="12" cy="12" r="3"/></svg>
                                </a>
                            </div>
                        </div>
                    </div>
                    
                    <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
                        <p>© 2025 Sonido Ignacio. Todos los derechos reservados.</p>
                        <p>Hecho con 🎧 desde Medellín, Colombia</p>
                    </div>
                </div>
            </footer>

            {/* ═══════════════════════════════════════════════════════════════ */}
            {/* QUOTE MODAL */}
            {/* ═══════════════════════════════════════════════════════════════ */}
            {showQuoteModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="glass rounded-2xl p-8 max-w-md w-full relative animate-[fadeInUp_0.3s_ease-out]">
                        <button 
                            onClick={() => setShowQuoteModal(false)}
                            className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                        </button>
                        
                        <h3 className="font-display text-2xl font-bold mb-6">Finalizar Cotización</h3>
                        
                        <div className="space-y-4 mb-6">
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Tu nombre *</label>
                                <input 
                                    type="text"
                                    value={clientName}
                                    onChange={(e) => setClientName(e.target.value)}
                                    placeholder="Nombre artístico o real"
                                    className="w-full px-4 py-3 bg-gray-800 rounded-xl border border-gray-700 focus:border-[#00ff88] outline-none transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Email *</label>
                                <input 
                                    type="email"
                                    value={clientEmail}
                                    onChange={(e) => setClientEmail(e.target.value)}
                                    placeholder="tu@email.com"
                                    className="w-full px-4 py-3 bg-gray-800 rounded-xl border border-gray-700 focus:border-[#00ff88] outline-none transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Notas adicionales</label>
                                <textarea 
                                    value={projectNotes}
                                    onChange={(e) => setProjectNotes(e.target.value)}
                                    placeholder="Cuéntame sobre tu proyecto, referencias, deadline..."
                                    rows={3}
                                    className="w-full px-4 py-3 bg-gray-800 rounded-xl border border-gray-700 focus:border-[#00ff88] outline-none transition-colors resize-none"
                                />
                            </div>
                        </div>
                        
                        <div className="p-4 rounded-xl bg-[#00ff88]/10 border border-[#00ff88]/30 mb-6">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-400">Estimado total</span>
                                <span className="text-2xl font-bold gradient-text">${quote.subtotal} USD</span>
                            </div>
                        </div>
                        
                        <button 
                            onClick={handleWhatsAppSubmit}
                            disabled={!clientName || !clientEmail}
                            className="w-full py-4 bg-[#25D366] text-white font-bold rounded-xl hover:bg-[#128C7E] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                            Enviar por WhatsApp
                        </button>
                        
                        <p className="text-xs text-center text-gray-500 mt-4">
                            Se abrirá WhatsApp con tu cotización lista para enviar
                        </p>
                    </div>
                </div>
            )}

            {/* Success Toast */}
            {quoteSent && (
                <div className="fixed bottom-6 right-6 z-50 glass rounded-xl p-4 flex items-center gap-3 animate-[fadeInUp_0.3s_ease-out]">
                    <div className="w-10 h-10 rounded-full bg-[#00ff88]/20 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="2"><path d="M20 6 9 17l-5-5"/></svg>
                    </div>
                    <div>
                        <div className="font-semibold">¡Cotización enviada!</div>
                        <div className="text-sm text-gray-400">Te responderé pronto</div>
                    </div>
                    <button onClick={() => setQuoteSent(false)} className="ml-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                    </button>
                </div>
            )}
        </div>
    );
};

export default App;
