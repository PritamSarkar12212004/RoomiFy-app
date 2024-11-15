import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { ErrorNoti } from "@/src/constants/ErrorNoti";

const CommentErro = ({ time, settime }) => {
  return (
    <View>
      {time ? (
        <TouchableOpacity
          onPress={() => settime(false)}
          className="w-full  bg-red-400 rounded-2xl py-3 flex flex-row gap-4 items-center justify-center absolute bottom-10 left-0 right-0 mx-auto"
        >
          <Image source={ErrorNoti.ErrorMassage} className="w-10 h-10" />
          <Text className="text-white text-xl font-bold">
            You Must Type sumthing.
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default CommentErro;
