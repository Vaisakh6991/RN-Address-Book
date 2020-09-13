import React from "react";
import { View, Text, TouchableNativeFeedback, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

const Button = (props) => {
  return (
    <View style={styles.btnContainer}>
      <TouchableNativeFeedback onPress={props.onPress}>
        <View style={{ ...props.style, ...styles.btn }}>
          <Text style={styles.text}> {props.title} </Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    borderRadius: 15,
    overflow: "hidden",
  },
  btn: {
    backgroundColor: Colors.primary,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
  text: {
    color: "white",
    textTransform: "capitalize",
    fontSize: 18,
    textAlign: "center",
  },
});

export default Button;
