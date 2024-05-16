import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import * as Location from "expo-location";
export default function SosAlert() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleButtonPress = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    const currentLocation = await Location.getCurrentPositionAsync({});
    setLocation(currentLocation);
  };

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = `Latitude: ${location.coords.latitude}, Longitude: ${location.coords.longitude}`;
  }
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <React.Fragment>
        <View style={[styles.container, styles.containerBgColor]}>
          <Text style={styles.headerText}>Emergency Alert</Text>
          <Text style={styles.secondText}>
            Press RED if you are in danger ,{"\n"} Press Green if you are Safe
          </Text>
          <TouchableOpacity
            style={[styles.startButton, styles.sosButton]}
            onPress={handleButtonPress}
          >
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
        <Text style={styles.paragraph}>{text}</Text>
      </React.Fragment>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  containerBgColor: {
    backgroundColor: "#FFF2F0",
  },
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
  scrollViewContainer: {
    flexGrow: 1,
  },
});
