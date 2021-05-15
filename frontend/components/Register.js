import React, { useEffect, useContext } from "react";
import {
  SafeAreaView,
  Text,
  TouchableHighlight,
  StyleSheet,
  StatusBar,
} from "react-native";
import Form from "./Form";
import UserContext from "./UserState/userContext";

export default function Register({ navigation }) {
  const userContext = useContext(UserContext);
  const { Register, error, isAuthenticated } = userContext;
  useEffect(() => {
    if (isAuthenticated) {
      navigation.navigate("Profile");
    }
  }, [isAuthenticated]);
  return (
    <SafeAreaView style={styles.container}>
      <Form
        action={Register}
        error={error}
        buttonText="Inregisteaza-te"
        fields={{
          name: {
            label: "Nume",
            inputProps: {
              keyboardType: "default",
            },
          },

          email: {
            label: "Email",
            inputProps: {
              keyboardType: "email-address",
            },
          },
          phone: {
            label: "Numar de telefon",
            inputProps: {
              keyboardType: "numeric",
            },
          },
          password: {
            label: "Password",
            inputProps: {
              secureTextEntry: true,
            },
          },
          address: {
            label: "Adresa",
            inputProps: {
              keyboardType: "default",
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
