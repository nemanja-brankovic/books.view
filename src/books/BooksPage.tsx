import Book from "./Book";
import BooksFilter from "./booksFilter/BooksFilter";
import Demo from "./booksFilter/Demo";

function BooksPage() {
  return (
    <>
      <div>
        <Demo />
      </div>
      <div className="mt-4 grid gap-y-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-x-6 md:gap-x-6 xl:gap-x-24">
        <Book id="132" title="test" author="test" image="test" key={1} />
        <Book id="132" title="test" author="test" image="test" key={2} />
        <Book id="132" title="test" author="test" image="test" key={3} />
        <Book id="132" title="test" author="test" image="test" key={4} />
        <Book id="132" title="test" author="test" image="test" key={5} />
        <Book id="132" title="test" author="test" image="test" key={6} />
        <Book id="132" title="test" author="test" image="test" key={7} />
      </div>
    </>
  );
}

export default BooksPage;
