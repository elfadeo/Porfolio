import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Hero = () => {
  const heroRef = useRef(null);
  const textContainerRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // 1. Initial Load Animation (Staggered Text)
      tl.fromTo('.hero-text-line',
        { y: 100, opacity: 0, rotateX: -20 },
        { y: 0, opacity: 1, rotateX: 0, duration: 1.8, stagger: 0.15, ease: "expo.out" }
      )
      .fromTo('.hero-subtitle',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        '-=1'
      );

      // 2. Mouse Movement Parallax for the Glow
      const xTo = gsap.quickTo(glowRef.current, "x", { duration: 0.8, ease: "power3" });
      const yTo = gsap.quickTo(glowRef.current, "y", { duration: 0.8, ease: "power3" });

      const handleMouseMove = (e) => {
        // Calculate distance from center
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const x = (clientX - innerWidth / 2) * 0.1; // 0.1 slows it down
        const y = (clientY - innerHeight / 2) * 0.1;
        
        xTo(x);
        yTo(y);
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="h-screen flex items-center justify-center px-6 relative overflow-hidden bg-[#050505]">
      
      {/* Interactive Background Glow */}
      <div 
        ref={glowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-white/5 blur-[120px] rounded-full pointer-events-none"
      ></div>

      <div className="max-w-6xl w-full text-center relative z-10">
        <h1 ref={textContainerRef} className="text-6xl md:text-[10vw] leading-[0.9] font-bold tracking-tighter mix-blend-difference text-white mb-10 overflow-hidden">
          {/* Wrapped in divs for the 'reveal from bottom' effect */}
          <div className="overflow-hidden"><span className="hero-text-line block">IT STUDENT</span></div>
          <div className="overflow-hidden"><span className="hero-text-line block text-white/40">& DEVELOPER</span></div>
        </h1>
        
        <div className="hero-subtitle flex flex-col items-center gap-10">
          <p className="text-xs md:text-sm uppercase tracking-[0.25em] text-white/60">
            Based in the Philippines • Available for OJT
          </p>
          
          <div className="flex flex-col md:flex-row gap-5">
             <a href="/my-resume.pdf" download className="px-8 py-3 bg-white text-black text-xs font-bold uppercase tracking-widest rounded-full hover:scale-105 transition-transform duration-300">
               Download CV
             </a>
             <a href="#work" className="px-8 py-3 border border-white/20 text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-white/10 transition-colors duration-300">
               View Projects
             </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;