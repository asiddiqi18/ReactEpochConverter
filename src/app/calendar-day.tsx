import React from "react";

interface FormContentProps {
  day: number;
  onClick?: (index: number) => void;
  isSelected?: boolean;
  isFocused?: boolean;
  isOtherMonth?: boolean;
}

export const CalendarDay: React.FC<FormContentProps> = ({
  day,
  onClick,
  isSelected,
  isFocused,
  isOtherMonth,
}) => {
  if (isSelected || isFocused) {
    return (
      <div
        tabIndex={0}
        className="w-full flex justify-center h-10 items-center assistant-semibold text-sm"
      >
        <div
          className={`h-8 w-8 m-2 rounded-full ${
            isSelected ? "bg-amber-400" : "bg-slate-400"
          } cursor-pointer flex items-center justify-center`}
        >
          <span
            className="text-white leading-tight"
            onClick={() => (onClick ? onClick(day) : undefined)}
          >
            {day}
          </span>
        </div>
      </div>
    );
  }
  return (
    <div
      tabIndex={0}
      className="w-full flex justify-center h-10 items-center assistant-semibold text-sm"
    >
      <div
        onClick={() => (onClick ? onClick(day) : undefined)}
        className="h-8 w-8 m-2 rounded-full hover:bg-slate-200 cursor-pointer flex items-center justify-center"
      >
        <span
          className={`${
            isOtherMonth ? "text-slate-400" : "text-slate-700"
          } leading-tight`}
        >
          {day}
        </span>
      </div>
    </div>
  );
};
