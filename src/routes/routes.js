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
import MyBookings from "../pages/MyBookings";
import AllSellers from "../pages/ManageUsers/AllSellers";
import AllBuyers from "../pages/ManageUsers/AllBuyers";
import Reports from "../pages/Reports";
import Payment from "../pages/Payment";
import ErrorElement from "../pages/ErrorElement";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    // errorElement: <ErrorElement />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "category/:id",
        element: (
          <PrivateRoute>
            <Browse />
          </PrivateRoute>
        ),
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
        path: "all-sellers",
        element: <AllSellers />,
      },
      {
        path: "all-buyers",
        element: <AllBuyers />,
      },
      {
        path: "reports",
        element: <Reports />,
      },
      {
        path: "my-bookings",
        element: <MyBookings />,
      },
      {
        path: "payment/:id",
        element: <Payment />,
      },
      {
        path: "/dashboard/*",
        element: <PageNotFound />,
      },
    ],
  },
]);

export default router;
