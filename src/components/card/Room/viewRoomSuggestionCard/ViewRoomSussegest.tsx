import { View, Text, Image } from "react-native";
import React from "react";

const ViewRoomSussegest = ({ infos }: any) => {
  console.log(infos);
  return (
    <View className="w-72 h-72 bg-white rounded-lg mr-2">
      <Image source={{ uri: infos.mainImage }} className="w-full h-full" />
    </View>
  );
};

export default ViewRoomSussegest;
