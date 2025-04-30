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



const router = createBrowserRouter([
    {
      path: '/',
      element: <Mainlayout />,
      children: [
        {
          index: true, // ✅ This makes it the default child route
          element: <Home />
        },
        { 
          path:"/Products",
          element:<AllProduct></AllProduct>
        },
        {
          path:"/contact",
          element:<Contact></Contact>
        },
        {
          path:"/service",
          element:<PrivateRoute><Service></Service></PrivateRoute>
        },
        {
          path:'/productdetail/:id',
          element:<Productdetail></Productdetail>,
          loader:({params})=> fetch(`http://localhost:5000/products/${params.id}`)
        },
        {
          path:'/checkout',
          element:<Checkout></Checkout>,
      
        },
        {
          path:'/notloginRegister',
          element:<NotLoginRegisterUser></NotLoginRegisterUser>
        }
      ]
    }
  ]);
  
export default router;