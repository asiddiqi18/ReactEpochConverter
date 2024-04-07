import { useEffect, useRef, useState } from "react";
import Dialog from "./dialog";
import React from "react";

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

  const toggleDialog = () => {
    if (isDialogOpen) {
      closeDialog();
    } else {
      openDialog();
    }
  };

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

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
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
        <div className="flex">
          <input
            className="shadow appearance-none border rounded-l-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            autoComplete="off"
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
          <button
            type="button"
            onClick={() => {
              toggleDialog();
              focusInput();
            }}
            className="bg-purple-400 hover:bg-purple-500 active:bg-purple-600 px-3 rounded-r-lg"
          >
            <img
              src="/icons8-search.svg"
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
        <div className="h-64 overflow-y-scroll pt-3 pb-2 bg-slate-100">
          <ul>
            {filteredResults.map((item, idx) => (
              <React.Fragment key={idx}>
                <li
                  className="cursor-pointer py-1 pl-5 pr-2
                    hover:bg-slate-200 active:bg-slate-300 
                   focus:outline-none focus:ring focus:ring-zinc-300"
                  data-value={item}
                  onClick={onSelection}
                >
                  {item}
                </li>
                <hr />
              </React.Fragment>
            ))}
          </ul>
        </div>
      </Dialog>
    </>
  );
};
