import { CalendarDate } from "./card-content";

interface DateProps {
  calendarDate: CalendarDate;
}

export const DateDisplay: React.FC<DateProps> = ({ calendarDate }) => {
  return (
    <>
      {calendarDate && (
        <div className="w-1/2 flex flex-col mt-[40px] items-center align-middle">
          <div className="assistant-semi-bold text-xl mb-1">
            {calendarDate?.dayOfWeek}
          </div>
          <div className="assistant-bold text-3xl mb-2">
            {calendarDate?.date}
          </div>
          <div className="assistant-semi-bold text-xl">
            {calendarDate?.time}
          </div>
        </div>
      )}
    </>
  );
};
