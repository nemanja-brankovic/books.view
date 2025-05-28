import { useState, useEffect, useRef } from "react";
import { Search, ChevronDown, X } from "lucide-react";
import Dropdown from "./Dropdown";
import useBooksStore from "../store";

export type NestedOption = {
  id: string;
  label: string;
};

export type DropdownOption = {
  id: string;
  label: string;
  nestedOptions?: NestedOption[];
};

type Props = {
  suggestions?: string[];
  dropdownOptions?: DropdownOption[];
  defaultSelected: {
    option: DropdownOption | null;
    nestedOption: NestedOption | null;
  };
};

export default function BooksFilter({
  suggestions = [],
  dropdownOptions = [],
  defaultSelected = { option: null, nestedOption: null },
}: Props) {
  const searchBook = useBooksStore((state) => state.searchBook);
  const [inputValue, setInputValue] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [expandedOptionId, setExpandedOptionId] = useState<string | null>(null);
  const [selectedSchoolMajor, setSelectedOption] =
    useState<DropdownOption | null>(defaultSelected.option || null);
  const [selectedGrade, setSelectedNestedOption] =
    useState<NestedOption | null>(defaultSelected.nestedOption || null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Filter suggestions based on input
  useEffect(() => {
    if (inputValue.trim() === "") {
      setFilteredSuggestions([]);
      return;
    }

    const filtered = suggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredSuggestions(filtered);
  }, [inputValue, suggestions]);

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
        setShowDropdown(false);
        setExpandedOptionId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setShowSuggestions(true);
    searchBook(value, selectedSchoolMajor?.label, selectedGrade?.label);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setShowSuggestions(false);
    searchBook(suggestion);
  };

  const handleDropdownClick = () => {
    setShowDropdown(!showDropdown);
    setShowSuggestions(false);
  };

  const handleOptionClick = (option: DropdownOption) => {
    if (option.nestedOptions && option.nestedOptions.length > 0) {
      // If option is already selected, clicking again will toggle expand/collapse
      if (selectedSchoolMajor && selectedSchoolMajor.id === option.id) {
        setExpandedOptionId(expandedOptionId === option.id ? null : option.id);
      } else {
        // Select the option and expand its nested options
        setSelectedOption(option);
        setSelectedNestedOption(null);
        searchBook(inputValue, option.label, selectedGrade?.label);
        setExpandedOptionId(option.id);
      }
    } else {
      // For options without nested options, select and close dropdown
      setSelectedOption(option);
      setSelectedNestedOption(null);
      searchBook(inputValue, option.label, selectedGrade?.label);
      setShowDropdown(false);
    }
  };

  const handleNestedOptionClick = (
    parentOption: DropdownOption,
    nestedOption: NestedOption
  ) => {
    setSelectedOption(parentOption);
    setSelectedNestedOption(nestedOption);
    searchBook(inputValue, parentOption.label, nestedOption?.label);
    setShowDropdown(false);
    setExpandedOptionId(null);
  };

  const clearInput = () => {
    setInputValue("");
    searchBook("");
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Search container */}
      <div className="relative" ref={searchRef}>
        <div className="bg-white flex items-center border border-gray-300 rounded-lg overflow-hidden">
          {/* Search input */}
          <div className="relative flex-grow flex items-center">
            <div className="absolute left-3 text-gray-400">
              <Search size={18} />
            </div>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onFocus={() => setShowSuggestions(true)}
              className="w-full py-2 pl-10 pr-8 outline-none text-gray-700"
              placeholder="Pretraži knjige..."
            />
            {inputValue && (
              <button
                onClick={clearInput}
                className="absolute right-2 text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Dropdown toggle (only if options exist) */}
          {dropdownOptions.length > 0 && (
            <button
              onClick={handleDropdownClick}
              className="flex items-center px-3 py-2 bg-gray-50 text-gray-700 border-l border-gray-300 hover:bg-gray-100"
            >
              {selectedSchoolMajor ? (
                <span className="mr-1">
                  {selectedGrade
                    ? `${SmallerName(selectedSchoolMajor.label)}: ${SmallerName(
                        selectedGrade.label
                      )}`
                    : SmallerName(selectedSchoolMajor.label)}
                </span>
              ) : (
                "Options"
              )}
              <ChevronDown size={16} className="ml-1" />
            </button>
          )}
        </div>
        {/* Autocomplete suggestions */}
        {showSuggestions && filteredSuggestions.length > 0 && (
          <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
            <ul className="py-1">
              {filteredSuggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-gray-700"
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Dropdown menu */}
        {showDropdown && dropdownOptions.length > 0 && (
          <Dropdown
            dropdownOptions={dropdownOptions}
            expandedOptionId={expandedOptionId}
            handleNestedOptionClick={handleNestedOptionClick}
            handleOptionClick={handleOptionClick}
            selectedOption={selectedSchoolMajor}
            selectedNestedOption={selectedGrade}
          />
        )}
      </div>
    </div>
  );
}

function SmallerName(text: string | undefined): string {
  if (text) {
    return text.substring(0, 15) + "... ";
  }
  return "";
}
