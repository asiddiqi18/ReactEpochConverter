import { MouseEventHandler, useEffect, useRef, useState } from "react";
import Dialog from "./dialog";
import ArrowIcon from "./arrow-icon";

interface SearchSelectPros {
  data: string[];
  placeholder: string;
  onSelect: (val: string) => void;
}

export const SearchSelect: React.FC<SearchSelectPros> = ({
  data,
  placeholder,
  onSelect,
}) => {
  const [value, setValue] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogPosition, setDialogPosition] = useState({});
  const [filteredResults, setFilteredResults] = useState<string[]>([]);

  useEffect(() => {
    setFilteredResults(data);
  }, [data]);

  const inputRef = useRef<HTMLInputElement>(null);
  const inputIconRef = useRef<HTMLDivElement>(null);

  const applyFilter = (query: string): void => {
    const adjustedQuery = query.trim().replace(/ /g, "_").toLocaleLowerCase();
    const res = data.filter(
      (timeZone) =>
        timeZone.toLocaleLowerCase().includes(adjustedQuery) ||
        timeZone
          .split("/")
          .some((part) => part.toLocaleLowerCase().includes(adjustedQuery))
    );
    setFilteredResults(res);
  };

  const openDialog = () => {
    setIsDialogOpen(true);
    if (inputRef.current) {
      const inputRect = inputRef.current.getBoundingClientRect();
      setDialogPosition({
        width: inputRect.width,
      });
    }
  };
  const closeDialog = () => setIsDialogOpen(false);

  const onValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query: string = event.target.value;
    setValue(query);
    applyFilter(query);
  };

  const onSelection = (event: React.MouseEvent<HTMLLIElement>) => {
    const selectedValue = event?.currentTarget?.dataset?.value;
    if (selectedValue) {
      onSelect(selectedValue);
      setValue(selectedValue);
      setIsDialogOpen(false);
    }
  };

  return (
    <>
      <div ref={inputIconRef}>
        <label
          className="block text-gray-700 text-md mb-2 assistant-semi-bold"
          htmlFor="time Zone"
        >
          Time Zone
        </label>
        <div className="relative">
          <input
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="time Zone"
            type="text"
            value={value}
            onChange={onValueChange}
            placeholder={placeholder}
            onClick={(e) => {
              openDialog();
              console.log("Opened from clicking input");
            }}
            ref={inputRef}
          ></input>
          <div>
            <ArrowIcon
              flip={isDialogOpen}
              onClick={(e) => {
                if (!isDialogOpen) {
                  openDialog();
                } else {
                  closeDialog();
                }
              }}
            />
          </div>
        </div>
      </div>
      <Dialog
        isOpen={isDialogOpen}
        onClose={closeDialog}
        positionStyle={dialogPosition}
        summonerRef={inputIconRef}
      >
        <div className="h-64 overflow-y-scroll pt-3 pb-2 bg-slate-100">
          <ul>
            {filteredResults.map((item, idx) => (
              <>
                <li
                  className="cursor-pointer py-1 pl-5 pr-2
                    hover:bg-slate-200 active:bg-slate-300 
                   focus:outline-none focus:ring focus:ring-zinc-300"
                  key={idx}
                  data-value={item}
                  onClick={onSelection}
                >
                  {item}
                </li>
                <hr />
              </>
            ))}
          </ul>
        </div>
      </Dialog>
    </>
  );
};
