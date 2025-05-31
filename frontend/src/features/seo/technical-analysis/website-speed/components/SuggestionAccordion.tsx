import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
  
  const gradeColorMap: Record<string, string> = {
    A: "bg-[var(--color-best)]",
    B: "bg-[var(--color-good)]",
    C: "bg-[var(--color-average)]",
    D: "bg-[var(--color-worst)]",
  };
  
  interface Suggestion {
    grade: string;
    score: number;
    title: string;
    description?: string;
  }
  
  export function SuggestionAccordion({ suggestions }: { suggestions: Suggestion[] }) {
    return (
      <Accordion type="single" className="w-full ">
        {suggestions.map((item, index) => (
          <AccordionItem value={`item-${index}`} key={index}>
            <AccordionTrigger className="px-4 py-3 hover:no-underline hover:cursor-pointer">
              <div className="flex items-start justify-between w-full gap-4 text-left">
                {/* Grade + Score */}
                <div className="flex items-center gap-2 min-w-[64px]">
                  <span
                    className={`text-white    w-7 h-7 flex justify-center items-center rounded ${gradeColorMap[item.grade]} `}
                  >
                    {item.grade}
                  </span>
                  <span className=" text-gray-600 text-base">{item.score}</span>
                </div>
  
                {/* Title */}
                <div className="flex-1    text-gray-600 text-base">{item.title}</div>
              </div>
            </AccordionTrigger>
            {item.description && (
              <AccordionContent className="px-4 pb-4 pt-0  text-gray1 text-base">
                {item.description}
              </AccordionContent>
            )}
          </AccordionItem>
        ))}
      </Accordion>
    );
  }
  