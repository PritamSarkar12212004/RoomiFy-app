import { View, Text, Image } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import { userContext } from "../../context/Context";

const _layout = () => {
  const { profileData } = userContext();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false, // Hide label text under icons
        tabBarActiveTintColor: "#1E90FF", // Active tab icon color
        tabBarInactiveTintColor: "#B0B0B0", // Inactive tab icon color
        tabBarStyle: {
          backgroundColor: "#fff", // Tab bar background color
          borderTopWidth: 1, // Border width at the top of the tab bar
          borderTopColor: "#ddd", // Light grey border color
          height: 70, // Height of the tab bar
          paddingBottom: 5, // Bottom padding to give more space
          shadowColor: "#000", // Add shadow for depth
          shadowOffset: { width: 0, height: -2 }, // Shadow positioning
          shadowOpacity: 0.1, // Shadow opacity
          shadowRadius: 5, // Shadow radius for smoother shadow
          elevation: 5, // Elevation for Android devices
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={35} color={color} />
          ),
        }}
      />

      {/* Create Post Tab */}
      <Tabs.Screen
        name="CreatePost"
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="pluscircleo" size={50} color={color} />
          ),
        }}
      />

      {/* Profile Tab with Conditional Image */}
      <Tabs.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ color, size }) => (
            <>
              {profileData ? (
                <Image
                  source={{ uri: profileData.profile }}
                  style={{
                    width: 45, // Adjust image width
                    height: 45, // Adjust image height
                    borderRadius: 20, // Make it a circle
                    borderWidth: 2, // Add border around profile image
                    borderColor: color, // Border color based on tab color
                  }}
                />
              ) : (
                <AntDesign name="user" size={35} color={color} />
              )}
            </>
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;
