import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Icons } from "@/src/constants/Icons";
import Entypo from "@expo/vector-icons/Entypo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRouter } from "expo-router";
const Logout = ({ log, setlog }: any) => {
  const navigation = useRouter();
  const logOutFunction = async () => {
    await AsyncStorage.removeItem("token");
    navigation.replace("/(auth)");
  };

  return (
    <View className="w-full h-full absolute items-center justify-center z-50 backdrop-blur-sm bg-black/40">
      <View className="w-72 h-72 relative bg-white rounded-3xl flex items-center justify-between py-10">
        <TouchableOpacity
          className="absolute top-5 right-5"
          onPress={() => setlog(!log)}
        >
          <Entypo name="cross" size={40} color="black" />
        </TouchableOpacity>
        <Image source={Icons.logout} className="w-16 h-16" />
        <TouchableOpacity
          className="w-3/4 py-4 rounded-3xl bg-red-500 items-center justify-center"
          onPress={() => logOutFunction()}
        >
          <Text className="text-2xl text-white font-bold">Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Logout;
