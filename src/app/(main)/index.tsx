import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import MainHead from "@/src/components/Header/MainHead";
import RoomListCard from "@/src/components/card/Room/RoomListCard";
import Comments from "../(other)/Comments";
import { userContext } from "../../context/Context";
import { useFocusEffect } from "@react-navigation/native";

const Index = () => {
  const { token, data, getToken, getData, getProfile } = userContext();
  const [comments, setComments] = useState(null);
  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, [])
  );

  return (
    <View className="w-full h-screen">
      <StatusBar barStyle={"dark-content"} />
      {data ? (
        <View className="w-full flex-auto h-screen relative mb-20">
          <MainHead />
          <ScrollView
            showsVerticalScrollIndicator={false}
            className="h-screen px-3"
          >
            {data.map((item) => (
              <RoomListCard
                key={item._id} // Use item._id for the unique key
                userImage={item.owner.profilePicture}
                userName={item.owner.username}
                mainImage={item.mainImage}
                id={item._id}
                bacnedLike={item.likes}
                backendComment={item.comments}
                setComments={setComments} // Pass setComments function to handle comments
                token={token}
                exact_location={item.location}
                price={item.price}
              />
            ))}
          </ScrollView>
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
