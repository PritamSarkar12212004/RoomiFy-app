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
import { Alert } from "react-native";

const ProfileUpdate = () => {
  const { profileData } = userContext();
  const navigation = useNavigation();
  const id = profileData.id;
  const [name, setName] = useState(profileData.name);
  const [phone, setPhone] = useState(String(profileData.phone));
  const [location, setlocation] = useState(profileData.city);
  const [profileImage, setprofileImage] = useState(profileData.profile);
  const [loading, setLoading] = useState(false);
  const [loadingName, setloadingName] = useState(false);
  const [loadingNumber, setloadingNumber] = useState(false);
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
            Axios.post("/user/profile/update/profile", {
              id: id,
              profileImageUrl: response.data.secure_url,
            })
              .then((res) => {
                if (res.status === 200) {
                  navigation.goBack();
                  setLoading(false);
                  setupdateloading(false);
                } else {
                  Alert.alert("Phone number already exists");
                  setLoading(false);
                  setupdateloading(false);
                }
              })
              .catch((error) => {
                console.log(error);
              });
          } catch (error) {
            console.log(error);
          }
        });

      // After successful upload, you can update profile data with new image URL
    } catch (error) {
      console.error("Upload failed", error);
      setLoading(false);
    }
  };
  const uploadBackendProfileName = async () => {
    setupdateloading(true);
    setloadingName(true);
    try {
      Axios.post("/user/profile/update/name", { id: id, name: name })
        .then((response) => {
          navigation.goBack();
          setLoading(false);
          setupdateloading(false);
        })
        .catch((err) => {
          navigation.goBack();
          setLoading(false);
          setupdateloading(false);
        });
    } catch (error) {
      Alert.alert("something went wrong");
    }
  };
  const uploadBackendNumber = async () => {
    setupdateloading(true);
    setloadingNumber(true);
    try {
      Axios.post("/user/profile/update/number", { id: id, phone: phone })
        .then((response) => {
          if (response.status === 200) {
            navigation.goBack();
            setloadingNumber(false);
            setupdateloading(false);
          } else {
            Alert.alert("Phone number already exists");
            setLoading(false);
            setupdateloading(false);
          }
        })
        .catch((err) => {
          console.log(err.status);
          if (err.status === 400) {
            Alert.alert("Phone number already exists");
            setloadingNumber(false);
            setupdateloading(false);
          } else {
            Alert.alert("Somthing went wrong");
            setLoading(false);
            setupdateloading(false);
          }
        });
    } catch (error) {
      Alert.alert("something went wrong");
    }
  };

  return (
    <>
      <StatusBar barStyle={"light-content"} />
      <View className="w-full h-screen">
        <View className="w-full bg-blue-500 h-[42vh] rounded-b-[40px]">
          <SafeAreaView className="w-full px-7">
            <View className="w-full h-full  ">
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
              <View className="w-full flex items-center mt-3 justify-center ">
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
                <View className="w-full  flex items-center justify-center">
                  {loading ? (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      className="px-12 py-4 mt-3 bg-blue-600 rounded-2xl "
                    >
                      <ActivityIndicator size="small" color="white" />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => uploadDataBackend()}
                      activeOpacity={0.8}
                      className="px-12 py-4 mt-3 bg-blue-600 rounded-2xl "
                    >
                      <Text className="text-white text-xl">Update</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          </SafeAreaView>
        </View>
        <View className="w-full px-7 pt-5">
          <Text className="text-2xl font-bold  ">Update Details</Text>
          <View className="w-full flex gap-4 mt-3">
            <View className="w-full flex-row items-center gap-2 justify-between">
              <TextInput
                className=" w-[70%] border-[1px] border-zinc-400  h-16 text-xl pl-6 rounded-2xl"
                placeholder="Name"
                value={name}
                onChangeText={(text) => setName(text)}
              />
              {loadingName ? (
                <TouchableOpacity className="flex-auto bg-blue-500 py-4 rounded-2xl items-center justify-center">
                  <ActivityIndicator size="small" color="white" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => uploadBackendProfileName()}
                  className="flex-auto bg-blue-500 py-4 rounded-2xl items-center justify-center"
                >
                  <Text className=" text-lg text-white ">Update</Text>
                </TouchableOpacity>
              )}
            </View>
            <View className="w-full flex-row items-center gap-2 justify-between">
              <TextInput
                className="w-[70%] border-[1px] border-zinc-400  h-16 text-xl pl-6 rounded-2xl"
                placeholder="Phone number"
                keyboardType="number-pad"
                value={phone}
                onChangeText={(text) => setPhone(text)}
              />
              {loadingNumber ? (
                <TouchableOpacity className="flex-auto bg-blue-500 py-4 rounded-2xl items-center justify-center">
                  <ActivityIndicator size="small" color="white" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => uploadBackendNumber()}
                  className="flex-auto bg-blue-500 py-4 rounded-2xl items-center justify-center"
                >
                  <Text className=" text-lg text-white ">Update</Text>
                </TouchableOpacity>
              )}
            </View>
            <View className="w-full flex-row items-center gap-2 justify-between">
              <TextInput
                className="w-[70%] border-[1px] border-zinc-400  h-16 text-xl pl-6 rounded-2xl"
                placeholder="Name"
                value={location}
                onChangeText={(text) => setlocation(text)}
              />
              <TouchableOpacity className="flex-auto bg-blue-500 py-4 rounded-2xl items-center justify-center">
                <Text className=" text-lg text-white ">Update</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default ProfileUpdate;
