const GITHUB_USERNAME = "krystallix"

export const revalidate = 3600

const LEVEL_MAP: Record<string, 0 | 1 | 2 | 3 | 4> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
}

const QUERY = `
  query($login: String!) {
    user(login: $login) {
      createdAt
      repositories(first: 100, ownerAffiliations: OWNER, isFork: false) {
        nodes {
          languages(first: 10, orderBy: { field: SIZE, direction: DESC }) {
            edges {
              size
              node {
                name
                color
              }
            }
          }
        }
      }
      contributionsCollection(from: "2026-01-01T00:00:00Z", to: "2026-12-31T23:59:59Z") {
        restrictedContributionsCount
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
              contributionLevel
            }
          }
        }
      }
    }
  }
`

export async function GET() {
  const token = process.env.GITHUB_TOKEN

  if (!token) {
    return Response.json(
      { error: "GITHUB_TOKEN is not set. Add it to .env.local" },
      { status: 500 }
    )
  }

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query: QUERY, variables: { login: GITHUB_USERNAME } }),
    })

    if (!res.ok) {
      const text = await res.text()
      console.error("[github/stats] GraphQL request failed:", res.status, text)
      return Response.json({ error: "GitHub GraphQL error" }, { status: res.status })
    }

    const { data, errors } = await res.json()

    if (errors?.length) {
      console.error("[github/stats] GraphQL errors:", errors)
      return Response.json({ error: errors[0].message }, { status: 400 })
    }

    const user = data?.user
    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 })
    }

    // ── Accumulate language bytes ──────────────────────────────────────────
    const langTotals: Record<string, { bytes: number; color: string }> = {}

    for (const repo of user.repositories.nodes) {
      for (const edge of repo.languages.edges) {
        const name: string = edge.node.name
        const color: string = edge.node.color ?? "#94a3b8"
        langTotals[name] ??= { bytes: 0, color }
        langTotals[name].bytes += edge.size
      }
    }

    const totalBytes = Object.values(langTotals).reduce((s, l) => s + l.bytes, 0)

    const languages = Object.entries(langTotals)
      .map(([lang, { bytes, color }]) => ({
        lang,
        bytes,
        color,
        percentage: parseFloat(((bytes / totalBytes) * 100).toFixed(2)),
      }))
      .sort((a, b) => b.bytes - a.bytes)
      .slice(0, 12)

    // ── Flatten contribution weeks → days ──────────────────────────────────
    const calendar = user.contributionsCollection.contributionCalendar
    const contributions = calendar.weeks.flatMap(
      (week: { contributionDays: { contributionCount: number; date: string; contributionLevel: string }[] }) =>
        week.contributionDays.map((day) => ({
          date: day.date,
          count: day.contributionCount,
          level: LEVEL_MAP[day.contributionLevel] ?? 0,
        }))
    )

    // ── Compute Summary Stats ──────────────────────────────────────────────
    let longestStreak = 0
    let currentStreak = 0
    let tempStreak = 0
    let activeDays = 0
    let mostProductiveDay = { date: "", count: 0 }

    const todayStr = new Date().toISOString().split("T")[0]
    let foundToday = false

    for (const day of contributions) {
      if (day.count > 0) {
        activeDays++
        tempStreak++
        if (tempStreak > longestStreak) {
          longestStreak = tempStreak
        }
        if (day.count > mostProductiveDay.count) {
          mostProductiveDay = { date: day.date, count: day.count }
        }
      } else {
        tempStreak = 0
      }

      if (day.date === todayStr) {
        currentStreak = tempStreak
        foundToday = true
      }
    }
    
    // If today is after 2026, current streak based on 2026 is just whatever it ended at,
    // but typically we say 0 unless we fetch current year. We'll fallback to tempStreak if today not found and we want *a* streak, 
    // but 0 is safer if today is not in the range.
    if (!foundToday) {
       currentStreak = 0 
    }

    const restricted = user.contributionsCollection.restrictedContributionsCount

    const summary = {
      createdAt: user.createdAt,
      activeDays,
      longestStreak,
      currentStreak,
      mostProductiveDay,
      privateContributions: restricted,
      publicContributions: calendar.totalContributions - restricted,
    }

    return Response.json({
      languages,
      totalBytes,
      contributions,
      totalContributions: calendar.totalContributions,
      summary,
    })
  } catch (err) {
    console.error("[github/stats] unexpected error:", err)
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}
