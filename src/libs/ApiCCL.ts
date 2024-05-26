import axios from "axios";

const ApiCCL = axios.create({
    baseURL: process.env.NEXT_PUBLIC_CCL_API,
    headers: {
        'Accept': 'application/json',
    },
    withCredentials: true,
});

export default ApiCCL;