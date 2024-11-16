import React, { useEffect, useState } from "react";
import { router, Stack } from "expo-router";
import "../../global.css";
import { ContextProvider, userContext } from "../context/Context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native";

const _layout = () => {
  return (
    <ContextProvider>
      <MainLayout />
    </ContextProvider>
  );
};

const MainLayout = () => {
  const { auth, authSetter } = userContext();
  useEffect(() => {
    if (auth) {
      router.replace("/(main)");
    } else {
      router.replace("/(auth)");
    }
  }, []);

  return (
    <>
      {auth ? (
        <Stack screenOptions={{ headerShown: false }} />
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
    </>
  );
};

export default _layout;
