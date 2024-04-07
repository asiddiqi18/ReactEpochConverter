"use client";

import { DateDisplay } from "./date-display";
import { FormContent } from "./form-content";
import { useState } from "react";

export interface CalendarDate {
  day: string;
  time: string;
  dayOfWeek: string;
}

export const CardContent: React.FC = () => {
  const [formattedDate, setFormattedDate] = useState<CalendarDate>({
    day: "",
    time: "",
    dayOfWeek: "",
  });

  const onFormSubmit = (date: Date, timezone: string) => {
    const day: string = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: timezone,
    }).format(date);

    const time: string = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZone: timezone,
    }).format(date);

    const timeZoneName: string = new Intl.DateTimeFormat("en-US", {
      timeZoneName: "short",
      timeZone: timezone,
    }).format(date);

    const dayOfWeek = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      timeZone: timezone,
    }).format(date);

    setFormattedDate({ day, time, dayOfWeek });
  };

  return (
    <div className="m-6">
      <div className="assistant-regular text-5xl">// Epoch Utility</div>
      <hr className="w-1/2 my-3 border-t border-purple-900"></hr>
      <div className="assistant-regular text-xl">
        Use this tool to convert epoch time to human date.
      </div>
      <div className="flex mt-8">
        <FormContent onSubmit={onFormSubmit} />
        <DateDisplay calendarDate={formattedDate} />
      </div>
    </div>
  );
};
