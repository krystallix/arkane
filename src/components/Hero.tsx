// import profileImg from '../assets/profile.png'; // Ganti dengan gambar hitam putih jika ada
import { Mail } from 'lucide-react';
import DotPattern from './func/DotPattern';
import { Button } from './ui/button';

export default function Hero() {
  return (
    <section id="home"  className="grid grid-cols-1 md:grid-cols-2 px-10 py-16 items-center">
      <div className="flex flex-col gap-2">
        <h2 className="font-semibold text-6xl">
          Hello<span className="text-gray-600">,</span>
        </h2>
        <h2 className="font-semibold text-6xl text-gray-600">
          Aji here
        </h2>
        <div className="mt-2 gap-1 flex">
        <span className="text-muted-foreground text-sm italic" >
          "Beauty isn't just how things look. It's how they feel."
        </span>
        <span className="text-muted-foreground text-sm">
           I build with that in mind.
        </span>
        </div>

      <Button
      variant="outline"
        onClick={() => window.location.href = "mailto:ajihere@arkane.my.id"}
        className="mt-6 flex px-6 py-2   hover:text-purple-600 transition-colors duration-200 w-max"
      >
       <Mail /> Contact Me
      </Button>
      </div>
      <div className="h-[60vh] hidden md:block">
        <DotPattern />
      </div>
    </section>
  );
}