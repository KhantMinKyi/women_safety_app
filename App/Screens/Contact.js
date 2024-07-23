import {
  View,
  Text,
  ScrollView,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
  PermissionsAndroid,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Contact() {
  const [isloading, setIsLoading] = useState(false);
  const [firstNumber, setFirstNumber] = useState("");
  const [secondNumber, setSecondNumber] = useState("");
  const [thirdNumber, setThirdNumber] = useState("");
  const [fourthNumber, setFourthNumber] = useState("");
  const [fifthNumber, setFifthNumber] = useState("");
  const [text, setText] = useState("");

  async function requestPermissions() {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      // Permission granted, now access SIM card information
      const telephonyManager = new TelephonyManager();
      const phoneNumber1 = await telephonyManager.getLine1Number(0); // Slot 0
      const phoneNumber2 = await telephonyManager.getLine1Number(1); // Slot 1
    } else {
      // Permission denied
      // show the alert
    }
  }

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
  const saveNumbers = async () => {
    const numbers = {
      firstNumber: firstNumber,
      secondNumber: secondNumber,
      thirdNumber: thirdNumber,
      fourthNumber: fourthNumber,
      fifthNumber: fifthNumber,
    };
    setIsLoading(true);
    // store first Number
    await AsyncStorage.setItem(
      "@firstNumber",
      JSON.stringify(numbers.firstNumber)
    );
    // store second Number
    setFirstNumber(numbers.firstNumber);
    await AsyncStorage.setItem(
      "@secondNumber",
      JSON.stringify(numbers.secondNumber)
    );
    // store third Number
    setSecondNumber(numbers.secondNumber);
    await AsyncStorage.setItem(
      "@thirdNumber",
      JSON.stringify(numbers.thirdNumber)
    );
    // store fourth Number
    setThirdNumber(numbers.thirdNumber);
    await AsyncStorage.setItem(
      "@fourthNumber",
      JSON.stringify(numbers.fourthNumber)
    );
    // store fifth Number
    setFourthNumber(numbers.fourthNumber);
    await AsyncStorage.setItem(
      "@fifthNumber",
      JSON.stringify(numbers.fifthNumber)
    );
    setFifthNumber(numbers.fifthNumber);
    setTimeout(() => {
      setIsLoading(false);
    }, 100);
  };
  useEffect(() => {
    getData();
  }, []);
  const handleFirstTextChange = (text) => {
    if (text.length <= 12) {
      setFirstNumber(text);
    } else {
      Alert.alert("Limit Exceeded", "The Maximum Phone Number is 12.");
    }
  };
  const handleSecondTextChange = (text) => {
    if (text.length <= 12) {
      setSecondNumber(text);
    } else {
      Alert.alert("Limit Exceeded", "The Maximum Phone Number is 12.");
    }
  };
  const handleThirdTextChange = (text) => {
    if (text.length <= 12) {
      setThirdNumber(text);
    } else {
      Alert.alert("Limit Exceeded", "The Maximum Phone Number is 12.");
    }
  };
  const handleFourthTextChange = (text) => {
    if (text.length <= 12) {
      setFourthNumber(text);
    } else {
      Alert.alert("Limit Exceeded", "The Maximum Phone Number is 12.");
    }
  };
  const handleFifthTextChange = (text) => {
    if (text.length <= 12) {
      setFifthNumber(text);
    } else {
      Alert.alert("Limit Exceeded", "The Maximum Phone Number is 12.");
    }
  };
  return (
    <View style={styles.container}>
      {isloading ? (
        <View
          style={{
            flex: 1,
            backgroundColor: "#ffffff",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <ScrollView>
          <View style={styles.headerContainer}>
            <Text style={styles.header}>Favorite Contacts</Text>
          </View>
          <View style={styles.textView}>
            <Text style={styles.label}> First Number :</Text>
            <TextInput
              style={styles.inputBox}
              onChangeText={handleFirstTextChange}
              placeholder="First Number"
              value={firstNumber}
              keyboardType="numeric"
              // maxLength={4}
            />
          </View>
          <View style={styles.textView}>
            <Text style={styles.label}> Second Number :</Text>
            <TextInput
              style={styles.inputBox}
              onChangeText={handleSecondTextChange}
              placeholder="Second Number"
              value={secondNumber}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.textView}>
            <Text style={styles.label}> Third Number :</Text>
            <TextInput
              style={styles.inputBox}
              onChangeText={handleThirdTextChange}
              placeholder="Third Number"
              value={thirdNumber}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.textView}>
            <Text style={styles.label}> Fourth Number :</Text>
            <TextInput
              style={styles.inputBox}
              onChangeText={handleFourthTextChange}
              placeholder="Fourth Number"
              value={fourthNumber}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.textView}>
            <Text style={styles.label}> Fifth Number :</Text>
            <TextInput
              style={styles.inputBox}
              onChangeText={handleFifthTextChange}
              placeholder="Fifth Number"
              value={fifthNumber}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.button}>
            <Button
              title="Save Numbers"
              onPress={saveNumbers}
              color="#48d1cc"
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF2F0",
    flex: 1,
  },
  headerContainer: {
    marginVertical: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 22,
  },
  textView: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  inputBox: {
    flex: 0.8,
    borderColor: "gray",
    borderWidth: 1,
    padding: 4,
    margin: 5,
    borderRadius: 5,
  },
  label: {
    padding: 8,
    flex: 0.4,
  },
  button: {
    flexDirection: "row",
    margin: 20,
    justifyContent: "center",
  },
});
