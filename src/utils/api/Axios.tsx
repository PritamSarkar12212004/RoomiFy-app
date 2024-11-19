import axios from "axios";
const Axios = axios.create({
  baseURL: "https://roomi-fy-app-bakcend.vercel.app",
});
export default Axios;
