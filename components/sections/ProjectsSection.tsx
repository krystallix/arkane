import { FadeInSection } from "@/components/fade-in-section"
import { ProjectCard, type Project } from "@/components/project-card"

const projects: Project[] = [
  {
    title: "Wiseflow To-do App",
    description:
      "Wiseflow is an all-in-one productivity app that combines task management, structured note-taking, project tracking, and weekly task planning.",
    techStack: ["React", "TypeScript", "Tailwind CSS"],
    githubUrl: "",
    liveUrl: "",
    imageUrl: "/wiseflow-to-do-app.png",
  },
  {
    title: "Finance Tracker App",
    description:
      "A finance tracking app with budgeting, transaction categories, monthly analysis, monthly trends, recurring purchases, receipt scanning, and AI-powered financial advisor features.",
    techStack: ["React Native", "Expo Router", "NativeWind"],
    githubUrl: "",
    liveUrl: "",
    imageUrl: "/finance-tracker-app.png",
  },
  {
    title: "Google Business Scraper",
    description:
      "A business research tool that leverages Google Business data for competitor analysis, lead generation, and proposal preparation.",
    techStack: ["Go", "React", "Tailwind CSS"],
    githubUrl: "",
    liveUrl: "",
    imageUrl: "/glead-scraper.png",
  },
  {
    title: "Integrated PlayStation Outlet Management System",
    description:
      "A PS billing management system with features to turn PlayStations on and off from operator, rental, canteen, and member access, along with detailed transaction reports.",
    techStack: ["Go", "Mikrocontroller", "Vue", "Typescript"],
    githubUrl: "",
    liveUrl: "",
    imageUrl: "/tumbuh-billing.png",
  },
  {
    title: "Aki Mobil Jogja",
    description:
      "A business web management system for akimobiljogja.com that includes sales records, digital invoices, stock management, product catalog, customer management, warranty tracking, landing pages, responsive design, and SEO optimization.",
    techStack: ["React", "TypeScript", "Tailwind CSS", "SEO"],
    githubUrl: "",
    liveUrl: "https://akimobiljogja.com",
    imageUrl: "/akimobiljogja.png",
  },
  {
    title: "Crypto Market Monitoring",
    description:
      "A crypto market data API built to compare prices across exchanges, identify arbitrage opportunities, deliver real-time notifications, and support market monitoring workflows.",
    techStack: ["Go", "React", "TypeScript"],
    githubUrl: "",
    liveUrl: "",
    imageUrl: "/arbiteros.png",
  },
]

export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="flex min-h-[calc(100vh-80px)] shrink-0 flex-col px-8 pb-10"
    >
      <FadeInSection>
        <h2 className="mb-10 text-5xl font-bold">Projects</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </FadeInSection>
    </section>
  )
}
