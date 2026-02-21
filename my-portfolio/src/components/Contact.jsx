import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SOCIALS } from '../constants';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const contactRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, scrollTrigger: { trigger: titleRef.current, start: 'top 80%' } }
      );
    }, contactRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={contactRef} id="contact" className="min-h-[80vh] flex flex-col justify-center items-center px-6 bg-[#050505] border-t border-white/5">
      <div className="max-w-4xl w-full text-center">
        
        <h2 ref={titleRef} className="text-6xl md:text-9xl font-bold tracking-tighter text-white mb-10">
          Let's Talk.
        </h2>
        
        <p className="text-white/50 text-lg md:text-xl font-light mb-12 max-w-lg mx-auto">
          I am currently available for OJT and internship opportunities.
        </p>
        
        <a 
          href="mailto:hello@example.com"
          className="inline-block px-12 py-4 bg-white text-black text-sm font-bold uppercase tracking-widest rounded-full hover:scale-105 transition-transform duration-300 mb-20"
        >
          Send Email
        </a>

        {/* Minimal Footer Links */}
        <div className="flex flex-col md:flex-row justify-between items-center w-full border-t border-white/10 pt-8 gap-6">
          <p className="text-xs text-white/30 uppercase tracking-widest">
            © 2026 Portfolio
          </p>
          
          <div className="flex gap-8">
            {SOCIALS.map((social) => (
              <a 
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors"
              >
                {social.name}
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Contact;