import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Home from "../pages/Home";
import Blog from "../pages/Blog";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PageNotFound from "../pages/PageNotFound";
import Browse from "../pages/Browse";
import DashboardLayout from "../layout/Dashboard.layout";
import Loading from "../components/Loading";
import AddProduct from "../pages/AddProduct";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "category/:name",
        element: <Browse />,
      },
      {
        path: "blog",
        element: <Loading />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "/*",
        element: <PageNotFound />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <Loading />,
      },
      {
        path: "add-product",
        element: <AddProduct />,
      },
      {
        path: "/dashboard/*",
        element: <PageNotFound />,
      },
    ],
  },
]);

export default router;
