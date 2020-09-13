import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView from "react-native-maps";

const MapPreview = (props) => {
  const { onPress, location } = props;
  return (
    <TouchableOpacity onPress={onPress} style={{ flex: 1 }}>
      {location ? (
        <MapView
          style={styles.mapView}
          showsUserLocation
          showsMyLocationButton
          region={{
            latitude: location.lat,
            longitude: location.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      ) : (
        props.children
      )}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  mapView: {
    height: "100%",
    width: "100%",
  },
  map: {
    flex: 1,
  },
});

export default MapPreview;
