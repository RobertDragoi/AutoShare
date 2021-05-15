import React, { useReducer, useContext } from "react";
import UserContext from "./userContext";
import UserReducer from "./userReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserServices from "../Services/userServices";
import axios from "axios";
import {
  REGISTER_SUCCES,
  REGISTER_FAIL,
  LOGIN_SUCCES,
  LOGIN_FAIL,
  USER_LOADED,
  LOGOUT,
} from "../types";
const UserState = (props) => {
  const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
    error: null,
  };
  const [state, dispatch] = useReducer(UserReducer, initialState);
  //Inregistrare
  const Register = async (formData) => {
    try {
      const res = await UserServices.register(formData);
      dispatch({ type: REGISTER_SUCCES, payload: res.data });
      await AsyncStorage.setItem("token", res.data);
      await SetToken(res.data);
      LoadUser();
    } catch (error) {
      dispatch({ type: REGISTER_FAIL, payload: error.message });
    }
  };
  //Logare
  const Login = async (formData) => {
    try {
      const res = await UserServices.login(formData);
      dispatch({ type: LOGIN_SUCCES, payload: res.data });
      await SetToken(res.data);
      LoadUser();
    } catch (error) {
      dispatch({ type: LOGIN_FAIL, payload: error.message });
    }
  };
  //Incarcare utilizator
  const LoadUser = async () => {
    try {
      const res = await UserServices.loadUser();
      dispatch({ type: USER_LOADED, payload: res.data });
    } catch (error) {
      dispatch({ type: LOGIN_FAIL, payload: error.message });
    }
  };
  const SetToken = async (token) => {
    if (token) {
      await AsyncStorage.setItem("token", token);
      axios.defaults.headers.common["x-auth-token"] = token;
    } else {
      await AsyncStorage.removeItem("token");
      delete axios.defaults.headers.common["x-auth-token"];
    }
  };
  const Logout = async () => {
    await SetToken();
    try {
      dispatch({ type: LOGOUT });
    } catch (error) {
      dispatch({ type: LOGIN_FAIL, payload: error.message });
    }
  };
  return (
    <UserContext.Provider
      value={{
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        error: state.error,
        Register,
        Login,
        Logout,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
