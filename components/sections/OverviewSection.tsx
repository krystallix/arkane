import { FadeInSection } from "@/components/fade-in-section"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { ArrowUp } from "lucide-react"

// ── Helpers ────────────────────────────────────────────────────────────────
function getDuration(dateString: string) {
  const start = new Date(dateString)
  const end = new Date()
  
  let years = end.getFullYear() - start.getFullYear()
  let months = end.getMonth() - start.getMonth()
  let days = end.getDate() - start.getDate()

  if (days < 0) {
    months--
    const lastMonth = new Date(end.getFullYear(), end.getMonth(), 0)
    days += lastMonth.getDate()
  }
  
  if (months < 0) {
    years--
    months += 12
  }
  
  const parts = []
  if (years > 0) parts.push(`${years} year${years > 1 ? "s" : ""}`)
  if (months > 0) parts.push(`${months} month${months > 1 ? "s" : ""}`)
  if (days > 0) parts.push(`${days} day${days > 1 ? "s" : ""}`)
  
  return parts.join(" ") || "0 days"
}

function getDaysDiff(dateString: string) {
  const start = new Date(dateString)
  const end = new Date()
  return Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
}

// ── Contribution level colours ─────────────────────────────────────────────
const LEVEL_BG = [
  "bg-zinc-100 dark:bg-zinc-900", // 0
  "bg-zinc-300 dark:bg-zinc-700", // 1
  "bg-zinc-500 dark:bg-zinc-600", // 2
  "bg-zinc-700 dark:bg-zinc-500", // 3
  "bg-zinc-900 dark:bg-zinc-300", // 4
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
    summary?: {
      createdAt: string
      activeDays: number
      longestStreak: number
      currentStreak: number
      mostProductiveDay: { date: string; count: number }
      privateContributions: number
      publicContributions: number
    }
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
          <div className="flex flex-col gap-4">
            <span className="text-5xl font-bold">Projects</span>
            <p className="text-sm text-muted-foreground">
              A brief summary of my tech stack usage and open-source
              contributions.
            </p>
          </div>

          {loading ? (
            <div className="flex h-32 items-center justify-center gap-2 text-zinc-400">
              <svg
                className="h-5 w-5 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              <span className="text-sm font-medium">Loading GitHub stats…</span>
            </div>
          ) : (
            <div className="grid grid-cols-[7fr_3fr] gap-4">
              <div className="flex flex-col gap-4">
                {/* ── Languages Card ── */}
                <Card className="rounded-none border-zinc-200/80 bg-card/50 shadow-none dark:border-zinc-800">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base font-semibold">
                      Languages
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4 flex h-2.5 w-full overflow-hidden rounded-full">
                      {langs.map((l) => (
                        <div
                          key={l.lang}
                          style={{
                            width: `${l.percentage}%`,
                            backgroundColor: l.color ?? "#94a3b8",
                          }}
                          title={`${l.lang}: ${l.percentage}%`}
                        />
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                      {langs.slice(0, 8).map((l) => (
                        <div
                          key={l.lang}
                          className="flex items-center gap-2 text-sm"
                        >
                          <span
                            className="h-2.5 w-2.5 shrink-0 rounded-full"
                            style={{ backgroundColor: l.color ?? "#94a3b8" }}
                          />
                          <span className="truncate text-zinc-700 dark:text-zinc-300">
                            {l.lang}
                          </span>
                          <span className="ml-auto text-xs text-zinc-500 tabular-nums">
                            {l.percentage}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* ── Contributions Card ── */}
                <Card className="rounded-none border-zinc-200/80 bg-card/50 shadow-none dark:border-zinc-800">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base font-semibold">
                        2026 Contributions
                      </CardTitle>
                      <span className="text-xs font-medium text-zinc-500">
                        {totalContribs.toLocaleString()} in 2026
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {contributions.length > 0 ? (
                      <div className="flex flex-col items-center">
                        <div className="scrollbar-hide w-full overflow-x-auto">
                          <div className="flex min-w-max flex-col">
                            {/* Month labels */}
                            <div className="relative mb-2 flex h-4 text-xs text-zinc-500">
                              <div className="relative flex-1">
                                {monthLabels.map(({ label, index }) => (
                                  <div
                                    key={index}
                                    className="absolute"
                                    style={{ left: `calc(${index} * 15px)` }}
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
                                  <div
                                    key={wi}
                                    className="flex flex-col gap-[4px]"
                                  >
                                    {week.map((day) => (
                                      <Tooltip key={day.date} delayDuration={0}>
                                        <TooltipTrigger asChild>
                                          <div
                                            className={`h-[12px] w-[12px] cursor-pointer outline-none ${LEVEL_BG[day.level]}`}
                                          />
                                        </TooltipTrigger>
                                        <TooltipContent className="border-none bg-zinc-900 px-2.5 py-1.5 text-xs font-medium text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900">
                                          {day.count} contributions on{" "}
                                          {new Date(
                                            day.date
                                          ).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                          })}
                                        </TooltipContent>
                                      </Tooltip>
                                    ))}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-3 flex w-full items-center justify-end gap-1.5 text-[10px] font-semibold tracking-wider text-zinc-500 uppercase">
                          <span>Less</span>
                          {LEVEL_BG.map((cls, i) => (
                            <div
                              key={i}
                              className={`h-[9px] w-[9px] rounded-sm ${cls}`}
                            />
                          ))}
                          <span>More</span>
                        </div>
                      </div>
                    ) : (
                      <div className="text-sm text-zinc-400">
                        No contributions found.
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
              {stats.summary ? (
                <div className="flex flex-col gap-4">
                  <Card className="rounded-none border-zinc-200/80 bg-card/50 shadow-none dark:border-zinc-800">
                    <CardContent className="p-4">
                      <div className="mb-1 text-xs text-muted-foreground">
                        Joined Github since
                      </div>
                      <div className="mb-1 text-xl font-bold">
                        {new Date(stats.summary.createdAt).toLocaleDateString(
                          "en-US",
                          { day: "numeric", month: "short", year: "numeric" }
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-emerald-500">
                        <ArrowUp size={14} />
                        {getDuration(stats.summary.createdAt)}
                      </div>
                    </CardContent>
                  </Card>

                  {/* <Card className="rounded-none border-zinc-200/80 bg-card/50 shadow-none dark:border-zinc-800">
                    <CardContent className="p-4">
                      <div className="mb-1 text-xs text-muted-foreground">Total days on GitHub</div>
                      <div className="mb-1 text-xl font-bold">{getDaysDiff(stats.summary.createdAt)} days</div>
                      <div className="flex items-center gap-1 text-xs text-emerald-500">
                        <ArrowUp size={14} />
                        Active for: {stats.summary.activeDays} days
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="rounded-none border-zinc-200/80 bg-card/50 shadow-none dark:border-zinc-800">
                    <CardContent className="p-4">
                      <div className="mb-1 text-xs text-muted-foreground">Total Contributions</div>
                      <div className="mb-1 text-xl font-bold">{totalContribs} commits</div>
                      <div className="flex items-center gap-1 text-xs text-emerald-500">
                        <ArrowUp size={14} />
                        Public: {stats.summary.publicContributions} | Private: {stats.summary.privateContributions}
                      </div>
                    </CardContent>
                  </Card> */}

                  <Card className="rounded-none border-zinc-200/80 bg-card/50 shadow-none dark:border-zinc-800">
                    <CardContent className="p-4">
                      <div className="mb-1 text-xs text-muted-foreground">
                        Longest Streak
                      </div>
                      <div className="mb-1 text-xl font-bold">
                        {stats.summary.longestStreak} days
                      </div>
                      <div className="flex items-center gap-1 text-xs text-zinc-500">
                        <ArrowUp size={14} />
                        Current Streak: {stats.summary.currentStreak} days
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="rounded-none border-zinc-200/80 bg-card/50 shadow-none dark:border-zinc-800">
                    <CardContent className="p-4">
                      <div className="mb-1 text-xs text-muted-foreground">
                        Most Productive Day
                      </div>
                      <div className="mb-1 text-xl font-bold">
                        {stats.summary.mostProductiveDay.date
                          ? new Date(
                              stats.summary.mostProductiveDay.date
                            ).toLocaleDateString("en-US", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })
                          : "-"}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-emerald-500">
                        <ArrowUp size={14} />
                        {stats.summary.mostProductiveDay.count} commits
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="flex items-center justify-center rounded border border-dashed border-zinc-200 p-8 text-sm text-zinc-400 dark:border-zinc-800">
                  No summary data
                </div>
              )}
            </div>
          )}
        </div>
      </FadeInSection>
    </section>
  )
}