import React, { useEffect, useState } from "react";
import { router, Stack } from "expo-router";
import "../../global.css";
import { ContextProvider, userContext } from "../context/Context";

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
    if (auth) {
      router.replace("/(main)");
    } else {
      router.replace("/(auth)");
    }
  }, [auth]);
  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
};

export default _layout;
