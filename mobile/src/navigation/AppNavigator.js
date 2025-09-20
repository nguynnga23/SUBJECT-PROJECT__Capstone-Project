import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/Home/HomeScreen";
import SearchScreen from "../screens/Search/SearchScreen";
import Bookmark from "../screens/Bookmark/Bookmark";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import LoginScreen from "../screens/Auth/LoginScreen";
import NotificationScreen from "../screens/Home/Notification/NotificationScreen";
import ArticleDetail from "../screens/Home/Article/ArticleDetail";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs({ onLogout }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Home") iconName = "home-outline";
          else if (route.name === "Search") iconName = "search-outline";
          else if (route.name === "Bookmark") iconName = "bookmark-outline";
          else iconName = "person-outline";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#1a73e8",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Trang chủ" }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{ title: "Khám phá" }}
      />
      <Tab.Screen
        name="Bookmark"
        component={Bookmark}
        options={{ title: "Đã lưu" }}
      />
      <Tab.Screen name="Profile" options={{ title: "Cá nhân" }}>
        {() => <ProfileScreen onLogout={onLogout} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <Stack.Screen name="Main">
            {() => <MainTabs onLogout={() => setIsLoggedIn(false)} />}
          </Stack.Screen>
        ) : (
          <Stack.Screen name="Login">
            {() => <LoginScreen onLogin={() => setIsLoggedIn(true)} />}
          </Stack.Screen>
        )}
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ArticleDetail" component={ArticleDetail} />
        <Stack.Screen name="Notifications" component={NotificationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
