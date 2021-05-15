import React, { useEffect, useContext } from "react";
import {
  SafeAreaView,
  TouchableHighlight,
  Text,
  StyleSheet,
  StatusBar,
} from "react-native";
import Form from "./Form";

import UserContext from "./UserState/userContext";
export default function Login({ navigation }) {
  const userContext = useContext(UserContext);
  const { Login, error, isAuthenticated } = userContext;
  useEffect(() => {
    if (isAuthenticated) {
      navigation.navigate("Profile");
    }
  }, [isAuthenticated]);
  return (
    <SafeAreaView style={styles.container}>
      <Form
        action={Login}
        error={error}
        buttonText="Logheaza-te"
        fields={{
          email: {
            label: "Email",
            inputProps: {
              keyboardType: "email-address",
            },
          },
          password: {
            label: "Password",
            inputProps: {
              secureTextEntry: true,
            },
          },
        }}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#dedede",
  },
  center: {
    flex: 1,
    alignItems: "center",
  },
  text: {
    color: "#000000",
    fontSize: 17,
  },
});
