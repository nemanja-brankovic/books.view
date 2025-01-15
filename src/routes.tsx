import { createBrowserRouter } from "react-router";
import SchoolsPage from "./schools/SchoolsPage";
import MainPage from "./main/MainPage";
import Layout from "./layout/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <MainPage /> },
      { path: "/schools", element: <SchoolsPage /> },
      { path: "/schools/:type", element: <SchoolsPage /> },
    ],
  },
]);

export default router;
