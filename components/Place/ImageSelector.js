import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Alert } from "react-native";
import CustomButton from "../UI/Button";
import Colors from "../../constants/Colors";

import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

const ImageSelector = (props) => {
  const [imageUri, setImageUri] = useState("");

  const verifyPermissions = async () => {
    // askAsync asks for Persmission, where getAsync checks the permission granted or not
    const result = await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.CAMERA_ROLL
    ); //permission for accessing camera & Gallery

    if (result.status !== "granted") {
      Alert.alert(
        "PERMISSION DENIED !",
        "You need to grant camera access to use this app",
        [{ text: "Ok" }]
      );
      return false;
    }
    return true;
  };

  const takeImageHandler = async () => {
    //launches camera
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const image = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });
    setImageUri(image.uri);
    props.onImageTaken(image.uri);
  };

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {imageUri ? (
          <Image style={styles.image} source={{ uri: imageUri }} />
        ) : (
          <Text style={{ marginTop: 50 }}>No image selected</Text>
        )}
      </View>
      <CustomButton
        title="Take image"
        style={styles.btn}
        onPress={takeImageHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: "center",
    marginBottom: 15,
  },
  imagePreview: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 0.5,
    borderRadius: 10,
    overflow: "hidden",
    // elevation: 5,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  btn: {
    backgroundColor: Colors.primary,
    width: "40%",
    height: 40,
    justifyContent: "center",
  },
});

export default ImageSelector;
