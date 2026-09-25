import { notFound } from "next/navigation"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import WorkoutActions from "@/components/WorkoutActions"
import type { Workout } from "@/lib/types"
async function getWorkout(id: string): Promise<Workout | null> {
  const response = await fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`, {
    cache: "no-store",
  })
  if (!response.ok) return null
  return response.json()
}
export default async function WorkoutDetail({params,}: {params: { id: string }}) {
  const workout = await getWorkout(params.id)
  if (!workout) notFound()
  const specs = [
    { label: "Equipment", value: workout.equipment },
    { label: "Difficulty", value: workout.difficulty },
    { label: "Sets", value: String(workout.sets) },
    { label: "Reps", value: workout.reps },
    { label: "Duration", value: `${workout.duration} min` },
    { label: "Calories", value: `${workout.caloriesBurned} kcal` },
    { label: "Rating", value: String(workout.rating) },
  ]
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bg px-5 py-12 text-white">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-card">
            <img
              src={workout.image}
              alt={workout.name}
              className="h-full w-full object-cover"/>
          </div>
          <div>
            <h1 className="font-display text-3xl font-black uppercase leading-tight text-white md:text-5xl">{workout.name}</h1>
            <p className="mt-4 text-base leading-relaxed text-gray-400">{workout.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {workout.muscleGroups.map((group) => (
                <span
                  key={group}
                  className="rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase text-black">{group}</span> ))}
            </div>
            <div className="mt-8 overflow-hidden rounded-xl border border-white/10">
              {specs.map((spec, i) => (
                <div
                  key={spec.label}
                  className={`flex items-center justify-between px-4 py-3 text-sm ${i % 2 === 0 ? "bg-card" : "bg-[#14161b]"}`}>
                  <span className="font-bold uppercase tracking-wide text-gray-400">
                    {spec.label}
                  </span>
                  <span className="font-semibold text-white">{spec.value}</span>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <h2 className="mb-3 font-display text-lg font-bold uppercase tracking-wide text-white">Instructions</h2>
              <ol className="space-y-3">
                {workout.instructions.map((step, i) => (
                  <li key={i} className="flex gap-3 text-sm text-gray-300">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-black">{i + 1}</span>
                    <span className="pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="mt-8">
              <WorkoutActions workout={workout} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
