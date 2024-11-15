import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";

const FileSize = ({ closewarningfile, setclosewarningfile,message }: any) => {
  return (
    <>
      {closewarningfile ? (
        <View className="w-full z-50 h-screen flex items-center absolute top-0 left-0 justify-center   blur-md bg-black/60">
          <View className="w-72 h-80 bg-white rounded-3xl justify-center items-center shadow-slate-200">
            <Image
              source={require("../../../assets/Error/alert.png")}
              className="w-24 h-24"
            />
            <View className="w-full flex gap-3 items-center">
              <Text className="text-2xl font-bold text-red-400">Warning</Text>
              <View className="w-[80%] flex items-center">
                <Text className="text-center text-zinc-700 font-bold text-sm">
                 {message}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => setclosewarningfile(false)}
              className="w-[80%] flex items-center justify-center shadow-black  drop-shadow-lg py-4 mt-5 bg-blue-400 rounded-3xl"
              activeOpacity={0.8}
            >
              <Text className="text-xl font-extrabold text-white">
                {" "}
                Try again
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
    </>
  );
};

export default FileSize;
