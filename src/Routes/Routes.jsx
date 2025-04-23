import { createBrowserRouter } from "react-router-dom";
import Mainlayout from "../Layouts/Mainlayout";
import Home from "../Components/pages/Home";



const router = createBrowserRouter([
    {
      path: '/',
      element: <Mainlayout />,
      children: [
        {
          index: true, // ✅ This makes it the default child route
          element: <Home />
        }
      ]
    }
  ]);
  
export default router;