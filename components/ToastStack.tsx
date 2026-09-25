
"use client"
import { useStore } from "@/lib/store"
export default function ToastStack() {

  const { toasts, dismissToast } = useStore()
  if (toasts.length === 0) return null

  return (
    <div className="fixed top-20 right-5 z-50 flex w-full max-w-xs sm:max-w-sm flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-center justify-between gap-3 animate-[fadein_0.2s_ease-out] rounded-xl border border-white/10 bg-[#1d1f25] px-4 py-3 text-sm font-medium text-white shadow-xl shadow-black/50">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-lime-400"></span>
            <span>{toast.message}</span>
          </div>
          <button
            onClick={() => dismissToast(toast.id)}
            className="flex h-5 w-5 items-center justify-center rounded-md text-gray-400 hover:bg-white/10 hover:text-white transition cursor-pointer text-xs"title="Close">✕</button>
        </div>
      ))}
    </div>
  )
}
