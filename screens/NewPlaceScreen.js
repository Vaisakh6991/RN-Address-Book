import React, { useCallback, useLayoutEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import Card from "../components/UI/Card";
import CustomButton from "../components/UI/Button";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { addPlace } from "../store/actions/places";
import ImageSelector from "../components/Place/ImageSelector";
import LocationPicker from "../components/Place/LocationPicker";

const NewPlaceScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [selectedImage, setSelectedImage] = useState();
  const [selectedLocaiton, setSelectedLocaiton] = useState();

  const titleChangeHandler = (text) => {
    setTitle(text);
  };

  console.log("RE-RENDER");
  const onImageTakenHandler = (imagePath) => {
    setSelectedImage(imagePath);
  };

  const savePlaceHandler = () => {
    dispatch(addPlace(title, selectedImage, selectedLocaiton));
    navigation.goBack();
  };

  const locationPickedHandler = useCallback((location) => {
    setSelectedLocaiton(location);
    // console.log("picked location, newPlace", location);
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add a new address",
    });
  }, [navigation]);

  return (
    <ScrollView>
      <Card>
        <View style={styles.form}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            onChangeText={titleChangeHandler}
            value={title}
          />
          <ImageSelector onImageTaken={onImageTakenHandler} />
          <LocationPicker
            navigation={navigation}
            route={route}
            onLocationPicked={locationPickedHandler}
          />
          <View style={styles.btnContainer}>
            <CustomButton title="save" onPress={savePlaceHandler} />
          </View>
        </View>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 15,
    height: 30,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  btnContainer: {
    alignItems: "center",
    width: "100%",
  },
});

export default NewPlaceScreen;
