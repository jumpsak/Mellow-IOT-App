import React, { memo, useState } from "react";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import BackButton from "../components/BackButton";
import { theme } from "../core/theme";
import { useUserContext } from "../context/UserContext";
import * as SecureStore from "expo-secure-store";
import { AppConfig } from "../AppConfig";
const { odooUrl, adminToken, dbName } = AppConfig;

//dd for handle login error
import { isJson, notifyMessage } from "../core/utils";

const LoginScreen = ({ navigation }) => {
  const { setId, setName, setEmail, setAvatar } = useUserContext();
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const fetchUser = async (userId) => {
    await fetch(`${odooUrl}/api/v1/users/${userId}`, {
      method: "GET",
      headers: {
        accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        "x-api-key": `${adminToken}`,
      },
    })
      .then((res) =>{
        res.json().then((data) => {
          setEmail(data.email);
          setName(data.name);
          setAvatar(data.avatar_512);
        })
        navigation.navigate("HomePage");
      }
      )
      .catch((error) => {
        console.log("error user: ", error);
        navigation.navigate("LandingPage");
        });
  }

  const _getUser = async (userId) => {
    await SecureStore.setItemAsync("LogInOn", new Date().toLocaleString());
    await SecureStore.setItemAsync("UserId", userId.toString())
    .then((res) => fetchUser(userId))
    .catch((error) => {
        console.log("error user: ", error);
        navigation.navigate("LandingPage");
        });
  };

  const _onLoginPressed = async () => {
    const details = {
      login: mail,
      password: password,
      db: dbName,
    };

    const formBody = Object.keys(details)
      .map(
        (key) =>
          encodeURIComponent(key) +
          "=" +
          encodeURIComponent(details[key])
      )
      .join("&");
      
      
  
    await fetch(`${odooUrl}/api/v1/authenticate/custom`, {
      method: "PUT",
      headers: {
        accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        "x-api-key": `${adminToken}`,
      },
      body: formBody,
    })
    .then((res) =>
      res.json().then((result) => {

        //dd ..
        console.log('DD Test result from api', result, `${isJson(result)}`)
        //!! chk if result not JSON
        if (isJson(result)) {
          //!! handle login error, Odoo error return in JSON
          notifyMessage('ไม่สามารถเข้าระบบได้\n กรุณาตรวจสอบข้อมูลอีกครั้ง');
        } else {
          //!! handle login ok, id only not JSON
          _getUser(result);
          setId(result);
        }

      })
      )
      .catch((error) => console.log("error login: ", error));
  };

  return (
    <Background>
      <BackButton goBack={() => navigation.navigate("LandingPage")} />

      <Logo />

      <Header>Welcome back.</Header>

      <TextInput
        label="Email"
        returnKeyType="next"
        value={mail}
        onChangeText={(text) => setMail(text)}
        autoCapitalize="none"
        autoComplete="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <TextInput
        label="Password"
        returnKeyType="done"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />

      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate("ForgotPasswordScreen")}
        >
          <Text style={styles.label}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>

      <Button mode="contained" onPress={_onLoginPressed}>
        Login
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("RegisterScreen")}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  label: {
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});

export default memo(LoginScreen);
