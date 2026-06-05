import Link from "next/link"
import Image from "next/image"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center px-4">
        <div className="hidden w-full items-center justify-between md:flex">
          <Link href="/" className="flex items-center gap-1">
            <Image
              src="/favicon-32x32.png"
              alt="arkane logo"
              width={24}
              height={24}
              className="grayscale"
            />
            <span className="font-bold">risewise</span>
          </Link>
          {/* <nav className="flex items-center gap-6">
            <Link
              href="/"
              className="text-foreground/60 transition-colors hover:text-foreground/80"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-foreground/60 transition-colors hover:text-foreground/80"
            >
              About
            </Link>
            <Link
              href="/projects"
              className="text-foreground/60 transition-colors hover:text-foreground/80"
            >
              Projects
            </Link>
          </nav> */}
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* You can add a search bar or something here if needed */}
          </div>
          <nav className="flex items-center">
            {/* You can add theme toggle or other icons here */}
          </nav>
        </div>
      </div>
    </header>
  )
}
