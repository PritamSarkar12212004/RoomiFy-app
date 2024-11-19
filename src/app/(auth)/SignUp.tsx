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
import { router, useRouter } from "expo-router";
import { Icons } from "@/src/constants/Icons";
import * as Location from "expo-location";
import Axios from "../../utils/api/Axios";
import Type1Error from "@/src/components/Error/LongError/Type1Error";
import Warning from "@/src/components/Error/LongError/Warning";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userContext } from "../../context/Context";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
const SignUp = () => {
  const { tokenSetter } = userContext();
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const navigation = useRouter();
  const [male, setMale] = useState(false);
  const [female, setFemale] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState(null);
  const [password, setPassword] = useState("");
  const [secure, setsecure] = useState(true);
  const [loading, setLoading] = useState(false);
  const [close, setclose] = useState(false);
  const [closewarning, setclosewarning] = useState(false);
  const getlocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  }; 
  const phoneValidation = (phone) => {
    // Check if phone contains any non-numeric characters or dots
    const regex = /^[0-9]*$/; // Allows numeric characters or an empty string

    if (typeof phone !== "string") {
      alert("Phone number must be a string.");
      return;
    }

    if (!regex.test(phone)) {
      alert(
        "Phone number can only contain numeric characters and no dots or special characters."
      );
      return;
    }

    if (phone.length > 10) {
      alert("Phone number must be between 10 to 15 digits.");
      return;
    }

    // Allow empty string to clear the input
    setPhone(phone); // Update phone state if valid
  };
  const tokensaveLocalStorege = async (token: string) => {
    try {
      await AsyncStorage.setItem("token", token);
      tokenSetter(token);
      router.replace("/(main)");
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
      phone === null ||
      password === "" ||
      (male === false && female === false)
    ) {
      setclose(true);
    } else if (location === null) {
      setErrorMsg("Please allow location access");
      alert("Please allow location access");
      return;
    } else {
      setLoading(true);

      Axios.post("/signup", {
        username: name,
        phone,
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
    async function getCurrentLocation() {}

    getlocation();
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
                value={phone}
                onChangeText={(phone) => phoneValidation(phone)}
                className="w-full h-16 border-[1px] border-zinc-400 rounded-2xl px-5 text-lg"
                placeholder="Enter your phone number"
                keyboardType="numeric"
              />
              <View className="absolute top-1/2 right-5 -translate-y-1/2">
                <Fontisto name="phone" size={24} color="black" />
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
            <View className="flex items-center justify-center px-10">
              <TouchableOpacity
                onPress={() => getlocation()}
                className="w-full flex flex-row items-center justify-center gap-2 border-[1px] border-blue-400 rounded-3xl py-4"
              >
                <FontAwesome5 name="location-arrow" size={24} color="blue" />
                <Text className="text-xl ">Current Location</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View className="w-full flex gap-10">
          {loading ? (
            <TouchableOpacity
              className="w-full flex items-center justify-center shadow-black  drop-shadow-lg py-6  bg-blue-500 rounded-3xl"
              activeOpacity={0.7}
            >
              <ActivityIndicator size="large" color="#000" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => validation()}
              className="w-full flex items-center justify-center shadow-black  drop-shadow-lg py-6  bg-blue-500 rounded-3xl"
              activeOpacity={0.7}
            >
              <Text className="text-xl text-white ">Sign up</Text>
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
