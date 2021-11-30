import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Button } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Entypo";
import { Feather, FontAwesome5, Ionicons } from "@expo/vector-icons";

// import { COLORS, FONTS, SIZES } from "../Constant/Thems";
// import icons from "../Constant/icons";
// import CategoriesList from "./Income";

function Calculator(props) {
  const [income, setIncome] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [currentNumber, setCurrentNumber] = useState("");
  const [lastNumber, setLastNumber] = useState("");
  const buttons = [
    "C",
    "B",
    "/",
    7,
    8,
    9,
    "*",
    4,
    5,
    6,
    "-",
    1,
    2,
    3,
    "+",
    0,
    "DEL",
    "=",
  ];


 
  


  const styles = StyleSheet.create({
    AllScreenAboveCalculator: {
      backgroundColor: darkMode ? "#3f4d5b" : "#fff",
      maxWidth: "100%",
      minHeight: "40%",
      alignItems: "flex-end",
      justifyContent: "flex-end",
    },
    ResultTextBox: {
      backgroundColor: "#70b6b8",
      color: darkMode ? "#fff" : "#fff",
      width: "75%",
      height: "20%",
      fontSize: 39,
      alignSelf: "center",
      justifyContent: "center",
      borderRadius: 20,
      bottom: "33%",
    },
    TextBoxIconsStyle: {
      color: darkMode ? "#fff" : "#fff",
    },
    // resultText: {
    //   //Red Line what you write
    //   maxHeight: 45,
    //   color: "#000", // "#70b6b8", ////// Our Color
    //   backgroundColor: "#70b6b8",
    //   margin: 15,
    //   fontSize: 35,
    // },

    // historyText: {
    //   // Line of iterations (Displaye the Results)
    //   color: darkMode ? "#B5B7BB" : "#7c7c7c",
    //   fontSize: 20,
    //   marginRight: 10,
    //   alignSelf: "flex-end",
    // },
    ChangeThemIcon: {
      // Dark & Light theme Icon
      alignSelf: "flex-start",
      bottom: "50%",
      backgroundColor: darkMode ? "#7b8084" : "#e5e5e5",
      alignItems: "center",
      justifyContent: "center",
      width: "20%",
      height: "15%",
      borderRadius: 10,
    },
    // Out of Result
    buttons: {
      //buttuons
      width: "100%",
      height: "29%",
      flexDirection: "row",
      flexWrap: "wrap",
    },
    button: {
      // All Buttons Without Operations buttons (/ + - * =)
      borderColor: darkMode ? "#3f4d5b" : "#70b6b8",
      alignItems: "center",
      justifyContent: "center",
      minWidth: "24%",
      minHeight: "54%",
      flex: 2,
    },
    textButton: {
      //White Standerd Buttons All Buttons without Operations Buttons
      // Numers (1 - 9)
      color: darkMode ? "#ffffff" : "#000000",
      fontSize: 26,
    },
  });
  const finalpreaa = () =>{
    console.log(currentNumber);
    fetch("http://192.168.1.10:53710/income", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        //we willl send this to the backend
        //key     //value

        income:currentNumber,
       
      }),
    })
      .then(() => {
       // AsyncStorage.setItem('email',email);
       // props.navigation.navigate('Main');
        Alert.alert("Welcom to Gocoin");
      })

      .catch((error) => {
        console.log("Api call error");
       
      });


  }

  const handleInput = (btnPressed) => {
    


    if (
      btnPressed === "+" ||
      btnPressed === "-" ||
      btnPressed === "*" ||
      btnPressed === "/"
    ) {
      setCurrentNumber(currentNumber + btnPressed);
      return;
    }

    switch (btnPressed) {
      case "DEL":
        setCurrentNumber(currentNumber.substring(0, currentNumber.length - 1));
        return;
      case "C":
        setLastNumber("");
        setCurrentNumber("");
        return;
      case "=":
        setLastNumber(currentNumber + "=");
        calculate();
      case "CHOOSE CATEGORY":
        return;
    }
    setCurrentNumber(currentNumber + btnPressed);
  };

  const calculate = () => {
    let lastArr = currentNumber[currentNumber.length - 1];
    if (
      lastArr === "/" ||
      lastArr === "*" ||
      lastArr === "-" ||
      lastArr === "+" ||
      lastArr === "."
    ) {
      setCurrentNumber(currentNumber);
    } else {
      let result = eval(currentNumber).toString();
      setCurrentNumber(result);
      return;
    }
  };

  return (
    <View>
      <View style={styles.AllScreenAboveCalculator}>
        <TouchableOpacity style={styles.ChangeThemIcon}>
          <Icon
            name={darkMode ? "light-up" : "moon"}
            size={24}
            color={darkMode ? "white" : "black"}
            onPress={() => (darkMode ? setDarkMode(false) : setDarkMode(true))}
          />
        </TouchableOpacity>
        <Button style={styles.ChangeThemIcon}
        title="SignUp"  onPress={finalpreaa}
        />

        <Text
        value={income.value}
        onChangeText={(text) => setIncome(text)}
        
        style={styles.ResultTextBox}>
          <FontAwesome5
            name="coins"
            size={24}
            style={styles.TextBoxIconsStyle}
          />
          {currentNumber}{" "}
          <Feather name="delete" size={36} style={styles.TextBoxIconsStyle} />
       </Text>

        {/* <Text style={styles.historyText}></Text> */}
        {/* <Text style={styles.resultText}></Text> */}
      </View>
      <View style={styles.buttons}>
        {buttons.map((btn) =>
          btn === "=" ||
          btn === "/" ||
          btn === "*" ||
          btn === "-" ||
          btn === "+" ? (
            <TouchableOpacity
              key={btn}
              style={[styles.button, { backgroundColor: "#70b6b8" }]}
              onPress={() => handleInput(btn)}
            >
              <Text
                style={[styles.textButton, { color: "white", fontSize: 28 }]}
              >
                {btn}
              </Text>
            </TouchableOpacity>
          ) : btn === 0 ? (
            <TouchableOpacity
              key={btn}
              style={[
                styles.button,
                {
                  backgroundColor:
                    typeof btn === "number"
                      ? darkMode
                        ? "#303946"
                        : "#fff"
                      : darkMode === true
                      ? "#414853"
                      : "#ededed",
                  minWidth: "36%",
                },
              ]}
              onPress={() => handleInput(btn)}
            >
              <Text style={styles.textButton}>{btn}</Text>
            </TouchableOpacity>
          ) : btn === "B" || btn === "DEL" ? (
            <TouchableOpacity
              key={btn}
              style={[
                styles.button,
                {
                  backgroundColor:
                    btn === "."
                      ? darkMode
                        ? "#303946"
                        : "#fff"
                      : darkMode === true
                      ? "#414853"
                      : "#ededed",
                  minWidth: "37%",
                },
              ]}
              onPress={() => handleInput(btn)}
            >
              <Text style={styles.textButton}>{btn}</Text>
            </TouchableOpacity>
          ) : btn === "C" ? (
            <TouchableOpacity
              key={btn}
              style={[
                styles.button,
                {
                  backgroundColor:
                    typeof btn === "number"
                      ? darkMode
                        ? "#303946"
                        : "#fff"
                      : darkMode === true
                      ? "#414853"
                      : "#ededed",
                  minWidth: "36%",
                },
              ]}
              onPress={() => handleInput(btn)}
            >
              <Text style={styles.textButton}>{btn}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              key={btn}
              style={[
                styles.button,
                {
                  backgroundColor:
                    typeof btn === "number"
                      ? darkMode
                        ? "#303946"
                        : "#fff"
                      : darkMode === true
                      ? "#414853"
                      : "#ededed",
                },
              ]}
              onPress={() => handleInput(btn)}
            >
              <Text style={styles.textButton}>{btn}</Text>
            </TouchableOpacity>
          )
        )}
      </View>
    </View>
  );
}

export default Calculator;