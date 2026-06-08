import { FadeInSection } from "@/components/fade-in-section"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

// ── Contribution level colours ─────────────────────────────────────────────
const LEVEL_BG = [
  "bg-zinc-100 dark:bg-zinc-800",       // 0
  "bg-emerald-200 dark:bg-emerald-900", // 1
  "bg-emerald-400 dark:bg-emerald-700", // 2
  "bg-emerald-500 dark:bg-emerald-600", // 3
  "bg-emerald-700 dark:bg-emerald-400", // 4
]

// ── Types ──────────────────────────────────────────────────────────────────
interface LangStat {
  lang: string
  bytes: number
  percentage: number
  color?: string
}

interface Contribution {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

interface OverviewSectionProps {
  stats: {
    langs: LangStat[]
    contributions: Contribution[]
    totalContribs: number
  }
  loading: boolean
}

// ── Helpers ────────────────────────────────────────────────────────────────
function chunkIntoWeeks(days: Contribution[]): Contribution[][] {
  const weeks: Contribution[][] = []
  let week: Contribution[] = []
  days.forEach((d, i) => {
    week.push(d)
    if (week.length === 7 || i === days.length - 1) {
      weeks.push(week)
      week = []
    }
  })
  return weeks
}

// ── Component ──────────────────────────────────────────────────────────────
export function OverviewSection({ stats, loading }: OverviewSectionProps) {
  const { langs, contributions, totalContribs } = stats
  const weeks = chunkIntoWeeks(contributions)

  // Calculate month labels
  const monthLabels: { label: string; index: number }[] = []
  let currentMonth = -1
  weeks.forEach((week, i) => {
    if (week.length > 0) {
      const date = new Date(week[0].date)
      const month = date.getMonth()
      if (month !== currentMonth) {
        monthLabels.push({
          label: date.toLocaleString("en-US", { month: "short" }),
          index: i,
        })
        currentMonth = month
      }
    }
  })

  return (
    <section id="overview" className="flex flex-col pb-20">
      <FadeInSection>
        <div className="flex flex-col gap-6 pt-6">
          <div className="space-y-1">
            <h2 className="border-b pb-2 text-xl font-bold">Overview</h2>
            <p className="text-sm text-muted-foreground">
              A brief summary of my tech stack usage and open-source contributions.
            </p>
          </div>

          {loading ? (
            <div className="flex h-32 items-center justify-center gap-2 text-zinc-400">
              <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <span className="text-sm font-medium">Loading GitHub stats…</span>
            </div>
          ) : (
            <div className="grid gap-6 lg:grid-cols-2">
              {/* ── Languages Card ── */}
              <Card className="bg-card/50 shadow-none border-zinc-200/80 dark:border-zinc-800">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold">Languages</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 flex h-2.5 w-full overflow-hidden rounded-full">
                    {langs.map((l) => (
                      <div
                        key={l.lang}
                        style={{ width: `${l.percentage}%`, backgroundColor: l.color ?? "#94a3b8" }}
                        title={`${l.lang}: ${l.percentage}%`}
                      />
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                    {langs.slice(0, 8).map((l) => (
                      <div key={l.lang} className="flex items-center gap-2 text-sm">
                        <span
                          className="h-2.5 w-2.5 shrink-0 rounded-full"
                          style={{ backgroundColor: l.color ?? "#94a3b8" }}
                        />
                        <span className="truncate text-zinc-700 dark:text-zinc-300">
                          {l.lang}
                        </span>
                        <span className="ml-auto tabular-nums text-zinc-500 text-xs">
                          {l.percentage}%
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* ── Contributions Card ── */}
              <Card className="bg-card/50 shadow-none border-zinc-200/80 dark:border-zinc-800">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-semibold">2026 Contributions</CardTitle>
                    <span className="text-xs text-zinc-500 font-medium">
                      {totalContribs.toLocaleString()} in 2026
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  {contributions.length > 0 ? (
                    <div className="flex flex-col items-center">
                      <div className="w-full overflow-x-auto pb-2 scrollbar-hide">
                        <div className="flex flex-col min-w-max">
                          {/* Month labels */}
                          <div className="flex text-xs text-zinc-500 mb-2 relative h-4">
                            <div className="flex-1 relative">
                              {monthLabels.map(({ label, index }) => (
                                <div
                                  key={index}
                                  className="absolute"
                                  style={{ left: `calc(${index} * 12px)` }}
                                >
                                  {label}
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="flex">
                            {/* Heatmap Grid */}
                            <div className="flex gap-[3px]">
                              {weeks.map((week, wi) => (
                                <div key={wi} className="flex flex-col gap-[3px]">
                                  {/* Fill empty days if the week starts mid-week */}
                                  {Array.from({ length: new Date(week[0].date).getDay() }).map((_, i) => (
                                    <div key={`empty-${i}`} className="h-[9px] w-[9px] bg-transparent" />
                                  ))}
                                  {week.map((day) => (
                                    <Tooltip key={day.date} delayDuration={0}>
                                      <TooltipTrigger asChild>
                                        <div className={`h-[9px] w-[9px] rounded-sm outline-none cursor-pointer ${LEVEL_BG[day.level]}`} />
                                      </TooltipTrigger>
                                      <TooltipContent className="text-xs bg-zinc-900 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900 border-none font-medium px-2.5 py-1.5">
                                        {day.count} contributions on {new Date(day.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                                      </TooltipContent>
                                    </Tooltip>
                                  ))}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-end w-full gap-1.5 text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">
                        <span>Less</span>
                        {LEVEL_BG.map((cls, i) => (
                          <div key={i} className={`h-[9px] w-[9px] rounded-sm ${cls}`} />
                        ))}
                        <span>More</span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-sm text-zinc-400">No contributions found.</div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </FadeInSection>
    </section>
  )
}