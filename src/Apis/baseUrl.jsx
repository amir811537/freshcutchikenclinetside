

import axios from "axios";

const  axiosPublic =axios.create({
    baseURL:'https://freshcutserverside.vercel.app/'
})


const baseURL = () => {
    return axiosPublic;
   
};

export default baseURL;