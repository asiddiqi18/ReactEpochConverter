"use client";

import { DateDisplay } from "./date-display";
import { FormContent } from "./form-content";
import { useState } from "react";

interface FormState {
  numberInput: string;
  stringSelect: string;
}

export interface CalendarDate {
  date: string;
  time: string;
  dayOfWeek: string;
}

export const CardContent: React.FC = () => {
  const [formattedDate, setFormattedDate] = useState<CalendarDate>({
    date: "",
    time: "",
    dayOfWeek: "",
  });

  const onFormSubmit = (date: CalendarDate) => {
    setFormattedDate(date);
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
