import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer/Footer";
import Navbar from "../Components/Navbar/Navbar";

const Mainlayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className="pt-20"> {/* Add top padding here to push content below the navbar */}
                <Outlet />
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Mainlayout;