import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { colors, fonts, images } from "../../../assets";

const NoTicketsMessage = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={images.placeholderBig} />
      <Text style={styles.text}>You have no tickets to view.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  image: {
    marginBottom: 16,
  },
  text: {
    color: colors.black,
  },
});

export default NoTicketsMessage;
