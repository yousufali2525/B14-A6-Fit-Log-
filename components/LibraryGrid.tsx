"use client"
import type { Workout } from "@/lib/types"
import WorkoutCard from "./WorkoutCard"

export default function LibraryGrid({ workouts }: { workouts: Workout[] }) {
  if (workouts.length === 0) {

    return (
      <p className="py-16 text-center text-gray-500">No workouts found.</p>
    )
  }
  return (
    <div className="mt-8">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {workouts.map((workout) => (
          <WorkoutCard key={workout.id} workout={workout} />

          
        ))}
      </div>
    </div>
  )
}