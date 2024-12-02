import axios from "axios";
const Axios = axios.create({
  baseURL: "http://192.168.124.18:3000",
});
export default Axios;
