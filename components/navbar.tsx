import Link from "next/link"
import Image from "next/image"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-1.5">
          <Image
            src="/favicon-32x32.png"
            alt="arkane logo"
            width={24}
            height={24}
            className="grayscale"
          />
          <span className="font-bold text-lg text-zinc-900">risewise</span>
        </Link>
        <div className="flex items-center gap-4">
          {/* Add social links or CTA button if desired */}
        </div>
      </div>
    </header>
  )
}
