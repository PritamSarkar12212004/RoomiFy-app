import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { useNavigation } from "expo-router";
const ProfileNavigationHeader = ({ name, log }: any) => {
  const navigation = useNavigation();
  return (
    <>
      <SafeAreaView className="w-full flex flex-row justify-between items-center px-4 pr-4 py-4">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={30} color="black" />
        </TouchableOpacity>
        <Text className="text-2xl ">{name}</Text>
        {log ? (
          <SimpleLineIcons name="power" size={25} color="red" />
        ) : (
          <View></View>
        )}
      </SafeAreaView>
    </>
  );
};

export default ProfileNavigationHeader;
