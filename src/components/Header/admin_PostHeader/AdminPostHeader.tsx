import { View, Text, StatusBar, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Entypo from "@expo/vector-icons/Entypo";
import { useNavigation } from "expo-router";

const AdminPostHeader = ({ name }) => {
  const navigation = useNavigation();
  return (
    <View className="w-full">
      <StatusBar barStyle={"dark-content"} />
      <SafeAreaView className="w-full px-4 py-4 flex-row items-center justify-between">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="w-12 h-12 flex items-center justify-center bg-zinc-200 rounded-full"
        >
          <Entypo name="chevron-left" size={40} color="black" />
        </TouchableOpacity>
        <View>
          <Text className="text-2xl font-bold">{name}</Text>
        </View>
        <View className="w-12 h-12" />
      </SafeAreaView>
    </View>
  );
};

export default AdminPostHeader;
