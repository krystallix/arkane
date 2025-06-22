import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "./ui/button"
import { Globe } from "lucide-react"

interface LangType {
  name: string
  percent: number
}

interface TaskCardProps {
  title: string
  description?: string
  lang: LangType[]
  repo: string
  link: string
  isPublic: boolean
}

// Fungsi untuk menghasilkan warna hitam dengan tingkat kegelapan sesuai persentase
function getBlackShade(percent: number, maxPercent: number) {
  // Persentase tertinggi = paling gelap (mendekati #000), terendah = paling terang (misal #bbb)
  // Kita gunakan rentang dari #bbb (terang) ke #000 (gelap)
  // percent/maxPercent = 1 -> #000, percent/maxPercent = kecil -> #bbb
  // Interpolasi linear antara 187 (0xbb) dan 0
  const min = 0;    // #000
  const max = 255;  // #bbb
  // Semakin besar percent, semakin gelap
  const ratio = percent / maxPercent;
  const shade = Math.round(max - (max - min) * ratio);
  // Clamp
  const c = Math.max(0, Math.min(255, shade));
  return `rgb(${c},${c},${c})`;
}

export default function ProjectCards({
  title,
  repo,
  description,
  lang,
  link,
  isPublic
}: TaskCardProps) {
  // Cari persentase paling tinggi
  const maxPercent = lang.reduce((max, l) => l.percent > max ? l.percent : max, 0);

  return (
    <Card className="w-full max-w-md rounded-xl border shadow-sm transition hover:shadow-md hover:-translate-y-1 hover:border-primary/40 hover:bg-accent/50">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base font-semibold">{title}</CardTitle>
          <div className="flex gap-2">
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              title="Visit Website"
              tabIndex={-1}
              onClick={e => e.stopPropagation()}
            >
              <Button variant="outline" size="icon" className="p-2 hover:cursor-pointer">
                <Globe size={16} className="inline-block" aria-hidden="true" />
              </Button>
            </a>
            {isPublic && (
              <a
                href={repo}
                target="_blank"
                rel="noopener noreferrer"
                title="View on GitHub"
                tabIndex={-1}
                onClick={e => e.stopPropagation()}
              >
                <Button variant="outline" size="icon" className="p-2 hover:cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="inline-block"
                    aria-hidden="true"
                  >
                    <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.919.678 1.853 0 1.337-.012 2.419-.012 2.749 0 .268.18.579.688.481C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z"/>
                  </svg>
                </Button>
              </a>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          {description || "No description"}
        </p>

        {/* Stacked Progress Bar */}
        <div className="h-2 w-full flex overflow-hidden rounded">
          {lang.map((l) => (
            <div
              key={l.name}
              style={{
                width: `${l.percent}%`,
                backgroundColor: getBlackShade(l.percent, maxPercent)
              }}
            />
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground mt-1">
          {lang.map((l) => (
            <div key={l.name} className="flex items-center gap-1">
              <span
                className="w-3 h-3 rounded-full inline-block"
                style={{
                  backgroundColor: getBlackShade(l.percent, maxPercent)
                }}
              />
              <span className="capitalize">{l.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
