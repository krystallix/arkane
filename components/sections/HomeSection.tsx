import { FadeInSection } from "@/components/fade-in-section"

export function HomeSection() {
  return (
    <section
      id="home"
      className="flex min-h-[calc(100vh-140px)] md:min-h-[calc(100vh-80px)] shrink-0 flex-col px-0 md:px-8"
    >
      <FadeInSection>
        <p className="text-5xl sm:text-7xl md:text-8xl lg:text-[100px] leading-tight">Hi, </p>
        <p className="text-5xl sm:text-7xl md:text-8xl lg:text-[100px] font-bold leading-tight">I&apos;m Aji</p>
        <div className="mt-6 md:mt-10">
          <p className="text-lg sm:text-2xl md:text-3xl leading-relaxed text-zinc-700">
            I&apos;m a Software Engineer from Yogyakarta, Indonesia.
          </p>
          <p className="text-lg sm:text-2xl md:text-3xl leading-relaxed text-zinc-700 mt-2">
            I turn ideas into real products by handling everything myself,
            from planning and development to infrastructure and launch.
          </p>
        </div>
      </FadeInSection>
    </section>
  )
}