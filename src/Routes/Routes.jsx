import { createBrowserRouter } from "react-router-dom";
import Mainlayout from "../Layouts/Mainlayout";
import Home from "../Components/pages/Home";
import AllProduct from "../Components/pages/Products/AllProduct";
import Contact from "../Components/pages/Contact/Contact";



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
          path:"/allProducts",
          element:<AllProduct></AllProduct>
        },
        {
          path:"/contact",
          element:<Contact></Contact>
        }
      ]
    }
  ]);
  
export default router;