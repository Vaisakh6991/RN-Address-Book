import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, Alert, StyleSheet } from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import MapView, { Marker } from "react-native-maps";
import CustomButton from "../UI/Button";

const LocationPicker = (props) => {
  const [pickedLocation, setPickedLocation] = useState();
  const [isFetching, setIsFetching] = useState(false);

  const mapPickedLocation = props.route.params?.pickedLocation;
  console.log("MAP_PICKED_LOCATION", mapPickedLocation);

  const { onLocationPicked } = props;

  useEffect(() => {
    if (mapPickedLocation) {
      setPickedLocation(mapPickedLocation);
      onLocationPicked(mapPickedLocation);
    }
  }, [mapPickedLocation, onLocationPicked]);

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION);

    if (result.status !== "granted") {
      Alert.alert(
        "PERMISSION DENIED !",
        "You need to grant location access to use this app",
        [{ text: "Ok" }]
      );
      return false;
    }
    return true;
  };

  const getLocationHandler = async () => {
    // Getting the location by pressing the Get Location button
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }

    try {
      setIsFetching(true);
      const location = await Location.getCurrentPositionAsync({
        timeout: 5000,
      });
      setPickedLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      props.onLocationPicked({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    } catch (err) {
      Alert.alert(
        "Failed to get location",
        "Please try again pr pick a location on map",
        [{ text: "Okey" }]
      );
    }
    setIsFetching(false);
  };

  const pickOnMapHandler = () => {
    props.navigation.navigate("Map");
  };

  return (
    <View style={styles.locationPicker}>
      <View style={styles.mapPreview}>
        {isFetching ? (
          <ActivityIndicator size="large" color="green" />
        ) : pickedLocation ? (
          <MapView
            style={{ flex: 1, height: 200, width: "100%" }}
            onPress={pickOnMapHandler}
            showsUserLocation
            showsMyLocationButton
            region={{
              latitude: pickedLocation.latitude,
              longitude: pickedLocation.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              title="picked location"
              coordinate={{
                latitude: pickedLocation.latitude,
                longitude: pickedLocation.longitude,
              }}
            ></Marker>
          </MapView>
        ) : (
          <Text>No location choosen yet</Text>
        )}
      </View>
      <View style={styles.btnContainer}>
        <View style={styles.btn}>
          <CustomButton
            style={{ height: 40 }}
            title="pick from map"
            onPress={pickOnMapHandler}
          />
        </View>
        <View style={styles.btn}>
          <CustomButton
            style={{ height: 40 }}
            title="Find me"
            onPress={getLocationHandler}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15,
  },
  mapPreview: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 0.5,
    borderRadius: 10,
    overflow: "hidden",
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  btn: {
    width: "45%",
  },
});

export default LocationPicker;

{
  /* <MapPreview location={pickedLocation} onPress={pickOnMapHandler}>
{isFetching ? (
  <ActivityIndicator size="large" color="red" />
) : (
  <Text>No location choosen</Text>
)}
</MapPreview> */
}

// {isFetching ? (
//   <ActivityIndicator size="large" color="green" />
// ) : pickedLocation ? (
//   <MapView
//     style={{ flex: 1, height: 200, width: "100%" }}
//     onPress={pickOnMapHandler}
//     showsUserLocation
//     showsMyLocationButton
//     region={{
//       latitude: pickedLocation.lat,
//       longitude: pickedLocation.lng,
//       latitudeDelta: 0.0922,
//       longitudeDelta: 0.0421,
//     }}
//   />
// ) : (
//   <Text>No location choosen yet</Text>
// )}
