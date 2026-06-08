const GITHUB_USERNAME = "krystallix"

export const revalidate = 3600

interface Contribution {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

export async function GET() {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`,
      { next: { revalidate: 3600 } }
    )

    if (!res.ok) {
      console.error("[github/contributions] fetch failed:", res.status)
      return Response.json(
        { contributions: [], total: {} },
        { status: res.status }
      )
    }

    const text = await res.text()
    if (!text || text.trim() === "") {
      console.error("[github/contributions] empty response from third-party API")
      return Response.json({ contributions: [], total: {} })
    }

    let data: { contributions: Contribution[]; total: Record<string, number> }
    try {
      data = JSON.parse(text)
    } catch (parseErr) {
      console.error("[github/contributions] JSON parse error:", parseErr)
      return Response.json({ contributions: [], total: {} })
    }

    if (!Array.isArray(data.contributions)) {
      return Response.json({ contributions: [], total: {} })
    }

    return Response.json(data)
  } catch (err) {
    console.error("[github/contributions] unexpected error:", err)
    return Response.json({ contributions: [], total: {} }, { status: 500 })
  }
}
