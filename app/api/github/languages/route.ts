const GITHUB_USERNAME = "krystallix"

export const revalidate = 3600

export async function GET() {
  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github.v3+json",
    }
    if (process.env.GITHUB_TOKEN) {
      headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`
    }

    // Fetch all owned repos
    const reposRes = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&type=owner`,
      { headers }
    )

    if (!reposRes.ok) {
      const err = await reposRes.json().catch(() => ({}))
      console.error("[github/languages] repos fetch failed:", err)
      return Response.json(
        { error: "GitHub API error", detail: err },
        { status: reposRes.status }
      )
    }

    const repos: Array<{ fork: boolean; languages_url: string }> =
      await reposRes.json()

    if (!Array.isArray(repos)) {
      console.error("[github/languages] repos is not an array:", repos)
      return Response.json({ error: "Unexpected repos format" }, { status: 502 })
    }

    // Fetch language bytes for non-fork repos, with limited concurrency
    const totals: Record<string, number> = {}
    const nonForks = repos.filter((r) => !r.fork)

    // Process in batches of 5 to avoid rate limiting
    const BATCH = 5
    for (let i = 0; i < nonForks.length; i += BATCH) {
      const batch = nonForks.slice(i, i + BATCH)
      await Promise.all(
        batch.map(async (repo) => {
          try {
            const langRes = await fetch(repo.languages_url, { headers })
            if (!langRes.ok) return
            const langs: Record<string, number> = await langRes.json()
            if (typeof langs !== "object" || langs === null) return
            for (const [lang, bytes] of Object.entries(langs)) {
              totals[lang] = (totals[lang] ?? 0) + bytes
            }
          } catch {
            // skip individual repo errors silently
          }
        })
      )
    }

    const total = Object.values(totals).reduce((a, b) => a + b, 0)

    if (total === 0) {
      return Response.json({ languages: [], total: 0 })
    }

    const languages = Object.entries(totals)
      .map(([lang, bytes]) => ({
        lang,
        bytes,
        percentage: parseFloat(((bytes / total) * 100).toFixed(2)),
      }))
      .sort((a, b) => b.bytes - a.bytes)
      .slice(0, 12)

    return Response.json({ languages, total })
  } catch (err) {
    console.error("[github/languages] unexpected error:", err)
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}
