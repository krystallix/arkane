"use client"

import { useState, useEffect } from "react"
import {
  Home,
  User,
  FolderOpen,
  LayoutDashboard,
  Mail,
  NotebookText,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { HomeSection } from "@/components/sections/HomeSection"
import { AboutSection } from "@/components/sections/AboutSection"
import { ProjectsSection } from "@/components/sections/ProjectsSection"
import { OverviewSection } from "@/components/sections/OverviewSection"
import { BlogSection } from "@/components/sections/BlogSection"
import { ContactSection } from "@/components/sections/ContactSection"

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

  const SectionComponent: React.FC = () => {
    switch (activeSection) {
      case "home":
        return <HomeSection />
      case "about":
        return <AboutSection />
      case "projects":
        return <ProjectsSection />
      case "overview":
        return <OverviewSection stats={githubStats} loading={loadingStats} />
      case "blog":
        return <BlogSection />
      case "contact":
        return <ContactSection />
      default:
        return <HomeSection />
    }
  }

  const [githubStats, setGithubStats] = useState<{
    langs: any[]
    contributions: any[]
    totalContribs: number
    summary?: any
  }>({
    langs: [],
    contributions: [],
    totalContribs: 0,
  })
  const [loadingStats, setLoadingStats] = useState(true)

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await fetch("/api/github/stats")
        if (res.ok) {
          const data = await res.json()
          setGithubStats({
            langs: data.languages || [],
            contributions: data.contributions || [],
            totalContribs: data.totalContributions || 0,
            summary: data.summary,
          })
        }
      } catch (err) {
        console.error("Failed to fetch github stats", err)
      } finally {
        setLoadingStats(false)
      }
    }
    loadStats()
  }, [])

  return (
    <div className="relative grid grid-cols-[8fr_2fr] items-start gap-10">
      {/* Left Content */}
      <div className="mt-10 flex flex-col">
        <SectionComponent />
      </div>

      {/* Right Fixed Sidenav */}
      <div className="sticky top-14 flex h-fit flex-col pe-4 pt-4">
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
                onClick={() => setActiveSection(id)}
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
