import { useState } from "react";
import BooksFilter, { DropdownOption, NestedOption } from "./BooksFilter";

// Render the demo component
const Demo = () => {
  const [selectedOption, setSelectedOption] = useState<DropdownOption | null>(
    null
  );
  const [selectedNestedOption, setSelectedNestedOption] =
    useState<NestedOption | null>(null);

  const handleSearch = (value: string) => {
    console.log("Searching for:", value);
  };

  const handleOptionSelect = (option: DropdownOption) => {
    console.log("Selected option:", option.label);
    setSelectedOption(option);
    setSelectedNestedOption(null);
  };

  const handleNestedOptionSelect = (
    parentOption: DropdownOption,
    nestedOption: NestedOption
  ) => {
    console.log(`Selected ${nestedOption.label} under ${parentOption.label}`);
    setSelectedOption(parentOption);
    setSelectedNestedOption(nestedOption);
  };

  return (
    <>
      <BooksFilter
        placeholder="Search products, categories, etc..."
        suggestions={sampleSuggestions}
        dropdownOptions={sampleDropdownOptions}
        onSearch={handleSearch}
        onOptionSelect={handleOptionSelect}
        onNestedOptionSelect={handleNestedOptionSelect}
        defaultSelected={{
          option: selectedOption,
          nestedOption: selectedNestedOption,
        }}
      />

      {/* Preview section */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="text-md font-medium mb-2 text-gray-700">
          Component Preview
        </h3>
        {selectedOption && (
          <div className="mb-2">
            <span className="font-medium text-gray-600">Selected option: </span>
            <span className="text-gray-600">
              {selectedNestedOption
                ? `${selectedOption.label} > ${selectedNestedOption.label}`
                : selectedOption.label}
            </span>
          </div>
        )}
      </div>
    </>
  );
};

// Demo with sample data
const sampleSuggestions = [
  "Apple",
  "Banana",
  "Cherry",
  "Dragon Fruit",
  "Elderberry",
  "Fig",
  "Grape",
  "Honeydew",
  "JavaScript",
  "TypeScript",
  "React",
  "Tailwind CSS",
  "Node.js",
  "Next.js",
  "Redux",
  "GraphQL",
];

const sampleDropdownOptions = [
  {
    id: "1",
    label: "Elektrotehničar informacionih tehnologija",
    nestedOptions: [
      { id: "1-1", label: "I razred" },
      { id: "1-2", label: "II razred" },
      { id: "1-3", label: "III razred" },
      { id: "1-4", label: "IV razred" },
    ],
  },
  {
    id: "2",
    label: "Tehničar mehatronike",
    nestedOptions: [
      { id: "2-1", label: "I razred" },
      { id: "2-2", label: "II razred" },
      { id: "2-3", label: "III razred" },
      { id: "2-4", label: "IV razred" },
    ],
  },
  {
    id: "3",
    label: "Elektrotehničar za elektroniku na vozilima",
    nestedOptions: [
      { id: "3-1", label: "I razred" },
      { id: "3-2", label: "II razred" },
      { id: "3-3", label: "III razred" },
      { id: "3-4", label: "IV razred" },
    ],
  },
  {
    id: "4",
    label: "Tehničar za kompjutersko upravljanje CNC mašina",
    nestedOptions: [
      { id: "4-1", label: "I razred" },
      { id: "4-2", label: "II razred" },
      { id: "4-3", label: "III razred" },
      { id: "4-4", label: "IV razred" },
    ],
  },
  {
    id: "5",
    label: "Tehničar drumskog saobraćaja",
    nestedOptions: [
      { id: "5-1", label: "I razred" },
      { id: "5-2", label: "II razred" },
      { id: "5-3", label: "III razred" },
      { id: "5-4", label: "IV razred" },
    ],
  },
];

export default Demo;
