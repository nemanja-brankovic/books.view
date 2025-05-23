import { Link } from "react-router";
import SchoolBadge from "../schools/SchoolBadge";

interface Props {
  id: string;
  image: string;
  title: string;
  author: string;
}

function Book({ id, title, author }: Props) {
  return (
    <Link to={id} className="p-4">
      <div className="max-w-md w-64 bg-white rounded-xl shadow-2xl overflow-hidden transform transition duration-150 hover:scale-105">
        <div className="relative">
          <img
            className="w-full h-64 object-cover"
            src="https://www.laguna.rs/_img/korice/6660/knjiga_o_dzungli_v.png"
            alt="School picture"
          />
          <SchoolBadge schoolType="Srednja škola" />
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2 text-gray-800">{title}</h2>
          <div className="flex items-center mb-4">
            <span className="text-gray-600 ml-1">{author}</span>
          </div>
          <div className="flex justify-end">
            <button className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 transition duration-100 ease-in-out">
              Pronadji prodavca
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Book;
