import { FadeInSection } from "@/components/fade-in-section"

export function HomeSection() {
  return (
    <section
      id="home"
      className="flex min-h-[calc(100vh-80px)] shrink-0 flex-col px-8"
    >
      <FadeInSection>
        <p className="text-[100px]">Hi, </p>
        <p className="text-[100px] font-bold">I&apos;m Aji</p>
        <div className="mt-10">
          <p className="text-3xl leading-relaxed">
            I&apos;m a Software Engineering from Yogyakarta, Indonesia.
          </p>
          <p className="text-3xl leading-relaxed">
            I turn ideas into real products by handling everything myself,
            from planning and development to infrastructure and launch.
          </p>
        </div>
      </FadeInSection>
    </section>
  )
}