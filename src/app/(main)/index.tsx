import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import MainHead from "@/src/components/Header/MainHead";
import RoomListCard from "@/src/components/card/Room/RoomListCard";
import Comments from "../(other)/Comments";
import { userContext } from "../../context/Context";

const Index = () => {
  const { token, data, productID, comment, getData, getProfile } =
    userContext();
  const [comments, setComments] = useState(null);
  useEffect(() => {
    getData();
    getProfile();
  }, [data]);

  return (
    <View className="w-full h-screen">
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
                exact_location={item.owner.exact_location}
                price={item.price}
                
              />
            ))}
          </ScrollView>
          {comment && (
            <Comments
              comments={comments}
              setComments={setComments}
              token={token}
              productID={productID}
              token={token}
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
