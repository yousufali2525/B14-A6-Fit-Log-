"use client"
export type SortKey = "duration" | "caloriesBurned" | "rating"
const options: { key: SortKey; label: string }[] = [
  { key: "duration", label: "Duration" },
  { key: "caloriesBurned", label: "Calories" },
  { key: "rating", label: "Rating" },
]
export default function SortDropdown({value,onChange,}
  : {
  value: SortKey
  onChange: (key: SortKey) => void
}) {
  return (
    <div className="relative inline-block">
      <label className="sr-only" htmlFor="sort-by">Sort by</label>
      <select id="sort-by"value={value}onChange={(e) => onChange(e.target.value as SortKey)}
        className="appearance-none rounded-lg border border-white/15 bg-card px-4 py-2 pr-9 text-sm font-bold uppercase tracking-wide text-white outline-none transition hover:border-white/30 focus:border-accent">
        {options.map((opt) => (
          <option key={opt.key} value={opt.key}>Sort By: {opt.label}</option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">▾</span>
    </div>
  )
}
