import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import ProfileNavigationHeader from "@/src/components/Header/ProfileNavigationHeader";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Axios from "../../utils/api/Axios";
const Profile = () => {
  const [changer, setchanger] = useState(false);
  const navigation = useNavigation();
  const [data, setdata] = useState(null);
  const token = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      await Axios.post("/user/profile", token)
        .then((res) => {
          if (res.data.status == "success") {
            setdata(res.data.data);
          } else {
            console.log("error");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("no token");
    }
  };
  useEffect(() => {
    token();
  }, [changer]);
  return (
    <View className="w-full relative h-screen">
      <>
        {data ? (
          <View className="w-full h-full">
            <ProfileNavigationHeader name={"Profile"} log={true} />
            <View className="w-full px-7 flex gap-7">
              <View className="w-full flex items-center justify-center">
                <Image
                  source={{ uri: data.profile }}
                  className="w-40 h-40 rounded-full"
                />
                <Text className="text-center text-2xl mt-4 font-bold">
                  {data.name}
                </Text>
              </View>
              <View className="flex gap-3">
                <View className="flex flex-row gap-2">
                  <MaterialCommunityIcons
                    name="email-check-outline"
                    size={25}
                    color="black"
                  />
                  <Text className="xl">{data.email}</Text>
                </View>
                <View className="flex flex-row gap-2">
                  <Ionicons name="location-outline" size={25} color="black" />
                  <Text className="xl">{`${data.state},${data.city},${data.village}`}</Text>
                </View>
              </View>
            </View>
            <View className="absolute w-full bottom-10 flex items-center justify-center ">
              <TouchableOpacity
                onPress={() => navigation.navigate("ProfileUpdate", { data,setchanger })}
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
