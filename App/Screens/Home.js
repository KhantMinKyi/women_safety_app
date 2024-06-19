import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import Header from "../Components/Home/Header";
import ButtonGroup from "../Components/Home/ButtonGroup";

export default function Home() {
  return (
    <View style={{ backgroundColor: "#FFF2F0", flex: 1 }}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <Header />
        <ButtonGroup />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
});
