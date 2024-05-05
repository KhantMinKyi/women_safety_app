import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
export default function SosAlert() {
  return (
    <React.Fragment>
      <View style={styles.container}>
        <Text style={styles.headerText}>Emergency Alert</Text>
        <Text style={styles.secondText}>
          Press RED if you are in danger ,{"\n"} Press Green if you are Safe
        </Text>
        <TouchableOpacity style={[styles.startButton, styles.sosButton]}>
          <View style={styles.container}>
            <MaterialIcons name="add-alert" size={70} color="white" />
            <Text style={{ color: "white", fontSize: 14, marginTop: 10 }}>
              SOS Alert
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.stopButton, styles.sosButton]}>
          <View style={styles.container}>
            <AntDesign name="Safety" size={70} color="white" />
            <Text style={{ color: "white", fontSize: 14, marginTop: 10 }}>
              Safe
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </React.Fragment>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // Center vertically
    alignItems: "center",
  },
  headerText: {
    fontSize: 28,
    fontWeight: "600",
  },
  secondText: {
    fontSize: 12,
    fontWeight: "300",
    color: "gray",
    margin: 5,
  },
  sosButton: {
    width: 200,
    height: 200,
    borderRadius: 100,
    margin: 20,
  },
  startButton: {
    backgroundColor: "crimson",
  },
  stopButton: {
    backgroundColor: "darkseagreen",
  },
});
