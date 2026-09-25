"use client"
import { useEffect, useState, Suspense } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import "./globals.css"
import { StoreProvider } from "@/lib/store"
import ToastStack from "@/components/ToastStack"
function PageLoader() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [percent, setPercent] = useState(0)
  useEffect(() => {
    if (!loading) return
    const interval = setInterval(() => {
      setPercent((prev) => (prev >= 100 ? 100 : prev + 15))
    }, 120)
    const timer = setTimeout(() => {
      setLoading(false)
      setPercent(0)
    }, 1000)
    return () => {
      clearInterval(interval)
      clearTimeout(timer)
    }
  }, [pathname, searchParams, loading])
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a")
      if (target &&target.href &&!target.href.startsWith("mailto:") &&!target.href.startsWith("tel:") &&!target.target &&!e.ctrlKey &&!e.metaKey) {
        const currentUrl = new URL(window.location.href)
        const targetUrl = new URL(target.href)
        if (
          currentUrl.pathname !== targetUrl.pathname ||currentUrl.search !== targetUrl.search
        ) {
          setLoading(true)
          setPercent(20)
        }
      }
    }
    window.addEventListener("click", handleAnchorClick)
    return () => window.removeEventListener("click", handleAnchorClick)
  }, [])
  if (!loading) return null
  return (
    <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#0d0e11]/95 backdrop-blur-md transition-all duration-200">
      <div className="absolute h-72 w-72 rounded-full bg-lime-400/10 blur-[120px] pointer-events-none"></div>
      <div className="relative flex items-center justify-center">
        <div className="h-28 w-28 rounded-full border-2 border-dashed border-lime-400/30 animate-[spin_4s_linear_infinite]"></div>
        <div className="absolute h-20 w-20 rounded-full border-t-2 border-r-2 border-lime-400 animate-spin"></div>
        <div className="absolute flex h-12 w-12 items-center justify-center rounded-2xl bg-[#16181f] border border-lime-400/30 shadow-2xl shadow-lime-400/20 animate-pulse">
          <svg
            className="w-6 h-6 text-lime-400"
            fill="currentColor"
            viewBox="0 0 24 24">
            <path d="M20.57 14.86L22 13.43L20.57 12L17 15.57L8.43 7L12 3.43L10.57 2L9.14 3.43L7.71 2L5.57 4.14L4.14 2.71L2.71 4.14L4.14 5.57L2 7.71L3.43 9.14L2 10.57L3.43 12L7 8.43L15.57 17L12 20.57L13.43 22L14.86 20.57L16.29 22L18.43 19.86L19.86 21.29L21.29 19.86L19.86 18.43L22 16.29L20.57 14.86Z" />
          </svg>
        </div>
      </div>
      <div className="mt-7 flex flex-col items-center">
        <div className="flex items-center gap-2">
          <span className="font-display text-xl font-black uppercase tracking-[0.25em] text-white">LOADING <span className="text-lime-400">....</span>
          </span>
          <span className="rounded-md bg-lime-400/10 px-2 py-0.5 text-xs font-mono font-bold text-lime-400">
            {percent}%{" "}
          </span>
        </div>
        <p className="mt-1 text-[11px] font-bold tracking-[0.2em] uppercase text-gray-400">{" "}Please wait a moment</p>
      </div>
      <div className="mt-5 h-1.5 w-52 overflow-hidden rounded-full bg-white/10 p-[1px]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-lime-500 via-lime-400 to-emerald-300 transition-all duration-120 ease-out shadow-[0_0_12px_#a3e635]"
          style={{ width: `${percent}%` }}
        ></div>
      </div>
    </div>
  )
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#101114] font-sans text-white antialiased">
        <StoreProvider>
          <Suspense fallback={null}>
            <PageLoader />
          </Suspense>
          {children}
          <ToastStack />
        </StoreProvider>
      </body>
    </html>
  )
}