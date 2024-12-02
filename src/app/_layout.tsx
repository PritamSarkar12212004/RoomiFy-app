import React, { useEffect } from "react";
import { router, Stack } from "expo-router";
import "../../global.css";
import { ContextProvider, userContext } from "../context/Context";
import * as SplashScreen from "expo-splash-screen";

// Keep the splash screen visible until we decide to hide it
SplashScreen.preventAutoHideAsync();

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
    const checkAuth = async () => {
      if (auth === null) {
        // Wait until authentication is resolved
        return;
      } else if (auth === false) {
        router.replace("/(auth)"); // Navigate to auth screens.
      } else {
        router.replace("/(main)"); // Navigate to main screens.
      }

      // Hide splash screen after navigation
      await SplashScreen.hideAsync();
    };

    checkAuth();
  }, [auth]);

  if (auth === null) {
    return null; // Render nothing until authentication is resolved
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
};

export default _layout;
