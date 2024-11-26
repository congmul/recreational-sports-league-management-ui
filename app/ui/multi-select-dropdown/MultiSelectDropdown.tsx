import React, { useState } from "react";

interface Option {
    value: string;
    id: string;
  }
  
interface MultiSelectDropdownProps {
    options: Option[]
    onSelect: (value: Option[]) => void;
  }

const MultiSelectDropdown = ({ options, onSelect }: MultiSelectDropdownProps) => {
    const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };


  const toggleOption = (option: Option) => {
    const isSelected = selectedOptions.find((selected) => selected.id === option.id);
    if (isSelected) {
        const data = selectedOptions.filter((selected) => selected.id !== option.id);
        setSelectedOptions(data);
        onSelect(data);
    } else {
      setSelectedOptions([...selectedOptions, option]);
      onSelect([...selectedOptions, option]);
    }
  };

  return (
    <div className="relative">
      {/* Dropdown Button */}
      <button
        type="button"
        onClick={toggleDropdown}
        className="w-full bg-white border border-gray-300 rounded-md shadow-sm p-2 flex justify-between items-center focus:outline-none focus:ring focus:ring-blue-300"
      >
        <div className="flex flex-wrap gap-1 h-[23px]">
          {selectedOptions.length > 0 ? (
              <span
                className="bg-indigo-500 text-white px-2 py-1 rounded-md text-sm"
              >
                + {selectedOptions.length}
              </span>
          ) : (
            <span className="text-gray-500 text-sm text-gray-700 hover:bg-gray-100 ">Select options</span>
          )}
        </div>
        <svg
          className={`w-5 h-5 text-gray-500 transform transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Options */}
      {isOpen && (
        <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto">
          {options.map((option) => (
            <li
              key={option.id}
              className="px-4 py-2 cursor-pointer text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              onClick={() => toggleOption(option)}
            >
              <input
                type="checkbox"
                checked={selectedOptions.some((selected) => selected.id === option.id)}
                onChange={() => toggleOption(option)}
                className="mr-2"
              />
              {option.value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MultiSelectDropdown;