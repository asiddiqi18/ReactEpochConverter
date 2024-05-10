import { ChangeEvent, useEffect, useRef, useState } from "react";
import Dialog from "./dialog";
import React from "react";
import { CalendarDay } from "./calendar-day";
import { KeyboardEvent } from "react";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const abbreviatedDaysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];

export interface CalendarProps {
  onDateChange: (date: Date) => void;
}

export const Calendar: React.FC<CalendarProps> = ({ onDateChange }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogPosition, setDialogPosition] = useState({});

  const [lastMonthDayStart, setLastMonthDayStart] = useState<number>(0);
  const [firstDayOfWeekInMonth, setFirstDayOfWeekInMonth] = useState<number>(0);
  const [numberOfDaysInMonth, setNumberOfDaysInMonth] = useState<number>(0);
  const [numberOfRowsForMonth, setNumberOfRowsForMonth] = useState<number>(0);
  const [monthAndYearDisplay, setMonthAndYearDisplay] = useState<string>("");
  const [selectedDateValue, setSelectedDateValue] = useState<string>("");
  const [focusedDateValue, setFocusedDateValue] = useState<Date>();

  const [validDate, setValidDate] = useState<boolean>(true);

  const [currentMonth, setCurrentMonth] = useState<number>(0);
  const [currentYear, setCurrentYear] = useState<number>(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const inputIconRef = useRef<HTMLDivElement>(null);

  const openDialog = () => {
    setIsDialogOpen(true);
    if (inputRef.current) {
      const inputRect = inputRef.current.getBoundingClientRect();
      setDialogPosition({
        width: inputRect.width,
      });
    }
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setFocusedDateValue(undefined);
  };

  const toggleDialog = () => {
    if (isDialogOpen) {
      closeDialog();
    } else {
      openDialog();
    }
  };

  function getDateNDaysAgo(date: Date, n: number): Date {
    const currentDate = new Date(date);
    const previousDate = new Date(
      currentDate.getTime() - n * 24 * 60 * 60 * 1000
    );
    return previousDate;
  }

  const calendarComputeStartAndEnd = () => {
    const newStartDate = new Date(currentYear, currentMonth);

    newStartDate.setDate(1);

    // Get the day of the week (0 for Sunday, 1 for Monday, ..., 6 for Saturday)
    const firstDayOfWeekOfMonth = newStartDate.getDay();
    const firstDayOfMonth = getDateNDaysAgo(
      newStartDate,
      firstDayOfWeekOfMonth
    );
    setLastMonthDayStart(firstDayOfMonth.getDate());
    setFirstDayOfWeekInMonth(firstDayOfWeekOfMonth);
    setMonthAndYearDisplay(
      newStartDate.toLocaleString("default", { month: "long", year: "numeric" })
    );

    const newEndDate = new Date(currentYear, currentMonth);

    newEndDate.setMonth(newEndDate.getMonth() + 1);
    newEndDate.setDate(0);

    setNumberOfDaysInMonth(newEndDate.getDate());
    setNumberOfRowsForMonth(
      Math.ceil((newEndDate.getDate() + firstDayOfWeekOfMonth) / 7)
    );
  };

  const prevMonth = () => {
    setCurrentMonth(currentMonth - 1);
  };

  const nextMonth = () => {
    setCurrentMonth(currentMonth + 1);
  };

  useEffect(() => {
    const todaysDate = new Date();
    setCurrentMonth(todaysDate.getMonth());
    setCurrentYear(todaysDate.getFullYear());
    setSelectedDateValue(
      todaysDate.toLocaleString("default", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    );
  }, []);

  useEffect(() => {
    calendarComputeStartAndEnd();
  }, [currentMonth, currentYear, focusedDateValue]);

  function clickPrevMonthDay(index: number): void {
    handleClickDay(new Date(currentYear, currentMonth - 1, index));
    setCurrentMonth(currentMonth - 1);
  }

  function clickCurrentMonthDay(index: number): void {
    handleClickDay(new Date(currentYear, currentMonth, index));
  }

  function clickNextMonthDay(index: number): void {
    handleClickDay(new Date(currentYear, currentMonth + 1, index));
    setCurrentMonth(currentMonth + 1);
  }

  function handleClickDay(date: Date): void {
    setSelectedDateValue(
      date.toLocaleString("default", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    );
    onDateChange(date);
    closeDialog();
  }

  const isSelectedCell = (index: number): boolean => {
    const parsedDate = new Date(selectedDateValue);

    return (
      !isNaN(parsedDate.getTime()) &&
      parsedDate.getDate() - 1 === index &&
      currentMonth === parsedDate.getMonth() &&
      currentYear === parsedDate.getFullYear()
    );
  };

  function isFocusedCell(index: number): boolean | undefined {
    return (
      focusedDateValue &&
      focusedDateValue.getDate() - 1 === index &&
      currentMonth === focusedDateValue.getMonth() &&
      currentYear === focusedDateValue.getFullYear()
    );
  }

  function stringToDate(event: ChangeEvent<HTMLInputElement>): void {
    const dateString = event.target.value;
    setSelectedDateValue(dateString);

    if (dateString.length < 6) {
      return;
    }

    const parsedDate = new Date(dateString);

    updateSelectedDate(parsedDate);
  }

  function updateSelectedDate(date: Date) {
    if (isNaN(date.getTime())) {
      setValidDate(false);
      return;
    }

    setValidDate(true);
    setCurrentMonth(date.getMonth());
    setCurrentYear(date.getFullYear());
    onDateChange(date);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>): void {
    let focus;
    if (!focusedDateValue) {
      if (selectedDateValue) {
        focus = new Date(selectedDateValue);
      } else {
        focus = new Date();
      }
    } else {
      focus = new Date(focusedDateValue);
    }

    if (!focus) {
      return;
    }

    if (event.key === "ArrowUp") {
      focus.setDate(focus.getDate() - 7);
    } else if (event.key === "ArrowDown") {
      focus.setDate(focus.getDate() + 7);
    } else if (event.key === "ArrowLeft") {
      focus.setDate(focus.getDate() - 1);
    } else if (event.key === "ArrowRight") {
      focus.setDate(focus.getDate() + 1);
    } else if (event.key === "Enter") {
      handleClickDay(focus);
    } else {
      return;
    }

    setFocusedDateValue(focus);

    setCurrentMonth(focus.getMonth());
    setCurrentYear(focus.getFullYear());
  }

  return (
    <>
      <div ref={inputIconRef}>
        <label
          className="block text-gray-700 text-md mb-2 assistant-semi-bold"
          htmlFor="input search"
        >
          {"Calendar"}
        </label>
        <div className="flex">
          <input
            className={`${validDate ? "" : "border-red-500"} ${
              isDialogOpen ? "rounded-tl-lg" : "rounded-l-lg"
            } shadow appearance-none border rounded-tl-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            autoComplete="off"
            id="input search"
            type="text"
            onChange={stringToDate}
            value={selectedDateValue}
            onClick={() => {
              openDialog();
            }}
            ref={inputRef}
            spellCheck={false}
          ></input>
          <button
            type="button"
            onClick={() => {
              toggleDialog();
            }}
            className="bg-amber-400 hover:bg-amber-500 active:bg-amber-600 px-3 rounded-r-lg"
          >
            <img
              src={isDialogOpen ? "/arrow_up_icon.svg" : "/arrow_down_icon.svg"}
              alt="Search icon by Icons8"
              className="h-6"
            />
          </button>
        </div>
      </div>
      <Dialog
        isOpen={isDialogOpen}
        onClose={closeDialog}
        positionStyle={dialogPosition}
        summonerRef={inputIconRef}
      >
        <div
          tabIndex={0}
          className="bg-slate-100 mt-[78px]"
          onKeyDown={handleKeyDown}
        >
          <div className="flex justify-between items-center p-3">
            <div className="assistant-semi-bold">{monthAndYearDisplay}</div>
            <div>
              <button
                className="bg-amber-400 hover:bg-amber-500 active:bg-amber-600 px-2 rounded-l-lg mr-1"
                onClick={prevMonth}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5 8.25 12l7.5-7.5"
                  />
                </svg>
              </button>
              <button
                className="bg-amber-400 hover:bg-amber-500 active:bg-amber-600 px-2 rounded-r-lg"
                onClick={nextMonth}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className={`grid grid-cols-7 grid-rows-${numberOfRowsForMonth}`}>
            {daysOfWeek.map((day, index) => (
              <div
                key={`day-of-week-${day}`}
                className="bg-amber-200 border-b-2 flex items-center justify-center h-10 assistant-light"
              >
                <span className="lg:hidden">
                  {abbreviatedDaysOfWeek[index]}
                </span>
                <span className="hidden lg:inline">{day}</span>
              </div>
            ))}
            {Array.from({ length: firstDayOfWeekInMonth }, (_, index) => (
              <CalendarDay
                key={`prev-month-${index}`}
                day={lastMonthDayStart + index}
                onClick={clickPrevMonthDay}
                isOtherMonth
              />
            ))}
            {Array.from({ length: numberOfDaysInMonth }, (_, index) => (
              <CalendarDay
                key={`current-month-${index}`}
                isSelected={isSelectedCell(index)}
                isFocused={isFocusedCell(index)}
                onClick={clickCurrentMonthDay}
                day={index + 1}
              />
            ))}
            {Array.from(
              {
                length:
                  numberOfRowsForMonth * 7 -
                  numberOfDaysInMonth -
                  firstDayOfWeekInMonth,
              },
              (_, index) => (
                <CalendarDay
                  key={`next-month-${index}`}
                  day={index + 1}
                  onClick={clickNextMonthDay}
                  isOtherMonth
                />
              )
            )}
          </div>
          <div className="h-3"></div>
        </div>
      </Dialog>
    </>
  );
};
