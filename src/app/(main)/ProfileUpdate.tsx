import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import ProfileNavigationHeader from "@/src/components/Header/ProfileNavigationHeader";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useRoute } from "@react-navigation/native";
import { Icons } from "@/src/constants/Icons";
import * as ImagePicker from "expo-image-picker";
import Axios from "../../utils/api/Axios";
import Warning from "@/src/components/Error/LongError/Warning";

const ProfileUpdate = () => {
  const { data, setchanger } = useRoute().params;
  const id = data.id;
  const [name, setName] = useState(data.name);
  const [email, setEmail] = useState(data.email);
  const [location, setlocation] = useState(data.city);
  const [profileImage, setprofileImage] = useState(data.profile);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.canceled) {
      setprofileImage(result.assets[0].uri);
    }
  };
  console.log(id); // Make sure this outputs the correct id from the route

  const uploadDataBackend = async () => {
    setLoading(true);
    if (!profileImage) {
      console.log(" no image");
    }
    // Get the file extension (e.g., .jpg, .png)
    const fileExtension = profileImage.split(".").pop();
    const formData = new FormData();
    formData.append("image", {
      uri: profileImage,
      type: `image/${fileExtension}`, // Dynamically set the file type
      name: `uploaded_image.${fileExtension}`, // Dynamically set the file name
    });
    formData.append("id", id); // Add the id here directly to the formData
    formData.append("name", name); // You can also append other fields like name, email, location if needed
    formData.append("email", email);
    formData.append("location", location);

    try {
      const response = await Axios.post("/user/profile/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setchanger(true);
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  const [closewarning, setclosewarning] = useState(false);

  const validation = () => {
    if (name === "" || email === "" || location === "" || profileImage === "") {
      setclosewarning(!closewarning);
    } else {
      uploadDataBackend();
    }
  };
  return (
    <>
      {data ? (
        <View className="w-full h-screen relative">
          <Warning
            closewarning={closewarning}
            setclosewarning={setclosewarning}
            message={" Do not fill blank"}
          />
          <ProfileNavigationHeader name={"Edit Profile"} log={false} />
          <View className="w-full px-5 flex gap-7 mt-5">
            <View className="w-full flex items-center justify-center">
              <TouchableOpacity
                className="relative"
                onPress={() => pickImage()}
              >
                <Image
                  source={{
                    uri: profileImage,
                  }}
                  className="w-44 h-44 rounded-full"
                />
                <View className="absolute right-5 bottom-5">
                  <Image source={Icons.pen} className="right-0 h-12 w-12" />
                </View>
              </TouchableOpacity>
            </View>
            <View className="w-full flex gap-5">
              <View>
                <Text className=" opacity-65">
                  Please Fill your profile details
                </Text>
              </View>
              <View className="w-full relative">
                <TextInput
                  value={name}
                  onChangeText={(text) => setName(text)}
                  placeholder={name}
                  className="w-full border-[1px] border-zinc-400 px-3 h-16  rounded-3xl items-center justify-center text-xl"
                />
                <View className="absolute right-3 top-4">
                  <AntDesign name="user" size={24} color="black" />
                </View>
              </View>
              <View className="w-full relative">
                <TextInput
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                  placeholder={email}
                  className="w-full border-[1px] border-zinc-400 px-3 h-16  rounded-3xl items-center justify-center text-xl"
                />
                <View className="absolute right-3 top-5">
                  <AntDesign name="phone" size={24} color="black" />
                </View>
              </View>
              <View className="w-full relative">
                <TextInput
                  placeholder={location}
                  value={location}
                  onChangeText={(text) => setlocation(text)}
                  className="w-full border-[1px] border-zinc-400 px-3 h-16  rounded-3xl items-center justify-center text-xl"
                />
                <View className="absolute right-3 top-5">
                  <FontAwesome6 name="location-arrow" size={24} color="black" />
                </View>
              </View>
            </View>
          </View>
          <View className="absolute w-full bottom-10 flex items-center justify-center ">
            {loading ? (
              <TouchableOpacity
                className="px-20 py-6 bg-green-500 rounded-3xl flex-row items-center justify-center gap-2"
                activeOpacity={0.8}
              >
                <ActivityIndicator size="large" color="#0000ff" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => validation()}
                className="px-20 py-6 bg-green-500 rounded-3xl flex-row items-center justify-center gap-2"
                activeOpacity={0.8}
              >
                <Text className="text-2xl  text-white">Update</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      ) : (
        <View className="w-full h-screen  flex justify-center  items-center">
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
    </>
  );
};

export default ProfileUpdate;
