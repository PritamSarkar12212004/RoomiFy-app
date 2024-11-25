import { View, Text, StatusBar, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation, useRouter } from "expo-router";
const MainHead = () => {
  const navigation = useRouter();
  return (
    <>
      <StatusBar barStyle={"dark-content"} />
      <SafeAreaView className="w-full ">
        <View className="flex px-4 py-2 items-center flex-row justify-between">
          <Text className="text-3xl font-extrabold text-blue-600">RoomiFy</Text>
          <View className="flex flex-row gap-4 items-center">
            <TouchableOpacity
              onPress={() => navigation.push("(other)/Search")}
              activeOpacity={0.8}
              className="flex flex-row items-center gap-3 bg-blue-500 px-4 py-3 rounded-3xl"
            >
              <Text className="text-white text-lg font-bold">Search here</Text>
              <AntDesign name="search1" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default MainHead;
