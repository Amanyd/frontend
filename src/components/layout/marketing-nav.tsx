import Link from "next/link";
import { Button } from "@/components/ui/button";

export function MarketingNav() {
  return (
    <nav className="fixed top-0 w-full h-16 z-50 border-b border-hairline bg-canvas">
      <div className="flex justify-between items-center px-8 w-full max-w-[1280px] mx-auto h-full">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-extrabold tracking-tighter text-ink uppercase font-display"
        >
          AeroMentor
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-surface-tint hover:text-ink transition-colors font-display text-sm font-semibold tracking-tight hidden md:block px-3 py-2 hover:bg-surface-soft rounded-lg"
          >
            Sign In
          </Link>
          <Button asChild>
            <Link href="/register">Get Started</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
