import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import React, { useState } from "react";

import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { useNavigation } from "expo-router";
import { userContext } from "../../context/Context";
import Axios from "@/src/utils/api/Axios";
import * as ImageManipulator from "expo-image-manipulator";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";

const ProfileUpdate = () => {
  const { profileData } = userContext();
  const navigation = useNavigation();
  const id = profileData.id;
  const [name, setName] = useState(profileData.name);
  const [phone, setPhone] = useState(String(profileData.phone));
  const [location, setlocation] = useState(profileData.city);
  const [profileImage, setprofileImage] = useState(profileData.profile);
  const [loading, setLoading] = useState(false);
  const [updateloading, setupdateloading] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      const compressedImage = await ImageManipulator.manipulateAsync(
        result.assets[0].uri,
        [{ resize: { width: result.assets[0].width * 0.8 } }], // Resize to 80% of the original width
        { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG } // Compress to 80% quality
      );

      setprofileImage(compressedImage.uri); // Save compressed image URI
    }
  };

  const uploadDataBackend = async () => {
    if (!profileImage) {
      return;
    }
    setupdateloading(true);
    setLoading(true);

    const fileExtension = profileImage.split(".").pop();
    const formData = new FormData();

    // Ensure the file is accessible and provide MIME type correctly
    const fileData = {
      uri: profileImage,
      type: `image/${fileExtension}`, // Set the MIME type dynamically
      name: `uploaded_image.${fileExtension}`, // Dynamically set the name
    };

    formData.append("file", fileData);
    formData.append("upload_preset", "RoomiFy");

    try {
      const response = await axios
        .post(
          "https://api.cloudinary.com/v1_1/dftt4ow6q/image/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          try {
            Axios.post("/user/profile/update", {
              id: id,
              name: name,
              phone: phone,
              location: location,
              profileImageUrl: response.data.secure_url,
            });
          } catch (error) {
            console.log(error);
          }
        });

      // After successful upload, you can update profile data with new image URL
      navigation.goBack();
      setLoading(false);
      setupdateloading(false);
    } catch (error) {
      console.error("Upload failed", error);
      setLoading(false);
    }
  };

  const [closewarning, setclosewarning] = useState(false);

  const validation = () => {
    if (
      name === "" ||
      phone === null ||
      location === "" ||
      profileImage === ""
    ) {
    } else {
      uploadDataBackend();
    }
  };

  return (
    <>
      <StatusBar barStyle={"light-content"} />
      <View className="w-full h-screen">
        <View className="w-full bg-blue-500 h-96 rounded-b-[40px]">
          <SafeAreaView className="w-full px-7">
            <View className="w-full h-full justify-between pb-7">
              <View className="mt-5 flex-row justify-between items-center">
                <TouchableOpacity
                  className="h-12 w-12 rounded-full bg-white flex justify-center items-center"
                  onPress={() => navigation.goBack()}
                >
                  <AntDesign name="arrowleft" size={30} color="black" />
                </TouchableOpacity>
                <Text className="text-2xl text-white">Update Profile</Text>
                <View className="h-12 w-12" />
              </View>
              <View className="w-full flex items-center justify-center ">
                <TouchableOpacity onPress={pickImage}>
                  <Image
                    source={{ uri: profileImage }}
                    className="w-40 h-40 rounded-full"
                  />
                </TouchableOpacity>
                <View className="mt-5">
                  <Text className="text-2xl  font-bold text-white">
                    {profileData.name}
                  </Text>
                </View>
              </View>
            </View>
          </SafeAreaView>
        </View>
        <View className="w-full px-7 pt-5">
          <Text className="text-2xl font-bold  ">Update Details</Text>
          <View className="w-full flex gap-4 mt-3">
            <TextInput
              className="w-full border-[1px] border-zinc-400  h-16 text-xl pl-6 rounded-2xl"
              placeholder="Name"
              value={name}
              onChangeText={(text) => setName(text)}
            />
            <TextInput
              className="w-full border-[1px] border-zinc-400  h-16 text-xl pl-6 rounded-2xl"
              placeholder="Phone number"
              keyboardType="number-pad"
              value={phone}
              onChangeText={(text) => setPhone(text)}
            />

            <TextInput
              className="w-full border-[1px] border-zinc-400  h-16 text-xl pl-6 rounded-2xl"
              placeholder="Name"
              value={location}
              onChangeText={(text) => setlocation(text)}
            />
          </View>
        </View>
        <View className="w-full px-20 pt-10">
          {updateloading ? (
            <TouchableOpacity
              onPress={() => validation()}
              className="  w-full py-7 bg-blue-500 rounded-2xl flex items-center justify-center"
            >
              <ActivityIndicator size="large" color="#fff" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => validation()}
              className="  w-full py-7 bg-blue-500 rounded-2xl flex items-center justify-center"
            >
              <Text className="text-xl font-bold text-white">
                Update Profile
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </>
  );
};

export default ProfileUpdate;
