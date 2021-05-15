import React from "react";
import { StyleSheet, Text, SafeAreaView, StatusBar } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Register from "./components/Register";
import Login from "./components/Login";
import UserState from "./components/UserState/UserState";
import PostState from "./components/PostState/PostState";
const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();
function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ title: "Profil" }}
        name="Profile"
        component={Profile}
      />
      <Stack.Screen
        options={{ title: "Inregistrare" }}
        name="Register"
        component={Register}
      />
      <Stack.Screen
        options={{ title: "Logare" }}
        name="Login"
        component={Login}
      />
    </Stack.Navigator>
  );
}
export default function App() {
  return (
    <NavigationContainer>
      <UserState>
        <PostState>
          <Tab.Navigator
            initialRouteName="Home"
            activeColor="#030303"
            barStyle={{ backgroundColor: "#fc8403" }}
          >
            <Tab.Screen
              options={{
                title: "Acasa",
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name="home" color={color} size={26} />
                ),
              }}
              name="Home"
              component={Home}
            />
            <Tab.Screen
              options={{
                title: "Profil",
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons
                    name="account"
                    color={color}
                    size={26}
                  />
                ),
              }}
              name="Profile"
              component={ProfileStack}
            />
          </Tab.Navigator>
        </PostState>
      </UserState>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    backgroundColor: "#0a68ff",
  },
});
