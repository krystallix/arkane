"use client"

import { useState, useEffect, useRef } from "react"
import {
  Home,
  User,
  FolderOpen,
  LayoutDashboard,
  Mail,
  NotebookText,
} from "lucide-react"
import { motion, AnimatePresence, useDragControls } from "motion/react"
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
  const [sheetOpen, setSheetOpen] = useState(false)
  const dragControls = useDragControls()
  const sheetRef = useRef<HTMLDivElement>(null)

  // Close sheet when navigating
  const handleNavClick = (id: string) => {
    setActiveSection(id)
    setSheetOpen(false)
  }

  // Prevent body scroll when sheet is open
  useEffect(() => {
    if (sheetOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [sheetOpen])

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
    <div className="relative grid grid-cols-1 md:grid-cols-[8fr_2fr] items-start gap-6 md:gap-10 px-4 md:px-0">

      {/* ── Mobile Side Sheet ───────────────────────────────────── */}
      <div className="md:hidden">
        {/* Backdrop */}
        <AnimatePresence>
          {sheetOpen && (
            <motion.div
              key="sheet-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setSheetOpen(false)}
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
            />
          )}
        </AnimatePresence>

        {/* Draggable Handle — always visible on right edge */}
        <motion.button
          onClick={() => setSheetOpen((prev) => !prev)}
          onPanStart={() => setSheetOpen(true)}
          aria-label="Open navigation menu"
          className={`fixed top-1/2 -translate-y-1/2 z-50 flex flex-col items-center justify-center gap-[5px] transition-all duration-300
            ${sheetOpen ? "right-[260px]" : "right-0"}
            w-6 h-16 rounded-l-xl bg-white/80 backdrop-blur-md border border-zinc-200 border-r-0 shadow-lg`}
          style={{ touchAction: "none" }}
          whileTap={{ scale: 0.92 }}
        >
          <span className="w-1 h-4 rounded-full bg-zinc-400 block" />
          <span className="w-1 h-4 rounded-full bg-zinc-400 block" />
        </motion.button>

        {/* Sheet Panel */}
        <AnimatePresence>
          {sheetOpen && (
            <motion.div
              ref={sheetRef}
              key="sheet-panel"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
              drag="x"
              dragControls={dragControls}
              dragConstraints={{ left: 0, right: 260 }}
              dragElastic={0.05}
              onDragEnd={(_, info) => {
                if (info.offset.x > 80) setSheetOpen(false)
              }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[260px] flex flex-col
                bg-white/80 backdrop-blur-xl border-l border-zinc-200 shadow-2xl"
              style={{ touchAction: "pan-y" }}
            >
              {/* Sheet Header */}
              <div className="flex items-center justify-between px-5 pt-6 pb-4 border-b border-zinc-100">
                <span className="text-sm font-semibold text-zinc-400 uppercase tracking-widest">
                  Menu
                </span>
                {/* Drag indicator at top */}
                <div className="w-8 h-1 rounded-full bg-zinc-300" />
              </div>

              {/* Nav Items */}
              <nav className="flex flex-col px-3 pt-2 pb-6 gap-1 flex-1 overflow-y-auto">
                {navItems.map(({ label, icon: Icon, id }) => {
                  const isActive = activeSection === id
                  return (
                    <button
                      key={id}
                      onClick={() => handleNavClick(id)}
                      className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-medium transition-all text-left w-full
                        ${isActive
                          ? "bg-zinc-900 text-white shadow-sm"
                          : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
                        }`}
                    >
                      <Icon size={18} className="shrink-0" />
                      {label}
                    </button>
                  )
                })}
              </nav>

              {/* Bottom hint */}
              <div className="px-5 pb-8 pt-2 border-t border-zinc-100">
                <p className="text-xs text-zinc-400 text-center">Swipe right to close</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Left Content ─────────────────────────────────────────── */}
      <div className="mt-4 md:mt-10 flex flex-col min-w-0">
        <SectionComponent />
      </div>

      {/* ── Right Fixed Sidenav (Desktop Only) ───────────────────── */}
      <div className="hidden md:sticky md:top-14 md:flex h-fit flex-col pe-4 pt-4">
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
