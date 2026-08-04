import { Badge } from "@/components/ui/badge";

interface TechStackProps {
  items: string[];
}

const TechStack = ({ items }: TechStackProps) => (
  <div className="flex flex-wrap gap-1.5">
    {items.map((item) => (
      <Badge key={item} variant="secondary">
        {item}
      </Badge>
    ))}
  </div>
);

export { TechStack };
