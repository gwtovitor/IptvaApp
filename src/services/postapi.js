import axios from "axios";

const apipost = axios.create({

        baseURL:'http://192.168.1.43:3333/'

})
export default apipost