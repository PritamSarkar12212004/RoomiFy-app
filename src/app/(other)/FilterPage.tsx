import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRouter } from "expo-router";
import { userContext } from "@/src/context/Context";

const FilterPage = () => {
  const navigation = useNavigation();
  const roite = useRouter();
  const { searchData } = userContext();
  return (
    <SafeAreaView>
      <View>
        <View className="w-full flex-row mt-2 justify-between px-3 items-center ">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="h-12 w-12 bg-zinc-200 rounded-full flex justify-center items-center"
          >
            <Ionicons name="chevron-back" size={30} color="black" />
          </TouchableOpacity>
          <Text className="text-blue-500 text-2xl font-bold">NearBy Rooms</Text>
        </View>
      </View>
      <View className="w-full px-2  mt-2 mb-24 ">
        <FlatList
          data={searchData}
          renderItem={({ item }) => (
            <View className="w-fulll mb-7 rounded-3xl bg-zinc-200 pb-2 ">
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                  roite.push({
                    pathname: "/(other)/ViewRoom",
                    params: { id: item._id },
                  })
                }
              >
                <Image
                  source={{
                    uri: item.mainImage,
                  }}
                  className="w-full h-80 rounded-3xl"
                />
              </TouchableOpacity>
              <View className="w-full px-3 py-1">
                <View className="w-full flex-row justify-between  opacity-65">
                  <View>
                    <Text className="text-3xl font-bold">{item.postTitle}</Text>
                  </View>
                  <View className="flex-row items-center gap-4 opacity-65"></View>
                </View>
                <View className="w-full flex-row items-center justify-between pr-2 mt-2">
                  <View className="flex-row gap-1 opacity-60 items-center justify-between  ">
                    <Ionicons name="location" size={24} color="black" />
                    <Text className="text-wrap">
                      {item.location.city},{item.location.village},
                      {item.location.state_district}
                    </Text>
                  </View>
                  <View>
                    <Text className="text-xl font-bold">₹{item.price}</Text>
                  </View>
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default FilterPage;
