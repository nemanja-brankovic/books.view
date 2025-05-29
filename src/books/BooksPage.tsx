import Book from "./Book";
import BooksFilter from "./booksFilter/BooksFilter";
import useBooksStore from "./store";

function BooksPage() {
  const books = useBooksStore((state) => state.allBooks);
  return (
    <>
      <div>
        <BooksFilter />
      </div>
      <div className="mt-4 grid gap-y-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-x-6 md:gap-x-6 xl:gap-x-24">
        {books.map((book) => (
          <Book book={book} key={book.id} />
        ))}
      </div>
    </>
  );
}

export default BooksPage;
