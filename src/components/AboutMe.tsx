import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import profileImg from '@/assets/profile.jpeg';
import ParticleOverlay from "./func/ParticleOverlay";
import { useState, useEffect } from "react";

export default function AboutMe() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [supportsHover, setSupportsHover] = useState(false);

  useEffect(() => {
    // Check if device supports hover
    setSupportsHover(window.matchMedia('(hover: hover)').matches);
  }, []);

  const handleTouchStart = () => {
    if (!supportsHover) {
      setIsRevealed(true);
    }
  };

  const handleTouchEnd = () => {
    if (!supportsHover) {
      setTimeout(() => setIsRevealed(false), 2000); // Hide after 2 seconds
    }
  };

  return (
    <div id="about"  className="flex flex-col md:flex-row scroll-mt-20 items-start gap-8 px-6 my-4 md:px-16 py-12">
      <div className="flex-1">
        <h2 className="text-3xl font-bold  mb-4">/ about me</h2>
        <Separator className="mb-6" />
        <p className="mb-4 leading-relaxed">
          I'm currently working as a <span className="font-semibold">Front-End Developer</span> at <span className="text-purple-400 font-medium">Arbiteros</span>, a company operating in the cryptocurrency space.
          At the same time, I'm also involved in <span className="font-semibold">Network Engineering, primarily working with Mikrotik devices</span>.
        </p>

        <p className="mb-6">These are some of the languages I've been working with recently:</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-2 mb-6">
          <span>▸ HTML</span>
          <span>▸ CSS / Tailwind</span>
          <span>▸ JavaScript (ES6+)</span>
          <span>▸ TypeScript</span>
          <span>▸ Go (Golang)</span>
          <span>▸ PHP</span>
          <span>▸ SQL</span>
        </div>
        <p className="mb-6 leading-relaxed">
          Outside of work, I'm passionate about tech and hands-on projects—things like Arduino experiments, DIY builds, and tinkering with new gadgets.
          I also enjoy staying active through sports and unwinding by listening to live concert recordings and music.
        </p>
      </div>

      <Card className="relative rounded-2xl shadow-lg p-0 w-full md:w-[300px] border-none overflow-hidden group">
        <CardContent className="p-0">
          <div 
            className="w-full aspect-[3/4] relative"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <img
              src={profileImg}
              alt="Profile"
              className={`w-full h-full object-cover filter transition-all duration-500 ease-in-out ${
                supportsHover 
                  ? 'blur-sm group-hover:blur-none' 
                  : (isRevealed ? 'blur-none' : 'blur-sm')
              }`}
              />
            {/* Overlay Particle */}
            <div className={`absolute inset-0 pointer-events-none z-10 transition-opacity duration-500 ${
              supportsHover ? 'group-hover:opacity-0' : (isRevealed ? 'opacity-0' : 'opacity-100')
            }`}>
              <ParticleOverlay />
            </div>
            {/* Overlay Text */}
            <span className={`absolute inset-0 flex items-center justify-center text-white text-lg font-semibold tracking-wide transition-opacity duration-500 z-20 select-none ${
              supportsHover ? 'group-hover:opacity-0 opacity-100' : (isRevealed ? 'opacity-0' : 'opacity-100')
            }`}
              style={{ textShadow: "0 2px 8px #000" }}
            >
              {supportsHover ? 'hover to reveal' : 'tap to reveal'}
            </span>
          </div>
        </CardContent>
      </Card>



    </div>
  )
}
