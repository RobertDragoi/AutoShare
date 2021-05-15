import React from "react";
import { View, StyleSheet } from "react-native";

export default function Card(props) {
  return (
    <View style={styles.card}>
      <View style={styles.content}>{props.children}</View>
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    width: "95%",
    borderRadius: 3,
    elevation: 5,
    backgroundColor: "#fff",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.5,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 10,
    marginTop: 4,
  },
  content: {
    marginHorizontal: 5,
    marginVertical: 2,
  },
});
