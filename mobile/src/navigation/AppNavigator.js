import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import HomeScreen from "../screens/Home/HomeScreen";
import SearchScreen from "../screens/Search/SearchScreen";
import Bookmark from "../screens/Bookmark/Bookmark";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import LoginScreen from "../screens/Auth/LoginScreen";
import NotificationScreen from "../screens/Home/Notification/NotificationScreen";
import ArticleDetail from "../screens/Home/Article/ArticleDetail";
import RegisterScreen from "../screens/Auth/RegisterScreen";
import ChatScreen from "../screens/Chat/ChatScreen";

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
          else if (route.name === "Chat") iconName = "chatbubble-outline";
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
        name="Chat"
        component={ChatScreen}
        options={{ title: "Chat" }}
      />
      <Tab.Screen
        name="Bookmark"
        component={Bookmark}
        options={{ title: "Đã lưu" }}
      />
      <Tab.Screen name="Profile">
        {(props) => <ProfileScreen {...props} onLogout={onLogout} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Khởi tạo trạng thái đăng nhập từ AsyncStorage (nếu có token thì coi là đã login)
  useEffect(() => {
    (async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        setIsLoggedIn(Boolean(token));
      } catch {
        setIsLoggedIn(false);
      }
    })();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Luôn có MainTabs, không guard tab nữa */}
        <Stack.Screen name="Main">
          {(props) => (
            <MainTabs
              {...props}
              onLogout={async () => {
                await AsyncStorage.multiRemove(["token", "user"]);
                setIsLoggedIn(false);
              }}
            />
          )}
        </Stack.Screen>

        {/* Các stack screen public */}
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ArticleDetail" component={ArticleDetail} />
        <Stack.Screen name="Notifications" component={NotificationScreen} />

        {/* Auth screens */}
        <Stack.Screen name="Login">
          {(props) => (
            <LoginScreen
              {...props}
              onLogin={async () => {
                setIsLoggedIn(true);
                props.navigation.replace("Main");
              }}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Register">
          {(props) => (
            <RegisterScreen
              {...props}
              onRegister={async () => {
                setIsLoggedIn(true);
                props.navigation.replace("Main");
              }}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
