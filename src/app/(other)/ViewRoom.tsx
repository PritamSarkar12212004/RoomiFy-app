import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";

import { useRoute } from "@react-navigation/native";
import Axios from "@/src/utils/api/Axios";
import Warning from "@/src/components/Error/LongError/Warning";
import { ActivityIndicator } from "react-native";
import ImageView from "react-native-image-viewing";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useNavigation } from "expo-router";
import { FacilityIcon } from "@/src/constants/FacilityIncon";
import Feather from "@expo/vector-icons/Feather";
import ProfileView from "@/src/components/view/profile/ProfileView";
import MapView, { Marker } from "react-native-maps";

const ViewRoom = () => {
  const router = useRoute();
  const [data, setdata] = useState(null);
  const [closewarning, setclosewarning] = useState(false);
  const [mainImg, setmainImg] = useState(null);
  const [viewImage, setviewImage] = useState(false);
  const [images, setImages] = useState([]);
  const [description, setdescription] = useState("");
  const mavigation = useNavigation();
  const [open, setOpen] = useState(false);
  const [lat, setlat] = useState(null);
  const [lon, setlon] = useState(null);
  const handleMapPress = (lat, lon) => {
    const url = `https://www.google.com/maps?q=${lat},${lon}`;
    Linking.openURL(url).catch((err) =>
      console.error("Error opening Google Maps", err)
    );
  };

  const ProfileDetilesOpen = () => {
    setOpen(!open);
  };

  const linkDailer = (data) => {
    Linking.openURL(`tel:${data}`);
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
          setdescription(res.data.description);
          setlat(res.data.location.coordinates[1]);
          setlon(res.data.location.coordinates[0]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      {viewImage ? (
        <StatusBar barStyle={"dark-content"} backgroundColor={"black"} />
      ) : (
        <StatusBar barStyle={"dark-content"} />
      )}
      {data ? (
        <View className="w-full h-full relative ">
          {open && (
            <ProfileView
              open={open}
              setOpen={setOpen}
              profleImage={data.owner.profilePicture}
              username={data.owner.username}
              city={data.owner.exact_location.city}
              village={data.owner.exact_location.village}
              gender={data.owner.gender}
            />
          )}
          <ImageView
            images={images}
            imageIndex={0}
            visible={viewImage}
            onRequestClose={() => setviewImage(!viewImage)}
            visible={viewImage}
            swipeToCloseEnabled={true}
          />
          <ScrollView>
            <View className="w-full  ">
              <Warning
                closewarning={closewarning}
                setclosewarning={setclosewarning}
                message="Something went wrong Please GO back"
              />
              <View className="w-full     relative ">
                <View>
                  <View className="w-full absolute top-12 flex-row justify-between items-center px-3 py-2">
                    <TouchableOpacity
                      activeOpacity={0.8}
                      className="h-12 w-12 bg-white rounded-2xl flex items-center justify-center z-10 opacity-75"
                      onPress={() => mavigation.goBack()}
                    >
                      <AntDesign name="arrowleft" size={24} color="black" />
                    </TouchableOpacity>
                  </View>
                  {mainImg ? (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => setviewImage(true)}
                    >
                      <View className="w-full h-[45vh]  rounded-3xl">
                        <Image
                          source={{ uri: mainImg }}
                          className="w-full h-full "
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
              <View className="w-full  flex px-5 rounded-t-[40px] mt-[-20] bg-white pt-5  ">
                <View className="w-full flex-row justify-between items-center">
                  <Text className="text-3xl ">{data.owner.username}</Text>
                  <TouchableOpacity onPress={() => ProfileDetilesOpen()}>
                    <Image
                      source={{ uri: data.owner.profilePicture }}
                      className="w-12 h-12 rounded-full"
                    />
                  </TouchableOpacity>
                </View>
                <View className="w-full flex-row gap-2  items-center">
                  <View className="opacity-60">
                    <FontAwesome6
                      name="location-arrow"
                      size={24}
                      color="blue"
                    />
                  </View>
                  <Text className="text-lg font-bold opacity-65">
                    {data.location.city},{data.location.address_line1}
                  </Text>
                </View>
                <View className=" mt-7 w-full flex gap-3 ">
                  <Text className="text-2xl font-bold">Details</Text>
                  <Text className=" opacity-80">{data.description}</Text>
                </View>
                <View className="mt-10 w-full flex gap-3  ">
                  <Text className="text-2xl font-bold">Facility</Text>
                  <View className="w-full  flex-row gap-5">
                    <ScrollView
                      className=""
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                    >
                      <View className="flex-row gap-5 mb-20">
                        {data.facility.wifi && (
                          <View className=" w-20 py-2 b flex gap-2 items-center">
                            <View className="h-16 w-16 rounded-full px-2 py-2  bg-zinc-200 ">
                              <Image
                                source={FacilityIcon.wifi}
                                className="h-full w-full "
                              />
                            </View>
                            <Text className="font-bold opacity-60">Wifi</Text>
                          </View>
                        )}
                        {data.facility.Independent && (
                          <View className=" w-20 py-2 b flex gap-2 items-center">
                            <View className="h-16 w-16 rounded-full px-2 py-2  bg-zinc-200 ">
                              <Image
                                source={FacilityIcon.independent}
                                className="h-full w-full "
                              />
                            </View>
                            <Text className="font-bold opacity-60">
                              independent
                            </Text>
                          </View>
                        )}
                        {data.facility.bikeParking && (
                          <View className=" w-20 py-2 b flex gap-2 items-center">
                            <View className="h-16 w-16 rounded-full px-2 py-2  bg-zinc-200 ">
                              <Image
                                source={FacilityIcon.parking}
                                className="h-full w-full "
                              />
                            </View>
                            <Text className="font-bold opacity-60">
                              Parking
                            </Text>
                          </View>
                        )}
                        {data.facility.light && (
                          <View className=" w-20 py-2 b flex gap-2 items-center">
                            <View className="h-16 w-16 rounded-full px-2 py-2  bg-zinc-200 ">
                              <Image
                                source={FacilityIcon.light}
                                className="h-full w-full "
                              />
                            </View>
                            <Text className="font-bold opacity-60">Light </Text>
                          </View>
                        )}
                        {data.facility.fan && (
                          <View className=" w-20 py-2 b flex gap-2 items-center">
                            <View className="h-16 w-16 rounded-full px-2 py-2  bg-zinc-200 ">
                              <Image
                                source={FacilityIcon.fan}
                                className="h-full w-full "
                              />
                            </View>
                            <Text className="font-bold opacity-60">Fan</Text>
                          </View>
                        )}
                        {data.facility.cooler && (
                          <View className=" w-20 py-2 b flex gap-2 items-center">
                            <View className="h-16 w-16 rounded-full px-2 py-2  bg-zinc-200 ">
                              <Image
                                source={FacilityIcon.coocler}
                                className="h-full w-full "
                              />
                            </View>
                            <Text className="font-bold opacity-60">Cooler</Text>
                          </View>
                        )}
                        {data.facility.bed && (
                          <View className=" w-20 py-2 b flex gap-2 items-center">
                            <View className="h-16 w-16 rounded-full px-2 py-2  bg-zinc-200 ">
                              <Image
                                source={FacilityIcon.bed}
                                className="h-full w-full "
                              />
                            </View>
                            <Text className="font-bold opacity-60">Bed</Text>
                          </View>
                        )}
                        {data.facility.addtachedWashroom && (
                          <View className=" w-20 py-2 b flex gap-2 items-center">
                            <View className="h-16 w-16 rounded-full px-2 py-2  bg-zinc-200 ">
                              <Image
                                source={FacilityIcon.wahsroom}
                                className="h-full w-full "
                              />
                            </View>
                            <Text className="font-bold opacity-60">
                              Attach Bathroom
                            </Text>
                          </View>
                        )}
                      </View>
                    </ScrollView>
                  </View>
                  <View className="w-full">
                    {lat && lon ? (
                      <MapView
                        provider="google"
                        scrollEnabled={false}
                        showsUserLocation
                        onPress={() => handleMapPress(lat, lon)}
                        style={{ width: "100%", height: 400 }}
                        initialRegion={{
                          latitude: lat,
                          longitude: lon,
                          latitudeDelta: 0.0922,
                          longitudeDelta: 0.0421,
                        }}
                      >
                        <Marker
                          coordinate={{ latitude: lat, longitude: lon }}
                        />
                      </MapView>
                    ) : (
                      <View className="w-full h-72 flex justify-center items-center">
                        <Text>No location available</Text>
                      </View>
                    )}
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
          <View className="w-full bg-white absolute bottom-0 px-3  py-2 items-center justify-between flex-row">
            <View className="">
              <Text className="text-2xl  font-bold">₹{data.price}</Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              className="w-1/2 bg-blue-500 rounded-2xl px-7 h-full py-4 flex flex-row items-center gap-4 "
              onPress={() => linkDailer(data.owner.phone)}
            >
              <Feather name="phone-call" size={27} color="white" />
              <Text className="text-white text-xl font-bold">
                {data.owner.phone}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View className="w-full h-screen flex items-center justify-center">
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
    </>
  );
};

export default ViewRoom;
