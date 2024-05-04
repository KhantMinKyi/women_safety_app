import { View, Text, StyleSheet } from "react-native";
import React from "react";
import SosAlert from "./SosAlert";
import Siren from "./Siren";
import { Link } from "@react-navigation/native";
import LineNumber from "./LineNumber";
import Contact from "./Contact";

export default function ButtonGroup() {
  return (
    <React.Fragment>
      <View style={styles.container}>
        <View style={[styles.column, styles.sosView]}>
          <Link to={{ screen: SosAlert }}>
            <SosAlert></SosAlert>
          </Link>
        </View>
        <View style={[styles.column, styles.sirenView]}>
          <Link to={{ screen: Siren }}>
            <Siren></Siren>
          </Link>
          <Text style={{ color: "white", marginTop: 10 }}>Siren Sound</Text>
        </View>
        <View style={[styles.column, styles.lineNumberView]}>
          <Link to={{ screen: LineNumber }}>
            <LineNumber></LineNumber>
          </Link>
          <Text style={{ color: "white", marginTop: 10 }}>Helpline Number</Text>
        </View>
        <View style={[styles.column, styles.faqView]}>
          <Link to={{ screen: Contact }}>
            <Contact></Contact>
          </Link>
          <Text style={{ color: "white", marginTop: 10 }}>
            Favorite Contact
          </Text>
        </View>
      </View>
    </React.Fragment>
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
