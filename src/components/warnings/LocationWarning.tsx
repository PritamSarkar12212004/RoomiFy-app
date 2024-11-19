import { View, Text, Image } from "react-native";
import React from "react";
import Modal from "react-native-modal";
import { userContext } from "../../context/Context";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "expo-router";
const LocationWarning = () => {
  const navigation = useNavigation();
  const { locationWarning, setLocationWarning } = userContext();
  const locationWarningHandler = () => {
      setLocationWarning(!locationWarning);
      navigation.goBack()
  };
  return (
    <Modal
      isVisible={!locationWarning}
      onBackdropPress={() => setLocationWarning(!locationWarning)}
      onBackButtonPress={() => setLocationWarning(!locationWarning)}
      backdropColor="rgba(0, 0, 0, 0.5)"
    >
      <View className="w-full h-screen flex items-center justify-center">
        <View className="w-80 h-96 bg-white  rounded-3xl flex justify-between  px-5 py-8">
          <View className="w-full flex items-center justify-center">
            <Image
              source={require("../../assets/Error/warning.png")}
              className="w-32 h-32"
            />
          </View>
          <View className="w-full flex justify-center items-center">
            <Text className="text-2xl font-bold text-center">
              Torn on Location
            </Text>
            <Text className="text-lg opacity-55 text-center">
              To track rooms, turn on your location for the best experience.
            </Text>
          </View>
          <View className="w-full flex justify-center items-center px-5">
            <TouchableOpacity
              className=" w-full  py-5 rounded-3xl px-5 bg-blue-500 lex justify-center items-center"
              activeOpacity={0.8}
              onPress={() => locationWarningHandler()}
            >
              <Text className="text-white text-2xl font-bold">OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default LocationWarning;
