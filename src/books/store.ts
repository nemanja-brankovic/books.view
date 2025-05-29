import { create } from "zustand";

export interface BookModel {
    id: string;
    image?: string;
    title: string;
    author: string;
    description?: string;
    schoolMajors: SchoolMajor[];
    year?: number;
}

export type NestedOption = {
    id: string;
    label: string;
};

export type DropdownOption = {
    id: string;
    label: string;
    nestedOptions?: NestedOption[];
};

export interface SchoolMajor {
    id: string;
    image?: string;
    name: string;
    description?: string;
}

interface BooksStore {
    allBooks: BookModel[];
    schoolMajors: DropdownOption[];
    selectedSchool?: DropdownOption;
    selectedGrade?: NestedOption | null;
    selectSchoolMajor: (schoolMajor: DropdownOption) => void;
    selectGrade: (grade: NestedOption | null) => void;
    addBook: (feature: BookModel) => void;
    searchBook: (query: string, schoolMajors?: string, year?: string) => void;
    removeBook: (feature: BookModel) => void;
}

const useBooksStore = create<BooksStore>(set => ({
    allBooks: getBooks(),
    schoolMajors: getSchools(),
    selectSchoolMajor: (schoolMajor: DropdownOption) => set(() => ({
        selectedSchool: schoolMajor
    })),
    selectGrade: (grade: NestedOption | null) => set(() => ({
        selectedGrade: grade
    })),
    addBook: (book: BookModel) => {
        set(state => {
            const updatedFeatures = [...state.allBooks];
            updatedFeatures.push(book);

            return { allBooks: updatedFeatures };
        });
    },
    searchBook: (query: string, schoolMajor?: string, year?: string) => set(() => ({
        allBooks: filterBooks(getBooks(), query, schoolMajor, year)
    })),
    removeBook: (book: BookModel) => set(state => ({ allBooks: state.allBooks.filter(c => c.id !== book.id) }))
}));

export default useBooksStore;

function filterBooks(books: BookModel[], query: string, school?: string, year?: string): BookModel[] {
    return books.filter(book => {
        const matchesQuery = book.title?.toLowerCase()?.includes(query.toLowerCase()) || book.author?.toLowerCase()?.includes(query.toLowerCase());
        const matchesSchool = school ? book.schoolMajors.some(s => s.name === school) : true;
        const matchesYear = year ? book.year?.toString() === year : true;

        return matchesQuery && matchesSchool && matchesYear;
    });
}

function getRandomSchools(): SchoolMajor[] {
    const totalSchools = Math.floor(Math.random() * 3) + 1; // 1 to 3 schools per book
    const schools: SchoolMajor[] = [];

    for (let i = 0; i < totalSchools; i++) {
        const schoolId = Math.floor(Math.random() * 10) + 1; // 1 to 10
        schools.push({
            id: schoolId.toString(),
            name: `School ${schoolId}`
        });
    }

    return schools;
}

function getBooks(): BookModel[] {
    return [
        {
            id: "1",
            title: "1984",
            description: "A dystopian social science fiction novel and cautionary tale",
            author: "George Orwell",
            image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1657781256i/5470.jpg",
            schoolMajors: getRandomSchools(),
            year: Math.floor(Math.random() * 4) + 1
        },
        {
            id: "2",
            title: "To Kill a Mockingbird",
            description: "A story of racial injustice and the loss of innocence",
            author: "Harper Lee",
            image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1553383690i/2657.jpg",
            schoolMajors: getRandomSchools(),
            year: Math.floor(Math.random() * 4) + 1
        },
        {
            id: "3",
            title: "The Great Gatsby",
            description: "A tale of the American Dream and excess in the Jazz Age",
            author: "F. Scott Fitzgerald",
            image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1490528560i/4671.jpg",
            schoolMajors: getRandomSchools(),
            year: Math.floor(Math.random() * 4) + 1
        },
        {
            id: "4",
            title: "Pride and Prejudice",
            description: "A romantic novel of manners",
            author: "Jane Austen",
            image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1320399351i/1885.jpg",
            schoolMajors: getRandomSchools(),
            year: Math.floor(Math.random() * 4) + 1
        },
        {
            id: "5",
            title: "The Hobbit",
            description: "A fantasy novel about the adventures of Bilbo Baggins",
            author: "J.R.R. Tolkien",
            image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1546071216i/5907.jpg",
            schoolMajors: getRandomSchools(),
            year: Math.floor(Math.random() * 4) + 1
        },
        {
            id: "6",
            title: "Dune",
            description: "A science fiction masterpiece about politics and power",
            author: "Frank Herbert",
            image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1555447414i/44767458.jpg",
            schoolMajors: getRandomSchools(),
            year: Math.floor(Math.random() * 4) + 1
        },
        {
            id: "7",
            title: "The Catcher in the Rye",
            description: "A coming-of-age story of teenage alienation",
            author: "J.D. Salinger",
            image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1398034300i/5107.jpg",
            schoolMajors: getRandomSchools(),
            year: Math.floor(Math.random() * 4) + 1
        },
        {
            id: "8",
            title: "The Lord of the Rings",
            description: "An epic high-fantasy trilogy",
            author: "J.R.R. Tolkien",
            image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1566425108i/33.jpg",
            schoolMajors: getRandomSchools(),
            year: Math.floor(Math.random() * 4) + 1
        },
        {
            id: "9",
            title: "Brave New World",
            description: "A dystopian novel about technological control",
            author: "Aldous Huxley",
            image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1575509280i/5129.jpg",
            schoolMajors: getRandomSchools(),
            year: Math.floor(Math.random() * 4) + 1
        },
        {
            id: "10",
            title: "The Alchemist",
            description: "A philosophical novel about following one's dreams",
            author: "Paulo Coelho",
            image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1654371463i/18144590.jpg",
            schoolMajors: getRandomSchools(),
            year: Math.floor(Math.random() * 4) + 1
        },
        {
            id: "11",
            title: "One Hundred Years of Solitude",
            description: "A landmark of magical realism",
            author: "Gabriel García Márquez",
            image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1327881361i/320.jpg",
            schoolMajors: getRandomSchools(),
            year: Math.floor(Math.random() * 4) + 1
        },
        {
            id: "12",
            title: "The Road",
            description: "A post-apocalyptic tale of survival",
            author: "Cormac McCarthy",
            image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1600241424i/6288.jpg",
            schoolMajors: getRandomSchools(),
            year: Math.floor(Math.random() * 4) + 1
        },
        {
            id: "13",
            title: "The Handmaid's Tale",
            description: "A dystopian novel about women's rights",
            author: "Margaret Atwood",
            image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1578028274i/38447.jpg",
            schoolMajors: getRandomSchools(),
            year: Math.floor(Math.random() * 4) + 1
        },
        {
            id: "14",
            title: "The Name of the Wind",
            description: "A fantasy novel about a legendary wizard",
            author: "Patrick Rothfuss",
            image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1270352123i/186074.jpg",
            schoolMajors: getRandomSchools(),
            year: Math.floor(Math.random() * 4) + 1
        },
        {
            id: "15",
            title: "Fahrenheit 451",
            description: "A dystopian novel about censorship",
            author: "Ray Bradbury",
            image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1383718290i/13079982.jpg",
            schoolMajors: getRandomSchools(),
            year: Math.floor(Math.random() * 4) + 1
        },
        {
            id: "16",
            title: "The Picture of Dorian Gray",
            description: "A philosophical novel about beauty and morality",
            author: "Oscar Wilde",
            image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1546103428i/5297.jpg",
            schoolMajors: getRandomSchools(),
            year: Math.floor(Math.random() * 4) + 1
        },
        {
            id: "17",
            title: "The Hunger Games",
            description: "A dystopian novel about survival and rebellion",
            author: "Suzanne Collins",
            image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1586722975i/2767052.jpg",
            schoolMajors: getRandomSchools(),
            year: Math.floor(Math.random() * 4) + 1
        },
        {
            id: "18",
            title: "The Kite Runner",
            description: "A story of friendship, betrayal, and redemption",
            author: "Khaled Hosseini",
            image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1579036753i/77203.jpg",
            schoolMajors: getRandomSchools(),
            year: Math.floor(Math.random() * 4) + 1
        },
        {
            id: "19",
            title: "The Da Vinci Code",
            description: "A mystery thriller involving ancient conspiracies",
            author: "Dan Brown",
            image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1579621267i/968.jpg",
            schoolMajors: getRandomSchools(),
            year: Math.floor(Math.random() * 4) + 1
        },
        {
            id: "20",
            title: "The Girl with the Dragon Tattoo",
            description: "A crime thriller set in Sweden",
            author: "Stieg Larsson",
            image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1327868566i/2429135.jpg",
            schoolMajors: getRandomSchools(),
            year: Math.floor(Math.random() * 4) + 1
        },
        {
            id: "21",
            title: "The Goldfinch",
            description: "A Pulitzer Prize-winning coming-of-age novel",
            author: "Donna Tartt",
            image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1378710146i/17333223.jpg",
            schoolMajors: getRandomSchools(),
            year: Math.floor(Math.random() * 4) + 1
        },
        {
            id: "22",
            title: "Cloud Atlas",
            description: "Six nested stories spanning time and space",
            author: "David Mitchell",
            image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1583686058i/49628.jpg",
            schoolMajors: getRandomSchools(),
            year: Math.floor(Math.random() * 4) + 1
        },
        {
            id: "23",
            title: "The Shadow of the Wind",
            description: "A mystery set in post-war Barcelona",
            author: "Carlos Ruiz Zafón",
            image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1344545047i/1232.jpg",
            schoolMajors: getRandomSchools(),
            year: Math.floor(Math.random() * 4) + 1
        },
        {
            id: "24",
            title: "The Night Circus",
            description: "A magical competition between two illusionists",
            author: "Erin Morgenstern",
            image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1387124618i/9361589.jpg",
            schoolMajors: getRandomSchools(),
            year: Math.floor(Math.random() * 4) + 1
        },
        {
            id: "25",
            title: "American Gods",
            description: "A dark fantasy about old and new gods in America",
            author: "Neil Gaiman",
            image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1258417001i/4407.jpg",
            schoolMajors: getRandomSchools(),
            year: Math.floor(Math.random() * 4) + 1
        },
        {
            id: "26",
            title: "The Book Thief",
            description: "A story narrated by Death during World War II",
            author: "Markus Zusak",
            image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1522157426i/19063.jpg",
            schoolMajors: getRandomSchools(),
            year: Math.floor(Math.random() * 4) + 1
        },
        {
            id: "27",
            title: "The Martian",
            description: "A survival story on Mars",
            author: "Andy Weir",
            image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1413706054i/18007564.jpg",
            schoolMajors: getRandomSchools(),
            year: Math.floor(Math.random() * 4) + 1
        },
        {
            id: "28",
            title: "Gone Girl",
            description: "A psychological thriller about a missing woman",
            author: "Gillian Flynn",
            image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1554086139i/19288043.jpg",
            schoolMajors: getRandomSchools(),
            year: Math.floor(Math.random() * 4) + 1
        },
        {
            id: "29",
            title: "Ready Player One",
            description: "A virtual reality treasure hunt",
            author: "Ernest Cline",
            image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1500930947i/9969571.jpg",
            schoolMajors: getRandomSchools(),
            year: Math.floor(Math.random() * 4) + 1
        },
        {
            id: "30",
            title: "The Silent Patient",
            description: "A psychological thriller about a woman who stops speaking",
            author: "Alex Michaelides",
            image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1668782119i/40097951.jpg",
            schoolMajors: getRandomSchools(),
            year: Math.floor(Math.random() * 4) + 1
        }
    ];
}

function getSchools(): DropdownOption[] {
    return [
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
}