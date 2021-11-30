import React from "react";
import { Component } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  ImageBackground,
  TextInput,
  Button,
  Alert,
  password,
} from "react-native";
import { useState } from "react";
import LoginScreen from "./LoginScreen";
import HomeScreen from "./Home";
import Submit from "../Components/Submit";
import Inputs from "../Components/Inputs";

function SignupPage(props) {
  //{ navigation }
  //values
  const [fullName, setName] = useState("");
  const [emailAdd, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const onSignUpPressed = () => {
    if (!fullName || !emailAdd || !username || !password || !password2) {
      Alert.alert(" Please fill all fields to ba able to sign up ");
    } else {
      var emailFlag = 0;
      var passFlag = 0;
      var pass2Flag = 0;
      if (!emailAdd.includes("@")) emailFlag = 1;
      if (password.length < 8) passFlag = 1;
      if (password != password2) pass2Flag = 1;
      if (emailFlag || passFlag || pass2Flag) {
        if (emailFlag) {
          Alert.alert("Please enter a valid email");
          return;
        }
        if (passFlag) {
          Alert.alert("Password should be more than 8 digits");
          return;
        }
        if (pass2Flag) {
          Alert.alert("Password are not matching");
          return;
        }
      }
      console.log(
        "Full Name is " +
          fullName +
          " UserName " +
          username +
          " Email Address " +
          emailAdd +
          " Password is : " +
          password
      );
      fetch("http://192.168.1.10:53710/signupuser", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          //we willl send this to the backend
          //key     //value
          fullName: fullName,
          emailAdd: emailAdd,
          username: username,
          password: password,
          password2: password2,
        }),
      })
        .then(() => {
          props.navigation.navigate("LoginScreen");
        })
        .catch((error) => {
          console.log("Api call error");
        });
      Alert.alert(
        "Welcome in GoCoins application! You are member of our community"
      );
      props.navigation.navigate("Home");
    }

    const dis = () => {
      console.log(fullName);
    };
  };

  return (
    <View>
      <View style={styles.regButton}></View>
      <Image
        style={styles.image1}
        source={require("../assets/242362136_338075778105286_3476528602467261534_n.png")}
      />
      <View>
        <Text
          style={{
            fontSize: 37,
            alignSelf: "center",
            marginTop: 180,
            color: "#636169",
          }}
        >
          Let's Get Started!
        </Text>

        <Text
          style={{
            textAlign: "center",
            opacity: 0.6,
            marginTop: 10,
            marginHorizontal: 55,
            color: "#636169",
          }}
        >
          Create an account to get all features
        </Text>
      </View>
      <View>
        <TextInput
          style={[styles.containerinput]}
          placeholder="Full Name"
          name="FullName"
          icon="user"
          value={fullName.value}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={[styles.containerinput]}
          placeholder="Email Address"
          name="Email"
          icon="mail"
          value={emailAdd.value}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={[styles.containerinput]}
          placeholder="Username"
          name="Username"
          icon="mail"
          value={username.value}
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          style={[styles.containerinput]}
          placeholder="Password"
          name="Password"
          icon="lock"
          secureTextEntry={true}
          pass={true}
          value={password.value}
          onChangeText={(text) => setPassword(text)}
        />
        <TextInput
          style={[styles.containerinput]}
          placeholder="Confirm Password"
          name=" Confirm Password"
          icon="lock"
          secureTextEntry={true}
          pass={true}
          value={password2.value}
          onChangeText={(text) => setPassword2(text)}
        />
      </View>

      <View style={styles.SignUpB}>
        <Button title="SignUp" color="#79b6b8" onPress={onSignUpPressed} />
      </View>
      <View style={{ alignSelf: "center", top: 50, flexDirection: "row" }}>
        <Text
          style={styles.textBody}
          style={{ color: "#636169", opacity: 0.8 }}
        >
          I already Have an account.
        </Text>
        <Text
          style={[styles.textBody, { color: "#7997a8" }]}
          onPress={() => props.navigation.navigate("Home")}
        >
          Login
        </Text>
      </View>

      <View
        style={{
          marginHorizontal: 3,
          alignItems: "center",
          justifyContent: "center",
          marginTop: 215,
          backgroundColor: "#b4d1e1",
          paddingVertical: 17,
          borderRadius: 30,
          paddingHorizontal: 110,
        }}
      ></View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainbackground: {
    width: "100%",
    height: "100%",
    backgroundColor: "#f0f3fa",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  regButton: {
    width: "100%",
    height: 100,
    backgroundColor: "#79b6b8",
  },

  image1: {
    width: 180,
    height: 180,
    position: "absolute",
    top: 100,
    alignSelf: "center",
  },
  mailicon: {
    width: 200,
    height: 200,
    position: "absolute",
    top: 580,
  },

  submitsubmit: {
    width: "75%",
    height: 55,
    borderRadius: 100,
    marginVertical: 5,
    alignSelf: "center",
    top: 30,
    fontSize: 25,
    fontWeight: "bold",
    alignSelf: "center",
    opacity: 0.6,
  },
  SignUpB: {
    width: '75%',
        height:55,
        borderRadius:100,
        marginVertical:5,
        alignSelf:'center',
        top:30,
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
  inputContainer: {
    borderBottomWidth: 0,
  },
  inputText: {
    color: "#636169",
    fontWeight: "bold",
    marginLeft: 5,
  },
});

export default SignupPage;