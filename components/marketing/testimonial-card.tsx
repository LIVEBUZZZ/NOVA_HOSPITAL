import { Quote } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

export function TestimonialCard({
  item
}: {
  item: {
    name: string;
    quote: string;
    tag: string;
  };
}) {
  return (
    <Card className="h-full">
      <CardContent className="flex h-full flex-col justify-between gap-6 pt-6">
        <Quote className="h-8 w-8 text-cyan-300" />
        <p className="text-base leading-7 text-slate-200">{item.quote}</p>
        <div>
          <p className="font-semibold text-white">{item.name}</p>
          <p className="text-sm text-slate-400">{item.tag}</p>
        </div>
      </CardContent>
    </Card>
  );
}
