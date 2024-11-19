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

import { Icons } from "@/src/constants/Icons";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { useNavigation } from "expo-router";
import { userContext } from "../../context/Context";
import Warning from "@/src/components/Error/LongError/Warning";
import Axios from "@/src/utils/api/Axios";
import * as ImageManipulator from "expo-image-manipulator";

const ProfileUpdate = () => {
  const { profileData } = userContext();
  const navigation = useNavigation();

  const id = profileData.id;
  const [name, setName] = useState(profileData.name);
  const [phone, setPhone] = useState(profileData.phone);
  const [location, setlocation] = useState(profileData.city);
  const [profileImage, setprofileImage] = useState(profileData.profile);
  const [loading, setLoading] = useState(false);

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
      console.log("No image selected");
      return;
    }
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
      setclosewarning(true);
    } else {
      uploadDataBackend();
    }
  };

  return (
    <View className="w-full h-screen relative">
      <Warning
        closewarning={closewarning}
        setclosewarning={setclosewarning}
        message={"Do not leave fields blank."}
      />
      <ProfileNavigationHeader name={"Edit Profile"} log={false} />
      <View className="w-full px-5 flex gap-7 mt-5">
        <View className="w-full flex items-center justify-center">
          <TouchableOpacity className="relative" onPress={pickImage}>
            <Image
              source={{ uri: profileImage }}
              className="w-44 h-44 rounded-full"
            />
            <View className="absolute right-5 bottom-5">
              <Image source={Icons.pen} className="right-0 h-12 w-12" />
            </View>
          </TouchableOpacity>
        </View>
        <View className="w-full flex gap-5">
          <Text className="opacity-65">
            Please fill in your profile details
          </Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Name"
            className="w-full border-[1px] border-zinc-400 px-3 h-16 rounded-3xl text-xl"
          />
          <TextInput
            value={phone}
            onChangeText={setPhone}
            placeholder="Phone"
            className="w-full border-[1px] border-zinc-400 px-3 h-16 rounded-3xl text-xl"
          />
          <TextInput
            value={location}
            onChangeText={setlocation}
            placeholder="Location"
            className="w-full border-[1px] border-zinc-400 px-3 h-16 rounded-3xl text-xl"
          />
        </View>
      </View>

      <View className="absolute w-full bottom-10 flex items-center justify-center">
        {loading ? (
          <TouchableOpacity className="px-20 py-6 bg-green-500 rounded-3xl flex-row items-center justify-center gap-2">
            <ActivityIndicator size="large" color="#0000ff" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={validation}
            className="px-20 py-6 bg-green-500 rounded-3xl flex-row items-center justify-center gap-2"
          >
            <Text className="text-2xl text-white">Update</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default ProfileUpdate;
