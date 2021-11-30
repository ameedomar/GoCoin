import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  ImageBackground,
  TextInput,
  Button,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Inputs from "../Components/Inputs";
import Submit from "../Components/Submit";
import { useState } from "react";

function LoginScreen(props) {
  const [email, setEmail1] = useState("");
  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const onLoginPressed = () => {
    props.navigation.navigate("Main");
    // if (!email || !password1) {
    //   Alert.alert("Please fill both fields first");
    // } else {
    //   console.log("Email is : " + email + " & " + "Password is : " + password1);
    // }
    fetch("http://192.168.10.184:53710/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        //we willl send this to the backend
        //key     //value

        email: email,
        password: password1,
      }),
    })
      .then(() => {
        AsyncStorage.setItem("email", email);
        props.navigation.navigate("Main");
        Alert.alert("Welcom to Gocoin");
      })

      .catch((error) => {
        console.log("Api call error");
      });
  };

  return (
    <View style={styles.mainbackground}>
      <View style={styles.regButton}>
        <Text
          style={{
            fontSize: 40,
            alignSelf: "center",
            marginTop: 220,
            color: "#000",
          }}
        >
          Welcome Back
        </Text>
      </View>

      <Image
        style={styles.image1}
        source={require("../assets/242362136_338075778105286_3476528602467261534_n.png")}
      />
      <View>
        <Text
          style={{
            fontSize: 40,

            alignSelf: "center",
            marginTop: 220,
            color: "#636169",
          }}
        >
          Welcome Back
        </Text>

        <Text
          style={{
            fontSize: 15,
            textAlign: "center",
            opacity: 0.6,
            marginTop: 10,
            top: 5,
            marginHorizontal: 55,
            color: "#636169",
          }}
        >
          Log in to your existing account
        </Text>
      </View>

      <View style={styles.Input}>
        <TextInput
          style={[styles.containerinput]}
          placeholder="Email"
          name="Email"
          icon="mail"
          value={email.value}
          onChangeText={(text) => setEmail1(text)}
        />
        <TextInput
          style={[styles.containerinput]}
          placeholder="Password"
          name="Password"
          icon="lock"
          secureTextEntry={true}
          pass={true}
          value={password1.value}
          onChangeText={(text) => setPassword1(text)}
        />
      </View>

      <View style={styles.LoginButton}>
        <Button title="LOGIN" color="#79b6b8" onPress={onLoginPressed} />
      </View>

      <View
        style={{
          flexDirection: "row",
          marginVertical: 70,
          alignSelf: "center",
        }}
      >
        <Text style={styles.textBody} style={{ color: "#636169" }}>
          Don't Have an account?{" "}
        </Text>
        <Text
          style={[styles.textBody, { color: "#7997a8" }]}
          onPress={() => props.navigation.navigate("SignUp")}
        >
          Sign Up
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainbackground: {},

  regButton: {
    width: "100%",
    height: 115,
    backgroundColor: "#79b6b8",
  },
  Input: {
    marginTop: 30,
    marginBottom: 30,
    height: 130,
  },
  email: {
    marginTop: 5,
    height: 52,
    textAlign: "center",
    fontSize: 16,
    borderRightWidth: 3,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderBottomWidth: 3,
    borderColor: "#79b6b8",
  },
  pass: {
    marginTop: 20,
    height: 52,
    textAlign: "center",
    fontSize: 16,
    marginBottom: 90,
    borderWidth: 3,
    borderColor: "#79b6b8",
  },
  containerinput: {
    top: 10,
    width: "75%",
    height: 55,
    fontSize: 18,
    borderRadius: 100,
    marginVertical: 10,
    borderWidth: 3.5,
    alignSelf: "center",
    justifyContent: "center",
    textAlign: "center",
    borderColor: "#79b6b8",
  },
  LoginButton: {},

  image1: {
    width: 180,
    height: 180,
    position: "absolute",
    top: 140,
    alignSelf: "center",
  },
  mailicon: {
    width: 200,
    height: 200,
    position: "absolute",
    top: 580,
  },
});

export default LoginScreen;
