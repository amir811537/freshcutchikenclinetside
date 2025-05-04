import { createBrowserRouter } from "react-router-dom";
import Mainlayout from "../Layouts/Mainlayout";
import Home from "../Components/pages/Home";
import AllProduct from "../Components/pages/Products/AllProduct";
import Contact from "../Components/pages/Contact/Contact";
import Service from "../Components/pages/Service/Service";
import Productdetail from "../Components/pages/Products/Productdetail";
import PrivateRoute from "./PrivateRoute";
import NotLoginRegisterUser from "../Components/pages/Auth/NotLoginRegisterUser";
import Checkout from "../Components/pages/Checkout/Checkout";
import DashoardLayout from "../Layouts/DashoardLayout";
import Cart from "../Components/DashBoard/Cart";
import SuccessOrder from "../Components/DashBoard/Order/SuccessOrder";
import MyOrder from "../Components/DashBoard/Order/MyOrder/MyOrder";
import UserHome from "../Components/DashBoard/UserHome";
import AddProduct from "../Components/DashBoard/ProductManagement/AddProduct";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Mainlayout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "/Products",
        element: <AllProduct />
      },
      {
        path: "/contact",
        element: <Contact />
      },
      {
        path: "/service",
        element: <PrivateRoute><Service /></PrivateRoute>
      },
      {
        path: '/productdetail/:id',
        element: <Productdetail />,
        loader: ({ params }) => fetch(`http://localhost:5000/products/${params.id}`)
      },
      {
        path: '/checkout',
        element: <PrivateRoute><Checkout /></PrivateRoute>
      },
      {
        path: '/notloginRegister',
        element: <NotLoginRegisterUser />
      }
    ],
  },
  {
    path: "/dashboard",
    element: <PrivateRoute><DashoardLayout /></PrivateRoute>,
    children: [
    {
      path:'cart',
      element:<Cart></Cart>
    },
    {
      path:'order-success',
      element:<SuccessOrder></SuccessOrder>
    },
    {

      path:"myOrders",
      element:<MyOrder></MyOrder>
    },
    {
      path:"userHome",
      element:<UserHome></UserHome>
    },
    {
      path: 'addProduct',
      element: <AddProduct></AddProduct>
    }
    ]
  }
]);

export default router;
