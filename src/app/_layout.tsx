import React, { useEffect, useState } from "react";
import { router, Stack } from "expo-router";
import "../../global.css";
import { ContextProvider, userContext } from "../context/Context";
import { Text } from "react-native";
import { View } from "react-native";
import { Image } from "react-native";

const _layout = () => {
  return (
    <ContextProvider>
      <MainLayout />
    </ContextProvider>
  );
};

const MainLayout = () => {
  const { auth } = userContext();
  useEffect(() => {
    if (auth === null) {
      // Stay on the current page until authentication is resolved.
      return;
    } else if (auth === false) {
      router.replace("/(auth)"); // Navigate to auth screens.
    } else {
      router.replace("/(main)"); // Navigate to main screens.
    }
  }, [auth]);
  if (auth === null) {
    return (
      <View className="w-full h-screen flex justify-center items-center">
        <Image
          source={require("../assets/Loading/ani.gif")}
          className="h-40 w-40"
        />
      </View>
    );
  }
  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
};

export default _layout;
