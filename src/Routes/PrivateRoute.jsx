/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from './../AuthProvider/AuthProvider';

const PrivateRoute = ({children}) => {
    const {loading,user}=useContext(AuthContext);
    const location =useLocation()
    console.log(location)
    if(loading){
        return <span className="loading loading-spinner loading-lg"></span>;
    }
    if(user){
        return children;
    }
    return <Navigate state={location.pathname} to={'/notloginRegister'}></Navigate>
};

export default PrivateRoute;