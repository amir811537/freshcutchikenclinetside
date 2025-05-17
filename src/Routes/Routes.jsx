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
import ProductList from "../Components/DashBoard/ProductManagement/ProductLIst";
import AdminHome from "../Components/DashBoard/AdminHome";
import ManageOrder from "../Components/DashBoard/Order/ManageOrder/ManageOrder";
import UpdateProduct from "../Components/DashBoard/ProductManagement/UpdateProduct";
import Usermanagement from "../Components/DashBoard/Usermanagement/Usermangemet";
import OrderHistory from "../Components/DashBoard/Order/OrderHistory/OrderHistory";
import UpdateBanner from "../Components/DashBoard/BannerManagement/UpdateBanner";
import AddBanner from "../Components/DashBoard/BannerManagement/AddBanner";
import Login from "../Components/pages/Auth/Login";
import Signup from "../Components/pages/Auth/Signup";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Mainlayout />,
    errorElement:<NotLoginRegisterUser></NotLoginRegisterUser>,
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
        loader: ({ params }) => fetch(`https://freshcutserverside.vercel.app/products/${params.id}`)
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

      path:"manageOrders",
      element:<ManageOrder></ManageOrder>
    },{
path:"order-history",
element:<OrderHistory></OrderHistory>
    },
    {
      path:"userHome",
      element:<UserHome></UserHome>
    },
    {
      path:"adminHome",
      element:<AdminHome></AdminHome>
    },
    {
      path: "addBanner",
      element:<AddBanner></AddBanner>

    },
    {
path: "updateBanner",
element:<UpdateBanner></UpdateBanner>
    },
    {
      path: 'addProduct',
      element: <AddProduct></AddProduct>
    },
    {
      path:"allProduct",
      element:<ProductList></ProductList>
    },
    {
      path: "updateProduct/:id", // ✅ FIXED
      element: <UpdateProduct />,
      loader: ({ params }) => fetch(`https://freshcutserverside.vercel.app/products/${params.id}`)
    },
    {
      path:"manageUser",
      element:<Usermanagement></Usermanagement>
    }
    ]
  },      {
path: "login",
element:<Login></Login>
      },
      {
        path: "signUp",
        element:<Signup></Signup>
      }
  
]);

export default router;
