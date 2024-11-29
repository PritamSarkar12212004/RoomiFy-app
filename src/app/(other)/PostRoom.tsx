import React, { useEffect, useState } from "react";
import Axios from "@/src/utils/api/Axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AdminPostHeader from "@/src/components/Header/admin_PostHeader/AdminPostHeader";
import { userContext } from "../../context/Context";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";
const PostRoom = () => {
  const { postRoomControllerSet } = userContext();
  const postControllRoomFunc = (data) => {
    postRoomControllerSet(data);
    navigation.push("/(other)/PostControllRoom");
  };
  const navigation = useRouter();
  function formatDate(dateString) {
    const date = new Date(dateString);
    // Format the date into a readable string
    const options = {
      day: "2-digit", // Day with leading zero
      month: "long", // Full month name
      year: "numeric", // Full year
      hour: "2-digit", // Hour in 12-hour format
      minute: "2-digit", // Minute
      hour12: true, // Use 12-hour clock (AM/PM)
    };

    return new Intl.DateTimeFormat("en-US", options).format(date);
  }

  const [data, setdata] = useState([]);
  const callRoomPostApi = async () => {
    const token = await AsyncStorage.getItem("token");
    await Axios.post("/room/admin", { token: token }).then((res) => {
      if (!res.data.status == 200) {
        setdata(res.data.item);
      } else {
        setdata(res.data.item);
      }
    });
  };

  useEffect(() => {
    callRoomPostApi();
  }, []);
  return (
    <View className="w-full h-screen">
      <AdminPostHeader name={"Your Post Rooms"} />
      <View className=" w-full  h-full px-3  ">
        {data ? (
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={data}
            renderItem={({ item }) => (
              <View className="w-full flex  ">
                <TouchableOpacity onPress={() => postControllRoomFunc(item)}>
                  <View className="flex gap-2 mt-4 bg-zinc-300 rounded-2xl pb-3">
                    <Image
                      source={{ uri: item.mainImage }}
                      className="w-full h-80 rounded-t-2xl"
                    />
                    <View className=" px-2">
                      <Text className="text-2xl font-bold">
                        Price ₹{item.price}
                      </Text>
                      <Text className="text-xl font-bold ">
                        {formatDate(item.updatedAt)}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          />
        ) : (
          <View className="w-full h-full flex justify-center items-center">
            {data === null ? (
              <Text>No Posted Room Heare</Text>
            ) : (
              <ActivityIndicator size={40} color={"blue"} />
            )}
          </View>
        )}
      </View>
    </View>
  );
};

export default PostRoom;
