import Image from "next/image"
import { FadeInSection } from "@/components/fade-in-section"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

const skills = [
  "Full-stack web development",
  "React & Next.js",
  "React Native & Expo",
  "Backend (Node.js, Go, Python)",
  "Database design & SQL",
  "Self-hosted infrastructure (Proxmox, LXC, Docker, Dokploy)",
]

const techStack = [
  {
    category: "Frontend",
    items: ["Next.js", "React", "Vue", "TypeScript", "Tailwind CSS"],
  },
  {
    category: "Mobile",
    items: ["React Native", "Expo"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Go", "Python"],
  },
  {
    category: "Database",
    items: ["PostgreSQL", "Supabase (self-hosted)"],
  },
  {
    category: "DevOps & Infra",
    items: ["Docker", "Dokploy", "Proxmox", "Traefik", "Cloudflare", "Vercel"],
  },
  {
    category: "AI",
    items: ["Multiple LLM integration", "AI agent development"],
  },
]

export function AboutSection() {
  return (
    <section id="about" className="flex flex-col pb-20">
      <FadeInSection>
        {/* Hero Area */}
        <div className="flex flex-col justify-between gap-8 pt-6 pb-20 md:flex-row">
          <div className="relative aspect-square w-full max-w-[560px] shrink-0 contrast-125 grayscale">
            <Image
              src="/profile.png"
              alt="Aji Nursafiki"
              fill
              className="object-contain object-center"
              priority
            />
          </div>

          <div className="w-full">
            <div className="max-w-3xl space-y-12">
              {/* About Me */}
              <div className="space-y-4">
                <h2 className="border-b pb-2 text-xl font-bold">About Me</h2>
                <p className="text-base leading-relaxed text-muted-foreground antialiased">
                  I am a{" "}
                  <span className="font-medium text-foreground">
                    full-stack engineer
                  </span>{" "}
                  building web apps, SaaS, and automation systems to help
                  businesses work more efficiently. I have experience with{" "}
                  <span className="font-medium text-foreground">
                    Next.js, React, Supabase, Docker, and AI integrations
                  </span>
                  , focusing on clean, scalable, and easy-to-operate products.
                </p>
                <p className="text-base leading-relaxed text-muted-foreground antialiased">
                  I also run{" "}
                  <span className="font-medium text-foreground">Risewise</span>{" "}
                  (dev studio) and{" "}
                  <span className="font-medium text-foreground">Arbiteros</span>{" "}
                  (full-stack engineer), as well as businesses like{" "}
                  <a
                    href="https://akimobiljogja.com"
                    target="_blank"
                    rel="noreferrer"
                    className="underline underline-offset-4 transition-colors hover:text-foreground"
                  >
                    akimobiljogja.com
                  </a>
                  .
                </p>
              </div>

              {/* Skills & Tech Stack Grid */}
              {/* Tech Stack — full horizontal */}
              <div className="space-y-4">
                <h2 className="border-b pb-2 text-xl font-bold">Tech Stack</h2>
                <div className="flex flex-col gap-4">
                  {techStack.map(({ category, items }) => (
                    <div
                      key={category}
                      className="flex flex-wrap items-baseline gap-x-3 gap-y-2"
                    >
                      <span className="w-28 shrink-0 text-sm font-bold">
                        {category}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {items.map((item) => (
                          <Badge key={item} variant="secondary">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills — inline row di bawah */}
              <div className="space-y-4">
                <h2 className="border-b pb-2 text-xl font-bold">Skills</h2>
                <p className="text-sm leading-relaxed font-medium text-muted-foreground">
                  {skills.join(" · ")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </FadeInSection>
    </section>
  )
}
