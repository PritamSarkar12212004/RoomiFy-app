import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import Axios from "@/src/utils/api/Axios";
import { userContext } from "../../../context/Context";

import Ionicons from "@expo/vector-icons/Ionicons";
const RoomListCard = ({
  userImage,
  mainImage,
  userName,
  id,
  setComments,
  bacnedLike,
  backendComment,
  token,
  exact_location,
  price,
}: any) => {
 
  const roite = useRouter();
 
  const { setProductID, commentSetter } = userContext();

  useEffect(() => {
    setProductID(id);
    setComments(backendComment);
  }, []);
  return (
    <View className="w-fulll mb-7 rounded-3xl bg-zinc-200 pb-2 ">
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          roite.push({ pathname: "/(other)/ViewRoom", params: { id } })
        }
      >
        <Image
          source={{
            uri: mainImage,
          }}
          className="w-full h-80 rounded-3xl"
        />
      </TouchableOpacity>
      <View className="w-full px-3 py-1">
        <View className="w-full flex-row justify-between  opacity-65">
          <View>
            <Text className="text-3xl font-bold">{userName}</Text>
          </View>
          <View className="flex-row items-center gap-4 opacity-65">
           
          </View>
        </View>
        <View className="w-full flex-row items-center justify-between pr-2 mt-2">
          <View className="flex-row gap-1 opacity-60 items-center justify-between  ">
            <Ionicons name="location" size={24} color="black" />
            <Text className="text-wrap">
              {exact_location.city},{exact_location.village},
              {exact_location.state_district}
            </Text>
          </View>
          <View>
            <Text className="text-xl font-bold">₹{price}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RoomListCard;
