
function SummaryInstance({PerformanceSummary}: { PerformanceSummary: {label:string, score: number, color: string, unit: string } }) {
  return (
    <div className="flex flex-row justify-between items-center ">
        <div className="text-lg flex items-center ">
            <div className={`w-2 h-2 mr-2  rounded-full bg-${PerformanceSummary.color}`} />
            {PerformanceSummary.label}
        </div>
        <div className={`text-lg font-semibold`}
        style={{color: `var(--color-${PerformanceSummary.color})`}}
        >
            {PerformanceSummary.score} {PerformanceSummary.unit}
        </div>
    </div>
  )
}

export default SummaryInstance