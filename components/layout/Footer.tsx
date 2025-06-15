import { ModeToggle } from "../ui/ModeToggle"

const Footer: React.FC = () => {
  return (
    <footer className="mx-auto w-full max-w-screen-sm border-t px-4">
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
