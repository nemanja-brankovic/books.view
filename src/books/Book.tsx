import { Link } from "react-router";
import SchoolBadge from "../schools/SchoolBadge";
import { BookModel } from "./store";

interface Props {
  book: BookModel;
}

function Book({ book }: Props) {
  const src =
    book.image ||
    "https://www.laguna.rs/_img/korice/6660/knjiga_o_dzungli_v.png";
  return (
    <Link to={book.id} className="p-4">
      <div className="max-w-md w-64 bg-white rounded-xl shadow-2xl overflow-hidden transform transition duration-150 hover:scale-105">
        <div className="relative">
          <img
            className="w-full h-64 object-cover"
            src={src}
            alt="School picture"
          />
          <SchoolBadge schoolType="Srednja škola" />
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2 text-gray-800">
            {book.title}
          </h2>
          <div className="flex items-center mb-4">
            <span className="text-gray-600 ml-1">{book.author}</span>
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
