"use client"
import {createContext,useCallback,useContext,useEffect,useMemo,useState,} from "react"
import type { PlanEntry, Workout } from "./types"
const PLAN_KEY = "fitlog:plan"
const SAVED_KEY = "fitlog:saved"
const PLAN_CAP = 5
type Toast = {
  id: number
  message: string
}
type StoreContextType = {
  plan: PlanEntry[]
  saved: Workout[]
  planCount: number
  savedCount: number
  isInPlan: (id: number) => boolean
  isSaved: (id: number) => boolean
  addToPlan: (workout: Workout) => void
  addToSaved: (workout: Workout) => void
  removeFromPlan: (id: number) => void
  removeFromSaved: (id: number) => void
  markDone: (id: number) => void
  toasts: Toast[]
  showToast: (message: string) => void
  dismissToast: (id: number) => void
}
const StoreContext = createContext<StoreContextType | null>(null)
export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [plan, setPlan] = useState<PlanEntry[]>([])
  const [saved, setSaved] = useState<Workout[]>([])
  const [toasts, setToasts] = useState<Toast[]>([])
  const [hydrated, setHydrated] = useState(false)
  useEffect(() => {
    try {
      const rawPlan = localStorage.getItem(PLAN_KEY)
      const rawSaved = localStorage.getItem(SAVED_KEY)
      if (rawPlan) setPlan(JSON.parse(rawPlan))
      if (rawSaved) setSaved(JSON.parse(rawSaved))
    } catch (e) {
    }
    setHydrated(true)
  }, [])
  useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem(PLAN_KEY, JSON.stringify(plan))} 
      catch (e) {}
  }, [plan, hydrated])
  useEffect(() => {
    if (!hydrated) return
    try {localStorage.setItem(SAVED_KEY, JSON.stringify(saved))} 
    catch (e) {}
  }, [saved, hydrated])
  const dismissToast = useCallback((id: number) => {setToasts((current) => current.filter((t) => t.id !== id))}, [])
  const showToast = useCallback((message: string) => {
    const id = Date.now()
setToasts([{ id, message }])
    setTimeout(() => {setToasts((current) => current.filter((toast) => toast.id !== id))}, 2800)}, [])
  const isInPlan = useCallback((id: number) => plan.some((p) => p.workout.id === id),[plan])
  const isSaved = useCallback((id: number) => saved.some((w) => w.id === id),[saved])
  const addToPlan = useCallback(
    (workout: Workout) => {
      if (plan.some((p) => p.workout.id === workout.id)) {showToast(`${workout.name} is already in today's plan`)
        return
      }
      if (plan.length >= PLAN_CAP) {showToast("Today's plan is full — 5 lifts max")
        return
      }
      setPlan((current) => [...current, { workout, done: false }])
      showToast("Added to today's plan")
    },
    [plan, showToast]
  )
  const addToSaved = useCallback((workout: Workout) => {
      if (saved.some((w) => w.id === workout.id)) {
        showToast(`${workout.name} is already saved`)
        return
      }
      setSaved((current) => [...current, workout])
      showToast("Saved for later")
    },
    [saved, showToast]
  )
  const removeFromPlan = useCallback(
    (id: number) => {
      setPlan((current) => current.filter((p) => p.workout.id !== id))
      showToast("Removed from today's plan")
    },
    [showToast]
  )

  const removeFromSaved = useCallback((id: number) => {
      setSaved((current) => current.filter((w) => w.id !== id))
      showToast("Removed from saved")
    },
    [showToast]
  )
  const markDone = useCallback(
    (id: number) => {
      setPlan((current) =>current.map((p) => p.workout.id === id ? { ...p, done: !p.done } : p))
      showToast("Marked as done")
    },
    [showToast]
  )
  const value = useMemo(() => ({plan,saved,planCount: plan.length,savedCount: saved.length,isInPlan,isSaved,addToPlan,addToSaved,removeFromPlan,removeFromSaved,markDone,toasts,showToast,dismissToast,}),
    [plan,saved,isInPlan,isSaved,addToPlan,addToSaved,removeFromPlan,removeFromSaved,markDone,toasts,showToast,dismissToast,])
  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  )
}
export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error("useStore must be used within StoreProvider")
  return ctx
}
export const PLAN_CAP_SIZE = PLAN_CAP