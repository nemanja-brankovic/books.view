import { Link } from "react-router";
import SchoolBadge from "./SchoolBadge";

function School() {
  return (
    <Link to={"test"} className="p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-2xl overflow-hidden transform transition duration-50 hover:scale-105">
        <div className="relative">
          <img
            className="w-full h-64 object-cover"
            src="https://lh3.googleusercontent.com/p/AF1QipN8VMMIpBWsHneI4VidEVKW22f1rhxuDe7Qy6BU=s1360-w1360-h1020"
            alt="School picture"
          />
          <SchoolBadge schoolType="Srednja škola" />
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2 text-gray-800">
            Tehnička škola Pirot
          </h2>
          <div className="flex items-center mb-4">
            <svg
              className="h-5 w-5 text-yellow-500 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <span className="text-gray-600 ml-1">
              Izaberite jedan od 4 smera
            </span>
          </div>
          <div className="flex justify-end">
            <button className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 transition duration-100 ease-in-out">
              Izaberi smer
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default School;
