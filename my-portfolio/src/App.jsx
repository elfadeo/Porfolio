import { ReactLenis } from 'lenis/react'; // <--- UPDATED IMPORT (Not @studio-freight)
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Work from './components/Work';
import About from './components/About';
import Contact from './components/Contact';

const App = () => {
  return (
    // 'root' prop tells Lenis to control the main html scroll
    <ReactLenis root>
      <main className="relative bg-[#050505] text-white overflow-hidden min-h-screen">
        <Navbar />
        <Hero />
        <Work />
        <About />
        <Contact />
      </main>
    </ReactLenis>
  );
};

export default App;