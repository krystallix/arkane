import ProjectCards from "./ProjectCards"
import { Separator } from "./ui/separator"

const projects = [
  {
    title: "Kanggotan",
    repo: "https://github.com/octocat/Hello-World",
    description:
      "is an all-in-one platform designed to help organizations manage and organize their data with clarity and ease.",
    lang: [
      { name: "vue", percent: 70 },
      { name: "golang", percent: 30 },
    ],
    link: "https://kanggotan.arkane.my.id",
    isPublic: true,
  },
  {
    title: "Siswanto Aki",
    repo: "https://github.com/vercel/next.js",
    description:
      "is a simple and responsive web catalog for showcasing and selling car batteries, making it easy for customers to find the right product.",
    lang: [
      { name: "vue", percent: 60 },
      { name: "firebase", percent: 40 },
    ],
    link: "https://siswanto-aki.arkane.my.id",
    isPublic: true,
  },
  {
    title: "CashTrack",
    repo: "https://github.com/facebook/react",
    description:
      "is a minimalist expense tracking app designed to help users record and review their daily spending with ease.",
    lang: [
      { name: "react", percent: 50 },
      { name: "supabase", percent: 30 },
      { name: "tailwind", percent: 20 },
    ],
    link: "https://cashtrack.arkane.my.id",
    isPublic: true,
  },
  {
    title: "Mikrotik Script",
    repo: "https://github.com/golang/go",
    description:
      "is a tool that helps network admins quickly generate custom Mikrotik scripts based on specific configurations and use cases.",
    lang: [
      { name: "vue", percent: 40 },
      { name: "golang", percent: 60 },
    ],
    link: "https://mikrotik-script.arkane.my.id",
    isPublic: false,
  },
]

export default function Projects() {
  return (
    <section id="projects"  className="px-6 my-4 md:px-16">
        <h2 className="text-3xl font-bold  mb-4">/ projects</h2>
        <Separator className="mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
        {projects.map((project, index) => (
          <ProjectCards
            key={index}
            title={project.title}
            repo={project.repo}
            description={project.description}
            lang={project.lang}
            link={project.link}
            isPublic={project.isPublic}
          />
        ))}
      </div>
    </section>
  )
}
