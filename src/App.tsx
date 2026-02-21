import Navbar from './components/Navbar';
import NeuralNetworkHero from './components/ui/neural-network-hero';
import About from './components/About';
import Experience from './components/Experience';
import TechStack from './components/TechStack';
import Education from './components/Education';
import Projects from './components/Projects';
import Recommendations from './components/Recommendations';
import Contact from './components/Contact';

function App() {
    return (
        <div className="bg-[#0A0A0A] min-h-screen text-[#BDBDBD] font-body selection:bg-[#FF6B35]/30 selection:text-[#F5F5F5]">
            <Navbar />
            <NeuralNetworkHero />
            <About />
            <Experience />
            <TechStack />
            <Education />
            <Projects />
            <Recommendations />
            <Contact />
        </div>
    );
}

export default App;
