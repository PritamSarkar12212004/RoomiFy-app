import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Touchable,
  Image,
  ScrollView,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation, useRouter } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Slider from "@react-native-community/slider";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Axios from "@/src/utils/api/Axios";
import * as Location from "expo-location";

const Search = () => {
  const navigation = useRouter();
  const [price, setPrice] = useState(1000);
  const [single, setsingle] = useState(false);
  const [double, setdouble] = useState(false);
  const [group, setgroup] = useState(false);
  const [family, setfamly] = useState(false);
  const [current, setCurrent] = useState("test2");
  const [debounceTimer, setDebounceTimer] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [mainsearchResult, setMainsearchResult] = useState([]);

  const handlePriceChange = (value) => {
    if (value >= 1000 && value <= 10000) {
      setPrice(value);
    }
  };
  const getlocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  };
  const handleNearby = () => {
    if (!location) {
      getlocation();
    } else {
      nearbyCall();
    }
  };
  const nearbyCall = async () => {
    await Axios.post("/univarsal/search/nearby", { location: location })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const mainSearch = (input) => {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
    const newTimer = setTimeout(() => {
      searchCall(input);
    }, 1000);
    setDebounceTimer(newTimer);
  };
  const searchCall = async (input) => {
    await Axios.post("/univarsal/search/main", { input: input })
      .then((res) => {
        // if (!res.status === 200) {
        //   setMainsearchResult(null);
        // } else {
        setMainsearchResult(res.data);
        // console.log(res.data.results);
        // }
      })
      .catch((err) => {
        console.log(err);
        setMainsearchResult(null);
      });
  };
  return (
    <SafeAreaView className="w-full h-screen bg-white">
      <StatusBar barStyle={"dark-content"} />
      <View className="w-full flex gap-5 px-3 h-full relative">
        <View className="px-2 relative ">
          <View className="w-full flex items-center justify-center mt-2 relative">
            <TextInput
              onChangeText={(e) => mainSearch(e)}
              className="w-full bg-zinc-200  text-xl px-4 pr-16 py-3 rounded-3xl"
              placeholder="Search heare "
            />
            <View className="absolute right-4 top-3">
              <AntDesign name="search1" size={30} color="black" />
            </View>
          </View>
          {!mainsearchResult ? null : (
            <View className="w-full mt-3 backdrop-blur-sm bg-white  max-h-56  absolute top-full left-2 z-10">
              <ScrollView className="w-full h-full flex gap-3">
                {mainsearchResult.map((item, index) => (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.push({
                        pathname: "/(other)/ViewRoom",
                        params: { id: item._id },
                      });
                    }}
                    key={index}
                    className="flex-row  px-2 pr-5 py-2 rounded-3xl items-center justify-between border-[1px] border-zinc-200"
                  >
                    <Image
                      source={{ uri: item.mainImage }}
                      className="w-12 h-12 rounded-full"
                    />
                    <View className=" gap-6 justify-between flex-row  items-center">
                      <Text className="text-wrap">
                        {item.location.city},{item.location.district}
                      </Text>
                      <View>
                        <Text className="text-black text-lg font-bold">
                          {item.postTitle}
                        </Text>
                        <Text>₹{item.price}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </View>
        <View className="w-full flex border-b-[1px] pb-2 border-b-zinc-200">
          <TouchableOpacity
            onPress={() => handleNearby()}
            className="py-3 rounded-full px-4 w-32 bg-blue-500 gap-2 flex-row justify-between items-center"
            activeOpacity={0.8}
          >
            <FontAwesome name="location-arrow" size={24} color="white" />
            <Text className="text-white text-lg font-bold">NearBy</Text>
          </TouchableOpacity>
        </View>
        <View className="w-fill  pb-2 border-b-zinc-300">
          <Text className="text-2xl font-bold mb-2">Price</Text>
          <View className="flex-row items-center">
            <View
              className="w-20 border-[1px] border-zinc-300 px-2 rounded-2xl py-2
             text-lg
             "
            >
              <Text className="text-lg">{price}</Text>
            </View>
            <Slider
              style={{ width: "70%" }}
              minimumValue={1000}
              maximumValue={10000}
              step={1000}
              minimumTrackTintColor="blue"
              maximumTrackTintColor="black"
              value={price}
              onValueChange={handlePriceChange}
            />
          </View>
        </View>
        <View className="w-full pb-3 border-b-[1px] border-zinc-300  ">
          <View>
            <Text className="text-2xl font-bold">Room Type</Text>
          </View>
          <View className="w-full flex-row py-3  gap-3 justify-between ">
            <TouchableOpacity
              onPress={() => setsingle(!single)}
              className={`px-3 py-2  flex gap-2 border-2  items-center justify-center rounded-2xl ${
                single ? "border-blue-500" : "border-black"
              } `}
            >
              <FontAwesome6
                name="person"
                size={35}
                color={`${single ? "blue" : "black"}`}
              />
              <Text
                className={` text-lg font-bold ${
                  single ? "text-blue-500" : "text-black"
                } `}
              >
                Single
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setdouble(!double)}
              className={`px-3 py-2  flex gap-2 border-2  items-center justify-center rounded-2xl ${
                double ? "border-blue-500" : "border-black"
              } `}
            >
              <Ionicons
                name="people"
                size={35}
                color={`${double ? "blue" : "black"}`}
              />

              <Text
                className={` text-lg font-bold ${
                  double ? "text-blue-500" : "text-black"
                } `}
              >
                Double
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setgroup(!group)}
              className={`px-3 py-2  flex gap-2 border-2  items-center justify-center rounded-2xl ${
                group ? "border-blue-500" : "border-black"
              } `}
            >
              <MaterialIcons
                name="groups"
                size={35}
                color={`${group ? "blue" : "black"}`}
              />

              <Text
                className={` text-lg font-bold ${
                  group ? "text-blue-500" : "text-black"
                } `}
              >
                Groups
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setfamly(!family)}
              className={`px-3 py-2  flex gap-2 border-2  items-center justify-center rounded-2xl ${
                group ? "border-blue-500" : "border-black"
              } `}
            >
              <MaterialIcons
                name="family-restroom"
                size={35}
                color={`${family ? "blue" : "black"}`}
              />

              <Text
                className={` text-lg font-bold ${
                  family ? "text-blue-500" : "text-black"
                } `}
              >
                Family
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="w-full flex items-center justify-center mt-7 absolute bottom-5">
          <TouchableOpacity
            className="px-16 py-4 bg-blue-500 rounded-2xl"
            activeOpacity={0.8}
          >
            <Text className=" text-white text-xl">Search</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Search;
