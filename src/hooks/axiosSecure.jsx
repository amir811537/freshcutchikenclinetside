// src/hooks/useAxiosSecure.js

import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "https://serversidefreshcut.vercel.app", // adjust as needed
});

export default axiosSecure;
