import { FadeInSection } from "@/components/fade-in-section"

export function BlogSection() {
  return (
    <section
      id="blog"
      className="flex min-h-[calc(100vh-80px)] shrink-0 flex-col px-8"
    >
      <FadeInSection>
        <h2 className="mb-10 text-5xl font-bold">Blog</h2>
        <p className="text-2xl leading-relaxed text-zinc-600">
          Your latest thoughts and articles.
        </p>
      </FadeInSection>
    </section>
  )
}