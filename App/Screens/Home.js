import { View, Text } from "react-native";
import React from "react";
import Header from "../Components/Home/Header";
import ButtonGroup from "../Components/Home/ButtonGroup";

export default function Home() {
  return (
    <View style={{ backgroundColor: "#FFF2F0" }}>
      <Header />
      <ButtonGroup />
    </View>
  );
}
