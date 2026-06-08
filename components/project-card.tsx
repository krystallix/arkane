import { ExternalLink } from "lucide-react"
import Image from "next/image"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

function GithubIcon({
  size = 16,
  className = "",
}: {
  size?: number
  className?: string
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}

export interface Project {
  title: string
  description: string
  techStack: string[]
  githubUrl?: string
  liveUrl?: string
  imageUrl?: string
}

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { title, description, techStack, githubUrl, liveUrl, imageUrl } =
    project

  return (
    <Card
      size="sm"
      className="flex h-full flex-col justify-between border border-zinc-200/80 bg-card/50 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:hover:border-zinc-700"
    >
      {imageUrl && (
        <div className="relative -mt-4 aspect-video w-full overflow-hidden rounded-t-[min(var(--radius-4xl),24px)]">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover/card:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-2 right-2 flex flex-col gap-2">
            {githubUrl && (
              <Button
                asChild
                variant="outline"
                size="icon"
                className="h-8 w-8 p-1"
              >
                <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                  <GithubIcon size={18} />
                </a>
              </Button>
            )}
            {liveUrl && (
              <Button
                asChild
                size="icon"
                className="h-8 w-8 bg-zinc-900 p-1 text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
              >
                <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink size={18} />
                </a>
              </Button>
            )}
          </div>
        </div>
      )}
      <CardHeader className="flex-1 pb-1">
        <div className="mb-3 flex flex-wrap gap-1.5">
          {techStack.map((tech) => (
            <Badge
              key={tech}
              variant="secondary"
              className="bg-zinc-100 text-[10px] font-medium text-zinc-800 dark:bg-zinc-800/80 dark:text-zinc-300"
            >
              {tech}
            </Badge>
          ))}
        </div>
        <CardTitle className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          {title}
        </CardTitle>
        <CardDescription className="mt-1.5 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
          {description}
        </CardDescription>
      </CardHeader>
    </Card>
  )
}
