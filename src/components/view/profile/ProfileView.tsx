import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";

const ProfileView = ({
  profleImage,
  username,
  city,
  village,
  gender,
  open,
  setOpen,
}: any) => {
  const closeDetiles = () => {
    setOpen(!open);
  };
  return (
    <View className="absolute top-0  z-50 w-full h-full  bg-transparent flex items-center justify-center">
      <View className="w-3/4 h-3/6 py-5 px-4 bg-white rounded-3xl shadow-lg flex items-center justify-between shadow-black">
        <View className="w-full  ">
          <View className="w-full  flex items-center ">
            <Image
              source={{ uri: profleImage }}
              className=" h-52 w-52 shadow-black shadow-lg rounded-full"
            />
            <Text className="text-3xl font-bold">{username}</Text>
          </View>
          <View className="w-full mt-4 flex gap-3 px-3">
            <View className="w-full">
              <Text className="text-2xl font-bold">
                Area: <Text className="font-normal text-xl">{city}</Text>
              </Text>
            </View>
            <View className="w-full">
              <Text className="text-2xl font-bold">
                Gender: <Text className="font-normal text-xl">{gender}</Text>
              </Text>
            </View>
          </View>
        </View>
        <View className="w-full">
          <TouchableOpacity
            className="w-full h-14 bg-blue-500 rounded-2xl  flex items-center justify-center"
            onPress={() => closeDetiles()}
          >
            <Text className="text-white text-xl">Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProfileView;
