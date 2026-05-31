import { cn } from "@/lib/utils";

const Container = ({ className, ...attr }: React.ComponentProps<"main">) => (
  <main className={cn("mx-auto w-full max-w-screen-sm", className)} {...attr}>
    {attr?.children}
  </main>
);

export { Container };
