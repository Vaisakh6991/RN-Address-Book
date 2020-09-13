import React from "react";
import { Platform } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import PlaceListSCreen from "../screens/PlaceListSCreen";
import PlaceDetailScreen from "../screens/PlaceDetailScreen";
import NewPlaceScreen from "../screens/NewPlaceScreen";
import MapScreen from "../screens/MapScreen";

import Colors from "../constants/Colors";

const Stack = createStackNavigator();

const defaultStackScreenOptions = {
  animationEnabled: true,
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
    height: 120,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
};

const PlaceNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={defaultStackScreenOptions}>
      <Stack.Screen name="placeList" component={PlaceListSCreen} />
      <Stack.Screen name="placeDetail" component={PlaceDetailScreen} />
      <Stack.Screen name="newPlace" component={NewPlaceScreen} />
      <Stack.Screen name="Map" component={MapScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default PlaceNavigator;
