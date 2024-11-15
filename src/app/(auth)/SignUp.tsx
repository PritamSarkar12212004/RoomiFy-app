import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import NavigationHeader from "@/src/components/navigationHEader/NavigationHeader";
import Feather from "@expo/vector-icons/Feather";
import Fontisto from "@expo/vector-icons/Fontisto";
import { useRouter } from "expo-router";
import { Icons } from "@/src/constants/Icons";
import * as Location from "expo-location";
import Axios from "../../utils/api/Axios";
import Type1Error from "@/src/components/Error/LongError/Type1Error";
import Warning from "@/src/components/Error/LongError/Warning";
import AsyncStorage from "@react-native-async-storage/async-storage";
const SignUp = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const navigation = useRouter();
  const [male, setMale] = useState(false);
  const [female, setFemale] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secure, setsecure] = useState(true);
  const [loading, setLoading] = useState(false);
  const [close, setclose] = useState(false);
  const [closewarning, setclosewarning] = useState(false);
  const tokensaveLocalStorege = async (token: string) => {
    try {
      await AsyncStorage.setItem("token", token);
      navigation.push("/(main)");
    } catch (error) {
      console.log(error);
    }
  };
  const secureFunc = () => {
    setsecure(!secure);
  };
  const validation = () => {
    const gender = () => {
      if (male === true) {
        return "male";
      } else if (female === true) {
        return "female";
      }
    };
    if (
      name === "" ||
      email === "" ||
      password === "" ||
      (male === false && female === false)
    ) {
      setclose(true);
    } else {
      setLoading(true);

      Axios.post("/signup", {
        username: name,
        email,
        password,
        gender: gender(),
        location,
      }).then((res) => {
        if (res.data.status === "success") {
          tokensaveLocalStorege(res.data.token);
        } else {
          setclosewarning(true);
        }

        setLoading(false);
      });
    }
  };
  const genderSelector = (data: string) => {
    if (data === "male") {
      setMale(true);
      setFemale(false);
    } else {
      setFemale(true);
      setMale(false);
    }
  };
  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    }

    getCurrentLocation();
  }, []);
  return (
    <View className="w-full relative ">
      <Type1Error
        close={close}
        setclose={setclose}
        message={"Please fill in the details to create an account."}
      />
      <Warning
        closewarning={closewarning}
        setclosewarning={setclosewarning}
        message={" User already exists. Please log in and try again."}
      />
      <NavigationHeader />

      <View className=" h-full px-7 py-10 gap-14  ">
        <View>
          <Text className="text-4xl text-zinc-700 font-extrabold ">Let`s</Text>
          <Text className="text-4xl text-zinc-700 font-extrabold ">
            Get Started
          </Text>
        </View>
        <View>
          <View className="flex gap-7">
            <Text>Please fill in the details to create an account.</Text>
            <View className="relative">
              <TextInput
                className="w-full h-16 border-[1px] border-zinc-400 rounded-2xl px-5 text-lg"
                placeholder="Enter your name"
                value={name}
                onChangeText={(text) => setName(text)}
              />
              <View className="absolute top-1/2 right-5 -translate-y-1/2">
                <Feather name="user" size={24} color="black" />
              </View>
            </View>
            <View className="relative">
              <TextInput
                value={email}
                onChangeText={(text) => setEmail(text)}
                className="w-full h-16 border-[1px] border-zinc-400 rounded-2xl px-5 text-lg"
                placeholder="Enter your email"
              />
              <View className="absolute top-1/2 right-5 -translate-y-1/2">
                <Fontisto name="email" size={24} color="black" />
              </View>
            </View>
            <View className="relative">
              <TextInput
                value={password}
                onChangeText={(text) => setPassword(text)}
                className="w-full h-16 border-[1px] border-zinc-400 rounded-2xl px-5 text-lg"
                placeholder="Enter your Password"
                secureTextEntry={secure}
              />
              <View className="absolute top-1/2 right-5 -translate-y-1/2">
                <TouchableOpacity onPress={() => secureFunc()}>
                  <Feather name="unlock" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </View>
            <View className="w-full flex flex-row  justify-end">
              <Text className="text-center text-zinc-700 font-bold text-sm">
                Forget Password?
              </Text>
            </View>
            <View className="w-full flex flex-row justify-center gap-10">
              <TouchableOpacity onPress={() => genderSelector("male")}>
                <View
                  className={`px-6 py-4 flex flex-row items-center  rounded-3xl ${
                    male ? "bg-zinc-300" : "bg-zinc-200"
                  }`}
                >
                  <Image source={Icons.male} className="w-6 h-6" />
                  <Text className="text-xl ">Male</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => genderSelector("female")}>
                <View
                  className={`px-6 py-4 flex flex-row items-center  rounded-3xl ${
                    female ? "bg-zinc-300" : "bg-zinc-200"
                  }`}
                >
                  <Image source={Icons.female} className="w-6 h-6" />
                  <Text className="text-xl ">Female</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View className="w-full flex gap-10">
          {loading ? (
            <TouchableOpacity
              className="w-full flex items-center justify-center shadow-black  drop-shadow-lg py-6 mt-5 bg-[#F8EE00] rounded-3xl"
              activeOpacity={0.7}
            >
              <ActivityIndicator size="large" color="#000" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => validation()}
              className="w-full flex items-center justify-center shadow-black  drop-shadow-lg py-6 mt-5 bg-[#F8EE00] rounded-3xl"
              activeOpacity={0.7}
            >
              <Text className="text-xl ">Sign up</Text>
            </TouchableOpacity>
          )}

          <View className="w-full flex items-center justify-center">
            <TouchableOpacity onPress={() => navigation.push("Login")}>
              <Text>
                Alrady have an account!
                <Text className="font-bold text-blue-600">Login</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SignUp;
