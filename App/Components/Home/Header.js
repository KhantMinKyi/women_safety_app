import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";

export default function Header() {
  return (
    <View style={styles.imageView}>
      <Image
        source={require("./../../../assets/logo.png")}
        style={styles.logo}
      />
      <Text style={styles.text}>Women Safety App</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 200,
    height: 200,
  },
  imageView: {
    alignItems: "center",
  },
  text: {
    fontSize: 18,
  },
});
