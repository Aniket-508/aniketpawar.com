import { getLastUpdated } from "@/lib/github";

const Footer = () => (
  <footer className="mt-auto animate-slide-in delay-700 view-container px-4">
    <div className="flex items-center justify-between border-t pt-3 pb-[calc(env(safe-area-inset-bottom,0)+0.75rem)]">
      <p className="text-muted-foreground text-xs">
        Last updated · {getLastUpdated()}
      </p>
      <p className="text-muted-foreground text-xs">
        &copy; {new Date().getFullYear()} <span>Aniket Pawar</span>
      </p>
    </div>
  </footer>
);

export { Footer };
