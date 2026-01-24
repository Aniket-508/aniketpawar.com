import * as React from "react"
import Link from "next/link"

import { Icons } from "./Icons"
import { Button } from "./ui/Button"
import { Skeleton } from "./ui/Skeleton"

export function GitHubLink() {
  return (
    <Button asChild size="icon" variant="ghost" className="size-6">
      <Link
        href={"https://github.com/Aniket-508/aniketpawar.com"}
        target="_blank"
        rel="noreferrer"
      >
        <Icons.github />
        {/* <React.Suspense fallback={<Skeleton className="h-3 w-8" />}>
          <StarsCount />
        </React.Suspense> */}
      </Link>
    </Button>
  )
}

export async function StarsCount() {
  const data = await fetch(
    "https://api.github.com/repos/Aniket-508/aniketpawar.com",
    {
      next: { revalidate: 86400 }, // Cache for 1 day (86400 seconds)
    }
  )
  const json = await data.json()

  return (
    <span className="text-muted-foreground text-xs tabular-nums">
      {json.stargazers_count >= 1000
        ? `${(json.stargazers_count / 1000).toFixed(1)}k`
        : json.stargazers_count.toLocaleString()}
    </span>
  )
}
