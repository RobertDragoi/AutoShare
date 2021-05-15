import React, { useState } from "react";
import { View, Text, TouchableHighlight, StyleSheet } from "react-native";

export default function Button(props) {
  const [isPress, setIsPress] = useState(false);
  return (
    <TouchableHighlight
      activeOpacity={1}
      underlayColor={props.color}
      onHideUnderlay={() => setIsPress(false)}
      onShowUnderlay={() => setIsPress(true)}
      style={isPress ? styles.buttonPressed : styles.button}
      onPress={props?.function}
    >
      {props.children}
    </TouchableHighlight>
  );
}
const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#fc8403",
    borderRadius: 4,
    padding: 10,
  },
  buttonPressed: {
    alignItems: "center",
    backgroundColor: "#ff3200",
    borderRadius: 7,
    padding: 10,
  },
  text: {
    color: "#000000",
    fontSize: 17,
  },
});
