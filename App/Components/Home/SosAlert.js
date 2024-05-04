import { View, Text } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

export default function SosAlert() {
  return (
    <View style={{ alignContent: "center" }}>
      <MaterialIcons name="sos" size={64} color="white" />
    </View>
  );
}
