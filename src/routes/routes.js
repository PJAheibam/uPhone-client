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
import MyProducts from "../pages/MyProducts";
import ManageUser from "../pages/ManageUsers";
import PrivateRoute from "./PrivateRoute";

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
        path: "category/:id",
        element: <Browse />,
      },
      {
        path: "blog",
        element: <Blog />,
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
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "",
        element: <MyProducts />,
      },
      {
        path: "add-product",
        element: <AddProduct />,
      },
      {
        path: "manage-users",
        element: <ManageUser />,
      },
      {
        path: "/dashboard/*",
        element: <PageNotFound />,
      },
    ],
  },
]);

export default router;
