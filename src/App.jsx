import React, { useState, useEffect, useRef } from 'react';
import { 
  Star, Sun, Sparkles, BookOpen, Compass, 
  Phone, Mail, MapPin, ArrowRight, Menu, X, 
  Facebook, Instagram, Youtube, MessageCircle, User,
  Award, TrendingUp, Heart, Briefcase, Eye, CheckCircle,
  Binary, Gem, GraduationCap, Lightbulb, Hexagon, Circle
} from 'lucide-react';

/**
 * DESTINI NUMBER STUDIO - Diipesh Barara
 * * Visual Style: Deep Indigo/Black, Gold Zodiac, Electric Blue Matrix.
 * * Features: Scroll Animations, Custom Modern Icons, Particle Effects.
 */

// --- DATA & CONSTANTS ---

const BRAND = {
  name: "Destini Number Studio",
  tagline: "Decode Your Destiny with Precision & Power",
  founder: "Diipesh Barara",
  phone: "+91 72690 31175", 
  whatsapp_display: "+91 63935 61031",
  email: "destininumbers37@gmail.com",
  address: "Lucknow, Uttar Pradesh, India",
  whatsapp_link: "https://wa.me/916393561031"
};

const SERVICES = [
  {
    id: 'numerology',
    title: "Advanced Numerology",
    shortDesc: "Decode the vibration that shapes your life path.",
    icon: <Binary />,
    fullDesc: "We calculate your Life Path, Destiny, Soul Urge, and Personality Numbers to reveal your core essence. This isn't just prediction; it's a precision map of your strengths, growth edges, and optimal decision windows.",
    benefits: ["Discover hidden potential", "Identify personal year trends", "Understand core motivations"],
    duration: "45 Mins",
    price: "₹2,100",
    idealFor: "Self-discovery and life planning."
  },
  {
    id: 'name-correction',
    title: "Name & Signature Correction",
    shortDesc: "Align your name's vibration with your dreams.",
    icon: <BookOpen />,
    fullDesc: "Your name is not random—it carries a numerical vibration. We analyze your birth and current name to identify misalignments, recommending refined spellings and signature modifications to amplify success energy.",
    benefits: ["Amplify success energy", "Remove vibrational blocks", "Harmonious public identity"],
    duration: "3-5 Days Processing",
    price: "₹3,500",
    idealFor: "Brands, artists, and professionals."
  },
  {
    id: 'astrology',
    title: "Business Astrology",
    shortDesc: "Use the stars to time your next big move.",
    icon: <TrendingUp />,
    fullDesc: "Diipesh reads your birth chart (Kundli), planetary transits, and dashas to identify high-opportunity windows for career moves, investments, or launches. We focus on practical outcomes, not fear-based predictions.",
    benefits: ["Time your launches", "Navigate challenging periods", "Strategic decision making"],
    duration: "60 Mins",
    price: "₹2,500",
    idealFor: "Entrepreneurs and professionals."
  },
  {
    id: 'crystal-healing',
    title: "Crystal Healing",
    shortDesc: "Gemstones as vibrational medicine for your life.",
    icon: <Gem />,
    fullDesc: "Crystals are energetic amplifiers. We design custom protocols (grids, carry stones) based on your chart's strengths. We emphasize authentic, ethically sourced crystals aligned with your unique numerology.",
    benefits: ["Attract abundance", "Energetic protection", "Emotional balance"],
    duration: "Consultation included",
    price: "Varies",
    idealFor: "Healing and energy enhancement."
  },
  {
    id: 'mantra',
    title: "Mantra Rituals",
    shortDesc: "Sacred sound to reprogram your inner frequency.",
    icon: <Sun />,
    fullDesc: "Mantras work through vibrational resonance. We prescribe personalized mantras and chanting protocols tied to your numerology to reprogram your subconscious mind and energetic body.",
    benefits: ["Increased mental clarity", "Subconscious reprogramming", "Spiritual alignment"],
    duration: "Personalized Protocol",
    price: "Included in Consult",
    idealFor: "Stress relief and focus."
  },
  {
    id: 'reports',
    title: "Destiny Reports",
    shortDesc: "Your complete life map in one actionable PDF.",
    icon: <Compass />,
    fullDesc: "Get a complete, actionable document combining astrology, numerology, and remedies. Includes lucky numbers, colors, crystal recommendations, and a decision-making framework for your top 3 life areas.",
    benefits: ["Reference for years", "Full numerology breakdown", "Lucky numbers & colors"],
    duration: "7 Day Delivery",
    price: "₹1,500",
    idealFor: "Comprehensive guidance."
  },
  {
    id: 'consultation',
    title: "1:1 Strategy",
    shortDesc: "Strategic guidance for your biggest decisions.",
    icon: <Briefcase />,
    fullDesc: "Deep, outcome-focused consultations for entrepreneurs scaling startups or couples seeking clarity. Covers business timing, career pivots, relationship alignment, and financial decisions.",
    benefits: ["Business scaling strategy", "Relationship compatibility", "Financial timing"],
    duration: "60-90 Mins",
    price: "On Request",
    idealFor: "Complex life/business situations."
  }
];

const TESTIMONIALS = [
  { name: "Priya S.", role: "Marketing Executive", text: "In three months of following Diipesh's name correction, I landed a promotion I'd been chasing for two years. Clarity + Timing + Momentum." },
  { name: "Rajesh M.", role: "Tech Founder", text: "Diipesh's approach was so analytical. His recommendation to restructure my team timing saved us ₹40+ lakhs in wrong hires." },
  { name: "Amira K.", role: "Freelance Coach", text: "I changed my name spelling and signature as recommended. Within weeks, opportunities came through. It's not 'magic'—it's alignment." }
];

const WHO_BENEFITS = [
  { title: "Students", icon: <GraduationCap />, desc: "Clarity on life direction." },
  { title: "Entrepreneurs", icon: <Briefcase />, desc: "Timing launches & scaling." },
  { title: "Professionals", icon: <TrendingUp />, desc: "Career pivots & promotions." },
  { title: "Couples", icon: <Heart />, desc: "Relationship clarity & harmony." },
  { title: "Creatives", icon: <Lightbulb />, desc: "Aligning work with soul purpose." },
  { title: "Seekers", icon: <Compass />, desc: "Strategic wisdom for life." },
];

const BLOG_POSTS = [
  { id: 1, title: "Best Business Names for UP Entrepreneurs", excerpt: "Numerology for the Lucknow market.", date: "Dec 12, 2025" },
  { id: 2, title: "2026 Predictions: New Beginnings", excerpt: "What the numbers say about growth.", date: "Jan 01, 2026" },
  { id: 3, title: "The Science of Signature Correction", excerpt: "Why CEOs modify their signatures.", date: "Nov 20, 2025" }
];

// --- UTILS ---

// Scroll Reveal Hook
const useOnScreen = (ref, rootMargin = "0px") => {
  const [isIntersecting, setIntersecting] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
      { rootMargin }
    );
    if (ref.current) observer.observe(ref.current);
    return () => ref.current && observer.unobserve(ref.current);
  }, [ref, rootMargin]);
  return isIntersecting;
};

// --- COMPONENTS ---

// 1. Scroll Reveal Wrapper
const RevealOnScroll = ({ children, delay = 0 }) => {
  const ref = useRef();
  const onScreen = useOnScreen(ref, "-50px");
  
  return (
    <div 
      ref={ref}
      className={`transition-all duration-1000 transform ${onScreen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// 2. Modern Astrology Icon Wrapper
const AstroIcon = ({ children }) => (
  <div className="relative w-16 h-16 flex items-center justify-center">
    {/* Outer Glow Ring */}
    <div className="absolute inset-0 border border-amber-500/30 rounded-full animate-[spin_10s_linear_infinite]"></div>
    <div className="absolute inset-2 border border-amber-500/20 rounded-full animate-[spin_8s_linear_infinite_reverse]"></div>
    {/* Icon */}
    <div className="relative z-10 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]">
      {React.cloneElement(children, { size: 28, strokeWidth: 1.5 })}
    </div>
    {/* Particles */}
    <div className="absolute top-0 right-0 w-1 h-1 bg-amber-400 rounded-full animate-ping"></div>
  </div>
);

// 3. Numerology Matrix (Blue Electric Rain)
const NumerologyMatrix = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const resizeCanvas = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
      }
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let width = canvas.width;
    let height = canvas.height;
    const columns = Math.floor(width / 20);
    const drops = Array(columns).fill(1);
    const chars = "0123456789";

    const draw = () => {
      // Fade effect for trails
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; 
      ctx.fillRect(0, 0, width, height);

      ctx.font = '16px monospace';

      for (let i = 0; i < drops.length; i++) {
        // Electric Blue colors based on video
        const isBright = Math.random() > 0.95;
        ctx.fillStyle = isBright ? '#ffffff' : '#0ea5e9'; // White or Sky Blue
        
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * 20;
        const y = drops[i] * 20;

        ctx.fillText(text, x, y);

        // Reset or continue
        if (y > height && Math.random() > 0.98) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 40); 
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-40 mix-blend-screen" />;
};

// 4. Moon Phase Separator
const MoonSeparator = () => (
  <div className="flex justify-center items-center gap-4 py-8 opacity-30">
    <div className="h-[1px] w-24 bg-gradient-to-r from-transparent to-amber-500"></div>
    <div className="flex gap-2 text-amber-500">
      <Circle size={8} fill="currentColor" className="opacity-20" />
      <Circle size={10} fill="currentColor" className="opacity-50" />
      <Circle size={12} fill="currentColor" />
      <Circle size={10} fill="currentColor" className="opacity-50" />
      <Circle size={8} fill="currentColor" className="opacity-20" />
    </div>
    <div className="h-[1px] w-24 bg-gradient-to-l from-transparent to-amber-500"></div>
  </div>
);

const SectionTitle = ({ children, subtitle }) => (
  <RevealOnScroll>
    <div className="text-center mb-16 relative z-10">
      <span className="text-amber-400 uppercase tracking-[0.3em] text-xs font-bold mb-3 block">{subtitle}</span>
      <h2 className="text-3xl md:text-5xl font-serif text-slate-100 relative inline-block">
        {children}
        <div className="h-[2px] w-1/2 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mt-6"></div>
      </h2>
    </div>
  </RevealOnScroll>
);

const Button = ({ children, primary, onClick, className = "" }) => (
  <button 
    onClick={onClick}
    className={`
      px-8 py-3 rounded-sm transition-all duration-500 font-medium tracking-wide relative overflow-hidden group
      ${primary 
        ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.3)]' 
        : 'bg-transparent border border-amber-500/40 text-amber-400 hover:bg-amber-950/20'}
      hover:scale-105 hover:shadow-[0_0_35px_rgba(245,158,11,0.6)]
      ${className}
    `}
  >
    <div className="absolute top-0 -left-full w-1/2 h-full skew-x-12 bg-white/30 group-hover:animate-[shimmer_0.7s_infinite]"></div>
    <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
  </button>
);

// --- MAIN APP ---

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { window.scrollTo(0, 0); }, [activePage, selectedServiceId]);

  const navigateTo = (page) => { setActivePage(page); setMobileMenuOpen(false); setSelectedServiceId(null); };
  const navigateToService = (id) => { setSelectedServiceId(id); setActivePage('service-detail'); };

  // --- VIEWS ---

  const HomeView = () => (
    <>
      {/* HERO: Inspired by Screenshot 225827 (Gold Zodiac on Black) */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-black">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(20,20,30,1)_0%,rgba(0,0,0,1)_100%))]"></div>
          {/* Constellation Grid Background */}
          <div className="absolute inset-0 opacity-20" 
               style={{backgroundImage: 'radial-gradient(rgba(251, 191, 36, 0.4) 1px, transparent 1px)', backgroundSize: '40px 40px'}}>
          </div>
        </div>

        <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          
          <div className="text-center lg:text-left space-y-8 order-2 lg:order-1">
            <RevealOnScroll>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-950/30 text-amber-300 text-xs tracking-[0.2em] uppercase mb-4">
                <Sparkles size={12} /> Diipesh Barara
              </div>
              <h1 className="text-5xl md:text-7xl font-serif text-slate-100 leading-[1.1]">
                Decode Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-500 to-amber-200 animate-pulse">Destiny</span>
              </h1>
              <p className="text-lg text-slate-400 max-w-lg mx-auto lg:mx-0 leading-relaxed font-light">
                Where Ancient Vedic Wisdom meets Modern Analytics. Unlock your blueprint with precision numerology and astrological timing.
              </p>
              <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start pt-6">
                <Button primary onClick={() => navigateTo('contact')}>Get Your Report</Button>
                <Button onClick={() => navigateTo('services')}>Explore Services</Button>
              </div>
            </RevealOnScroll>
          </div>

          {/* ANIMATED ZODIAC WHEEL VISUAL */}
          <div className="relative flex items-center justify-center h-[500px] lg:h-[700px] order-1 lg:order-2">
            <RevealOnScroll delay={200}>
              <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px]">
                {/* Outer Ring */}
                <div className="absolute inset-0 border border-amber-500/20 rounded-full animate-[spin_60s_linear_infinite]">
                   {[...Array(12)].map((_, i) => (
                     <div key={i} className="absolute w-1 h-1 bg-amber-500 rounded-full" 
                          style={{ top: '50%', left: '50%', transform: `rotate(${i * 30}deg) translate(250px)` }}></div>
                   ))}
                </div>
                {/* Middle Ring (Gold Lines) */}
                <div className="absolute inset-12 border border-amber-500/40 rounded-full animate-[spin_40s_linear_infinite_reverse] opacity-60"></div>
                {/* Inner Geometry */}
                <div className="absolute inset-24 border border-amber-500/60 rounded-full flex items-center justify-center animate-[spin_30s_linear_infinite]">
                   <Hexagon size={200} strokeWidth={0.5} className="text-amber-500/50" />
                </div>
                {/* Center Core */}
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="w-32 h-32 bg-amber-500/10 rounded-full blur-2xl animate-pulse"></div>
                   <Sun size={64} className="text-amber-400 drop-shadow-[0_0_20px_rgba(251,191,36,0.8)]" />
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      <MoonSeparator />

      {/* MATRIX SECTION: Inspired by Video 180812 (Blue Rain) */}
      <section className="relative py-32 bg-black overflow-hidden border-y border-indigo-900/30">
        <NumerologyMatrix /> {/* Background Canvas */}
        
        <div className="container mx-auto px-6 relative z-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <RevealOnScroll>
              <div className="backdrop-blur-xl bg-slate-900/30 border border-indigo-500/30 p-10 md:p-14 rounded-2xl shadow-[0_0_60px_rgba(14,165,233,0.1)]">
                <div className="flex items-center gap-3 mb-8">
                  <div className="bg-indigo-500/10 p-3 rounded-full border border-indigo-400/50 text-indigo-400">
                     <Binary size={24} />
                  </div>
                  <span className="text-indigo-400 tracking-widest uppercase text-sm font-semibold">The Universal Code</span>
                </div>
                
                <h2 className="text-4xl md:text-6xl font-serif text-white mb-8 leading-tight">
                  Decode the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">Matrix</span>
                </h2>
                
                <p className="text-slate-300 text-lg mb-8 leading-relaxed font-light">
                  Just as the universe is built on mathematical constants, your life path is defined by numbers. Discover the hidden vibration of your birth date and name.
                </p>

                <div className="space-y-5 mb-10">
                  {["Psychic Number (Mulank)", "Destiny Number (Bhagyank)", "Name Vibration Correction"].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 group cursor-pointer">
                      <div className="w-10 h-10 rounded-full bg-indigo-900/40 flex items-center justify-center border border-indigo-500/30 text-indigo-300 font-mono text-sm group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                        {i + 1}
                      </div>
                      <span className="text-slate-300 group-hover:text-indigo-300 transition-colors">{item}</span>
                    </div>
                  ))}
                </div>

                <Button onClick={() => navigateToService('numerology')} className="!border-indigo-500 !text-indigo-300 hover:!bg-indigo-950/50 w-full md:w-auto">
                  Calculate My Numbers
                </Button>
              </div>
            </RevealOnScroll>

            <div className="hidden lg:flex justify-center relative">
               <RevealOnScroll delay={200}>
                 {/* 3D Floating Numbers Illusion */}
                 <div className="relative w-96 h-96">
                   <div className="absolute top-0 right-0 text-9xl font-serif text-indigo-500/10 animate-bounce duration-[3000ms]">8</div>
                   <div className="absolute bottom-10 left-0 text-8xl font-serif text-cyan-500/10 animate-bounce duration-[4000ms]">3</div>
                   <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-[150px] font-bold font-serif drop-shadow-[0_0_40px_rgba(6,182,212,0.6)]">
                     7
                   </div>
                 </div>
               </RevealOnScroll>
            </div>

          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24 bg-[#050505]">
        <div className="container mx-auto px-6">
          <SectionTitle subtitle="Our Toolkit">Destini Services</SectionTitle>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service, idx) => (
              <RevealOnScroll key={service.id} delay={idx * 100}>
                <div className="group bg-[#0a0a0a] border border-white/5 hover:border-amber-500/40 p-8 rounded-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(245,158,11,0.1)] h-full flex flex-col relative overflow-hidden">
                  {/* Hover Gradient Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="mb-6 relative z-10">
                    <AstroIcon>{service.icon}</AstroIcon>
                  </div>
                  
                  <h3 className="text-2xl font-serif text-slate-100 mb-3 relative z-10">{service.title}</h3>
                  <p className="text-slate-400 mb-6 line-clamp-3 text-sm leading-relaxed relative z-10">{service.shortDesc}</p>
                  
                  <div className="mt-auto relative z-10 pt-6 border-t border-white/5">
                    <button 
                      onClick={() => navigateToService(service.id)}
                      className="text-xs uppercase tracking-[0.2em] text-amber-500 group-hover:text-amber-300 font-bold flex items-center gap-2 transition-colors"
                    >
                      Explore <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* WHO BENEFITS */}
      <section className="py-24 bg-[#020205]">
        <div className="container mx-auto px-6">
          <SectionTitle subtitle="Is This For You?">Who Benefits Most?</SectionTitle>
          <div className="grid md:grid-cols-3 gap-px bg-white/5 border border-white/5 overflow-hidden rounded-2xl">
            {WHO_BENEFITS.map((item, idx) => (
              <RevealOnScroll key={idx} delay={idx * 50}>
                <div className="bg-[#050508] p-10 hover:bg-[#0a0a10] transition-colors duration-300 h-full flex flex-col items-center text-center group">
                  <div className="text-slate-600 group-hover:text-amber-500 transition-colors mb-4 transform group-hover:scale-110 duration-300">
                    {React.cloneElement(item.icon, { size: 32 })}
                  </div>
                  <h4 className="text-lg font-serif text-slate-200 mb-2">{item.title}</h4>
                  <p className="text-sm text-slate-500">{item.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-[#050505] relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent"></div>
        <div className="container mx-auto px-6 relative z-10">
          <SectionTitle subtitle="Client Success">Real Stories</SectionTitle>
          <div className="grid md:grid-cols-3 gap-8">
             {TESTIMONIALS.map((t, i) => (
               <RevealOnScroll key={i} delay={i * 150}>
                 <div className="bg-[#0a0a0a] p-10 rounded-2xl border border-white/5 relative group hover:border-amber-500/20 transition-all">
                   <div className="text-amber-500/10 absolute top-6 right-8 text-8xl font-serif leading-none select-none">"</div>
                   <p className="text-slate-300 italic mb-8 relative z-10 text-lg font-light leading-relaxed">{t.text}</p>
                   <div>
                     <p className="text-white font-medium">{t.name}</p>
                     <p className="text-xs text-amber-500 uppercase tracking-wider mt-1">{t.role}</p>
                   </div>
                 </div>
               </RevealOnScroll>
             ))}
          </div>
        </div>
      </section>
    </>
  );

  const AboutView = () => (
    <div className="pt-32 pb-20 bg-black min-h-screen">
      <div className="container mx-auto px-6">
        <SectionTitle subtitle="The Founder">Diipesh Barara</SectionTitle>
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative group">
             <div className="absolute inset-0 border border-amber-500/30 rotate-3 group-hover:rotate-6 transition-transform duration-500 rounded-lg"></div>
             <div className="aspect-[3/4] bg-slate-900 relative overflow-hidden rounded-lg border border-white/10">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
                <div className="w-full h-full flex items-center justify-center text-slate-800">
                  <User size={120} strokeWidth={0.5} />
                </div>
                <div className="absolute bottom-8 left-8 z-20">
                  <h3 className="text-3xl font-serif text-white">Diipesh Barara</h3>
                  <p className="text-amber-400 mt-1">Astrologer & Corporate Strategist</p>
                </div>
             </div>
          </div>
          <div className="space-y-6">
            <h3 className="text-3xl font-serif text-slate-100">26+ Years of Experience</h3>
            <p className="text-slate-400 leading-relaxed font-light">
              Diipesh blends deep corporate strategy experience with ancient spiritual sciences. He doesn't just read charts; he provides an actionable roadmap for life, business, and relationships.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="p-4 border border-amber-500/20 rounded bg-amber-950/10">
                <h4 className="text-amber-400 font-serif text-xl mb-1">Corporate</h4>
                <p className="text-xs text-slate-400">Sales, Marketing & Strategy expert.</p>
              </div>
              <div className="p-4 border border-amber-500/20 rounded bg-amber-950/10">
                <h4 className="text-amber-400 font-serif text-xl mb-1">Spiritual</h4>
                <p className="text-xs text-slate-400">Vedic Astrology, Numerology & Gems.</p>
              </div>
            </div>
            <Button primary onClick={() => navigateTo('contact')} className="mt-4">Book Consultation</Button>
          </div>
        </div>
      </div>
    </div>
  );

  const ServicesView = () => (
    <div className="pt-32 pb-20 bg-black min-h-screen">
      <div className="container mx-auto px-6">
        <SectionTitle subtitle="Destini Toolkit">All Services</SectionTitle>
        <div className="grid md:grid-cols-2 gap-8">
          {SERVICES.map((service, idx) => (
            <RevealOnScroll key={service.id} delay={idx * 100}>
              <div className="bg-[#080808] border border-white/10 hover:border-amber-500/40 p-8 rounded-xl transition-all duration-300 flex flex-col md:flex-row gap-6 items-start">
                <div className="shrink-0"><AstroIcon>{service.icon}</AstroIcon></div>
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-2xl font-serif text-slate-100">{service.title}</h3>
                    <span className="text-amber-500 font-serif text-lg">{service.price}</span>
                  </div>
                  <p className="text-slate-400 mb-4 text-sm leading-relaxed">{service.fullDesc}</p>
                  <Button onClick={() => navigateToService(service.id)} className="!px-6 !py-2 text-xs">Details</Button>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </div>
  );

  const ServiceDetailView = () => {
    const service = SERVICES.find(s => s.id === selectedServiceId);
    if (!service) return <ServicesView />;
    return (
      <div className="pt-32 pb-20 bg-black min-h-screen">
        <div className="container mx-auto px-6">
          <button onClick={() => navigateTo('services')} className="text-slate-500 hover:text-amber-400 flex items-center gap-2 mb-8 transition-colors uppercase text-xs tracking-widest">
            <ArrowRight className="rotate-180" size={14} /> Back to Services
          </button>
          <div className="grid lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2">
              <h1 className="text-4xl md:text-6xl font-serif text-white mb-6">{service.title}</h1>
              <p className="text-xl text-amber-500 mb-10 font-light border-l-2 border-amber-500 pl-4">{service.shortDesc}</p>
              <div className="prose prose-invert prose-lg max-w-none text-slate-300 font-light">
                <p>{service.fullDesc}</p>
                <h3 className="text-white font-serif mt-12 mb-6">What to Expect</h3>
                <div className="grid gap-4">
                   {['Pre-consultation Analysis', 'Video/Audio Call', 'Recording Provided', 'Remedies Protocol'].map((step, i) => (
                     <div key={i} className="flex items-center gap-4 bg-[#0a0a0a] p-4 rounded border border-white/5">
                       <span className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-900/30 text-amber-400 flex items-center justify-center text-sm font-bold border border-amber-500/20">{i+1}</span>
                       <span className="text-slate-300 text-sm">{step}</span>
                     </div>
                   ))}
                </div>
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="bg-[#0a0a0a] border border-amber-500/20 p-8 rounded-xl sticky top-28">
                <div className="text-center mb-8 pb-8 border-b border-white/5">
                  <p className="text-slate-500 uppercase text-xs tracking-[0.2em] mb-3">Investment</p>
                  <p className="text-5xl font-serif text-white">{service.price}</p>
                </div>
                <Button primary className="w-full mb-6" onClick={() => navigateTo('contact')}>Book Now</Button>
                <div className="space-y-4 text-sm text-slate-400">
                   <div className="flex justify-between"><span>Duration</span> <span className="text-white">{service.duration}</span></div>
                   <div className="flex justify-between"><span>Mode</span> <span className="text-white">Online / Offline</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const BlogView = () => (
    <div className="pt-32 pb-20 bg-black min-h-screen">
      <div className="container mx-auto px-6">
        <SectionTitle subtitle="Wisdom">Latest Articles</SectionTitle>
        <div className="grid md:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <div key={post.id} className="bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden group hover:border-amber-500/30 transition-all">
              <div className="h-48 bg-slate-900 relative flex items-center justify-center text-slate-700 group-hover:text-amber-900/30 transition-colors">
                <BookOpen size={48} />
              </div>
              <div className="p-8">
                <p className="text-amber-500 text-xs mb-3">{post.date}</p>
                <h3 className="text-xl font-serif text-slate-100 mb-3 group-hover:text-amber-400 transition-colors">{post.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">{post.excerpt}</p>
                <span className="text-slate-500 text-xs uppercase tracking-widest group-hover:text-white transition-colors">Read More</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ContactView = () => (
    <div className="pt-32 pb-20 bg-black min-h-screen">
      <div className="container mx-auto px-6">
        <SectionTitle subtitle="Connect">Start Your Journey</SectionTitle>
        <div className="grid lg:grid-cols-2 gap-16 max-w-5xl mx-auto">
          <div className="space-y-10">
             <p className="text-slate-300 text-xl font-light leading-relaxed">
               Ready to align with your highest potential? Reach out for a consultation or inquiry.
             </p>
             <div className="space-y-6">
               {[
                 { icon: <Phone/>, label: "Call / WhatsApp", value: `${BRAND.phone}` },
                 { icon: <Mail/>, label: "Email", value: BRAND.email },
                 { icon: <MapPin/>, label: "Visit Us", value: BRAND.address },
               ].map((c, i) => (
                 <div key={i} className="flex items-center gap-6 p-6 bg-[#0a0a0a] border border-white/5 rounded-lg hover:border-amber-500/20 transition-colors">
                   <div className="text-amber-500">{c.icon}</div>
                   <div>
                     <h4 className="text-slate-400 text-xs uppercase tracking-wider mb-1">{c.label}</h4>
                     <p className="text-white font-medium">{c.value}</p>
                   </div>
                 </div>
               ))}
             </div>
          </div>
          <div className="bg-[#0a0a0a] p-10 border border-white/5 rounded-xl">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-6">
                <input type="text" className="bg-black border border-white/10 rounded p-4 text-white focus:border-amber-500 outline-none" placeholder="Name" />
                <input type="text" className="bg-black border border-white/10 rounded p-4 text-white focus:border-amber-500 outline-none" placeholder="Phone" />
              </div>
              <select className="w-full bg-black border border-white/10 rounded p-4 text-slate-400 focus:border-amber-500 outline-none">
                <option>Select Service</option>
                {SERVICES.map(s => <option key={s.id}>{s.title}</option>)}
              </select>
              <textarea rows="4" className="w-full bg-black border border-white/10 rounded p-4 text-white focus:border-amber-500 outline-none" placeholder="Message"></textarea>
              <Button primary className="w-full">Send Message</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-slate-200 font-sans selection:bg-amber-500 selection:text-white">
      {/* NAVBAR */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/90 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigateTo('home')}>
            <div className="w-10 h-10 rounded-full border border-amber-500/50 flex items-center justify-center relative">
              <div className="absolute inset-1 border border-amber-500/20 rounded-full animate-spin-slow"></div>
              <Sun size={20} className="text-amber-500" />
            </div>
            <span className="text-xl font-serif font-bold text-white tracking-wider">
              DESTINI <span className="text-amber-500">NUMBERS</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-10">
            {['Home', 'About', 'Services', 'Blog'].map((item) => (
              <button key={item} onClick={() => navigateTo(item.toLowerCase())} 
                className={`text-xs uppercase tracking-[0.2em] font-medium hover:text-amber-400 transition-colors ${activePage === item.toLowerCase() ? 'text-amber-500' : 'text-slate-400'}`}>
                {item}
              </button>
            ))}
            <Button onClick={() => navigateTo('contact')} className="!px-6 !py-2 text-xs">Book</Button>
          </div>
          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(true)}><Menu /></button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div className={`fixed inset-0 z-[60] bg-black transform transition-transform duration-500 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 flex justify-end"><button className="text-slate-400" onClick={() => setMobileMenuOpen(false)}><X /></button></div>
        <div className="flex flex-col items-center gap-8 mt-10">
           {['Home', 'About', 'Services', 'Blog', 'Contact'].map((item) => (
              <button key={item} onClick={() => navigateTo(item.toLowerCase())} className="text-3xl font-serif text-white hover:text-amber-500">{item}</button>
            ))}
        </div>
      </div>

      <main className="min-h-screen">
        {activePage === 'home' && <HomeView />}
        {activePage === 'about' && <AboutView />}
        {activePage === 'services' && <ServicesView />}
        {activePage === 'service-detail' && <ServiceDetailView />}
        {activePage === 'blog' && <BlogView />}
        {activePage === 'contact' && <ContactView />}
      </main>

      <footer className="bg-black py-16 border-t border-white/5">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h4 className="text-xl font-serif text-white mb-2">Destini Number Studio</h4>
            <p className="text-slate-500 text-sm">© 2025 All Rights Reserved.</p>
          </div>
          <div className="flex gap-6">
            <Facebook className="text-slate-600 hover:text-amber-500 cursor-pointer transition-colors" size={20} />
            <Instagram className="text-slate-600 hover:text-amber-500 cursor-pointer transition-colors" size={20} />
            <Youtube className="text-slate-600 hover:text-amber-500 cursor-pointer transition-colors" size={20} />
          </div>
        </div>
      </footer>

      <a href={BRAND.whatsapp_link} target="_blank" rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-40 bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-500 transition-all hover:scale-110">
        <MessageCircle size={28} />
      </a>
    </div>
  );
}
