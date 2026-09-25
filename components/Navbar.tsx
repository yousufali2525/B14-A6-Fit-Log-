"use client"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useSearchParams } from "next/navigation"
import { useStore } from "@/lib/store"
export default function Navbar() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentTab = searchParams.get("tab")||"plan"
  const { planCount, savedCount } = useStore()
  const isWorkoutsActive = pathname === "/"||pathname === "/#library"
  const isMyPlanActive = pathname === "/my-plan"
  const isPlanActive = pathname === "/my-plan" && currentTab === "plan"
  const isSavedActive = pathname === "/my-plan" && currentTab === "saved"
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#101114]/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="FitLog" width={28} height={28} />
          <span className="text-lg font-black uppercase tracking-wide text-white">FitLog</span>
        </Link>
        <nav className="hidden items-center md:flex">
          <div className="flex items-center rounded-full border border-white/15 bg-[#14161b] p-1 shadow-inner">
            <Link
              href="/"
              className={`rounded-full px-5 py-1.5 text-xs font-bold transition-all duration-200 ${isWorkoutsActive? "bg-[#22291e] text-lime-400 shadow-sm":"text-gray-400 hover:text-white"}`}>Workouts</Link>
            <Link
              href="/my-plan"
              className={`rounded-full px-5 py-1.5 text-xs font-bold transition-all duration-200 ${isMyPlanActive? "bg-[#22291e] text-lime-400 shadow-sm": "text-gray-400 hover:text-white"}`}>My Plan</Link>
          </div>
        </nav>
        <div className="flex items-center gap-2.5">
          <Link
            href="/my-plan?tab=plan"
            className={`rounded-full px-3 py-1 text-xs font-bold uppercase transition ${isPlanActive? "bg-lime-400 text-black shadow-md shadow-lime-400/20": "border border-white/20 text-white hover:border-white/40"}`}>Plan {planCount}</Link>
          <Link
            href="/my-plan?tab=saved"
            className={`rounded-full px-3 py-1 text-xs font-bold uppercase transition ${ isSavedActive?"bg-lime-400 text-black shadow-md shadow-lime-400/20":"border border-white/20 text-white hover:border-white/40"}`}>Saved {savedCount}</Link>
        </div>
      </div>
    </header>
  )
}