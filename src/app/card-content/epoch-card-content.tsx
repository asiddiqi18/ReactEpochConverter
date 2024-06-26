"use client";

import { DateDisplay } from "../date-display";
import { FormContent } from "../form-content";
import { useEffect, useState } from "react";

export interface CalendarDate {
  day: string;
  time: string;
  timeZoneName: string;
  dayOfWeek: string;
}

export const EpochCardContent: React.FC = () => {
  const [formattedDate, setFormattedDate] = useState<CalendarDate>({
    day: "",
    time: "",
    timeZoneName: "",
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

    const timeZoneName: string =
      new Intl.DateTimeFormat("en-US", {
        timeZoneName: "short",
        timeZone: timezone,
      })
        .format(date)
        .split(", ")
        .pop() ?? "";

    const dayOfWeek = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      timeZone: timezone,
    }).format(date);

    setFormattedDate({ day, time, dayOfWeek, timeZoneName });
  };

  const [currentEpochTimestampString, setCurrentEpochTimestampString] =
    useState("");

  useEffect(() => {
    const timestamp = Date.now().toString();
    setCurrentEpochTimestampString(timestamp);
  }, []);

  return (
    <div className="m-6">
      <div className="assistant-regular text-4xl md:text-5xl">
        {`Epoch to Date`}
      </div>
      <hr className="w-full my-3 border-t border-purple-900"></hr>
      <div className="w-full assistant-regular text-md md:text-lg">
        Use this tool to convert epoch time to human date.
      </div>
      <span className="w-full assistant-regular text-sm md:text-base text-gray-700">
        {`Current time stamp: ${currentEpochTimestampString}`}
      </span>

      <div className="flex flex-col md:flex-row mt-8">
        <div className="w-full md:w-1/2">
          <FormContent
            placeholder={currentEpochTimestampString}
            onSubmit={onFormSubmit}
          />
        </div>
        <div className="w-full md:w-1/2">
          <DateDisplay calendarDate={formattedDate} />
        </div>
      </div>
    </div>
  );
};
