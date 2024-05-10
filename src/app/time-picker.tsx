import _ from "lodash";
import { ChangeEvent, useEffect, useState } from "react";

export type Time = {
  hour: string;
  minute: string;
  useAM: boolean;
};

interface TimePickerProps {
  onTimeChange: (time: Time) => void;
}

export const TimePicker: React.FC<TimePickerProps> = ({ onTimeChange }) => {
  const [useAM, setUseAM] = useState<boolean>(true);
  const [hour, setHour] = useState<string>("12");
  const [minute, setMinute] = useState<string>("0");

  function handleHourChange(event: ChangeEvent<HTMLInputElement>): void {
    const val = event.target.value;
    if (val === "") {
      setHour("");
      return;
    }
    if (val.length > 2) {
      return;
    }
    setHour(val);
    onTimeChange({ hour: val, minute, useAM });
  }

  function handleMinuteChange(event: ChangeEvent<HTMLInputElement>): void {
    const val = event.target.value;
    if (val === "") {
      setMinute("");
      return;
    }
    if (val.length > 2) {
      return;
    }
    setMinute(val);
    onTimeChange({ hour, minute: val, useAM });
  }

  function handleSetUseAM(useAM: boolean): void {
    setUseAM(useAM);
    onTimeChange({ hour, minute, useAM });
  }

  useEffect(() => {
    const todaysDate = new Date();

    let hours = todaysDate.getHours();
    const isAM = hours < 12;
    hours = hours % 12;
    hours = hours ? hours : 12;

    setHour(hours.toString());
    setMinute(todaysDate.getMinutes().toString());
    setUseAM(isAM);
    onTimeChange({
      hour: hours.toString(),
      minute: todaysDate.getMinutes().toString(),
      useAM: isAM,
    });
  }, []);

  return (
    <div className="items-center">
      <label
        className="block text-gray-700 text-md mb-2 assistant-semi-bold"
        htmlFor="time picker"
      >
        {"Time"}
      </label>
      <div className="flex flex-wrap items-center gap-3">
        <input
          id="time picker"
          placeholder="12"
          min={1}
          minLength={0}
          maxLength={2}
          max={12}
          type="number"
          onChange={handleHourChange}
          value={hour}
          className="text-center placeholder-center w-auto text-lg shadow appearance-none border rounded-lg py-[11px] px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        ></input>
        <div className="text-2xl assistant-bold">:</div>
        <input
          placeholder="00"
          min={0}
          maxLength={2}
          max={59}
          type="number"
          onChange={handleMinuteChange}
          value={minute}
          className="mr-3 text-center placeholder-center w-auto text-lg shadow appearance-none border rounded-lg py-[11px] px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        ></input>
        <div className="flex items-center h-full">
          <button
            onClick={() => handleSetUseAM(true)}
            className={`${
              useAM ? "bg-amber-700" : "bg-amber-400"
            } h-1/2 rounded-l-lg w-14 shadow hover:bg-amber-600 active:bg-amber-700 focus:outline-none focus:ring focus:ring-amber-200 text-white font-bold py-2 px-4`}
          >
            AM
          </button>
          <button
            onClick={() => handleSetUseAM(false)}
            className={`${
              !useAM ? "bg-amber-700" : "bg-amber-400"
            } h-1/2 rounded-r-lg w-14 shadow hover:bg-amber-600 active:bg-amber-700 focus:outline-none focus:ring focus:ring-amber-200 text-white font-bold py-2 px-4`}
          >
            PM
          </button>
        </div>
      </div>
    </div>
  );
};
