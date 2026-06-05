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
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: "-40% 0px -40% 0px" } // Adjust this margin to trigger earlier/later
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
    <div className="grid grid-cols-[8fr_2fr] gap-2 items-start relative">
      {/* Left Scrollable Content */}
      <div className="flex flex-col pb-32">
        {/* Home Section */}
        <section id="home" className="min-h-screen pt-20">
          <p className="text-[100px]">Hi, </p>
          <p className="text-[100px] font-bold">I&apos;m Aji</p>
          <div className="mt-10">
            <p className="text-3xl leading-relaxed">
              I&apos;m a Software Engineering from Yogyakarta, Indonesia.
            </p>
            <p className="text-3xl leading-relaxed">
              I turn ideas into real products by handling everything myself, from
              planning and development to infrastructure and launch.
            </p>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="min-h-screen pt-20">
          <h2 className="text-5xl font-bold mb-10">About Me</h2>
          <p className="text-2xl leading-relaxed text-zinc-600">
            This is the about section. Here you can write more details about your background, experience, and passions. 
          </p>
        </section>

        {/* Projects Section */}
        <section id="projects" className="min-h-screen pt-20">
          <h2 className="text-5xl font-bold mb-10">Projects</h2>
          <p className="text-2xl leading-relaxed text-zinc-600">
            Showcase your best works here.
          </p>
        </section>

        {/* Overview Section */}
        <section id="overview" className="min-h-screen pt-20">
          <h2 className="text-5xl font-bold mb-10">Overview</h2>
          <p className="text-2xl leading-relaxed text-zinc-600">
            A high-level overview of your skills or timeline.
          </p>
        </section>

        {/* Blog Section */}
        <section id="blog" className="min-h-screen pt-20">
          <h2 className="text-5xl font-bold mb-10">Blog</h2>
          <p className="text-2xl leading-relaxed text-zinc-600">
            Your latest thoughts and articles.
          </p>
        </section>

        {/* Contact Section */}
        <section id="contact" className="min-h-screen pt-20">
          <h2 className="text-5xl font-bold mb-10">Contact</h2>
          <p className="text-2xl leading-relaxed text-zinc-600">
            Get in touch!
          </p>
        </section>
      </div>

      {/* Right Fixed Sidenav */}
      <div className="sticky top-20 pt-20">
        <div className="flex flex-col">
          <span className="pb-2 text-xl font-medium text-zinc-600 ps-4">Menu</span>
          {navItems.map(({ label, icon: Icon, id }) => {
            const isActive = activeSection === id
            return (
              <Button
                key={label}
                variant="ghost"
                onClick={() => scrollToSection(id)}
                className={`group flex items-center justify-start gap-2 h-14 rounded-none border-0 border-b border-zinc-100 hover:bg-transparent text-left text-lg font-medium transition-colors ${
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
