import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { DataTable } from "react-native-paper";

export default function LineNumber() {
  return (
    <View style={styles.container}>
      <DataTable>
        <DataTable.Header style={styles.head}>
          <DataTable.Title>Helplines</DataTable.Title>
          <DataTable.Title numeric>Helpline Numbers</DataTable.Title>
        </DataTable.Header>
        <DataTable.Row style={styles.row}>
          <DataTable.Cell>Emergency Number</DataTable.Cell>
          <DataTable.Cell numeric>190</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row style={styles.row}>
          <DataTable.Cell>Fire Number</DataTable.Cell>
          <DataTable.Cell numeric>191</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row style={styles.row}>
          <DataTable.Cell>Ambulance Number</DataTable.Cell>
          <DataTable.Cell numeric>192</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row style={styles.row}>
          <DataTable.Cell>Police Number</DataTable.Cell>
          <DataTable.Cell numeric>199 </DataTable.Cell>
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
