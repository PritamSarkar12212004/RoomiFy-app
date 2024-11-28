import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import NavigationHeader from "@/src/components/navigationHEader/NavigationHeader";
import Feather from "@expo/vector-icons/Feather";
import Fontisto from "@expo/vector-icons/Fontisto";
import { useRouter } from "expo-router"; // Only use useRouter for navigation
import Type1Error from "@/src/components/Error/LongError/Type1Error";
import Warning from "@/src/components/Error/LongError/Warning";
import Axios from "../../utils/api/Axios";
import { userContext } from "../../context/Context";
const Login = () => {
  const { getLogin } = userContext();
  const [close, setclose] = useState(false);
  const [closewarning, setclosewarning] = useState(false);
  const router = useRouter(); // Corrected navigation hook
  const [phone, setPhone] = useState(null);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const phoneValidation = (phone) => {
    // Check if phone contains any non-numeric characters or dots
    const regex = /^[0-9]*$/; // Allows numeric characters or an empty string

    if (typeof phone !== "string") {
      return;
    }

    if (!regex.test(phone)) {
      return;
    }

    if (phone.length > 10) {
      return;
    }

    // Allow empty string to clear the input
    setPhone(phone); // Update phone state if valid
  };
  const validationPass = (pass) => {
    setPassword(pass);
  };

  const callBackend = async () => {
    setLoading(true); // Set loading to true before starting the request
    try {
      const res = await Axios.post("/login", { phone, password });
      if (res.data.status === "success") {
        getLogin(res.data.token);
      } else {
        setMessage(res.data.message);
        setclosewarning(true);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setMessage("An error occurred. Please try again.");
      setclosewarning(true);
    } finally {
      setLoading(false);
    }
  };

  const validation = () => {
    if (phone && password) {
      callBackend();
    } else {
      setclose(true);
    }
  };

  return (
    <View className="w-full">
      <NavigationHeader />
      <Type1Error
        close={close}
        setclose={setclose}
        message={"Please fill in the details to login."}
      />
      <Warning
        closewarning={closewarning}
        setclosewarning={setclosewarning}
        message={message}
      />
      <View className="h-full px-7 py-10 gap-14">
        <View>
          <Text className="text-4xl text-zinc-700 font-extrabold">Hey,</Text>
          <Text className="text-4xl text-zinc-700 font-extrabold">
            Welcome Back
          </Text>
        </View>
        <View className="flex gap-8">
          <Text>Please login to continue</Text>
          <View className="relative">
            <TextInput
              value={phone}
              onChangeText={(phone) => phoneValidation(phone)}
              className="w-full h-16 border-[1px] border-zinc-400 rounded-2xl px-5 text-lg"
              placeholder="Enter your phone number"
              keyboardType="phone-pad" // Use phone-pad for phone number input
            />
            <View className="absolute top-1/2 right-5 -translate-y-1/2">
              <Fontisto name="phone" size={24} color="black" />
            </View>
          </View>
          <View className="relative">
            <TextInput
              value={password}
              onChangeText={(pass) => validationPass(pass)}
              secureTextEntry // Secure input for password
              className="w-full h-16 border-[1px] border-zinc-400 rounded-2xl px-5 text-lg"
              placeholder="Enter your password"
            />
            <View className="absolute top-1/2 right-5 -translate-y-1/2">
              <Feather name="unlock" size={24} color="black" />
            </View>
          </View>
          <View className="w-full flex flex-row justify-end">
            <Text className="text-center text-zinc-700 font-bold text-sm">
              Forgot Password?
            </Text>
          </View>
        </View>
        <View className="w-full flex gap-10">
          {loading ? (
            <TouchableOpacity
              className="w-full flex items-center justify-center shadow-black drop-shadow-lg py-6 mt-5 bg-blue-500 rounded-3xl"
              activeOpacity={0.7}
            >
              <ActivityIndicator size="large" color="#000" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={validation}
              className="w-full flex items-center justify-center shadow-black drop-shadow-lg py-6 mt-5 bg-blue-500 rounded-3xl"
              activeOpacity={0.7}
            >
              <Text className="text-xl text-white">Login</Text>
            </TouchableOpacity>
          )}

          <View className="w-full flex items-center justify-center">
            <TouchableOpacity onPress={() => router.push("/SignUp")}>
              <Text>
                Don't have an account?
                <Text className="font-bold text-blue-600"> Sign up</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Login;
