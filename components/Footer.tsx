import Image from "next/image"
export default function Footer() {


  return (
    <footer className="border-t border-white/10 bg-[#101114]">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-8 sm:flex-row">
        <div className="flex items-center gap-2">


          <Image src="/logo.png" alt="FitLog" width={22} height={22} />
          <span className="text-base font-black uppercase tracking-wide text-white">FitLog</span>
        </div>
        <p className="text-sm text-gray-500">© 2026 FitLog — Workout Library. Train hard, log honest.</p>
      </div>
    </footer>
  )
}
