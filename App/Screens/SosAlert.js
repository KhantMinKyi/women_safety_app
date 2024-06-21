import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
} from "react-native";
import React, { useEffect, useState, useCallback, useRef } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import * as Location from "expo-location";
import { Accelerometer } from "expo-sensors";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SendDirectSms } from "react-native-send-direct-sms";
const CustomAlert = ({ visible, message, onClose }) => {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{message}</Text>
        </View>
      </View>
    </Modal>
  );
};

export default function SosAlert() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [shakeCount, setShakeCount] = useState(0);
  const [firstNumber, setFirstNumber] = useState("");
  const [secondNumber, setSecondNumber] = useState("");
  const [thirdNumber, setThirdNumber] = useState("");
  const [fourthNumber, setFourthNumber] = useState("");
  const [fifthNumber, setFifthNumber] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [disabled, setDisabled] = useState(0);
  var isWorking = 0;
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
            setAlertVisible(true);
            setTimeout(() => {
              setAlertVisible(false);
            }, 1000);
            if (shakeTimes >= 3) {
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
  const startFunction = useCallback(() => {
    if (isWorking == 0) {
      handleButtonPress();
      isWorking = 1;
      setDisabled(1);
      intervalId.current = setInterval(() => {
        handleButtonPress();
      }, 10000);
    } else if (isWorking == 1) {
      console.log("Stop");
    }
  }, []);
  const stopFunction = useCallback(() => {
    isWorking = 0;
    setDisabled(0);
    console.log("Stop");
    if (intervalId.current) {
      clearInterval(intervalId.current);
      intervalId.current = null;
    }
  }, []);
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
      let text = ` Emergency SOS ! I'm in Danger Now . 
       User Location is https://www.google.com/maps/search/?api=1&query=${lat},${long}`;
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
      phoneNumberArary.map((number) => {
        // SendDirectSms(number, text)
        //   .then((res) => console.log("then", res))
        //   .catch((err) => console.log("catch", err));
        console.log(number);
      });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <React.Fragment>
        <CustomAlert
          visible={alertVisible}
          message="Your Device is Shaked !"
          onClose={() => setAlertVisible(false)}
        />
        <View style={[styles.container, styles.containerBgColor]}>
          <Text style={styles.headerText}>Emergency Alert</Text>
          <Text style={styles.secondText}>
            Press RED if you are in danger ,{"\n"} Press Green if you are Safe
          </Text>
          <TouchableOpacity
            style={[
              styles.sosButton,
              disabled === 1 ? styles.disabledButton : styles.startButton,
            ]}
            onPress={startFunction}
            disabled={disabled === 1 ? true : false}
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  disabledButton: {
    backgroundColor: "gray",
  },
});
