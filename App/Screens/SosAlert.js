import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import React, { useEffect, useState, useCallback, useRef } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import * as Location from "expo-location";
import { Accelerometer } from "expo-sensors";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SendDirectSms } from "react-native-send-direct-sms";
export default function SosAlert() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [shakeCount, setShakeCount] = useState(0);
  const [firstNumber, setFirstNumber] = useState("");
  const [secondNumber, setSecondNumber] = useState("");
  const [thirdNumber, setThirdNumber] = useState("");
  const [fourthNumber, setFourthNumber] = useState("");
  const [fifthNumber, setFifthNumber] = useState("");
  const intervalId = useRef(null);
  useFocusEffect(
    useCallback(() => {
      getData();
      let previousTime = new Date().getTime();
      let shakeTimes = 0;

      // Shake Function
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
            // console.log(shakeTimes);
            if (shakeTimes >= 3) {
              // Alert.alert("Hello");
              startFunction();
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

  useEffect(() => {
    if (location) {
      sendSms();
    }
  }, [location]);

  // Start and Stop Every 30s
  const startFunction = () => {
    handleButtonPress();
    intervalId.current = setInterval(() => {
      handleButtonPress();
    }, 3000); // 30000 milliseconds = 30 seconds
  };
  const stopFunction = () => {
    if (intervalId.current) {
      clearInterval(intervalId.current);
      intervalId.current = null;
    }
  };
  // Get Phone Number
  const getData = async () => {
    const values = await AsyncStorage.multiGet([
      "@firstNumber",
      "@secondNumber",
      "@thirdNumber",
      "@fourthNumber",
      "@fifthNumber",
    ]);
    values.forEach((value) => {
      // console.log(JSON.parse(value[1]));
      if (value[0] === "@firstNumber") {
        setFirstNumber(JSON.parse(value[1]));
      } else if (value[0] === "@secondNumber") {
        setSecondNumber(JSON.parse(value[1]));
      } else if (value[0] === "@thirdNumber") {
        setThirdNumber(JSON.parse(value[1]));
      } else if (value[0] === "@fourthNumber") {
        setFourthNumber(JSON.parse(value[1]));
      } else if (value[0] === "@fifthNumber") {
        setFifthNumber(JSON.parse(value[1]));
      }
    });
  };
  // Get User Location Permission
  const handleButtonPress = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    const currentLocation = await Location.getCurrentPositionAsync({});
    setLocation(currentLocation);
  };

  // send sms
  const sendSms = () => {
    if (location) {
      let phoneNumberArary = [];
      lat = location.coords.latitude;
      long = location.coords.longitude;
      text = `User is In Danger ! User Location is https://www.google.com/maps/search/?api=1&query=${lat},${long}`;
      demo = "Hello Testing 1 2 3 ";
      if (firstNumber) {
        phoneNumberArary.push(firstNumber);
      }
      if (secondNumber) {
        phoneNumberArary.push(secondNumber);
      }
      if (thirdNumber) {
        phoneNumberArary.push(thirdNumber);
      }
      if (fourthNumber) {
        phoneNumberArary.push(fourthNumber);
      }
      if (fifthNumber) {
        phoneNumberArary.push(fifthNumber);
      }
      // console.log(text);
      // phoneNumberArary.map((number) => {
      //   SendDirectSms(number, text)
      //     .then((res) => console.log("then", res))
      //     .catch((err) => console.log("catch", err));
      // });
    }
  };

  // let text = "Waiting..";
  // let lat = "Waiting..";
  // let long = "Waiting..";
  // if (errorMsg) {
  //   text = errorMsg;
  // } else if (location) {
  //   text = `Latitude: ${location.coords.latitude}, Longitude: ${location.coords.longitude}`;
  //   lat = location.coords.latitude;
  //   long = location.coords.longitude;
  // }
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
            onPress={startFunction}
          >
            <View style={styles.container}>
              <MaterialIcons name="add-alert" size={70} color="white" />
              <Text style={{ color: "white", fontSize: 14, marginTop: 10 }}>
                SOS Alert
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.stopButton, styles.sosButton]}
            onPress={stopFunction}
          >
            <View style={styles.container}>
              <AntDesign name="Safety" size={70} color="white" />
              <Text style={{ color: "white", fontSize: 14, marginTop: 10 }}>
                Safe
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* <Text style={styles.paragraph}>
          https://www.google.com/maps/search/?api=1&query={lat},{long}
        </Text>
        <Text style={styles.paragraph}>{firstNumber}</Text> */}
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
