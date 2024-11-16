import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  Touchable,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Icons } from "@/src/constants/Icons";
import { useNavigation } from "expo-router";
import { userContext } from "../../context/Context";
const MainHead = () => {
  const { profileData } = userContext();
  const navigation = useNavigation();
  return (
    <>
      <StatusBar barStyle={"dark-content"} />
      <SafeAreaView className="w-full flex px-4   items-center flex-row justify-between">
        <Text className="text-3xl opacity-60  font-bold">RoomiFy</Text>
        <View className="flex flex-row gap-4 items-center">
          <AntDesign name="hearto" size={30} color="black" />
          <TouchableOpacity onPress={() => navigation.navigate("CreatePost")}>
            <Ionicons name="add-circle-outline" size={35} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            {profileData ? (
              <Image
                source={{ uri: profileData.profile }}
                className="w-10 h-10 rounded-full"
              />
            ) : null}
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

export default MainHead;
