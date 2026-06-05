"use client"

import { useEffect, useState } from "react"
import {
  Home,
  User,
  FolderOpen,
  LayoutDashboard,
  Mail,
  NotebookText,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  { label: "Home", icon: Home, id: "home" },
  { label: "About", icon: User, id: "about" },
  { label: "Projects", icon: FolderOpen, id: "projects" },
  { label: "Overview", icon: LayoutDashboard, id: "overview" },
  { label: "Blog", icon: NotebookText, id: "blog" },
  { label: "Contact", icon: Mail, id: "contact" },
]

export default function Page() {
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const rootElement = document.getElementById("scroll-area")
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      {
        root: rootElement,
        rootMargin: "-40% 0px -40% 0px",
        threshold: 0,
      }
    )

    navItems.forEach((item) => {
      const element = document.getElementById(item.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="relative grid h-screen grid-cols-[8fr_2fr] items-start gap-2 overflow-hidden">
      {/* Left Scrollable Content */}
      <div
        id="scroll-area"
        className="flex h-full snap-y snap-mandatory [scrollbar-width:none] flex-col overflow-y-scroll scroll-smooth [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {/* Home Section */}
        <section
          id="home"
          className="flex min-h-screen shrink-0 snap-start snap-always flex-col px-8 pt-20"
        >
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
        </section>

        {/* About Section */}
        <section
          id="about"
          className="flex min-h-screen shrink-0 snap-start snap-always flex-col px-8 pt-20"
        >
          <h2 className="mb-10 text-5xl font-bold">About Me</h2>
          <p className="text-2xl leading-relaxed text-zinc-600">
            This is the about section. Here you can write more details about
            your background, experience, and passions.
          </p>
        </section>

        {/* Projects Section */}
        <section
          id="projects"
          className="flex min-h-screen shrink-0 snap-start snap-always flex-col px-8 pt-20"
        >
          <h2 className="mb-10 text-5xl font-bold">Projects</h2>
          <p className="text-2xl leading-relaxed text-zinc-600">
            Showcase your best works here.
          </p>
        </section>

        {/* Overview Section */}
        <section
          id="overview"
          className="flex min-h-screen shrink-0 snap-start snap-always flex-col px-8 pt-20"
        >
          <h2 className="mb-10 text-5xl font-bold">Overview</h2>
          <p className="text-2xl leading-relaxed text-zinc-600">
            A high-level overview of your skills or timeline.
          </p>
        </section>

        {/* Blog Section */}
        <section
          id="blog"
          className="flex min-h-screen shrink-0 snap-start snap-always flex-col px-8 pt-20"
        >
          <h2 className="mb-10 text-5xl font-bold">Blog</h2>
          <p className="text-2xl leading-relaxed text-zinc-600">
            Your latest thoughts and articles.
          </p>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="flex min-h-screen shrink-0 snap-start snap-always flex-col px-8 pt-20"
        >
          <h2 className="mb-10 text-5xl font-bold">Contact</h2>
          <p className="text-2xl leading-relaxed text-zinc-600">
            Get in touch!
          </p>
        </section>
      </div>

      {/* Right Fixed Sidenav */}
      <div className="flex h-full flex-col justify-center pe-4">
        <div className="flex flex-col">
          <span className="ps-4 pb-2 text-xl font-medium text-zinc-600">
            Menu
          </span>
          {navItems.map(({ label, icon: Icon, id }) => {
            const isActive = activeSection === id
            return (
              <Button
                key={label}
                variant="ghost"
                onClick={() => scrollToSection(id)}
                className={`group flex h-14 items-center justify-start rounded-none border-0 border-b border-zinc-100 text-left text-lg font-medium transition-colors hover:bg-transparent ${
                  isActive ? "text-primary" : "text-zinc-500 hover:text-black"
                }`}
              >
                {/* Icon container expands if hovered OR active */}
                <span
                  className={`overflow-hidden transition-all duration-300 ${
                    isActive ? "w-5" : "w-0 group-hover:w-5"
                  }`}
                >
                  <Icon size={18} className="shrink-0" />
                </span>
                <span>{label}</span>
              </Button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
