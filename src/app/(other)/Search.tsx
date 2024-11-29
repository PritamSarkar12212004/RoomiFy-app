import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Slider from "@react-native-community/slider";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Axios from "@/src/utils/api/Axios";
import * as Location from "expo-location";
import { userContext } from "@/src/context/Context";

const Search = () => {
  const navigation = useRouter();
  const { setSearchDataApi, location, locationsetter } = userContext();
  const [price, setPrice] = useState(1000);
  const [single, setsingle] = useState(false);
  const [double, setdouble] = useState(false);
  const [group, setgroup] = useState(false);
  const [family, setfamly] = useState(false);
  const [current, setCurrent] = useState("test2");
  const [debounceTimer, setDebounceTimer] = useState(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [mainsearchResult, setMainsearchResult] = useState(null);
  const [searchBar, setSearchBar] = useState(null);
  const [locationLoading, setlocationLoading] = useState(false);
  false;

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
    locationsetter(location);
    setlocationLoading(false);
  };
  const handleNearby = () => {
    setlocationLoading(true);
    if (location === null) {
      getlocation();
    } else {
      nearbyCall();
    }
  };
  const nearbyCall = async () => {
    await Axios.post("/univarsal/search/nearby", { location: location })
      .then((res) => {
        setSearchDataApi(res.data);
        setlocationLoading(false);
        navigation.push("/(other)/FilterPage");
      })
      .catch((err) => {
        setlocationLoading(false);
        return;
      });
  };

  const mainSearch = (input) => {
    setSearchBar(input);
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
    const newTimer = setTimeout(() => {
      searchCall(input);
    }, 1000);
    setDebounceTimer(newTimer);
  };
  const searchCall = async (input) => {
    const sanitizedInput = input.replace(/\s+/g, "");

    await Axios.post("/univarsal/search/main", { input: sanitizedInput })
      .then((res) => {
        setMainsearchResult(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        setMainsearchResult(null);
      });
  };
  const searchDirect = async () => {
    if (!searchBar) {
      return;
    } else {
      Axios.post("/univarsal/search/direct", { input: searchBar })
        .then((res) => {
          setSearchDataApi(res.data);
          navigation.push("/(other)/FilterPage");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <SafeAreaView className="w-full h-screen bg-white">
      <StatusBar barStyle={"dark-content"} />
      <View className="w-full flex gap-5 px-3 h-full relative">
        <View className="px-2 relative ">
          <View className="w-full flex items-center justify-center mt-2 relative">
            <TextInput
              onChangeText={(e) => mainSearch(e)}
              className="w-full bg-zinc-200  text-xl px-4 pr-16 h-14 rounded-3xl"
              placeholder="Search heare "
            />
            <TouchableOpacity
              onPress={() => searchDirect()}
              className="absolute right-0 h-14 rounded-r-3xl px-4 fles justify-center items-center  top-0 bg-blue-500"
            >
              <AntDesign name="search1" size={30} color="white" />
            </TouchableOpacity>
            {!mainsearchResult ? null : (
              <View className="w-[100vw] px-3 py-1 h-80 flex gap-2  absolute bg-white backdrop-blur-sm top-[110%] z-10">
                <ScrollView className="w-full h-full flex">
                  {mainsearchResult.map((item, index) => (
                    <TouchableOpacity
                      onPress={() => {
                        navigation.push({
                          pathname: "/(other)/ViewRoom",
                          params: { id: item._id },
                        });
                      }}
                      key={index}
                      className="flex-row  px-2 pr-5 mb-3 py-2 rounded-3xl items-center justify-between  bg-white border-[1px] border-zinc-200"
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
        </View>
        <View className="w-full flex border-b-[1px] pb-2 border-b-zinc-200">
          <TouchableOpacity
            onPress={() => handleNearby()}
            className="py-3 rounded-full px-4 w-32 bg-blue-500 gap-2 flex-row justify-between items-center"
            activeOpacity={0.8}
          >
            {locationLoading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <>
                <FontAwesome name="location-arrow" size={24} color="white" />
                <Text className="text-white text-lg font-bold">NearBy</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Search;
