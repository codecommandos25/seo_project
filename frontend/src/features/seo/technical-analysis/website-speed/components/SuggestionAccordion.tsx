import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const gradeColorMap: Record<string, string> = {
  A: 'bg-[var(--color-best)]',
  B: 'bg-[var(--color-good)]',
  C: 'bg-[var(--color-average)]',
  D: 'bg-[var(--color-worst)]',
}

interface Suggestion {
  grade: string
  score: number
  title: string
  description?: string
}

export function SuggestionAccordion({
  suggestions,
}: {
  suggestions: Suggestion[]
}) {
  return (
    <Accordion type='single' className='w-full'>
      {suggestions.map((item, index) => (
        <AccordionItem value={`item-${index}`} key={index}>
          <AccordionTrigger className='px-4 py-3 hover:cursor-pointer hover:no-underline'>
            <div className='flex w-full items-start justify-between gap-4 text-left'>
              {/* Grade + Score */}
              <div className='flex min-w-[64px] items-center gap-2'>
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded text-white ${gradeColorMap[item.grade]} `}
                >
                  {item.grade}
                </span>
                <span className='text-base text-gray-600'>{item.score}</span>
              </div>

              {/* Title */}
              <div className='flex-1 text-base text-gray-600'>{item.title}</div>
            </div>
          </AccordionTrigger>
          {item.description && (
            <AccordionContent className='text-gray1 px-4 pb-4 pt-0 text-base'>
              {item.description}
            </AccordionContent>
          )}
        </AccordionItem>
      ))}
    </Accordion>
  )
}
