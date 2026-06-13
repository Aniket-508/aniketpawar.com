import { getLastUpdated } from "@/lib/github";

const Footer = () => (
  <footer className="mt-auto animate-slide-in delay-600 mx-auto w-full max-w-screen-sm px-4">
    <div className="flex items-center justify-between border-t py-3">
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
