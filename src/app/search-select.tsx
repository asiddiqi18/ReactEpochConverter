import { useEffect, useRef, useState } from "react";
import Dialog from "./dialog";
import React from "react";

const MINIMUM_LENGTH_TO_SEARCH = 3;

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
  const [activeSelectionIndex, setActiveSelectionIndex] = useState<number>(-1);
  const [dialogPosition, setDialogPosition] = useState({});
  const [filteredResults, setFilteredResults] = useState<string[]>([]);

  useEffect(() => {
    setFilteredResults(data);
  }, [data]);

  const inputRef = useRef<HTMLInputElement>(null);
  const inputIconRef = useRef<HTMLDivElement>(null);

  const applyFilter = (query: string): void => {
    if (query?.length < MINIMUM_LENGTH_TO_SEARCH) {
      return;
    }
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
    updateValue(query);
  };

  const updateValue = (newValue: string) => {
    setValue(newValue);
    applyFilter(newValue);
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

  const handleDownKeyForStringInput = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "ArrowDown") {
      event.preventDefault(); // This stops the scrolling
      if (!filteredResults) {
        return;
      }
      setActiveSelectionIndex(0);
      if (event.currentTarget) {
        inputRef.current?.blur();
      }
      const inputElement = document.getElementById(`timezone-0`);
      if (inputElement) inputElement.focus();
    }
  };

  const getBoldedFormat = (item: string) => {
    if (!value || value.length < 3) {
      return <span>{item}</span>;
    }

    const adjustedQuery = value.trim().replace(/ /g, "_").toLocaleLowerCase();
    const adjustedItem = item.toLocaleLowerCase();

    const index = adjustedItem.indexOf(adjustedQuery);

    if (index === -1) {
      return <span>{item}</span>;
    }

    const start = item.slice(0, index);
    const middle = item.slice(index, index + adjustedQuery.length);
    const end = item.slice(index + adjustedQuery.length);
    return (
      <div className="inline">
        <span>{start}</span>
        <span className="font-bold">{middle}</span>
        <span>{end}</span>
      </div>
    );
  };

  const handleDownKeyForList = (event: React.KeyboardEvent<HTMLLIElement>) => {
    event.preventDefault(); // This stops the scrolling
    if (event.key === "Enter") {
      const newSelection = filteredResults[activeSelectionIndex];
      onSelect(newSelection);
      setValue(newSelection);
      closeDialog();
      return;
    }
    if (event.key === "Escape") {
      closeDialog();
      return;
    }
    let newSelectionIndex;
    if (event.key === "ArrowDown") {
      newSelectionIndex = Math.min(
        activeSelectionIndex + 1,
        filteredResults.length - 1
      );
    } else if (event.key === "ArrowUp") {
      if (activeSelectionIndex === 0) {
        inputRef.current?.focus();
        return;
      }
      newSelectionIndex = activeSelectionIndex - 1;
    } else {
      if (/^[a-zA-Z]$/.test(event.key)) {
        inputRef.current?.focus();
        updateValue(value + event.key);
      }
      return;
    }
    setActiveSelectionIndex(newSelectionIndex);
    const inputElement = document.getElementById(
      `timezone-${newSelectionIndex}`
    );
    if (inputElement) inputElement.focus();
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
            }}
            onKeyDown={handleDownKeyForStringInput}
            ref={inputRef}
            spellCheck={false}
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
        <div className="h-64 overflow-y-scroll pt-2 pb-2 bg-slate-100">
          <ul>
            {filteredResults.map((item, index) => (
              <React.Fragment key={item}>
                <li
                  id={`timezone-${index}`}
                  tabIndex={0}
                  className="cursor-pointer py-1 pl-5 pr-2
                    hover:bg-slate-200 active:bg-slate-300 
                   focus:outline-none focus:ring focus:bg-zinc-300 focus:ring-zinc-400"
                  data-value={item}
                  onClick={onSelection}
                  onKeyDown={handleDownKeyForList}
                >
                  {getBoldedFormat(item)}
                </li>
              </React.Fragment>
            ))}
          </ul>
        </div>
      </Dialog>
    </>
  );
};
