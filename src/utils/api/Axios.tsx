import axios from "axios";
const Axios = axios.create({
  baseURL: "http://192.168.1.3:3000",
});
export default Axios;
