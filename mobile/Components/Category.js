
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Button,
} from "react-native";
import {
  AntDesign,
  Ionicons,
  FontAwesome5,
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
  Feather,
} from "@expo/vector-icons";

import { TouchableOpacity } from "react-native-gesture-handler";

const data = [
  {
    key: "Shopping",
    icon: () => <AntDesign name="shoppingcart" size={34} color="#124312" />,
  },
  {
    key: "Electrisity",
    icon: () => (
      <MaterialIcons name="electrical-services" size={34} color="#eec994" />
    ),
  },
  {
    key: "FastFood",
    icon: () => <Ionicons name="fast-food-outline" size={34} color="#b7e0c4" />,
  },
  {
    key: "Gifts",
    icon: () => <FontAwesome5 name="gifts" size={34} color="#124312" />,
  },
  {
    key: "Fotball",
    icon: () => <FontAwesome name="soccer-ball-o" size={34} color="#e4bb59" />,
  },
  {
    key: "HealthFood",
    icon: () => (
      <MaterialCommunityIcons
        name="food-apple-outline"
        size={34}
        color="#b0e8c9"
      />
    ),
  },
  {
    key: "Phones",
    icon: () => (
      <Feather
        name="phone-call"
        size={34}
        color="#124312"
        flex="1"
        justifyContent="center"
      />
    ),
  },
  {
    key: "Car",
    icon: () => <Ionicons name="car-sport-outline" size={34} color="#e4bb59" />,
  },
  {
    key: "Health",
    icon: () => <MaterialIcons name="healing" size={34} color="#b7e0c4" />,
  },
  {
    key: "Clothes",
    icon: () => <Ionicons name="ios-shirt-outline" size={34} color="#124312" />,
  },
  {
    key: "House",
    icon: () => <Ionicons name="home-outline" size={34} color="#e4bb59" />,
  },
  {
    key: "Pets",
    icon: () => <MaterialIcons name="pets" size={34} color="#b7e0c4" />,
  },
  {
    key: "Games",
    icon: () => (
      <MaterialIcons name="sports-esports" size={34} color="#124312" />
    ),
  },
  {
    key: "Taxi",
    icon: () => <FontAwesome name="taxi" size={34} color="#e4bb59" />,
  },
  {
    key: "Invoices",
    icon: () => <FontAwesome5 name="file-invoice" size={34} color="#b7e0c4" />,
  },
];

const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
  while (
    numberOfElementsLastRow !== numColumns &&
    numberOfElementsLastRow !== 0
  ) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow++;
  }

  return data;
};

const numColumns = 3;
export default class CategoriesList extends React.Component {
  renderItem = ({ item, index }) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    return (
      <View style={styles.item}>
        <TouchableOpacity onPress={() => this.props.onPressCategory(item.key)}>
          {typeof item.icon === "function" && item.icon()}
          <Text style={styles.itemText}>{item.key}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    return (
      <FlatList
        data={formatData(data, numColumns)}
        // style={styles.container}
        renderItem={this.renderItem}
        numColumns={numColumns}
        contentContainerStyle={styles.container}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
    backgroundColor: "#e7e7e7",
    justifyContent: "center",
  },
  item: {
    backgroundColor: "#e7e7e7", //"#79b6b8",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    flex: 1,
    margin: 4,
    borderLeftWidth: 3,
    borderBottomWidth: 3,
    borderColor: "black",

    shadowColor: "#000000",
    shadowOpacity: 1.5,
    shadowRadius: 9,
    shadowOffset: {
      height: 5,
      width: 5,
    },

    height: Dimensions.get("window").width / (numColumns * 1.6), // approximate a square
  },
  itemInvisible: {
    backgroundColor: "transparent",
  },
  itemText: {
    color: "#000",
    fontSize: 15,
  },
});