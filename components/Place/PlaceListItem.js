import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { TouchableNativeFeedback } from "react-native-gesture-handler";
import Card from "../UI/Card";

const PlaceListItem = (props) => {
  return (
    // <Card>
    <View style={styles.touchable}>
      <TouchableNativeFeedback
        useForeground
        onPress={props.onSelect}
        style={styles.container}
      >
        <View>
          <View style={styles.wrapper}>
            <View style={styles.imgContainer}>
              <Image
                source={{
                  uri: props.image
                    ? props.image
                    : "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?h=350&auto=compress&cs=tinysrgb",
                }}
                style={styles.img}
              />
            </View>
            <View>
              <View style={styles.textContaincer}>
                <Text style={styles.title}> {props.title} </Text>
                <Text style={styles.address}> {props.address} </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableNativeFeedback>
    </View>
    // </Card>
  );
};

const styles = StyleSheet.create({
  touchable: {
    overflow: "hidden",
    borderRadius: 10,
    justifyContent: "center",
    height: 100,
    borderWidth: 0.5,
    borderColor: "#ccc",
    marginVertical: 5,
    backgroundColor: "#ffffff",
    paddingHorizontal: 2,
  },
  container: {
    width: "100%",
    height: 100,
    justifyContent: "center",
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  imgContainer: {
    height: 65,
    width: 65,
    borderRadius: 65 / 2,
    overflow: "hidden",
    elevation: 10,
    backgroundColor: "#ccc",
  },
  img: {
    height: "100%",
    width: "100%",
  },
  textContaincer: {
    left: 30,
  },
  title: {
    color: "black",
    fontSize: 22,
    fontWeight: "bold",
  },
  address: {
    fontSize: 16,
    color: "#666",
  },
});
export default PlaceListItem;
