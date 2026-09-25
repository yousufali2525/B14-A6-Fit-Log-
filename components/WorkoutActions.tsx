"use client"
import { useStore } from "@/lib/store"
import type { Workout } from "@/lib/types"
export default function WorkoutActions({ workout }: { workout: Workout }) {
  const { addToPlan, addToSaved, isInPlan, isSaved, planCount } = useStore()
  const inPlan = isInPlan(workout.id)
  const saved = isSaved(workout.id)
  const planFull = planCount >= 5 && !inPlan
  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={() => addToPlan(workout)}
        disabled={planFull || inPlan}
        className="inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wide text-black transition hover:bg-accentDark disabled:cursor-not-allowed disabled:opacity-40"><span>+</span>{inPlan ? "In today's plan" : "Add to today's plan"}
      </button>
      <button
        onClick={() => addToSaved(workout)}
        disabled={saved}
        className="inline-flex items-center gap-2 rounded-md border border-white/20 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:border-white/40 disabled:cursor-not-allowed disabled:opacity-40"><span>☆</span>{saved ? "Saved" : "Save for later"}
      </button>
    </div>
  )
}
