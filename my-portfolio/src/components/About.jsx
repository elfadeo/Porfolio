import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SKILLS } from '../constants';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // Animate Text
      gsap.fromTo('.about-text', 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          stagger: 0.1, 
          duration: 1, 
          ease: "power2.out",
          scrollTrigger: { trigger: '.about-text', start: 'top 80%' } 
        }
      );

      // Animate Grid Items (The "Wave" Effect)
      gsap.fromTo('.skill-card', 
        { opacity: 0, y: 20, scale: 0.95 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)", // Small bounce
          stagger: {
             amount: 0.5,
             grid: [2, 4], // Helps GSAP understand it's a grid
             from: "start"
          },
          scrollTrigger: { trigger: '.skills-grid', start: 'top 85%' } 
        }
      );

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="about" className="py-24 px-6 bg-[#050505]">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
        
        <div className="hidden lg:block">
          <h2 className="text-xs font-bold uppercase tracking-widest text-white/40 sticky top-32">
            Profile & Skills
          </h2>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-white/40 lg:hidden mb-6">About Me</h2>
          
          <p className="about-text text-2xl md:text-4xl leading-tight font-light text-white mb-16">
            I am a 4th-year IT student with a focus on <span className="text-white/50">Full Stack Development</span>. I bridge the gap between complex backend logic and minimal, user-friendly interfaces.
          </p>

          <h3 className="about-text text-sm font-bold uppercase tracking-widest text-white/40 mb-8 border-t border-white/10 pt-8">
            Technical Arsenal
          </h3>
          
          {/* Tech Grid with specific class for GSAP */}
          <div className="skills-grid grid grid-cols-2 md:grid-cols-4 gap-4">
            {SKILLS.map((skill, i) => (
              <div key={i} className="skill-card p-4 border border-white/5 bg-white/[0.02] hover:bg-white/5 transition-colors duration-300">
                <h4 className="text-white text-sm font-medium mb-1">
                  {skill.name}
                </h4>
                <p className="text-white/40 text-[10px] uppercase tracking-wider">
                   {skill.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;