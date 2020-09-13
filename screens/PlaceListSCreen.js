import React, { useLayoutEffect, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, FlatList } from "react-native";
import FloatingButton from "../components/UI/FloatingButton";
import PlaceListItem from "../components/Place/PlaceListItem";
import { useSelector, useDispatch } from "react-redux";
import { loadPlaces, deletePlaces } from "../store/actions/places";
import Colors from "../constants/Colors";

const PlaceListScreen = ({ route, navigation }) => {
  const places = useSelector((state) => state.places.places);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadPlaces());
  }, [dispatch]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Your addresses",
      headerTitle: "Your addresses",
    });
  }, [navigation]);

  return (
    <View style={styles.screen}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={places}
        renderItem={({ item }) => (
          <PlaceListItem
            image={item.imageUri}
            title={item.title}
            address={item.address}
            onSelect={() => navigation.navigate("placeDetail", item)}
          />
        )}
      />

      <FloatingButton
        icon="add"
        iconColor="#ffffff"
        style={{ bottom: 40, right: 40 }}
        onPress={() => navigation.navigate("newPlace")}
      />
      <FloatingButton
        icon="delete"
        iconColor="#ff0000"
        style={{ bottom: 40, left: 40 }}
        onPress={() => dispatch(deletePlaces())}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 10,
  },
});

export default PlaceListScreen;
