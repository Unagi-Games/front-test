import { fetchCollection } from "./collection";
import axios from 'axios';



const URL_BASE = 'http://localhost:8001';



const axiosInstance = axios.create({
  baseURL: URL_BASE,

    headers: {
        'Content-Type': 'application/json',
    },

});

export default axiosInstance;