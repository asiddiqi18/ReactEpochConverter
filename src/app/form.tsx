"use client";

import { SearchSelect } from "./search-select";
import timezones from "./timezones.json";
import { useEffect, useRef, useState } from "react";

interface FormState {
  numberInput: string;
  stringSelect: string;
}

interface CalendarDate {
  date: string;
  time: string;
  dayOfWeek: string;
}

export const Form: React.FC = () => {
  const timeZones: string[] = timezones["zones"];

  const [currentEpochTimestampString, setCurrentEpochTimestampString] =
    useState("");
  const [formattedDate, setFormattedDate] = useState<CalendarDate>({
    date: "",
    time: "",
    dayOfWeek: "",
  });

  useEffect(() => {
    const timestamp = Date.now().toString();
    setCurrentEpochTimestampString(timestamp);
  }, []);

  const [formState, setFormState] = useState<FormState>({
    numberInput: "",
    stringSelect: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, numberInput: event.target.value });
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormState({ ...formState, stringSelect: event.target.value });
  };

  const handleSelectChange2 = (value: string) => {
    console.log("Handle", value);
    setFormState({ ...formState, stringSelect: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const selectedDate =
      formState.numberInput === ""
        ? currentEpochTimestampString
        : formState.numberInput;

    const date: string = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: formState.stringSelect,
    }).format(new Date(parseFloat(selectedDate)));

    const time: string = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZone: formState.stringSelect,
    }).format(new Date(parseFloat(selectedDate)));

    const dayOfWeek = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      timeZone: formState.stringSelect,
    }).format(new Date(parseFloat(selectedDate)));

    setFormattedDate({ date, time, dayOfWeek });
  };

  return (
    <div className="m-6">
      <div className="assistant-regular text-5xl">// Epoch Utility</div>
      <hr className="w-1/2 my-3 border-t border-purple-900"></hr>
      <div className="assistant-regular text-xl">
        Use this tool to convert epoch time to human date.
      </div>
      <div className="flex mt-8">
        <form className="w-1/2" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-md mb-2 assistant-semi-bold"
              htmlFor="time stamp"
            >
              Epoch Time Stamp
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="time stamp"
              type="number"
              value={formState.numberInput.toString()}
              onChange={handleNumberChange}
              placeholder={currentEpochTimestampString}
            ></input>
          </div>
          {/* <div className="mb-4">
            <label
              className="block text-gray-700 text-md mb-2 assistant-semi-bold"
              htmlFor="grid-state"
            >
              Time Zone
            </label>
            <div className="relative">
              <select
                className="shadow block appearance-none w-full border rounded text-gray-700 py-3 px-4 pr-8 leading-tight focus:outline-none focus:shadow-outline"
                id="grid-state"
                value={formState.stringSelect}
                onChange={handleSelectChange}
              >
                {timeZones.map((timeZone) => (
                  <option key={timeZone} value={timeZone}>
                    {timeZone}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div> */}
          <SearchSelect
            data={timeZones}
            placeholder={formState.stringSelect}
            onSelect={handleSelectChange2}
          />
          <button
            className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded mt-7"
            type="submit"
          >
            Convert
          </button>
        </form>
        {formattedDate && (
          <div className="w-1/2 flex flex-col mt-[40px] items-center align-middle">
            <div className="assistant-semi-bold text-xl mb-1">
              {formattedDate?.dayOfWeek}
            </div>
            <div className="assistant-bold text-3xl mb-2">
              {formattedDate?.date}
            </div>
            <div className="assistant-semi-bold text-xl">
              {formattedDate?.time}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
