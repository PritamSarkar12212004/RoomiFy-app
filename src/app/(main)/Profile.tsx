import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import ProfileNavigationHeader from "@/src/components/Header/ProfileNavigationHeader";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useNavigation } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userContext } from "../../context/Context";
const Profile = () => {
  const { profileData } = userContext();
  const navigation = useNavigation();
  const Logouter = () => {
    AsyncStorage.removeItem("token");
    router.replace("/(auth)");
  };

  useEffect(() => {}, [profileData]);
  return (
    <View className="w-full relative h-screen">
      <>
        {profileData ? (
          <View className="w-full h-full">
            <ProfileNavigationHeader name={"Profile"} log={true} />
            <View className="w-full px-7 flex gap-7">
              <View className="w-full flex items-center justify-center">
                <Image
                  source={{ uri: profileData.profile }}
                  className="w-40 h-40 rounded-full"
                />
                <Text className="text-center text-2xl mt-4 font-bold">
                  {profileData.name}
                </Text>
              </View>
              <View className="flex gap-3">
                <View className="flex flex-row gap-2">
                  <MaterialCommunityIcons
                    name="phone-check-outline"
                    size={25}
                    color="black"
                  />
                  <Text className="xl">{profileData.phone}</Text>
                </View>
                <View className="flex flex-row gap-2">
                  <Ionicons name="location-outline" size={25} color="black" />
                  <Text className="xl">{`${profileData.state},${profileData.city},${profileData.village}`}</Text>
                </View>
              </View>
            </View>
            <View className="absolute w-full bottom-10 flex items-center justify-center ">
              <TouchableOpacity
                className="px-20 py-4 rounded-2xl mb-5 bg-red-400 flex-row items-center justify-center gap-2"
                onPress={() => Logouter()}
              >
                <Text className="text-2xl text-white">Logout</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("ProfileUpdate")}
                className="px-20 py-6 bg-blue-500 rounded-3xl flex-row items-center justify-center gap-2"
                activeOpacity={0.8}
              >
                <Text className="text-2xl  text-white">Update Profile</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
      </>
    </View>
  );
};

export default Profile;
