import { createBrowserRouter } from "react-router";
import SchoolsPage from "./schools/SchoolsPage";
import MainPage from "./main/MainPage";
import Layout from "./layout/Layout";
import MajorsPage from "./schoolMajors/MajorsPage";
import BooksPage from "./books/BooksPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <MainPage /> },
      { path: "/:type/schools/", element: <SchoolsPage /> },
      { path: "/:type/schools/:school/books/", element: <BooksPage /> },
      { path: "/:type/schools/:school/majors/", element: <MajorsPage /> },
    ],
  },
]);

export default router;
