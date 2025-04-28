import { createBrowserRouter } from "react-router-dom";
import Mainlayout from "../Layouts/Mainlayout";
import Home from "../Components/pages/Home";
import AllProduct from "../Components/pages/Products/AllProduct";
import Contact from "../Components/pages/Contact/Contact";
import Service from "../Components/pages/Service/Service";
import Productdetail from "../Components/pages/Products/Productdetail";



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
          element:<Service></Service>
        },
        {
          path:'/productdetail',
          element:<Productdetail></Productdetail>
        }
      ]
    }
  ]);
  
export default router;