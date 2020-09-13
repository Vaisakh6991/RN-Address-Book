import React, { useLayoutEffect } from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Colors from "../constants/Colors";

const PlaceDetailScreen = ({ route, navigation }) => {
  const { title, address, imageUri, lat, lng } = route.params;

  const selectedLocation = {
    latitude: lat,
    longitude: lng,
  };

  const showMapHandler = () => {
    navigation.navigate("Map", {
      readOnly: true,
      initialLocation: selectedLocation,
    });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: title,
    });
  }, [navigation]);

  return (
    <ScrollView contentContainerStyle={{ alignItems: "center" }}>
      <View style={styles.imgContainer}>
        <Image style={styles.img} source={{ uri: imageUri }} />
      </View>
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{address}</Text>
        </View>
        <MapView
          style={styles.mapPreview}
          region={{
            latitude: lat,
            longitude: lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onPress={showMapHandler}
        >
          <Marker
            title={title}
            coordinate={{
              latitude: lat,
              longitude: lng,
            }}
          ></Marker>
        </MapView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imgContainer: {
    width: "100%",
    height: "35%",
    minHeight: 300,
    backgroundColor: "#ccc",
    overflow: "hidden",
  },
  img: {
    width: "100%",
    height: "100%",
  },
  locationContainer: {
    marginVertical: 20,
    width: "90%",
    maxWidth: 350,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: "white",
    borderRadius: 10,
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary,
    textAlign: "center",
  },
  mapPreview: {
    width: "100%",
    maxWidth: 350,
    height: 300,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});

export default PlaceDetailScreen;
