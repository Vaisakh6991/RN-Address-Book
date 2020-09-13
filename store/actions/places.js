import * as FileSystem from "expo-file-system";
import { insertPlace, fetchPlaces, deleteAllPlaces } from "../../helpers/db";
import { ENV } from "../../env";
import { Alert } from "react-native";

export const ADD_PLACE = "ADD_PLACE";
export const SET_PLACES = "SET_PLACES";
export const DELETE_ALL = "DELETE_ALL";

export const addPlace = (title, image, location) => {
  return async (dispatch) => {
    // someFolder/myImage.jpg => ['someFolder', 'myImage.jpg'] => myImage.jpg// fileName
    const fileName = image.split("/").pop();
    const newPath = FileSystem.documentDirectory + fileName;
    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${location.latitude}+${location.longitude}&key=${ENV.geoLocationAPI}`
    );
    if (!response.ok) {
      Alert.alert("Request failed", "you are sending too much requests", [
        { text: "ok" },
      ]);
      throw new Error("something went wrong");
    }
    const resData = await response.json();
    // console.log(resData.results[0].formatted);

    const address = resData.results[0].formatted;
    try {
      await FileSystem.moveAsync({
        from: image,
        to: newPath,
      });
      const dbResult = await insertPlace(
        title,
        newPath,
        address,
        location.latitude,
        location.longitude
      );
      console.log("insert into db \n", dbResult);
      dispatch({
        type: ADD_PLACE,
        placeData: {
          id: dbResult.insertId,
          title,
          image: newPath,
          address,
          coords: { lat: location.latitude, lng: location.longitude },
        },
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const loadPlaces = () => {
  return async (dispatch) => {
    try {
      const dbResult = await fetchPlaces();
      // the result of query is stored in " dbResult.rows._array"
      dispatch({ type: SET_PLACES, places: dbResult.rows._array });
    } catch (err) {
      throw err;
    }
  };
};

export const deletePlaces = () => {
  return async (dispatch) => {
    try {
      await deleteAllPlaces();
      dispatch({ type: DELETE_ALL });
    } catch (err) {
      throw err;
    }
  };
};
