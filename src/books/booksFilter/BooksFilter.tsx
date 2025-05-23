import { useState, useEffect, useRef } from "react";
import { Search, ChevronDown, X } from "lucide-react";

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
  placeholder?: string;
  suggestions?: string[];
  dropdownOptions?: DropdownOption[];
  onSearch?: (value: string) => void;
  onOptionSelect?: (option: DropdownOption) => void;
  onNestedOptionSelect?: (
    parentOption: DropdownOption,
    nestedOption: NestedOption
  ) => void;
  defaultSelected: {
    option: DropdownOption | null;
    nestedOption: NestedOption | null;
  };
};

export default function BooksFilter({
  placeholder = "Search...",
  suggestions = [],
  dropdownOptions = [],
  onSearch = () => {},
  onOptionSelect = () => {},
  onNestedOptionSelect = () => {},
  defaultSelected = { option: null, nestedOption: null },
}: Props) {
  const [inputValue, setInputValue] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [expandedOptionId, setExpandedOptionId] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<DropdownOption | null>(
    defaultSelected.option || null
  );
  const [selectedNestedOption, setSelectedNestedOption] =
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
    onSearch(value);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setShowSuggestions(false);
    onSearch(suggestion);
  };

  const handleDropdownClick = () => {
    setShowDropdown(!showDropdown);
    setShowSuggestions(false);
  };

  const handleOptionClick = (option: DropdownOption) => {
    if (option.nestedOptions && option.nestedOptions.length > 0) {
      // If option is already selected, clicking again will toggle expand/collapse
      if (selectedOption && selectedOption.id === option.id) {
        setExpandedOptionId(expandedOptionId === option.id ? null : option.id);
      } else {
        // Select the option and expand its nested options
        setSelectedOption(option);
        setSelectedNestedOption(null);
        onOptionSelect(option);
        setExpandedOptionId(option.id);
      }
    } else {
      // For options without nested options, select and close dropdown
      setSelectedOption(option);
      setSelectedNestedOption(null);
      onOptionSelect(option);
      setShowDropdown(false);
    }
  };

  const handleNestedOptionClick = (
    parentOption: DropdownOption,
    nestedOption: NestedOption
  ) => {
    setSelectedOption(parentOption);
    setSelectedNestedOption(nestedOption);
    onNestedOptionSelect(parentOption, nestedOption);
    setShowDropdown(false);
    setExpandedOptionId(null);
  };

  const clearInput = () => {
    setInputValue("");
    onSearch("");
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
              placeholder={placeholder}
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
              {selectedOption ? (
                <span className="mr-1">
                  {selectedNestedOption
                    ? `${SmallerName(selectedOption.label)}: ${SmallerName(
                        selectedNestedOption.label
                      )}`
                    : SmallerName(selectedOption.label)}
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
          <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-72 overflow-auto">
            <ul className="py-1">
              {dropdownOptions.map((option) => (
                <li
                  key={option.id}
                  className="border-b border-gray-100 last:border-b-0"
                >
                  {/* Main dropdown items */}
                  <div
                    onClick={() => handleOptionClick(option)}
                    className={`px-4 py-2 cursor-pointer flex items-center justify-between ${
                      selectedOption && selectedOption.id === option.id
                        ? "bg-blue-100 text-gray-900" // Selected state
                        : "text-gray-700" // Non-selected state
                    }`}
                  >
                    <span>{option.label}</span>
                    {option.nestedOptions &&
                      option.nestedOptions.length > 0 && (
                        <ChevronDown
                          size={16}
                          className={`transition-transform ${
                            expandedOptionId === option.id
                              ? "transform rotate-180"
                              : ""
                          }`}
                        />
                      )}
                  </div>

                  {/* Nested options */}
                  {expandedOptionId === option.id && option.nestedOptions && (
                    <ul className="bg-gray-50 py-1">
                      {option.nestedOptions.map((nestedOption) => (
                        <li
                          key={nestedOption.id}
                          onClick={() =>
                            handleNestedOptionClick(option, nestedOption)
                          }
                          className={`pl-8 pr-4 py-2 cursor-pointer ${
                            selectedNestedOption &&
                            selectedNestedOption.id === nestedOption.id
                              ? "bg-blue-100 text-gray-900" // Selected state
                              : "text-gray-600" // Non-selected state
                          }`}
                        >
                          {nestedOption.label}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
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
