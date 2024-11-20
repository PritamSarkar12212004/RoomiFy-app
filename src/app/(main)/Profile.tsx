import { View, Text, Image, TouchableOpacity, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router, useNavigation, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userContext } from "../../context/Context";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Feather from "@expo/vector-icons/Feather";

import Logout from "@/src/components/Error/profile/Logout";

const Profile = () => {
  const [log, setlog] = useState(false);
  const { profileData } = userContext();
  const navigation = useRouter();
  const Logouter = () => {
    AsyncStorage.removeItem("token");
    router.replace("/(auth)");
  };

  useEffect(() => {}, [profileData]);
  return (
    <View className="w-full relative h-screen bg-blue-500">
      <StatusBar barStyle={"light-content"} />
      <SafeAreaView className="w-full h-full relative">
        {log ? <Logout log={log} setlog={setlog} /> : null}
        <View className="w-full flex px-5 py-10 justify-between flex-row  items-center ">
          <Text className="text-white text-3xl">Profile</Text>
          <TouchableOpacity onPress={() => setlog(true)}>
            <AntDesign name="logout" size={30} color="white" />
          </TouchableOpacity>
        </View>
        <>
          {profileData ? (
            <View className="flex-auto bg-white rounded-t-[50px] mt-16 ">
              <View className="w-full flex items-center justify-center  mt-[-70px]">
                <Image
                  source={{ uri: profileData.profile }}
                  className="w-40 h-40 rounded-full"
                />
                <View className="mt-5">
                  <Text className="text-2xl  font-bold">
                    {profileData.name}
                  </Text>
                </View>
              </View>
              <View className="w-full px-7 flex gap-10">
                <View className="px-2 flex-row w-full   justify-between items-center">
                  <View className="flex-row items-center gap-2">
                    <FontAwesome6 name="location-dot" size={24} color="blue" />
                    <Text className="text-xl">
                      {profileData.city},{profileData.village}
                    </Text>
                  </View>
                  <View className="flex-row items-center gap-2">
                    <Feather name="phone" size={24} color="blue" />
                    <Text className="text-xl">{profileData.phone}</Text>
                  </View>
                </View>
                <View className="w-full flex-row justify-between ">
                  <View className=" items-center justify-center rounded-3xl">
                    <Text className="text-3xl font-bold">100</Text>
                    <Text className="text-xl">Room Post</Text>
                  </View>
                  <View className=" items-center justify-center rounded-3xl">
                    <Text className="text-3xl font-bold">89</Text>
                    <Text className="text-xl">Room Tifin</Text>
                  </View>
                  <View className=" items-center justify-center rounded-3xl">
                    <Text className="text-3xl font-bold">1000</Text>
                    <Text className="text-xl">Likes</Text>
                  </View>
                </View>
                <View className="w-full  items-center flex-row justify-between">
                  <TouchableOpacity
                    onPress={() => navigation.push("/(other)/ProfileUpdate")}
                    activeOpacity={0.5}
                    className="px-10 py-3 rounded-2xl  border-2 border-zinc-500"
                  >
                    <Text className="text-2xl font-bold text-blue-600">
                      Edit
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    className="px-10 py-3 rounded-2xl  border-2 border-zinc-500"
                  >
                    <Text className="text-2xl font-bold text-blue-600">
                      Share
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    className="px-5 py-3 rounded-2xl  border-2 border-zinc-500"
                  >
                    <AntDesign name="adduser" size={24} color="blue" />
                  </TouchableOpacity>
                </View>
                <View className="w-full flex gap-3">
                  <TouchableOpacity className="w-full  rounded-3xl  flex-row justify-between items-center  py-6  px-4 bg-zinc-100 ">
                    <Text className="text-2xl">Privacy</Text>
                    <AntDesign name="arrowright" size={24} color="black" />
                  </TouchableOpacity>
                  <TouchableOpacity className="w-full  rounded-3xl  flex-row justify-between items-center  py-6  px-4 bg-zinc-100 ">
                    <Text className="text-2xl">Setting</Text>
                    <AntDesign name="arrowright" size={24} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ) : null}
        </>
      </SafeAreaView>
    </View>
  );
};

export default Profile;
