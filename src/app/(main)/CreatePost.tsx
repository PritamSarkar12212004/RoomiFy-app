import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import ProfileNavigationHeader from "@/src/components/Header/ProfileNavigationHeader";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import ToggleSwitch from "toggle-switch-react-native"; // make sure you have installed this library
import * as ImagePicker from "expo-image-picker";
import Axios from "@/src/utils/api/Axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Warning from "@/src/components/Error/LongError/Warning";
import { useNavigation } from "expo-router";
import FileSize from "@/src/components/Error/LongError/FileSize";

const CreatePost = () => {
  const navigation = useNavigation();
  // Define individual states for each category toggle
  const [description, setdescription] = useState(null);
  const [price, setprice] = useState(null);
  const [family, setFamily] = useState(false);
  const [single, setSingle] = useState(false);
  const [group, setGroup] = useState(false);
  const [double, setDouble] = useState(false);
  const [independent, setIndependent] = useState(false);
  const [nonIndependent, setNonIndependent] = useState(false);
  const [bikeParking, setBikeParking] = useState(false);
  const [wifi, setWifi] = useState(false);
  const [light, setLight] = useState(false);
  const [fan, setFan] = useState(false);
  const [cooler, setCooler] = useState(false);
  const [bed, setBed] = useState(false);
  const [attachedWashroom, setAttachedWashroom] = useState(false);
  const [mainimage, setMainimage] = useState(null);
  const [child1, setChild1] = useState(null);
  const [child2, setChild2] = useState(null);
  const [child3, setChild3] = useState(null);
  const [child4, setChild4] = useState(null);
  const [child5, setChild5] = useState(null);
  const [child6, setChild6] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [closewarning, setclosewarning] = useState(false);
  const [closewarningfile, setclosewarningfile] = useState(false);
  const [filesize, setfilesize] = useState(0);
  const uploadImages = async () => {
    if (
      mainimage === null ||
      child1 === null ||
      child2 === null ||
      child3 === null ||
      child4 === null ||
      child5 === null ||
      child6 === null ||
      price === null ||
      description === null
    ) {
      setclosewarning(true);
      return;
    }
    setLoading(true);
    const formData = new FormData();
    // Append main image
    const mainImageFile = {
      uri: mainimage,
      type: "image/jpeg",
      name: "main-image.jpg",
    };
    formData.append("mainImage", mainImageFile);

    // options
    formData.append("id", token);
    formData.append("description", toString(description));
    formData.append("price", price);
    formData.append("family", family);
    formData.append("single", single);
    formData.append("group", group);
    formData.append("double", double);
    formData.append("independent", independent);
    formData.append("nonIndependent", nonIndependent);
    formData.append("bikeParking", bikeParking);
    formData.append("wifi", wifi);
    formData.append("light", light);
    formData.append("fan", fan);
    formData.append("cooler", cooler);
    formData.append("bed", bed);
    formData.append("attachedWashroom", attachedWashroom);

    // Append child images
    const childImages = [child1, child2, child3, child4, child5, child6];
    childImages.forEach((image, index) => {
      const childImageFile = {
        uri: image,
        type: "image/jpeg",
        name: `child-image-${index + 1}.jpg`,
      };
      formData.append("childImages", childImageFile);
    });

    try {
      const response = await Axios.post("/upload/product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then((response) => {
        if (response.data.status === "success") {
          console.log(response.data);
          setLoading(false);
          navigation.goBack();
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const pickImage1 = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setMainimage(result.assets[0].uri);
      setfilesize((pre) => pre + result.assets[0].fileSize);
    }
  };
  const childimgpiker1 = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setfilesize((pre) => pre + result.assets[0].fileSize);
      setChild1(result.assets[0].uri);
    }
  };
  const childimgpiker2 = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setfilesize((pre) => pre + result.assets[0].fileSize);
      setChild2(result.assets[0].uri);
    }
  };
  const childimgpiker3 = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setfilesize((pre) => pre + result.assets[0].fileSize);
      setChild3(result.assets[0].uri);
    }
  };
  const childimgpiker4 = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setfilesize((pre) => pre + result.assets[0].fileSize);
      setChild4(result.assets[0].uri);
    }
  };
  const childimgpiker5 = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setfilesize((pre) => pre + result.assets[0].fileSize);
      setChild5(result.assets[0].uri);
    }
  };
  const childimgpiker6 = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setfilesize((pre) => pre + result.assets[0].fileSize);
      setChild6(result.assets[0].uri);
    }
  };
  const tokenGEt = async () => {
    const tokendata = await AsyncStorage.getItem("token");
    setToken(tokendata);
  };
  useEffect(() => {
    tokenGEt();
  }, []);
  return (
    <View className="w-full pb-32">
      <ProfileNavigationHeader log={false} name="Upload Post" />
      <Warning
        closewarning={closewarning}
        setclosewarning={setclosewarning}
        message={" Do not fill blank"}
      />
      <FileSize
        closewarningfile={closewarningfile}
        setclosewarningfile={setclosewarningfile}
        message={
          " Do Not use HD image The totoal size should be less than 10MB"
        }
      />
      <ScrollView className="w-full ">
        <View className="w-full px-4">
          <TouchableOpacity activeOpacity={0.7} onPress={() => pickImage1()}>
            <View className="w-full h-52 border border-zinc-500 bg-zinc-200 overflow-hidden  rounded-3xl flex items-center justify-center gap-2">
              {mainimage ? (
                <Image source={{ uri: mainimage }} className="w-full h-full" />
              ) : (
                <>
                  <Ionicons
                    name="cloud-upload-outline"
                    size={60}
                    color="black"
                  />
                  <Text className="opacity-75">Master Image</Text>
                </>
              )}
            </View>
          </TouchableOpacity>

          <View className="w-full flex-row flex-wrap justify-between mt-4">
            <TouchableOpacity
              className="w-[32%] mt-3"
              activeOpacity={0.7}
              onPress={() => childimgpiker1()}
            >
              <View className="h-32 border border-zinc-400 bg-zinc-200 overflow-hidden rounded-3xl flex items-center justify-center">
                {child1 ? (
                  <Image source={{ uri: child1 }} className="w-full h-full" />
                ) : (
                  <Feather name="upload" size={30} color="black" />
                )}
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              className="w-[32%] mt-3"
              activeOpacity={0.7}
              onPress={() => childimgpiker2()}
            >
              <View className="h-32 border border-zinc-400 bg-zinc-200 overflow-hidden rounded-3xl flex items-center justify-center">
                {child2 ? (
                  <Image source={{ uri: child2 }} className="w-full h-full" />
                ) : (
                  <Feather name="upload" size={30} color="black" />
                )}
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              className="w-[32%] mt-3"
              activeOpacity={0.7}
              onPress={() => childimgpiker3()}
            >
              <View className="h-32 border border-zinc-400 bg-zinc-200 overflow-hidden rounded-3xl flex items-center justify-center">
                {child2 ? (
                  <Image source={{ uri: child3 }} className="w-full h-full" />
                ) : (
                  <Feather name="upload" size={30} color="black" />
                )}
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              className="w-[32%] mt-3"
              activeOpacity={0.7}
              onPress={() => childimgpiker4()}
            >
              <View className="h-32 border border-zinc-400 bg-zinc-200 overflow-hidden rounded-3xl flex items-center justify-center">
                {child2 ? (
                  <Image source={{ uri: child4 }} className="w-full h-full" />
                ) : (
                  <Feather name="upload" size={30} color="black" />
                )}
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              className="w-[32%] mt-3"
              activeOpacity={0.7}
              onPress={() => childimgpiker5()}
            >
              <View className="h-32 border border-zinc-400 bg-zinc-200 overflow-hidden rounded-3xl flex items-center justify-center">
                {child2 ? (
                  <Image source={{ uri: child5 }} className="w-full h-full" />
                ) : (
                  <Feather name="upload" size={30} color="black" />
                )}
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              className="w-[32%] mt-3"
              activeOpacity={0.7}
              onPress={() => childimgpiker6()}
            >
              <View className="h-32 border border-zinc-400 bg-zinc-200 overflow-hidden rounded-3xl flex items-center justify-center">
                {child2 ? (
                  <Image source={{ uri: child6 }} className="w-full h-full" />
                ) : (
                  <Feather name="upload" size={30} color="black" />
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View className="w-full px-3">
          <TextInput
            
            value={description}
            onChangeText={(text) => setdescription(text)}
            className="w-full h-44 text-lg border-[1px]  border-gray-400 rounded-lg p-2 mt-4 placeholder:items-start justify-start"
            multiline={true}
            placeholder="Description"
          />
        </View>
        <View className="w-full px-4 ">
          <TextInput
            value={price}
            onChangeText={(text) => setprice(text)}
            inputMode="numeric"
            placeholder="Rent"
            className="w-full h-16 border border-zinc-400 rounded-lg p-2 mt-4 placeholder:items-start justify-start text-xl"
          />
        </View>
        <View className="w-full mt-4 px-3">
          <Text className="text-xl mb-3">Category</Text>
          <View className="w-full flex-row flex-wrap gap-4">
            <ToggleSwitch
              isOn={family}
              onColor="green"
              offColor="red"
              label="Family"
              labelStyle={{ color: "black", fontWeight: "500" }}
              size="medium"
              onToggle={() => setFamily(!family)}
            />
            <ToggleSwitch
              isOn={single}
              onColor="green"
              offColor="red"
              label="Single"
              labelStyle={{ color: "black", fontWeight: "500" }}
              size="medium"
              onToggle={() => setSingle(!single)}
            />
            <ToggleSwitch
              isOn={group}
              onColor="green"
              offColor="red"
              label="Group"
              labelStyle={{ color: "black", fontWeight: "500" }}
              size="medium"
              onToggle={() => setGroup(!group)}
            />
            <ToggleSwitch
              isOn={double}
              onColor="green"
              offColor="red"
              label="Double"
              labelStyle={{ color: "black", fontWeight: "500" }}
              size="medium"
              onToggle={() => setDouble(!double)}
            />
            <ToggleSwitch
              isOn={independent}
              onColor="green"
              offColor="red"
              label="Independent"
              labelStyle={{ color: "black", fontWeight: "500" }}
              size="medium"
              onToggle={() => setIndependent(!independent)}
            />
            <ToggleSwitch
              isOn={nonIndependent}
              onColor="green"
              offColor="red"
              label="Non-Independent"
              labelStyle={{ color: "black", fontWeight: "500" }}
              size="medium"
              onToggle={() => setNonIndependent(!nonIndependent)}
            />
            <ToggleSwitch
              isOn={bikeParking}
              onColor="green"
              offColor="red"
              label="Bike Parking"
              labelStyle={{ color: "black", fontWeight: "500" }}
              size="medium"
              onToggle={() => setBikeParking(!bikeParking)}
            />
            <ToggleSwitch
              isOn={wifi}
              onColor="green"
              offColor="red"
              label="Wifi"
              labelStyle={{ color: "black", fontWeight: "500" }}
              size="medium"
              onToggle={() => setWifi(!wifi)}
            />
            <ToggleSwitch
              isOn={light}
              onColor="green"
              offColor="red"
              label="Light"
              labelStyle={{ color: "black", fontWeight: "500" }}
              size="medium"
              onToggle={() => setLight(!light)}
            />
            <ToggleSwitch
              isOn={fan}
              onColor="green"
              offColor="red"
              label="Fan"
              labelStyle={{ color: "black", fontWeight: "500" }}
              size="medium"
              onToggle={() => setFan(!fan)}
            />
            <ToggleSwitch
              isOn={cooler}
              onColor="green"
              offColor="red"
              label="Cooler"
              labelStyle={{ color: "black", fontWeight: "500" }}
              size="medium"
              onToggle={() => setCooler(!cooler)}
            />
            <ToggleSwitch
              isOn={bed}
              onColor="green"
              offColor="red"
              label="Bed"
              labelStyle={{ color: "black", fontWeight: "500" }}
              size="medium"
              onToggle={() => setBed(!bed)}
            />
            <ToggleSwitch
              isOn={attachedWashroom}
              onColor="green"
              offColor="red"
              label="Attached Washroom"
              labelStyle={{ color: "black", fontWeight: "500" }}
              size="medium"
              onToggle={() => setAttachedWashroom(!attachedWashroom)}
            />
          </View>
          <View className="mt-7 w-full px-10 flex justify-center items-center">
            {loading ? (
              <TouchableOpacity className="w-full py-6 bg-green-500 rounded-3xl">
                <ActivityIndicator size="large" color="white" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                className="w-full py-6 bg-green-500 rounded-3xl"
                onPress={() => uploadImages()}
              >
                <Text className="text-xl text-white  text-center">
                  Create Post
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default CreatePost;
