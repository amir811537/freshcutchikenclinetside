// src/hooks/useAxiosSecure.js

import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "https://freshcutserverside.vercel.app", // adjust as needed
});

export default axiosSecure;
