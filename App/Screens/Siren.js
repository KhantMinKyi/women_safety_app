import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useRef, useState } from "react";
import { Audio } from "expo-av";
export default function Siren() {
  const [isPlaying, setIsPlaying] = useState(false);
  const soundRef = useRef(null);

  const playSiren = async () => {
    if (soundRef.current) {
      await soundRef.current.unloadAsync();
      soundRef.current = null;
    }
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/police-siren.mp3"),
      { shouldPlay: true, isLooping: true }
    );
    soundRef.current = sound;
    setIsPlaying(true);
  };

  const stopSiren = async () => {
    if (soundRef.current) {
      await soundRef.current.stopAsync();
      await soundRef.current.unloadAsync();
      soundRef.current = null;
    }
    setIsPlaying(false);
  };
  return (
    <React.Fragment>
      <View style={styles.headerTextView}>
        <Text style={styles.headerTextStyle}>Siren Alert</Text>
        <Text style={styles.secondText}>
          Press Green To Start Alarm,{"\n"} Press Red to Stop Alarm
        </Text>
      </View>
      <View style={[styles.containerBgColor, styles.container]}>
        <Image
          source={require("./../../assets/alarm.png")}
          style={styles.logo}
        />
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={[styles.sirenButtom, styles.startButtonStyle]}
            onPress={playSiren}
            disabled={isPlaying}
          >
            <View style={styles.container}>
              <Text style={styles.textStyle}>Start</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.sirenButtom, styles.endButtonStyle]}
            onPress={stopSiren}
            disabled={!isPlaying}
          >
            <View style={styles.container}>
              <Text style={styles.textStyle}>Stop</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </React.Fragment>
  );
}
const styles = StyleSheet.create({
  containerBgColor: {
    backgroundColor: "#FFF2F0",
  },
  container: {
    flex: 0.8,
    justifyContent: "center", // Center vertically
    alignItems: "center",
  },
  headerTextView: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF2F0",
  },
  headerTextStyle: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
  },
  secondText: {
    fontSize: 12,
    fontWeight: "300",
    color: "gray",
    margin: 5,
  },
  logo: {
    width: 150,
    height: 150,
  },
  sirenButtom: {
    width: 60,
    height: 60,
    borderRadius: 20,
    margin: 20,
    marginTop: 60,
    flex: 0.5,
  },
  startButtonStyle: {
    backgroundColor: "darkseagreen",
  },
  endButtonStyle: {
    backgroundColor: "crimson",
  },
  textStyle: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    marginTop: 10,
  },
});
