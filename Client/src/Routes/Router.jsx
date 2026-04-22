import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import AddBook from "../Pages/AddBook/AddBook";
import AllBooks from "../Pages/AllBooks/AllBooks";
import FeaturedBooks from "../Pages/FeaturedBooks/FeaturedBooks";
import Wishlist from "../Pages/Wishlist/Wishlist";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import UpdateBook from "../Pages/UpdateBook/UpdateBook";
import BookDetails from "../Pages/BookDetails/BookDetails";
import ErrorPage from "../Shared/ErrorPage";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/add-blog",
        element: <PrivateRoute><AddBook /></PrivateRoute>,
      },
      {
        path: "/all-blogs",
        element: <AllBooks />,
      },
      {
        path: "/featured-blogs",
        element: <FeaturedBooks />,
      },
      {
        path: "/wishlist",
        element: (
          <PrivateRoute>
            <Wishlist />
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/blog-details/:id",
        element: <BookDetails />,
      },
      {
        path: "/update-blog/:id",
        element: (
          <PrivateRoute>
            <UpdateBook />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;