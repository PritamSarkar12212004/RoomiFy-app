import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import MainHead from "@/src/components/Header/MainHead";
import RoomListCard from "@/src/components/card/Room/RoomListCard";
import Axios from "@/src/utils/api/Axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Comments from "./Comments";

const Index = () => {
  const [enable, setEnable] = useState(false);
  const [data, setData] = useState(null);
  const [comments, setComments] = useState(null);

  const getData = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        const response = await Axios.post("/list/room", { token });
        setData(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View className="w-full h-screen">
      {data ? (
        <View className="w-full px-5 flex-auto h-screen relative">
          <MainHead />
          <ScrollView showsVerticalScrollIndicator={false} className="h-screen">
            {data.map((item) => (
              <RoomListCard
                key={item._id} // Use item._id for the unique key
                userImage={item.owner.profilePicture}
                userName={item.owner.username}
                mainImage={item.mainImage}
                id={item._id}
                setEnable={setEnable} // Pass setEnable function to handle enabling comments
                setComments={setComments} // Pass setComments function to handle comments
              />
            ))}
          </ScrollView>
          {enable && (
            <Comments
              enable={enable}
              setEnable={setEnable}
              comments={comments}
              setComments={setComments}
            />
          )}
        </View>
      ) : (
        <View className="w-full h-screen items-center justify-center">
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
    </View>
  );
};

export default Index;
