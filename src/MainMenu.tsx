import { useEffect, useRef, useState } from "react";

function MainMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent): void => {
    const target = event.target as Node;
    if (
      menuRef.current &&
      !menuRef.current.contains(target) &&
      !menuRef.current.isEqualNode(target)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* Hamburger Button */}
      <button
        className="flex items-center justify-center w-16 h-16 rounded-md hover:bg-teal-400"
        onClick={toggleMenu}
      >
        {isOpen ? (
          <span
            className="block w-16 h-16 flex items-center justify-center"
            aria-label="Close menu"
          >
            <span className="absolute block w-12 h-2 bg-white rounded transform rotate-45 transition-all"></span>
            <span className="absolute block w-12 h-2 bg-white rounded transform -rotate-45 transition-all"></span>
          </span>
        ) : (
          <span
            className="relative block w-12 h-12 flex flex-col items-center justify-center"
            aria-label="Open menu"
          >
            <span className="block w-12 h-2 bg-white rounded mb-2 transition-transform hover:scale-110"></span>
            <span className="block w-12 h-2 bg-white rounded mb-2 transition-transform hover:scale-110"></span>
            <span className="block w-12 h-2 bg-white rounded transition-transform hover:scale-110"></span>
          </span>
        )}
      </button>

      {/* Menu Items */}
      {isOpen && (
        <div className="absolute w-200 left-0 mt-2 bg-gray-800 text-white rounded-md shadow-lg">
          <ul className="p-2  space-y-2 ">
            <li className="whitespace-nowrap hover:bg-gray-700 rounded p-2 cursor-pointer break-inside-avoid-column">
              O Sajtu
            </li>
            <li className="hover:bg-gray-700 rounded p-2 cursor-pointer">
              Kontakt
            </li>
            <li className="hover:bg-gray-700 rounded p-2 cursor-pointer">
              Primedbe
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default MainMenu;
