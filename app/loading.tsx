export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-bg">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/10 border-t-accent" />
      <p className="text-sm font-bold uppercase tracking-[0.25em] text-gray-500">Loading workouts…</p>
    </div>
  )
}
