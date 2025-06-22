import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import './index.css';
import AboutMe from './components/AboutMe';
import { ThemeProvider } from "@/components/func/ThemeProvider";
import Footer from './components/Footer';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <main className="container mx-auto px-4 max-w-screen-xl ">
        <Navbar />
        <Hero />
        <AboutMe />
        <Projects />
        <Footer/>
      </main>
    </ThemeProvider>
  );
}

export default App;