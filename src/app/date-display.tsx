import { CalendarDate } from "./card-content/epoch-card-content";

interface DateProps {
  calendarDate: CalendarDate;
}

export const DateDisplay: React.FC<DateProps> = ({ calendarDate }) => {
  return (
    <>
      {calendarDate && (
        <div className="flex flex-col mt-[40px] items-center align-middle">
          <div className="assistant-semi-bold text-xl mb-1">
            {calendarDate?.dayOfWeek}
          </div>
          <div className="assistant-bold text-3xl mb-2">
            {calendarDate?.day}
          </div>
          <div className="assistant-semi-bold text-xl">
            {calendarDate?.time}{" "}
            {calendarDate.timeZoneName ? `(${calendarDate?.timeZoneName})` : ""}
          </div>
        </div>
      )}
    </>
  );
};
