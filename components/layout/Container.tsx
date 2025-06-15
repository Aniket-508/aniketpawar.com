import { cn } from "@/lib/utils"

const Container: React.FunctionComponent<
  React.HTMLAttributes<HTMLDivElement>
> = ({ className, ...attr }) => {
  return (
    <main className={cn("mx-auto w-full max-w-screen-sm", className)} {...attr}>
      {attr?.children}
    </main>
  )
}

export default Container
