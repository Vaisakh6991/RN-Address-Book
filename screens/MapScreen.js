import React, { useCallback, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import FloatingButton from "../components/UI/FloatingButton";

const MapScreen = (props) => {
  const { route, navigation } = props;

  const readOnly = route.params?.readOnly;
  const initialLocation = route.params?.initialLocation;

  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  const mapRegion = {
    latitude: initialLocation ? initialLocation.latitude : 10.5595677,
    longitude: initialLocation ? initialLocation.longitude : 76.2550717,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const selectLocationHandler = (event) => {
    // console.log(event);
    if (readOnly) {
      return;
    }
    setSelectedLocation({
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    });
  };

  let markerCoordinates;

  if (selectedLocation) {
    markerCoordinates = {
      latitude: selectedLocation.latitude,
      longitude: selectedLocation.longitude,
    };
  }

  const savePickedLocationHandler = () => {
    if (!selectedLocation) {
      Alert.alert("Choose a location", "You need to pick a location", [
        { text: "Okey" },
      ]);
      return;
    }
    navigation.navigate("newPlace", { pickedLocation: selectedLocation });
  };

  return (
    <View style={styles.map}>
      <MapView
        style={styles.map}
        region={mapRegion}
        showsUserLocation
        onPress={selectLocationHandler}
      >
        {markerCoordinates && (
          <Marker
            title="picked location"
            coordinate={markerCoordinates}
          ></Marker>
        )}
      </MapView>
      {!readOnly && (
        <FloatingButton
          icon="check"
          iconColor="#ffffff"
          style={styles.fab}
          onPress={savePickedLocationHandler}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  fab: {
    bottom: 40,
    right: 40,
  },
});

export default MapScreen;
