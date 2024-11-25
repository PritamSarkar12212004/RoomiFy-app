import {
  View,
  Share,
  Text,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import AdminPostHeader from "@/src/components/Header/admin_PostHeader/AdminPostHeader";
import { userContext } from "../../context/Context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Axios from "@/src/utils/api/Axios";
import { useNavigation, useRouter } from "expo-router";

const PostControllRoom = () => {
  const [token, settoken] = useState(null);
  const [postloading, setpostloading] = useState(false);
  const navigation = useRouter();
  const navi = useNavigation();
  const { postRommControll } = userContext();
  const [deltloading, setdeltloading] = useState(false);
  const PostDeleteFun = async (id) => {
    setdeltloading(true);
    await Axios.post("/room/delete", { token, id }).then((res) => {
      navigation.push("/(main)/Profile");
      setdeltloading(false);
    });
  };
  const postControllerAdder = async (id) => {
    setpostloading(true);
    Axios.post("/room/postAdd", { id: id }).then((res) => {
      setpostloading(false);
      navigation.push("/(main)/Profile");
    });
  };
  const postControllerRemove = async (id) => {
    setpostloading(true);
    Axios.post("/room/postRemove", { id: id }).then((res) => {
      setpostloading(false);
      navigation.push("/(main)/Profile");
    });
  };
  const getTOkenFun = async () => {
    const data = await AsyncStorage.getItem("token");
    settoken(data);
  };
  useEffect(() => {
    getTOkenFun();
  }, []);

  return (
    <View className="w-full h-screen relative">
      <AdminPostHeader name={"Post Detiles"} />
      <ScrollView className="mb-16">
        <View className="w-full px-4 pt-3  flex gap-3">
          <Image
            source={{ uri: postRommControll.mainImage }}
            className="w-full h-80 "
          />
          <Image
            source={{ uri: postRommControll.childImg1 }}
            className="w-full h-80 "
          />
          <Image
            source={{ uri: postRommControll.childImg2 }}
            className="w-full h-80 "
          />
          <Image
            source={{ uri: postRommControll.childImg3 }}
            className="w-full h-80 "
          />
          <Image
            source={{ uri: postRommControll.childImg4 }}
            className="w-full h-80 "
          />
          <Image
            source={{ uri: postRommControll.childImg5 }}
            className="w-full h-80"
          />
          <Image
            source={{ uri: postRommControll.childImg6 }}
            className="w-full h-80"
          />
        </View>
      </ScrollView>
      <View className="w-full h-16 py-1  backdrop-blur-sm bg-white  absolute bottom-0 flex-row justify-between items-center px-4">
        {postRommControll.postCondition ? (
          <TouchableOpacity
            onPress={() => postControllerAdder(postRommControll._id)}
            activeOpacity={0.7}
            className="h-full flex-row w-[45%]  bg-red-500 rounded-2xl items-center gap-2 justify-center"
          >
            {postloading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <>
                <MaterialIcons name="hide-source" size={24} color="white" />
                <Text className="text-xl font-bold text-white">Hide Post</Text>
              </>
            )}
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => postControllerRemove(postRommControll._id)}
            activeOpacity={0.7}
            className="h-full flex-row w-[45%]  bg-blue-500 rounded-2xl items-center gap-2 justify-center"
          >
            {postloading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <>
                <MaterialIcons name="hide-source" size={24} color="white" />
                <Text className="text-xl font-bold text-white">
                  Unhide Post
                </Text>
              </>
            )}
          </TouchableOpacity>
        )}

        {deltloading ? (
          <TouchableOpacity
            activeOpacity={0.7}
            className="h-full flex-row w-[45%]  bg-red-500 rounded-2xl items-center gap-2 justify-center"
          >
            <ActivityIndicator color="white" size={24} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => PostDeleteFun(postRommControll._id)}
            activeOpacity={0.7}
            className="h-full flex-row w-[45%]  bg-red-500 rounded-2xl items-center gap-2 justify-center"
          >
            <MaterialIcons name="delete" size={24} color="white" />
            <Text className="text-xl font-bold text-white">Delete Post</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default PostControllRoom;
