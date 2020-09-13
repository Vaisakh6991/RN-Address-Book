import React from "react";
import { View, StyleSheet } from "react-native";
import { TouchableNativeFeedback } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

const FloatingButton = (props) => {
  return (
    <View style={{ ...styles.container, ...props.style }}>
      <TouchableNativeFeedback onPress={props.onPress} useForeground>
        <View>
          <View
            style={{
              ...styles.button,
              ...styles.menu,
            }}
          >
            <MaterialIcons
              name={props.icon}
              size={24}
              color={props.iconColor}
            />
          </View>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    position: "absolute",
    overflow: "hidden",
    borderRadius: 60 / 2,
    elevation: 5,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  menu: {
    backgroundColor: Colors.secondary,
  },
});

export default FloatingButton;
