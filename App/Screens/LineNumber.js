import { View, Text, StyleSheet, Linking } from "react-native";
import React from "react";
import { DataTable } from "react-native-paper";
import { SendDirectSms } from "react-native-send-direct-sms";

export default function LineNumber() {
  const makeCall = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };
  function sendSmsData(mobileNumber, bodySMS) {
    SendDirectSms(mobileNumber, bodySMS)
      .then((res) => console.log("then", res))
      .catch((err) => console.log("catch", err));
  }
  return (
    <View style={styles.container}>
      <DataTable>
        <DataTable.Header style={styles.head}>
          <DataTable.Title>Helplines</DataTable.Title>
          <DataTable.Title numeric>Helpline Numbers</DataTable.Title>
        </DataTable.Header>
        <DataTable.Row style={styles.row}>
          <DataTable.Cell>Emergency Number</DataTable.Cell>
          <DataTable.Cell
            numeric
            onPress={() => sendSmsData("095025363", "hello")}
          >
            190
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row style={styles.row}>
          <DataTable.Cell>Fire Number</DataTable.Cell>
          <DataTable.Cell numeric onPress={() => makeCall("191")}>
            191
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row style={styles.row}>
          <DataTable.Cell>Ambulance Number</DataTable.Cell>
          <DataTable.Cell numeric onPress={() => makeCall("192")}>
            192
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row style={styles.row}>
          <DataTable.Cell>Police Number</DataTable.Cell>
          <DataTable.Cell numeric onPress={() => makeCall("199")}>
            199{" "}
          </DataTable.Cell>
        </DataTable.Row>
      </DataTable>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF2F0",
  },
  head: {
    height: 44,
    backgroundColor: "aliceblue",
    paddingHorizontal: 30,
  },
  row: { height: 40, backgroundColor: "white", paddingHorizontal: 30 },
});
