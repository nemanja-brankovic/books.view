import { createBrowserRouter } from "react-router";
import SchoolsPage from "./schools/SchoolsPage";
import MainPage from "./main/MainPage";
import Layout from "./layout/Layout";
import BooksPage from "./books/BooksPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <MainPage /> },
      { path: "/:type/schools/", element: <SchoolsPage /> },
      { path: "/:type/schools/:school/books/", element: <BooksPage /> },
    ],
  },
]);

export default router;
