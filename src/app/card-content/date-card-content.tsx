"use client";

import { useEffect, useState } from "react";
import { Calendar } from "../calendar";
import { Time, TimePicker } from "../time-picker";
import _ from "lodash";

export const DateCardContent: React.FC = () => {
  const [calendarDate, setCalendarDate] = useState<Date>();
  const [time, setTime] = useState<Time>({
    hour: "0",
    minute: "0",
    useAM: false,
  });
  const [timeStamp, setTimeStamp] = useState<number>();
  const [currentTime, setCurrentTime] = useState<string>();

  useEffect(() => {
    const dateNow = new Date();
    setCalendarDate(dateNow);
    setTime({
      hour: dateNow.getHours().toString(),
      minute: dateNow.getMinutes().toString(),
      useAM: dateNow.getHours() < 12,
    });
    let hours = dateNow.getHours();
    const isAM = hours < 12;
    hours = hours % 12;
    hours = hours ? hours : 12;
    setCurrentTime(
      `${dateNow?.toDateString()} | ${hours}:${dateNow
        .getMinutes()
        .toString()} ${isAM ? "AM" : "PM"}`
    );
  }, []);

  const handleCalendarDatePick = (date: Date) => {
    console.log(date);
    setCalendarDate(date);
  };

  const handleTimeChange = (time: Time) => {
    console.log(time);
    setTime(time);
  };

  const handleSubmit = () => {
    console.log({ calendarDate, time });

    const date = new Date();

    // Set specific time values
    date.setHours(_.toNumber(time.hour));
    date.setMinutes(_.toNumber(time.minute));

    console.log(date.getTime());
    setTimeStamp(date.getTime());
  };

  return (
    <div className="m-6">
      <div className="assistant-regular text-4xl md:text-5xl">
        {`Date to Epoch`}
      </div>
      <hr className="w-full my-3 border-t border-purple-900"></hr>
      <div className="w-full assistant-regular text-md md:text-lg">
        Use this tool to convert human date to epoch time stamp.
      </div>
      <span className="w-full assistant-regular text-sm md:text-base text-gray-700">
        {`Current time: ${currentTime}`}
      </span>
      <div className="flex flex-col md:flex-row mt-8">
        <div className="w-full md:w-1/2">
          <div className="flex flex-col">
            <div className="mb-4">
              <Calendar onDateChange={handleCalendarDatePick} />
            </div>
            <TimePicker onTimeChange={handleTimeChange} />
            <button
              className="w-full md:w-min shadow bg-amber-500 hover:bg-amber-600 active:bg-amber-700 focus:outline-none focus:ring focus:ring-violet-200 text-white font-bold py-2 px-4 rounded mt-7"
              type="submit"
              onClick={handleSubmit}
            >
              Convert
            </button>
          </div>
        </div>
        <div className="w-full md:w-1/2">
          {timeStamp && (
            <div className="flex flex-col mt-[40px] items-center align-middle">
              <div className="assistant-semi-bold text-xl mb-1">Time Stamp</div>
              <div className="assistant-bold text-3xl mb-2">{timeStamp}</div>
              <div className="assistant-semi-bold text-lg">
                Milliseconds since January 01, 1970
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
