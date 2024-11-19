import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import CommentErro from "@/src/components/Error/comment/CommentErro";
import Axios from "@/src/utils/api/Axios";
import { userContext } from "../../context/Context";

const Comments = ({ comments, token, productID }: any) => {
  const { commentSetter } = userContext();
  const [commentitem, setcommentitem] = useState(null);
  const [full, setfull] = useState(false);
  const [time, settime] = useState(false);
  const validation = () => {
    if (!commentitem) {
      settime(true);
    } else {
      Axios.post("/room/comment", { token, productID, commentitem }).then(
        (res) => {
          commentSetter();
        }
      );
    }
  };
  return (
    <View
      className={`w-[100vw] ${
        full ? " h-[90%]" : " h-1/2"
      } bg-zinc-200 bg-opacity-50 duration-100 rounded-t-[40px] px-5 py-5 absolute bottom-0`}
      style={{
        backdropFilter: "blur(5px)", // Adding a subtle blur effect
      }}
    >
      <View className="w-full  flex flex-row  justify-between items-center">
        <TouchableOpacity
          onPress={() => commentSetter()}
          className="h-10 w-10 rounded-full bg-zinc-300 flex justify-center items-center"
        >
          <Entypo name="cross" size={30} color="black" />
        </TouchableOpacity>

        {full ? (
          <TouchableOpacity
            onPress={() => setfull(!full)}
            className="h-10 w-10 rounded-full bg-zinc-300  flex justify-center items-center"
          >
            <AntDesign name="down" size={30} color="black" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => setfull(!full)}
            className="h-10 w-10 rounded-full bg-zinc-300  flex justify-center items-center"
          >
            <AntDesign name="up" size={30} color="black" />
          </TouchableOpacity>
        )}
      </View>
      <View className="flex-auto  flex justify-between pt-5">
        <View className="w-full relative">
          <TextInput
            placeholder="Add your Comment"
            className="w-full h-16 border-b-[1px] border-zinc-400 text-xl pr-16"
            value={commentitem}
            onChangeText={(text) => setcommentitem(text)}
          />
          <View className="absolute right-0 top-0 h-16 flex items-center justify-center">
            <TouchableOpacity onPress={validation}>
              <Ionicons name="send" size={30} color="blue" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView className="w-full" showsVerticalScrollIndicator={false}>
          {comments.map((item, index) => (
            <View
              key={index}
              className="w-full flex flex-row gap-3 flex-wrap py-2 border-b-[1px] mt-2 border-zinc-400"
            >
              <Text className="text-wrap">Cooment: {item.commentsItem}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
      <CommentErro time={time} settime={settime} />
    </View>
  );
};

export default Comments;
