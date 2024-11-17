import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Children,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import Axios from "../utils/api/Axios";
import { router } from "expo-router";
const Context = createContext();
export const ContextProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [data, setdata] = useState(null);
  const [token, setToken] = useState(null);
  const [productID, setProductID] = useState(null);
  const [comment, setComment] = useState(false);
  const [profileData, setProfileData] = useState(null);

  const getProfile = async () => {
    if (token) {
      await Axios.post("/user/profile", token)
        .then((res) => {
          if (res.data.status == "success") {
            profileDataSetter(res.data.data);
          } else {
            console.log("error");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("no token");
    }
  };

  const getData = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      tokenSetter(token);
      if (token) {
        const response = await Axios.post("/list/room", { token });
        dataSetter(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const profileDataSetter = (data) => {
    setProfileData(data);
  };
  const commentSetter = () => {
    setComment(!comment);
    console.log(comment);
  };

  const productIDSetter = (data) => {
    setProductID(data);
  };
  const authSetter = async (data) => {
    setAuth(data);
  };
  const tokenSetter = (data) => {
    setToken(data);
  };
  const dataSetter = (data) => {
    setdata(data);
  };

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        setAuth(true);
      } else {
        setAuth(false);
      }
      tokenSetter(token);
    } catch (error) {
      console.error("Error fetching token:", error);
    }
  };

  const getLogin = async (data: any) => {
    const setToken = await AsyncStorage.setItem("token", data);
    authSetter(true);
    router.replace("/(main)");
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <Context.Provider
      value={{
        auth,
        setAuth,
        data,
        setdata,
        authSetter,
        token,
        setToken,
        tokenSetter,
        dataSetter,
        productIDSetter,
        productID,
        setProductID,
        commentSetter,
        comment,
        profileDataSetter,
        profileData,
        getData,
        getProfile,
        getLogin,
      }}
    >
      {children}
    </Context.Provider>
  );
};
export const userContext = () => useContext(Context);
