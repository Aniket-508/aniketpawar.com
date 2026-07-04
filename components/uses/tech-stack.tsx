import { AppLink } from "@/components/ui/app-link";
import { Tag } from "@/components/ui/tag";
import { getTechLink } from "@/lib/tech";
import { cn } from "@/lib/utils";

interface TechStackProps {
  items: readonly string[];
  className?: string;
}

const TechStack = ({ items, className }: TechStackProps) => {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className={cn("not-prose flex flex-wrap gap-1", className)}>
      {items.map((tech, index) => {
        const techUrl = getTechLink(tech);

        return (
          <div key={tech} className="flex items-center gap-1">
            {techUrl ? (
              <AppLink
                href={techUrl}
                target="_blank"
                eventName="tech_link_click"
                eventProperties={{ tech, url: techUrl }}
              >
                <Tag className="cursor-pointer font-mono">{tech}</Tag>
              </AppLink>
            ) : (
              <Tag className="font-mono">{tech}</Tag>
            )}
            <span className="text-secondary-foreground text-xs opacity-70">
              {index !== items.length - 1 && "/"}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export { TechStack, type TechStackProps };
