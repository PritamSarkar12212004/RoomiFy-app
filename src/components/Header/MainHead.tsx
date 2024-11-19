import { View, Text, StatusBar, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const MainHead = () => {
  return (
    <>
      <StatusBar barStyle={"dark-content"} />
      <SafeAreaView className="w-full ">
        <View className="flex px-4 py-2 items-center flex-row justify-between">
          <Text className="text-3xl font-extrabold text-blue-600">RoomiFy</Text>
          <View className="flex flex-row gap-4 items-center">
            <TouchableOpacity
              activeOpacity={0.8}
              className="flex flex-row items-center gap-2 bg-blue-500 px-4 py-2 rounded-3xl"
            >
              <Text className="text-white text-lg font-bold">NearBy</Text>
              <FontAwesome6 name="location-dot" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default MainHead;
