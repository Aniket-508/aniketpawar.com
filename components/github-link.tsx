import Link from "next/link";

import { Icons } from "./icons";
import { Button } from "./ui/button";

export const GitHubLink = () => (
  <Button asChild size="icon" variant="ghost" className="size-6">
    <Link
      href={"https://github.com/Aniket-508/aniketpawar.com"}
      target="_blank"
      rel="noreferrer"
    >
      <Icons.github />
    </Link>
  </Button>
);

export const StarsCount = async () => {
  const data = await fetch(
    "https://api.github.com/repos/Aniket-508/aniketpawar.com",
    {
      next: { revalidate: 86_400 },
    }
  );
  const json = await data.json();

  return (
    <span className="text-muted-foreground text-xs tabular-nums">
      {json.stargazers_count >= 1000
        ? `${(json.stargazers_count / 1000).toFixed(1)}k`
        : json.stargazers_count.toLocaleString()}
    </span>
  );
};
