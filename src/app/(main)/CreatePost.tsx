import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import ProfileNavigationHeader from "@/src/components/Header/ProfileNavigationHeader";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import ToggleSwitch from "toggle-switch-react-native"; // make sure you have installed this library
import * as ImagePicker from "expo-image-picker";
import Axios from "@/src/utils/api/Axios";
import Warning from "@/src/components/Error/LongError/Warning";
import { useNavigation } from "expo-router";
import FileSize from "@/src/components/Error/LongError/FileSize";
import { userContext } from "../../context/Context";
import * as ImageManipulator from "expo-image-manipulator";
import * as Location from "expo-location";
import axios from "axios";

const CreatePost = () => {
  const { token, getData } = userContext();
  const navigation = useNavigation();
  // Define individual states for each category toggle
  const [description, setdescription] = useState("");
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
  const [loading, setLoading] = useState(false);
  const [closewarning, setclosewarning] = useState(false);
  const [closewarningfile, setclosewarningfile] = useState(false);
  const [postTitle, setPostTitle] = useState(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );

  const getlocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  };
  const uploadImages = async () => {
    getlocation();

    if (
      !location ||
      !mainimage ||
      !child1 ||
      !child2 ||
      !child3 ||
      !child4 ||
      !child5 ||
      !child6 ||
      !price ||
      !postTitle ||
      description.trim() === ""
    ) {
      setclosewarning(true);
      return;
    }
    setLoading(true);

    const uploadToCloudinary = async (imageUri) => {
      try {
        const fileExtension = imageUri.split(".").pop();
        const formData = new FormData();
        formData.append("file", {
          uri: imageUri,
          type: `image/${fileExtension}`,
          name: `uploaded_image.${fileExtension}`,
        });
        formData.append("upload_preset", "RoomiFy");

        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dftt4ow6q/image/upload",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        return response.data.secure_url;
      } catch (error) {
        // Log error if there is an issue with the upload
        console.error(
          `Error uploading image: ${imageUri}`,
          error.response || error
        );
        throw error; // Rethrow to stop execution if error occurs
      }
    };

    try {
      // Upload all images concurrently
      const [
        mainImageUrl,
        child1Url,
        child2Url,
        child3Url,
        child4Url,
        child5Url,
        child6Url,
      ] = await Promise.all([
        uploadToCloudinary(mainimage),
        uploadToCloudinary(child1),
        uploadToCloudinary(child2),
        uploadToCloudinary(child3),
        uploadToCloudinary(child4),
        uploadToCloudinary(child5),
        uploadToCloudinary(child6),
      ]);

      // Proceed with the API request if all images are uploaded successfully
      const response = await Axios.post("/upload/product", {
        id: token,
        postTitle,
        location,
        description,
        price,
        family,
        single,
        group,
        double,
        independent,
        nonIndependent,
        bikeParking,
        wifi,
        light,
        fan,
        cooler,
        bed,
        attachedWashroom,
        mainImage: mainImageUrl,
        childImg1: child1Url,
        childImg2: child2Url,
        childImg3: child3Url,
        childImg4: child4Url,
        childImg5: child5Url,
        childImg6: child6Url,
      });
      const reset = () => {
        setdescription("");
        setprice(null);
        setFamily(false);
        setSingle(false);
        setGroup(false);
        setDouble(false);
        setIndependent(false);
        setNonIndependent(false);
        setBikeParking(false);
        setWifi(false);
        setLight(false);
        setFan(false);
        setCooler(false);
        setBed(false);
        setAttachedWashroom(false);
        setMainimage(null);
        setChild1(null);
        setChild2(null);
        setChild3(null);
        setChild4(null);
        setChild5(null);
        setChild6(null);
      };
      if (response.data.status === "success") {
        getData();
        setLoading(false);
        reset();
        navigation.goBack();
      } else {
        // Handle unexpected API response
        console.error("Unexpected API response", response.data);
        setLoading(false);
      }
    } catch (error) {
      // Log any other errors in the try block (API call or image upload errors)
      console.error("Error uploading images or submitting product:", error);
      setLoading(false);
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
      const compressedImage = await ImageManipulator.manipulateAsync(
        result.assets[0].uri,
        [{ resize: { width: result.assets[0].width * 0.8 } }], // Resize to 80% of the original width
        { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG } // Compress to 80% quality
      );
      setMainimage(compressedImage.uri);
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
      const compressedImage = await ImageManipulator.manipulateAsync(
        result.assets[0].uri,
        [{ resize: { width: result.assets[0].width * 0.8 } }], // Resize to 80% of the original width
        { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG } // Compress to 80% quality
      );
      setChild1(compressedImage.uri);
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
      const compressedImage = await ImageManipulator.manipulateAsync(
        result.assets[0].uri,
        [{ resize: { width: result.assets[0].width * 0.8 } }], // Resize to 80% of the original width
        { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG } // Compress to 80% quality
      );
      setChild2(compressedImage.uri);
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
      const compressedImage = await ImageManipulator.manipulateAsync(
        result.assets[0].uri,
        [{ resize: { width: result.assets[0].width * 0.8 } }], // Resize to 80% of the original width
        { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG } // Compress to 80% quality
      );
      setChild3(compressedImage.uri);
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
      const compressedImage = await ImageManipulator.manipulateAsync(
        result.assets[0].uri,
        [{ resize: { width: result.assets[0].width * 0.8 } }], // Resize to 80% of the original width
        { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG } // Compress to 80% quality
      );
      setChild4(compressedImage.uri);
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
      const compressedImage = await ImageManipulator.manipulateAsync(
        result.assets[0].uri,
        [{ resize: { width: result.assets[0].width * 0.8 } }], // Resize to 80% of the original width
        { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG } // Compress to 80% quality
      );
      setChild5(compressedImage.uri);
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
      const compressedImage = await ImageManipulator.manipulateAsync(
        result.assets[0].uri,
        [{ resize: { width: result.assets[0].width * 0.8 } }], // Resize to 80% of the original width
        { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG } // Compress to 80% quality
      );
      setChild6(compressedImage.uri);
    }
  };
  const priceValidation = (phone) => {
    // Check if phone contains any non-numeric characters or dots
    const regex = /^[0-9]*$/; // Allows numeric characters or an empty string

    if (typeof phone !== "string") {
      alert("Phone number must be a string.");
      return;
    }

    if (!regex.test(phone)) {
      alert(
        "Phone number can only contain numeric characters and no dots or special characters."
      );
      return;
    }

    if (phone.length > 10) {
      alert("Phone number must be between 10 to 15 digits.");
      return;
    }

    // Allow empty string to clear the input
    setprice(phone); // Update phone state if valid
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
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
                  <Image
                    source={{ uri: mainimage }}
                    className="w-full h-full"
                  />
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
              onChangeText={(text) => priceValidation(text)}
              inputMode="numeric"
              placeholder="Rent"
              className="w-full h-16 border border-zinc-400 rounded-lg p-2 mt-4 placeholder:items-start justify-start text-xl"
            />
            <TextInput
              value={postTitle}
              onChangeText={(text) => setPostTitle(text)}
              keyboardType="default"
              placeholder="Title of the post"
              className="w-full h-16 border border-zinc-400 rounded-lg p-2 mt-4 placeholder:items-start justify-start text-xl"
            />
            {/* <View className="w-full mt-4 flex items-center justify-center">
              <TouchableOpacity onpre className="px-12 rounded-3xl gap-3 py-3 bg-blue-500  flex-row items-center justify-center">
                <FontAwesome name="location-arrow" size={30} color="white" />
                <Text className=" text-white">Location</Text>
              </TouchableOpacity>
            </View> */}
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
    </>
  );
};

export default CreatePost;
