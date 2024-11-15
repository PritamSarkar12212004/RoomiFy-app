import {
  View,
  Text,
  Image,
  StatusBar,
  Button,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { BackGrondImage } from "@/src/constants/BackGroundImage";
import { useNavigation, useRouter } from "expo-router";
import Header from "@/src/components/Header/Header";

const wallcome = () => {
  const navigation = useRouter();
  return (
    <>
      <SafeAreaView className="w-full h-screen  px-16 flex items-center justify-center  ">
        <View className="w-full h-full flex  pt-36">
          <View className="w-full flex items-center justify-start">
            <Image
              source={BackGrondImage.autBg}
              className="w-96 h-96"
              resizeMode="cover"
            />
          </View>
          <View className="w-full flex items-center justify-start gap-24">
            <View className="w-full flex gap-4 items-center">
              <Text className="text-4xl font-extrabold text-zinc-800 ">
                HurryUp!
              </Text>
              <Text className="text-center font-bold text-sm opacity-60 ">
                Ghar Jaisa Kamra, Ghar Jaisa Tiffin, Har Din Ki Shuruaat Ho
                Aasaan, Aapke Liye Har Pal Ho Khushiyaan!
              </Text>
            </View>
            <View className="w-full flex items-center justify-center">
              <TouchableOpacity
                onPress={() => navigation.push("Login")}
                className="w-full flex items-center justify-center shadow-black  drop-shadow-lg py-6 bg-[#F8EE00] rounded-3xl"
                activeOpacity={0.7}
              >
                <Text className="text-xl ">Gatting Started</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.push("Login")}>
                <Text className="mt-3  opacity-70">
                  Alrady have an account!{" "}
                  <Text className="text-blue-600 opacity-100">Login</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default wallcome;
