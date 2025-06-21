import { ModeToggle } from "../ui/ModeToggle"

const Footer: React.FC = () => {
  return (
    <footer className="mx-auto w-full max-w-screen-sm border-t px-4 duration-1000 animate-in fade-in fill-mode-both animation-delay-[1300ms]">
      <div className="flex items-center justify-between py-3">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} <span>Aniket Pawar</span>
        </p>
        <ModeToggle />
      </div>
    </footer>
  )
}

export default Footer
