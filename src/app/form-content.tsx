"use client";

import { CalendarDate } from "./card-content";
import { SearchSelect } from "./search-select";
import timezones from "./timezones.json";
import { useEffect, useRef, useState } from "react";

interface FormContentProps {
  onSubmit: (date: CalendarDate) => void;
}

interface FormState {
  numberInput: string;
  stringSelect: string;
}

export const FormContent: React.FC<FormContentProps> = ({ onSubmit }) => {
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

  const handleSelectChange = (value: string) => {
    console.log("Handle", value);
    setFormState({ ...formState, stringSelect: value });
  };

  const handleWheel = (event: any) => {
    event.target.blur();
    event.stopPropagation();
    setTimeout(() => {
      event.target.focus();
    }, 0);
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

    onSubmit({ date, time, dayOfWeek });
  };

  return (
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
          onWheel={handleWheel}
        ></input>
      </div>
      <SearchSelect
        data={timeZones}
        placeholder={formState.stringSelect}
        onSelect={handleSelectChange}
      />
      <button
        className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded mt-7"
        type="submit"
      >
        Convert
      </button>
    </form>
  );
};
