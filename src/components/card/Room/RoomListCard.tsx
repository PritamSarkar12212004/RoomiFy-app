import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Fontisto from "@expo/vector-icons/Fontisto";
import Octicons from "@expo/vector-icons/Octicons";
import { useNavigation, useRouter } from "expo-router";

const RoomListCard = ({
  userImage,
  mainImage,
  userName,
  id,
  setEnable,
  setComments,
}: any) => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      setComments("fwfiwfwiufbi");
    }, 2000);
  }, []);
  return (
    <View className="w-fulll mt-5 rounded-3xl bg-gray-00 border-[1px] shadow-black  border-zinc-400 gap-3  px-4 py-4">
      <View className="w-full flex flex-row justify-between  items-start ">
        <View className=" flex flex-row gap-3 items-center">
          <TouchableOpacity>
            <Image
              source={{ uri: userImage }}
              className="w-12 h-12 rounded-full"
            />
          </TouchableOpacity>
          <View className="flex flex-col">
            <Text className="font-bold">{userName}</Text>
            <Text className="opacity-70">jun 29</Text>
          </View>
        </View>
        <View>
          <MaterialCommunityIcons
            name="dots-horizontal"
            size={30}
            color="black"
          />
        </View>
      </View>
      <View className="w-full">
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => navigation.navigate("ViewRoom", { id })}
        >
          <Image
            source={{
              uri: mainImage,
            }}
            className="w-full h-72 rounded-3xl"
          />
        </TouchableOpacity>
      </View>
      <View className="w-full flex-row justify-between  px-2">
        <View className="flex-row items-center justify-start gap-3">
          <View className="flex flex-row gap-1 items-center">
            <Fontisto name="heart-alt" size={24} color="black" />
            <Text className="text-center">100</Text>
          </View>
          <View className="flex flex-row gap-1 items-center">
            <TouchableOpacity onPress={() => setEnable(true)}>
              <MaterialCommunityIcons
                name="comment-minus-outline"
                size={27}
                color="black"
              />
            </TouchableOpacity>
            <Text className="text-center">30</Text>
          </View>
        </View>
        <View className="flex-row items-center justify-center gap-2">
          <Text className="font-bold">BansiNagar</Text>
          <Octicons name="location" size={24} color="black" />
        </View>
      </View>
    </View>
  );
};

export default RoomListCard;
