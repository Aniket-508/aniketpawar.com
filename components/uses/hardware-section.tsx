import { AppLink } from "@/components/ui/app-link";
import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/ui/section";
import { Title } from "@/components/ui/title";

interface HardwareItem {
  key: string;
  title: string;
  description: string;
  href: string;
}

const HARDWARE_ITEMS: HardwareItem[] = [
  {
    description: "Midnight, 16GB RAM, 512GB SSD",
    href: "https://www.apple.com/shop/buy-mac/macbook-air",
    key: "macbook-air-m3",
    title: "MacBook Air M3",
  },
  {
    description: '27" 4K UHD, USB-C',
    href: "https://www.samsung.com/us/computing/monitors/all-monitors/",
    key: "samsung-monitor",
    title: "Samsung Monitor",
  },
];

const HardwareSection = () => (
  <Section className="delay-300 flex flex-col gap-4">
    <div className="flex items-center gap-1">
      <Title
        className="text-xl font-medium italic"
        render={<h2>{"hardware."}</h2>}
      />
    </div>
    <div className="flex flex-col gap-3">
      {HARDWARE_ITEMS.map((item) => (
        <AppLink
          key={item.key}
          href={item.href}
          target="_blank"
          className="group flex flex-col gap-1 rounded-lg border p-3 transition-colors hover:bg-muted/50"
        >
          <Badge variant="secondary" className="w-fit font-mono">
            {item.title}
          </Badge>
          <p className="text-muted-foreground text-sm">{item.description}</p>
        </AppLink>
      ))}
    </div>
  </Section>
);

export { HardwareSection };
