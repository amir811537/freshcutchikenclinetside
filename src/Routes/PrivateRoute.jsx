/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from './../AuthProvider/AuthProvider';
import Loader from "../Components/Loader/Loader";

const PrivateRoute = ({children}) => {
    const {loading,user}=useContext(AuthContext);
    const location =useLocation()
    // console.log(location)
    if(loading){
        return <div className="flex justify-center items-center">
    <Loader></Loader>
  </div>;
    }
    if(user){
        return children;
    }
    return <Navigate state={location.pathname} to={'/login'}></Navigate>
};

export default PrivateRoute;