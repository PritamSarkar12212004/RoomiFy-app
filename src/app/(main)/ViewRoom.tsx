import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";

import { useRoute } from "@react-navigation/native";
import Axios from "@/src/utils/api/Axios";
import Warning from "@/src/components/Error/LongError/Warning";
import { ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";
import ImageView from "react-native-image-viewing";

const ViewRoom = () => {
  const router = useRoute();
  const [data, setdata] = useState(null);
  const [closewarning, setclosewarning] = useState(false);
  const [mainImg, setmainImg] = useState(null);
  const [viewImage, setviewImage] = useState(false);
  const [images, setImages] = useState([]);
  const mainimgSetter = (img) => {
    setmainImg(img);
  };
  useEffect(() => {
    Axios.post("/list/viewRoom", router.params.id)
      .then((res) => {
        if (res.status == 200) {
          setdata(res.data);
          setImages([
            { uri: res.data.mainImage },
            { uri: res.data.childImg1 },
            { uri: res.data.childImg2 },
            { uri: res.data.childImg3 },
            { uri: res.data.childImg4 },
            { uri: res.data.childImg5 },
            { uri: res.data.childImg6 },
          ]);
          setmainImg(res.data.mainImage);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      {data ? (
        <SafeAreaView>
          <ImageView
            images={images}
            imageIndex={0}
            visible={viewImage}
            onRequestClose={() => setviewImage(!viewImage)}
            visible={viewImage}
            swipeToCloseEnabled={true}
          />
          <ScrollView>
            <View className="w-full  px-3">
              <Warning
                closewarning={closewarning}
                setclosewarning={setclosewarning}
                message="Something went wrong Please GO back"
              />
              <View className="w-full pb-7  border-b-4 border-b-blue-600 rounded-b-[40px] ">
                <View>
                  {mainImg ? (
                    <TouchableOpacity onPress={() => setviewImage(true)}>
                      <View className="w-full h-72  rounded-3xl">
                        <Image
                          source={{ uri: mainImg }}
                          className="w-full h-72  rounded-3xl"
                        />
                      </View>
                    </TouchableOpacity>
                  ) : (
                    <View className="w-full h-72  rounded-3xl">
                      <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                  )}
                </View>
            
              </View>
              <View className="w-full mt-7 border-b-[1px] border-gray-300 py-1">
                <Text className="text-2xl font-bold">
                  {data.owner.exact_location.city},
                  {data.owner.exact_location.village}
                </Text>
              </View>
              <View className="w-full mt-10 border-b-[1px] border-gray-300 py-1  flex-row justify-between px-2 items-center">
                <Text className="text-xl">{data.owner.username}</Text>
                <Image
                  source={{ uri: data.owner.profilePicture }}
                  className="w-14 h-14 rounded-full"
                />
              </View>
              <View className="w-full mt-7 border-b-[1px] border-gray-300 py-1  px-2">
                <Text className="text-2xl font-bold">Facility</Text>
                <View className=" flex flex-row flex-wrap gap-3 mt-5 items-center justify-between">
                  {data.facility.single ? (
                    <View className=" flex-row  items-center gap-2 px-3 py-2 bg-green-400 rounded-3xl justify-between">
                      <Text className="">Single</Text>
                    </View>
                  ) : null}
                  {data.facility.group ? (
                    <View className=" flex-row  items-center gap-2 px-3 py-2 bg-green-400 rounded-3xl justify-between">
                      <Text className="">Group</Text>
                    </View>
                  ) : null}
                  {data.facility.group ? (
                    <View className=" flex-row  items-center gap-2 px-3 py-2 bg-green-400 rounded-3xl justify-between">
                      <Text className="">Group</Text>
                    </View>
                  ) : null}
                  {data.facility.family ? (
                    <View className=" flex-row  items-center gap-2 px-3 py-2 bg-green-400 rounded-3xl justify-between">
                      <Text className="">Family</Text>
                    </View>
                  ) : null}
                  {data.facility.double ? (
                    <View className=" flex-row  items-center gap-2 px-3 py-2 bg-green-400 rounded-3xl justify-between">
                      <Text className="">Double</Text>
                    </View>
                  ) : null}
                  {data.facility.Independent ? (
                    <View className=" flex-row  items-center gap-2 px-3 py-2 bg-green-400 rounded-3xl justify-between">
                      <Text className="">Independent</Text>
                    </View>
                  ) : null}
                  {data.facility.Non_Independent ? (
                    <View className=" flex-row  items-center gap-2 px-3 py-2 bg-green-400 rounded-3xl justify-between">
                      <Text className="">Non_Independent</Text>
                    </View>
                  ) : null}
                  {data.facility.bikeParking ? (
                    <View className=" flex-row  items-center gap-2 px-3 py-2 bg-green-400 rounded-3xl justify-between">
                      <Text className="">BikeParking</Text>
                    </View>
                  ) : null}
                  {data.facility.wifi ? (
                    <View className=" flex-row  items-center gap-2 px-3 py-2 bg-green-400 rounded-3xl justify-between">
                      <Text className="">Wifi</Text>
                    </View>
                  ) : null}
                  {data.facility.light ? (
                    <View className=" flex-row  items-center gap-2 px-3 py-2 bg-green-400 rounded-3xl justify-between">
                      <Text className="">Light</Text>
                    </View>
                  ) : null}
                  {data.facility.fan ? (
                    <View className=" flex-row  items-center gap-2 px-3 py-2 bg-green-400 rounded-3xl justify-between">
                      <Text className="">Fan</Text>
                    </View>
                  ) : null}
                  {data.facility.cooler ? (
                    <View className=" flex-row  items-center gap-2 px-3 py-2 bg-green-400 rounded-3xl justify-between">
                      <Text className="">Cooler</Text>
                    </View>
                  ) : null}
                  {data.facility.bed ? (
                    <View className=" flex-row  items-center gap-2 px-3 py-2 bg-green-400 rounded-3xl justify-between">
                      <Text className="">Bed</Text>
                    </View>
                  ) : null}
                  {data.facility.addtachedWashroom ? (
                    <View className=" flex-row  items-center gap-2 px-3 py-2 bg-green-400 rounded-3xl justify-between">
                      <Text className="">AddtachedWashroom</Text>
                    </View>
                  ) : null}
                </View>
              </View>
              <View className="w-full px-4  mt-5">
                <View>
                  <Text className="text-xl font-bold">Description</Text>
                </View>

                <Text className="capitalize  text-wrap pl-3">
                  {data.description}
                </Text>
              </View>
              <View className="w-full mt-4 flex-row justify-between px-10">
                <TouchableOpacity className="bg-blue-500 w-full rounded-2xl mb-5 px-5 py-6">
                  <Feather name="phone" size={24} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      ) : (
        <View className="w-full h-screen flex items-center justify-center">
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
    </>
  );
};

export default ViewRoom;
