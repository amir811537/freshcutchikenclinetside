// src/hooks/useAxiosSecure.js

import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000", // adjust as needed
});

export default axiosSecure;
