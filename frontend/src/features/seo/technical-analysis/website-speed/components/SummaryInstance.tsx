function SummaryInstance({
  PerformanceSummary,
}: {
  PerformanceSummary: {
    label: string
    score: number
    color: string
    unit: string
  }
}) {
  return (
    <div className='flex flex-row items-center justify-between'>
      <div className='flex items-center text-lg'>
        <div
          className={`mr-2 h-2 w-2 rounded-full bg-${PerformanceSummary.color}`}
        />
        {PerformanceSummary.label}
      </div>
      <div
        className={`text-lg font-semibold`}
        style={{ color: `var(--color-${PerformanceSummary.color})` }}
      >
        {PerformanceSummary.score} {PerformanceSummary.unit}
      </div>
    </div>
  )
}

export default SummaryInstance
