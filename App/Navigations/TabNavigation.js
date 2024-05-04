import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../Screens/Home";
import Siren from "../Screens/Siren";
import SosAlert from "../Screens/SosAlert";
import { FontAwesome } from "@expo/vector-icons";
import LineNumber from "../Screens/LineNumber";
import { MaterialIcons } from "@expo/vector-icons";
export default function TabNavigation() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
    // screenOptions={{
    //   headerShown: false,
    // }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="SosAlert"
        component={SosAlert}
        options={{
          tabBarLabel: "SOS Alert",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="sos" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Siren"
        component={Siren}
        options={{
          tabBarLabel: "Siren",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="bell" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Line Number"
        component={LineNumber}
        options={{
          tabBarLabel: "Line Number",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome
              name="volume-control-phone"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
