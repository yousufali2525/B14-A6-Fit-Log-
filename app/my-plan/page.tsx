
"use client"
import { Suspense, useEffect, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { useStore } from "@/lib/store"
type Tab = "plan" | "saved"

export default function MyPlanPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-bg text-white flex items-center justify-center">Loading...</div>}>
      <MyPlanContent />
    </Suspense>
  )
}

function MyPlanContent() {
  const { plan, saved, removeFromPlan, removeFromSaved, markDone } = useStore()
  const searchParams = useSearchParams()
  const initialTab = searchParams.get("tab") === "saved" ? "saved" : "plan"
  const [tab, setTab] = useState<Tab>(initialTab)
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState<string>("duration")



  useEffect(() => {
    const tabParam = searchParams.get("tab")
    if (tabParam === "saved" || tabParam === "plan") {
      setTab(tabParam)
    }
  }, [searchParams])


  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 300)
    return () => clearTimeout(t)
  }, [])


  const exercises = tab === "plan"? plan.length: saved.length
const minutes = tab === "plan"? plan.reduce((sum, p) => sum + (p.workout?.duration || 0), 0): saved.reduce((sum, s: any) => sum + ((s.workout ? s.workout.duration : s.duration) || 0), 0)

  const calories = tab === "plan"? plan.reduce((sum, p) => sum + (p.workout?.caloriesBurned || 0), 0): saved.reduce((sum, s: any) => sum + ((s.workout ? s.workout.caloriesBurned : s.caloriesBurned) || 0), 0)
  const sortList = (items: any[]) => {
    return [...items].sort((a: any, b: any) => {
      const itemA = a.workout || a
      const itemB = b.workout || b


      if (sortBy === "duration") {
        return (itemB.duration ||0)-(itemA.duration ||0)
      }
      if (sortBy === "calories") {
        return (itemB.caloriesBurned ||0)-(itemA.caloriesBurned ||0)
      }
      if (sortBy === "rating") {
        return (itemB.rating ||0)-(itemA.rating ||0)
      }
      return 0
    })
  }

  const displayPlan = sortList(plan)
  const displaySaved = sortList(saved)
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#101114] px-5 py-12 text-white">
        <div className="mx-auto max-w-5xl">
          <h1 className="font-display text-4xl font-black uppercase md:text-5xl"> MY PLAN</h1>
          <p className="mt-3 text-gray-400">Cap of five lifts for today. Finish them, then load more.</p>
          <div className="mt-8 grid grid-cols-3 gap-4">
            <StatCard label="Exercises" value={exercises} />
            <StatCard label="Minutes" value={minutes} />
            <StatCard label="Calories" value={calories} />
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div className="flex gap-2">
              <TabButton active={tab === "plan"} onClick={() => setTab("plan")}>Today&apos;s Plan</TabButton>
              <TabButton active={tab === "saved"} onClick={() => setTab("saved")}>Saved</TabButton>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span>Sort By</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-lg border border-white/10 bg-[#16181d] px-3 py-1.5 text-xs font-semibold text-white outline-none cursor-pointer">
                <option value="duration">Duration</option>
                <option value="calories">Calories</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>
          <div className="mt-6">
            {loading ? (
              <p className="py-16 text-center text-sm font-bold uppercase tracking-wide text-gray-500">Loading workouts…</p>
            ) : tab === "plan" ? (
              displayPlan.length === 0 ? (
                <EmptyState message="Your today's plan is empty. Browse the library to add lifts!" />
              ) : (
                <div className="flex flex-col gap-4">
                  {displayPlan.map((entry) => (
                    <PlanCard
                      key={entry.workout.id}
                      image={entry.workout.image}
                      title={entry.workout.name}
                      equipment={entry.workout.equipment}
                      duration={entry.workout.duration}
                      calories={entry.workout.caloriesBurned}
                      rating={entry.workout.rating}
                      href={`/workout/${entry.workout.id}`}
                      done={entry.done}
                      onDone={() => markDone(entry.workout.id)}
                      onRemove={() => removeFromPlan(entry.workout.id)}/>
                  ))}
                </div>
              )

            ) : displaySaved.length === 0 ? (
              <EmptyState message="No workouts saved yet. Browse the library and save your favorites!" />
            ) : (
              <div className="flex flex-col gap-4">
                {displaySaved.map((item: any) => {
                  const workout = item.workout || item
                  return (
                    <PlanCard
                      key={workout.id}
                      image={workout.image}
                      title={workout.name}
                      equipment={workout.equipment}
                      duration={workout.duration}
                      calories={workout.caloriesBurned}
                      rating={workout.rating}
                      href={`/workout/${workout.id}`}
                      onRemove={() => removeFromSaved(workout.id)} />
                  )

                })}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#16181d] px-4 py-5 text-center">
      <p className="font-display text-3xl font-black text-accent">
        {value}
      </p>

      <p className="mt-1 text-xs font-bold uppercase tracking-wide text-gray-400">{label}</p>
    </div>
  )
}
function TabButton({active,onClick,children,}
  : {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {

  return (
    <button
      onClick={onClick}
      className={`rounded-lg px-4 py-2 text-xs font-bold uppercase tracking-wide transition cursor-pointer ${active? "bg-[#252830] text-white shadow":"text-gray-400 hover:text-white"}`}>{children}
    </button>
  )
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-white/10 bg-[#16181d] px-6 py-16 text-center">
      <h3 className="font-display text-2xl font-black uppercase text-white">NOTHING HERE YET</h3>
      <p className="mt-2 max-w-sm text-sm text-gray-400"> {message}</p>
      <Link

        href="/#library"
        className="mt-6 inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wide text-black transition hover:bg-accentDark">Go to workouts</Link>
    </div>
  )
}
function PlanCard({image,title,equipment,duration,calories,rating,href,done,onDone,onRemove,}
  : {

  image: string
  title: string
  equipment: string
  duration: number
  calories: number
  rating: number
  href: string
  done?: boolean
  onDone?: () => void
  onRemove: () => void
}) {
  
  return (
    <div
      className={`flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#16181d] p-4 sm:flex-row sm:items-center ${done ? "opacity-60" : ""}`}>
      <img
        src={image || "/placeholder.jpg"}
        alt={title}
        className="h-20 w-full rounded-xl object-cover sm:w-28"/>
      <div className="flex-1">
        <h3 className="font-display text-base font-black uppercase text-white">{title}</h3>
        <p className="text-xs text-gray-400">{equipment}</p>
        <div className="mt-2 flex flex-wrap gap-4 text-xs text-gray-400">
          <span>◷ {duration} min</span>
          <span>🔥 {calories} kcal</span>
          <span>★ {rating}</span>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Link
          href={href}
          className="rounded-lg border border-white/20 bg-[#20232a] px-3.5 py-1.5 text-xs font-semibold text-white transition hover:bg-white/10">View Details</Link>
        {onDone && (
          <button
            onClick={onDone}
            className="rounded-lg bg-accent px-3 py-1.5 text-xs font-bold uppercase text-black transition hover:bg-accentDark cursor-pointer">✓ {done ? "Done" : "Mark Done"}</button>
        )}
        <button
          onClick={onRemove}
          className="p-2 text-gray-400 hover:text-red-400 transition cursor-pointer"title="Remove">✕</button>
      </div>
    </div>
  )
}
