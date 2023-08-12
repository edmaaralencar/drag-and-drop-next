"use client";

import { formatDate } from "@/lib/date";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  startOfToday,
} from "date-fns";
import { useState } from "react";

export function BigCalendar() {
  const today = startOfToday();
  const [selectedDay, setSelectedDay] = useState(today);
  const [currentMonth, setCurrentMonth] = useState(formatDate(today, "MMM-yyyy"));
  const firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());

  const days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  return (
    <div className="flex flex-col">
      <div className="border border-border rounded-md grid grid-cols-7 gap-2 p-3">
        <span className="text-muted-foreground text-sm">DOM</span>
        <span className="text-muted-foreground text-sm">SEG</span>
        <span className="text-muted-foreground text-sm">TER</span>
        <span className="text-muted-foreground text-sm">QUA</span>
        <span className="text-muted-foreground text-sm">QUI</span>
        <span className="text-muted-foreground text-sm">SEX</span>
        <span className="text-muted-foreground text-sm">SAB</span>
      </div>

      <div className="grid grid-cols-7 border-l border-border">
        {days.map((item) => (
          <div
            key={item.toISOString()}
            className="flex flex-col gap-3 border-border border-r border-b w-full min-h-[120px]"
          >
            <div className="p-2">
              <span className="text-muted-foreground">{formatDate(item, "dd")}</span>
            </div>

            <div className="flex flex-col gap-1">
              {/* <div className="border-l-4 border-primary py-1 px-2 text-sm bg-muted-foreground/10">
                Terminar task X
              </div> */}
              {/* <div className="border-l-4 border-primary py-1 px-2 text-sm bg-muted-foreground/10">
                Terminar task X
              </div> */}
            </div>
          </div>
        ))}
      </div>
      {/* <div className="grid grid-cols-7">
        {[1, 2, 3, 4, 5, 6, 7].map((item) => (
          <div
            key={item}
            className="flex flex-col gap-3 border-border border-r border-b w-full first:border-l"
          >
            <div className="p-2">
              <span className="text-muted-foreground">{item}</span>
            </div>

            <div className="flex flex-col gap-1">
              <div className="border-l-4 border-primary py-1 px-2 text-sm bg-muted-foreground/10">
                Terminar task X
              </div>
              <div className="border-l-4 border-primary py-1 px-2 text-sm bg-muted-foreground/10">
                Terminar task X
              </div>
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
}
