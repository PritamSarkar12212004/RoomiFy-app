import { View, Text, StatusBar, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "expo-router";

const NavigationHeader = () => {
  const navigation = useNavigation();
  return (
    <>
      <StatusBar barStyle={"dark-content"} />
      <SafeAreaView className="w-full px-4 py-3">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View className="h-12 w-12 flex items-center justify-center rounded-full bg-zinc-200">
            <AntDesign name="left" size={24} color="black" />
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};

export default NavigationHeader;
