import { View, ScrollView, ActivityIndicator, StatusBar } from "react-native";
import React, { useState } from "react";
import MainHead from "@/src/components/Header/MainHead";
import RoomListCard from "@/src/components/card/Room/RoomListCard";
import { userContext } from "../../context/Context";
import { useFocusEffect } from "@react-navigation/native";
import * as Location from "expo-location";

const Index = () => {
  const { token, data, getData, locationsetter, location } = userContext();
  console.log(location)
  const [comments, setComments] = useState(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    locationsetter(location);
  };

  const locationGet = () => {
    if (location===null) {
      getLocation()
    }
    return;
  };
  useFocusEffect(
    React.useCallback(() => {
      getData();
      locationGet();
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
