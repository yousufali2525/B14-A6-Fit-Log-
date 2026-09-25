import Link from "next/link"
import type { Workout } from "@/lib/types"
export default function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group overflow-hidden rounded-2xl border border-white/10 bg-card transition hover:border-accent/40">
      <div className="overflow-hidden">
        <img
          src={workout.image}

          alt={workout.name}
          className="h-56 w-full object-cover transition duration-300 group-hover:scale-105"/>
      </div>
      <div className="p-5">
        <div className="mb-4 flex flex-wrap gap-2">
          {workout.muscleGroups.map((group) => (
            <span key={group}
              className="rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase text-black">{group}</span>
          ))}
        </div><h3 className="text-xl font-black uppercase text-white">{workout.name}</h3>
        <p className="mt-2 text-sm text-gray-400">{workout.equipment}</p>
        <div className="mt-5 flex flex-wrap gap-4 text-sm text-gray-400">
          <span>◷ {workout.duration} min</span>

          <span>🔥 {workout.caloriesBurned} kcal</span>
          <span>★ {workout.rating}</span>
          
        </div>
      </div>
    </Link>
  )
}
