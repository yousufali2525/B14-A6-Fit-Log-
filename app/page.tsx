import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import LibraryGrid from "@/components/LibraryGrid"
import type { Workout } from "@/lib/types"
async function getWorkouts(): Promise<Workout[]> {

  const response = await fetch("https://api.abcz.workers.dev/api/fitlog", {cache: "no-store",})

  if (!response.ok) {
    throw new Error("Failed to fetch workouts")
  }

  return response.json()
}
export default async function Home() {

  const workouts = await getWorkouts()
  return (

    <>
      <Navbar />
      <main className="min-h-screen bg-bg text-white">
        <div className="mx-auto max-w-7xl px-5 py-6">
          <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-card p-6 md:p-12 lg:p-16">
            <div className="flex flex-col items-center gap-10 lg:flex-row lg:justify-between">
              <div className="max-w-2xl">
                <p className="mb-3 text-sm font-bold tracking-[0.25em] text-accent">WORKOUT LIBRARY</p>
                <h1 className="font-display text-4xl font-black uppercase leading-tight text-white md:text-5xl lg:text-6xl">TRAIN WITH INTENT.<br />LOG EVERY SET.</h1>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-gray-400">FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.</p>
                <a
                
                  href="#library"
                  className="mt-8 inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wide text-black transition hover:bg-accentDark">
                  <span>↓</span>Browse Workouts</a>
              </div>
              <div className="w-full max-w-md lg:w-auto">
                <img
                  src="/banner.png"
                  alt="FitLog Banner"
                  className="h-auto w-full rounded-2xl object-contain"/>
              </div>
            </div>
          </section>
          <section id="library" className="scroll-mt-24 pt-16 pb-12">
            <div className="mb-8">
              <p className="mb-2 text-sm font-bold tracking-[0.25em] text-accent">WORKOUT LIBRARY</p>
              <h2 className="font-display text-4xl font-black uppercase tracking-tight md:text-5xl">THE LIBRARY</h2>
              <p className="mt-2 text-gray-400">Twelve lifts covering every major muscle group.</p>
            </div>
            <LibraryGrid workouts={workouts} />
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}