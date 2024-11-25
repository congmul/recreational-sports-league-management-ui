import { capitalizeFirstLetter } from "@/app/lib/utils";
import React, { useState, useRef } from "react";

interface DropdownProps {
  label: string;
  options: string[];
  onSelect: (value: string) => void;
}

const DropdownWithJump: React.FC<DropdownProps> = ({
  label,
  options,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1); // Highlighted item index
  const listRef = useRef<HTMLUListElement | null>(null);

  const handleOptionClick = (option: string) => {
    onSelect(option);
    setIsOpen(false);
    setHighlightIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!isOpen) return;

    if (e.key === "Escape") {
      setIsOpen(false); // Close dropdown on Escape
      return;
    }

    if (e.key === "Enter" && highlightIndex !== -1) {
      // Select the highlighted item on Enter
      handleOptionClick(options[highlightIndex]);
      return;
    }

    if (e.key === "ArrowDown") {
      // Navigate down
      setHighlightIndex((prevIndex) =>
        prevIndex < options.length - 1 ? prevIndex + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      // Navigate up
      setHighlightIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : options.length - 1
      );
    } else {
      // Jump to the first option starting with the typed key
      const lowerKey = e.key.toLowerCase();
      const newIndex = options.findIndex((option) =>
        option.toLowerCase().startsWith(lowerKey)
      );
      if (newIndex !== -1) setHighlightIndex(newIndex);
    }

    // Scroll the highlighted item into view
    if (listRef.current) {
      const listItem = listRef.current.children[highlightIndex] as HTMLElement;
      if (listItem) listItem.scrollIntoView({ block: "nearest" });
    }
  };

  return (
    <div
      className="relative inline-block w-full"
      tabIndex={0} // Make the div focusable
      onKeyDown={handleKeyDown}
    >
      {/* Dropdown Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="h-[42px] inline-flex p-2 justify-between item-center w-full rounded-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <span>{label}</span>
        <svg
          className={`-mr-1 ml-2 h-5 w-5 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <ul
          ref={listRef}
          className="absolute z-10 mt-2 w-full rounded-md bg-white ring-1 ring-black ring-opacity-5 max-h-40 overflow-y-auto"
          role="menu"
        >
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => handleOptionClick(option)}
              className={`cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 ${
                index === highlightIndex ? "bg-blue-500 text-white" : ""
              }`}
              role="menuitem"
            >
              {capitalizeFirstLetter(option)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownWithJump;