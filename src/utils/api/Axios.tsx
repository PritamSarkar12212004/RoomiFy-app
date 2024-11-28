import axios from "axios";
const Axios = axios.create({
  baseURL: "http://192.168.43.61:3000",
});
export default Axios;
