import React, { useState, useContext } from "react";
import { Text, TextInput, View, StyleSheet } from "react-native";
import Button from "./Button";
const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: "#dedede",
  },
  center: {
    flex: 1,
    alignItems: "center",
  },
  input: {
    height: 30,
    margin: 4,
    padding: 4,
    borderWidth: 1,
    color: "#030303",
    fontSize: 14,
  },
  text: {
    color: "#030303",
    fontSize: 16,
  },
});
const Form = ({ fields, buttonText, action, error, auxiliary }) => {
  const getInitialState = (fieldKeys) => {
    const state = {};
    fieldKeys.forEach((key) => {
      state[key] = "";
    });

    return state;
  };
  const onChangeValue = (key, value) => {
    const newState = { ...values, [key]: value };
    setValues(newState);
  };

  const fieldKeys = Object.keys(fields);
  const [values, setValues] = useState(getInitialState(fieldKeys));

  return (
    <View style={styles.container}>
      {fieldKeys.map((key) => {
        const field = fields[key];
        return (
          <View key={key}>
            <Text style={styles.text}>{field.label}</Text>
            <TextInput
              style={styles.input}
              {...field.inputProps}
              value={values[key]}
              onChangeText={(text) => onChangeValue(key, text)}
            />
          </View>
        );
      })}
      <View style={styles.center}>
        <Button
          color="#ff3200"
          function={() => {
            action(values);
            auxiliary ? auxiliary(true) : null;
          }}
        >
          <Text style={styles.text}>{buttonText}</Text>
        </Button>
      </View>
      <Text style={styles.text}>{error}</Text>
    </View>
  );
};

export default Form;
