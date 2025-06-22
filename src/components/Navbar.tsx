"use client";

import { useEffect, useState } from "react";
import { ModeToggle } from "./func/ModeToggle";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`z-50 sticky top-0 flex justify-between items-center px-10 py-6 transition-all duration-300 ${
        scrolled
          ? "bg-white/70 dark:bg-neutral-900/50 backdrop-blur-sm"
          : "bg-transparent"
      }`}
    >
      {/* Logo */}
      <div className="h-8">
        <h2 className="text-2xl font-bold">Arkane</h2>
      </div>

      {/* Menu */}
      <div className="space-x-8 hidden md:flex">
        <a href="#home" className="hover:text-purple-600 transition-colors">Home</a>
        <a href="#about" className="hover:text-purple-600 transition-colors">About me</a>
        <a href="#projects" className="hover:text-purple-600 transition-colors">Projects</a>
      </div>

      {/* Right tools */}
      <div className="space-x-4 text-sm hidden md:flex">
        <ModeToggle />
      </div>
    </nav>
  );
}
