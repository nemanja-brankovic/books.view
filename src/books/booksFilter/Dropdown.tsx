import { ChevronDown } from "lucide-react";
import { DropdownOption } from "../store";

interface Props {
  dropdownOptions: DropdownOption[];
  handleOptionClick: (option: DropdownOption) => void;
  handleNestedOptionClick: (
    option: DropdownOption,
    nestedOption: DropdownOption
  ) => void;
  selectedOption: DropdownOption | null | undefined;
  selectedNestedOption: DropdownOption | null | undefined;
  expandedOptionId: string | null;
}

function Dropdown({
  dropdownOptions,
  selectedOption,
  selectedNestedOption,
  expandedOptionId,
  handleOptionClick,
  handleNestedOptionClick,
}: Props) {
  return (
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
              {option.nestedOptions && option.nestedOptions.length > 0 && (
                <ChevronDown
                  size={16}
                  className={`transition-transform ${
                    expandedOptionId === option.id ? "transform rotate-180" : ""
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
  );
}

export default Dropdown;
