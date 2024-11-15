import {
  View,
  Text,
  Touchable,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React from "react";

const Comments = ({ enable, setEnable, setComments, comments }: any) => {
  return (
    <View
      className={`w-[100vw] ${
        comments ? " h-[60vh]" : "h-0"
      } bg-zinc-300  duration-100 rounded-t-[40px] px-5 py-5 absolute bottom-0`}
    >
      <TouchableOpacity onPress={() => setEnable(!enable)}>
        {comments ? (
          <Text>{ comments}</Text>
        ) : (
          <ActivityIndicator size="large" color="#0000ff" />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Comments;
