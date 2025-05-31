import { Card, CardContent } from "@/components/ui/card";

const statusColorMap: Record<string, string> = {
  best: "var(--color-best)",
  good: "var(--color-good)",
  average: "var(--color-average)",
  worst: "var(--color-worst)",
};

interface MetricProps {
  metric: {
    title: string;
    description: string;
    value: string;
    status: "best" | "good" | "average" | "worst";
  };
}

export function MetricInstance({ metric }: MetricProps) {
  const barColor = statusColorMap[metric.status];

  return (
    <Card className="p-2 relative rounded-none rounded-r-lg bg-[#f9f7ff] border-none h-[130px]" 
    style={{ 
        borderLeft: `5px solid ${barColor}` }}>

      <CardContent className="pl-4 h-full flex flex-col justify-center">
        <div>
            <div className="text-lg text-gray1">{metric.title}</div>
            <div className=" text-muted-foreground ">{metric.description}</div>
        </div>
        <div className="text-xl font-semibold mt-2" style={{ color: barColor }}>
          {metric.value}
        </div>
      </CardContent>
    </Card>
  );
}
