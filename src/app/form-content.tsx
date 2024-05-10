"use client";

import _ from "lodash";
import { SearchSelect } from "./search-select";
import timezones from "./timezones.json";
import { useEffect, useState } from "react";

interface FormContentProps {
  placeholder: string;
  onSubmit: (date: Date, timezone: string) => void;
}

interface FormState {
  epochNumberInput: string;
  epochStringInput: string;
}

export const FormContent: React.FC<FormContentProps> = ({
  placeholder,
  onSubmit,
}) => {
  const timeZones: string[] = timezones["zones"];

  const [infoMsg, setInfoMsg] = useState<string>("");

  const [formState, setFormState] = useState<FormState>({
    epochNumberInput: "",
    epochStringInput: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, epochNumberInput: event.target.value });
  };

  const handleSelectChange = (value: string) => {
    console.log("Handle", value);
    setFormState({ ...formState, epochStringInput: value });
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
      formState.epochNumberInput === ""
        ? placeholder
        : formState.epochNumberInput;

    let epoch = _.toNumber(formState.epochNumberInput);
    if (formState.epochNumberInput !== "" && epoch < 2000000000) {
      epoch *= 1000;
      setInfoMsg("Epoch converted from seconds to milliseconds.");
      setFormState({ ...formState, epochNumberInput: _.toString(epoch) });
      onSubmit(new Date(epoch), formState.epochStringInput);
    } else {
      setInfoMsg("");
      onSubmit(new Date(parseFloat(selectedDate)), formState.epochStringInput);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
          value={formState.epochNumberInput.toString()}
          onChange={handleNumberChange}
          placeholder={placeholder}
          onWheel={handleWheel}
          autoFocus
        ></input>
      </div>
      <SearchSelect
        label="Time Zone"
        data={timeZones}
        placeholder={formState.epochStringInput}
        onSelect={handleSelectChange}
      />
      <button
        className="w-full md:w-min shadow bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-200 text-white font-bold py-2 px-4 rounded mt-7"
        type="submit"
      >
        Convert
      </button>
      <br></br>
      <div className="mt-5">
        <small className="assistant-light text-gray-600">{infoMsg}</small>
      </div>
    </form>
  );
};
