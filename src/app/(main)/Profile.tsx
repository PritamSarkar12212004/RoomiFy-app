import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation, useRouter } from "expo-router";
import { userContext } from "../../context/Context";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Feather from "@expo/vector-icons/Feather";
import { useFocusEffect } from "@react-navigation/native";

import Logout from "@/src/components/Error/profile/Logout";
import { ActivityIndicator } from "react-native";

const Profile = () => {
  const [postTiffin, setPostTiffin] = useState(0);
  const [like, setlike] = useState(0);
  const [log, setlog] = useState(false);
  const { profileData, getProfile } = userContext();
  const navigation = useRouter();
  // const phoneValidation = (phone) => {
  //   // Check if phone contains any non-numeric characters or dots
  //   const regex = /^[0-9]*$/; // Allows numeric characters or an empty string

  //   if (typeof phone !== "string") {
  //     alert("Phone number must be a string.");
  //     return;
  //   }

  //   if (!regex.test(phone)) {
  //     alert(
  //       "Phone number can only contain numeric characters and no dots or special characters."
  //     );
  //     return;
  //   }

  //   if (phone.length > 10) {
  //     alert("Phone number must be between 10 to 15 digits.");
  //     return;
  //   }

  //   // Allow empty string to clear the input
  //   setPhone(phone); // Update phone state if valid
  // };
  useFocusEffect(
    React.useCallback(() => {
      getProfile();
    }, [])
  );
  return (
    <View className="w-full relative h-full bg-blue-500">
      <StatusBar barStyle={"dark-content"} />
      {profileData ? (
        <SafeAreaView className="w-full h-full relative">
          <ScrollView className="">
            {log ? <Logout log={log} setlog={setlog} /> : null}
            <View className="w-full flex px-5 py-10 justify-between flex-row  items-center ">
              <Text className="text-white text-3xl">Profile</Text>
              <TouchableOpacity onPress={() => setlog(true)}>
                <AntDesign name="logout" size={30} color="white" />
              </TouchableOpacity>
            </View>
            <>
              {profileData ? (
                <View className="flex-auto h-screen bg-white rounded-t-[50px] mt-16 ">
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
                        <FontAwesome6
                          name="location-dot"
                          size={24}
                          color="blue"
                        />
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
                        <Text className="text-3xl font-bold">
                          {profileData.roomData}
                        </Text>
                        <Text className="text-xl">Room Post</Text>
                      </View>
                      <View className=" items-center justify-center rounded-3xl">
                        <Text className="text-3xl font-bold">{postTiffin}</Text>
                        <Text className="text-xl">Room Tifin</Text>
                      </View>
                      <View className=" items-center justify-center rounded-3xl">
                        <Text className="text-3xl font-bold">{like}</Text>
                        <Text className="text-xl">Likes</Text>
                      </View>
                    </View>
                    <View className="w-full  items-center flex-row justify-between">
                      <TouchableOpacity
                        onPress={() =>
                          navigation.push("/(other)/ProfileUpdate")
                        }
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
                    </View>
                    <View className="w-full flex gap-3">
                      <TouchableOpacity
                        className="w-full  rounded-3xl  flex-row justify-between items-center  py-6  px-4 bg-zinc-100 "
                        onPress={() => navigation.push("/(other)/PostRoom")}
                      >
                        <Text className="text-2xl">Post Rooms</Text>
                        <AntDesign name="arrowright" size={24} color="black" />
                      </TouchableOpacity>
                      <TouchableOpacity className="w-full  rounded-3xl  flex-row justify-between items-center  py-6  px-4 bg-zinc-100 ">
                        <Text className="text-2xl">Post Tiffin</Text>
                        <AntDesign name="arrowright" size={24} color="black" />
                      </TouchableOpacity>
                      <TouchableOpacity className="w-full  rounded-3xl  flex-row justify-between items-center  py-6  px-4 bg-zinc-100 ">
                        <Text className="text-2xl">Privacy</Text>
                        <AntDesign name="arrowright" size={24} color="black" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ) : null}
            </>
          </ScrollView>
        </SafeAreaView>
      ) : (
        <View className="w-full h-screen flex justify-center items-center ">
          <ActivityIndicator size="large" color="#white" />
        </View>
      )}
    </View>
  );
};

export default Profile;
