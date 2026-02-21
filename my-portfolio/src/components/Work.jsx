import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROJECTS } from '../constants';

gsap.registerPlugin(ScrollTrigger);

const Work = () => {
  const containerRef = useRef(null);
  const imagesRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      imagesRef.current.forEach((img) => {
        if (!img) return;
        
        // Parallax Effect: Image moves slower than the scroll
        gsap.to(img, {
          yPercent: 15, // Move image down by 15%
          ease: "none",
          scrollTrigger: {
            trigger: img.parentElement, // Trigger based on the wrapper
            start: "top bottom", // Start when wrapper hits bottom of screen
            end: "bottom top", // End when wrapper leaves top
            scrub: true, // Tie animation to scrollbar
          }
        });
        
        // Fade In Title triggers separately
        gsap.fromTo(img.closest('.group').querySelector('.work-info'),
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, scrollTrigger: { trigger: img.parentElement, start: "top 75%" } }
        )
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="work" className="py-24 px-6 bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-20 border-b border-white/10 pb-6">
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-white">Selected Works</h2>
          <span className="text-xs font-bold uppercase tracking-widest text-white/40">01 — 0{PROJECTS.length}</span>
        </div>
        
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-24">
          {PROJECTS.map((project, i) => (
            <div key={project.id} className="group cursor-pointer">
              
              {/* Image Wrapper */}
              <div className="relative overflow-hidden aspect-4/3 mb-6 bg-white/5 rounded-sm">
                {/* IMPORTANT: scale-110 and -translate-y-10 are needed 
                   so the image has room to move for the parallax effect 
                */}
                <img
                  ref={el => imagesRef.current[i] = el}
                  src={project.image}
                  alt={project.title}
                  className="w-full h-[120%] object-cover -translate-y-[10%] grayscale-0 md:grayscale md:group-hover:grayscale-0 transition-all duration-700 ease-out"
                  loading="lazy"
                />
              </div>

              {/* Text Info (Targeted by GSAP) */}
              <div className="work-info flex justify-between items-start">
                <div className="space-y-2">
                  <h3 className="text-xl font-medium text-white">{project.title}</h3>
                  <p className="text-sm text-white/50 max-w-sm font-light leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex gap-2 flex-wrap pt-2">
                    {project.tech.map((t) => (
                      <span key={t} className="text-[10px] uppercase tracking-wider text-white/70 border border-white/10 px-2 py-1 rounded-sm">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="text-white/30 text-2xl group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300">↗</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;