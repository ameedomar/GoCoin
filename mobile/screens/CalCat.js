import React, { useState } from "react";
import { Alert, Button, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Calculator from "../Components/Calculater";
// import CategoriesList from "../components/Category";
import CategoriesList from "../Components/Category.js";

const CalculatorCategoryToggle = function (props) {
  const [currentPage, setCurrentPage] = useState("calc"); // Choosing between "calc" | "cats".
  return (
    <View
      style={{
        flex: 1,
        paddingBottom: 45,
        paddingTop: 20,
        backgroundColor: "#eee",
      }}
    >
      <View style={{ flex: 15 }}>
        {currentPage === "cats" && (
          <CategoriesList onPressCategory={(text) => Alert.alert(text)} />
        )}
        {currentPage === "calc" && <Calculator />}
      </View>
      <View style={{ flex: 1, alignItems: "stretch", marginTop: -45 }}>
        <Button
          style={{
            innerWidth: "100%",
          }}
          title="CHOOSE CATEGORY"
          onPress={() =>
            setCurrentPage(currentPage == "calc" ? "cats" : "calc")
          }
        />
      </View>
    </View>
  );
};

export default CalculatorCategoryToggle;