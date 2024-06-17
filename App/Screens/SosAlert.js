import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import * as Location from "expo-location";
import { Accelerometer } from "expo-sensors";
import { useFocusEffect } from "@react-navigation/native";
export default function SosAlert() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [shakeCount, setShakeCount] = useState(0);

  useFocusEffect(
    useCallback(() => {
      let previousTime = new Date().getTime();
      let shakeTimes = 0;

      const subscription = Accelerometer.addListener((accelerometerData) => {
        const { x, y, z } = accelerometerData;
        const currentTime = new Date().getTime();

        // Calculate the acceleration magnitude
        const magnitude = Math.sqrt(x * x + y * y + z * z);

        // Threshold for a shake (you might need to adjust this value)
        const shakeThreshold = 1.5;

        if (magnitude > shakeThreshold) {
          if (currentTime - previousTime > 1000) {
            previousTime = currentTime;
            shakeTimes += 1;
            console.log(shakeTimes);
            if (shakeTimes >= 3) {
              // Alert.alert("Hello");
              handleButtonPress();
              shakeTimes = 0; // Reset the shake count after the alert
            }
          }
        }
      });

      // Accelerometer settings
      Accelerometer.setUpdateInterval(100); // Update interval in milliseconds

      return () => {
        subscription && subscription.remove();
      };
    }, [])
  );

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
  let lat = "Waiting..";
  let long = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = `Latitude: ${location.coords.latitude}, Longitude: ${location.coords.longitude}`;
    lat = location.coords.latitude;
    long = location.coords.longitude;
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
        <Text style={styles.paragraph}>
          https://www.google.com/maps/search/?api=1&query={lat},{long}
        </Text>
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
