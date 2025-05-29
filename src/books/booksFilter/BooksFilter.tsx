import { useState, useEffect, useRef } from "react";
import { Search, ChevronDown, X } from "lucide-react";
import Dropdown from "./Dropdown";
import useBooksStore, { DropdownOption, NestedOption } from "../store";

export default function BooksFilter() {
  const searchBook = useBooksStore((state) => state.searchBook);
  const selectSchoolMajor = useBooksStore((state) => state.selectSchoolMajor);
  const selectGrade = useBooksStore((state) => state.selectGrade);
  const schoolMajors = useBooksStore((state) => state.schoolMajors);
  const selectedSchoolMajor = useBooksStore((state) => state.selectedSchool);
  const selectedGrade = useBooksStore((state) => state.selectedGrade);
  const books = useBooksStore((state) => state.allBooks);
  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [expandedOptionId, setExpandedOptionId] = useState<string | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);

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

  const handleOptionClick = (schoolMajor: DropdownOption) => {
    if (schoolMajor.nestedOptions && schoolMajor.nestedOptions.length > 0) {
      // If option is already selected, clicking again will toggle expand/collapse
      if (selectedSchoolMajor && selectedSchoolMajor.id === schoolMajor.id) {
        setExpandedOptionId(expandedOptionId === schoolMajor.id ? null : schoolMajor.id);
      } else {
        // Select the option and expand its nested options
        selectSchoolMajor(schoolMajor);
        selectGrade(null);
        searchBook(inputValue, schoolMajor.label, selectedGrade?.label);
        setExpandedOptionId(schoolMajor.id);
      }
    } else {
      // For options without nested options, select and close dropdown
      selectSchoolMajor(schoolMajor);
      selectGrade(null);
      searchBook(inputValue, schoolMajor.label, selectedGrade?.label);
      setShowDropdown(false);
    }
  };

  const handleNestedOptionClick = (
    parentOption: DropdownOption,
    nestedOption: NestedOption
  ) => {
    selectSchoolMajor(parentOption);
    selectGrade(nestedOption);
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
          {schoolMajors.length > 0 && (
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
        {showSuggestions && books.length > 0 && (
          <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
            <ul className="py-1">
              {books.map((book, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(book.title)}
                  className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-gray-700"
                >
                  {book.title}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Dropdown menu */}
        {showDropdown && schoolMajors.length > 0 && (
          <Dropdown
            dropdownOptions={schoolMajors}
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
