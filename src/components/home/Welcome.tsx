import Hero from "./Hero";

export default function Welcome() {
  return (
    <div className="relative">
      <Hero/>

      <div className="w-full px-4 py-2 flex justify-end absolute left-0 bottom-0">
        <span className="text-sm font-semibold opacity-50 select-none">@mdmahikaishar</span>
      </div>
    </div>
  )
}