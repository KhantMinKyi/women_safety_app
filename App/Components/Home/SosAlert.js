import { View, Text } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

export default function SosAlert() {
  return (
    <View style={{ alignContent: "center" }}>
      {/* <Text>SosAlert</Text> */}
      <MaterialIcons name="sos" size={60} color="white" />
    </View>
  );
}
