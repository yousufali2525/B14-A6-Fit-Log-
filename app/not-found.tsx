import Link from "next/link"
export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-bg px-5 text-center text-white">
      <p className="text-sm font-bold tracking-[0.25em] text-accent">ERROR 404</p>
      <h1 className="mt-3 font-display text-5xl font-black uppercase md:text-7xl">LOST YOUR SPOT</h1>
      <p className="mt-4 max-w-md text-gray-400">That page isn&apos;t in the library. Head back and pick a lift instead.</p>
     <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wide text-black transition hover:bg-accentDark">Back to workouts</Link>
    </main>
  )
}
