import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import SosAlert from "./SosAlert";
import Siren from "./Siren";
import { Link, useNavigation } from "@react-navigation/native";
import LineNumber from "./LineNumber";
import Contact from "./Contact";

export default function ButtonGroup() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.column, styles.sosView]}
        onPress={() => navigation.navigate("SosAlert")}
      >
        <SosAlert></SosAlert>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.column, styles.sirenView]}
        onPress={() => navigation.navigate("Siren")}
      >
        <Siren></Siren>
        <Text style={{ color: "white", marginTop: 10 }}>Siren Sound</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.column, styles.lineNumberView]}
        onPress={() => navigation.navigate("LineNumber")}
      >
        <LineNumber></LineNumber>
        <Text style={{ color: "white", marginTop: 10 }}>Helpline Number</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.column, styles.faqView]}
        onPress={() => navigation.navigate("Contact")}
      >
        <Contact></Contact>
        <Text style={{ color: "white", marginTop: 10 }}>Favorite Contact</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "55%",
    alignContent: "center",
  },
  column: {
    width: "40%",
    height: "40%",
    borderRadius: 10,
    margin: 20,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  sosView: {
    backgroundColor: "crimson",
    top: 0,
    left: 0,
  },
  sirenView: {
    backgroundColor: "orange",
    top: 0,
    right: 0,
  },
  lineNumberView: {
    backgroundColor: "coral",
    bottom: 0,
    left: 0,
  },
  faqView: {
    backgroundColor: "lightsalmon",
    bottom: 0,
    right: 0,
  },
});
