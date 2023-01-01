import React, { useState } from 'react';
import type { Node } from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  Animated
} from 'react-native';


import HomePage from './widgets/homePage';
import NearbyStations from './widgets/showNearbyStops';
import SearchStops from './widgets/searchStops';
import DepartureTimes from './widgets/departureTimes';

import Styles from './widgets/styles';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// react-native-vector-icons/Ionicons otherwise.
import Icon from 'react-native-vector-icons/Ionicons';

const Stack = createBottomTabNavigator();

const HomeButton = (props) => (
  <TouchableOpacity
    activeOpacity={0.9}
    style={{ borderRightWidth: 0.25, borderRightColor: "#ebdbb2", alignItems: "center", flex: 1, backgroundColor: props.accessibilityState.selected ? "#363636" : "#161616", flexDirection: "column", justifyContent: "flex-end", padding: 5 }}
    onPress={props.onPress}
  >
    <Icon style={{ marginTop: 5, flex: 1 }} name={props.accessibilityState.selected ? 'home' : 'home-outline'} size={props.accessibilityState.selected ? 20 : 15} color={props.accessibilityState.selected ? "#ebdbb2" : "#a89984"} />
    <Text style={{ textAlign: 'center', marginBottom: 15, color: props.accessibilityState.selected ? "#ebdbb2" : "#a89984", fontStyle: props.accessibilityState.selected ? 'italic' : 'normal' }}>Ana sayfa</Text>
  </TouchableOpacity>
);

const SearchButton = (props) => (
  <TouchableOpacity
    activeOpacity={0.9}
    style={{ borderLeftWidth: 0.25, borderLeftColor: "#ebdbb2", alignItems: "center", flex: 1, backgroundColor: props.accessibilityState.selected ? "#363636" : "#161616", flexDirection: "column", justifyContent: "flex-end", padding: 5 }}
    onPress={props.onPress}
  >
    <Icon style={{ marginTop: 5, flex: 1 }} name={props.accessibilityState.selected ? 'bus' : 'bus-outline'} size={props.accessibilityState.selected ? 20 : 15} color={props.accessibilityState.selected ? "#ebdbb2" : "#a89984"} light={props.accessibilityState.selected} />
    <Text style={{ textAlign: 'center', marginBottom: 15, color: props.accessibilityState.selected ? "#ebdbb2" : "#a89984", fontStyle: props.accessibilityState.selected ? 'italic' : 'normal' }}>Durak ara</Text>
  </TouchableOpacity>
)
const DepartureButton = (props) => (
  <TouchableOpacity
    activeOpacity={0.9}
    style={{ borderLeftWidth: 0.25, borderLeftColor: "#ebdbb2", alignItems: "center", flex: 1, backgroundColor: props.accessibilityState.selected ? "#363636" : "#161616", flexDirection: "column", justifyContent: "flex-end", padding: 5 }}
    onPress={props.onPress}
  >
    <Icon style={{ marginTop:5, flex:1 }} name={props.accessibilityState.selected ? 'time' : 'time-outline'} size={props.accessibilityState.selected ? 20 : 15} color={props.accessibilityState.selected ? "#ebdbb2" : "#a89984"} light={props.accessibilityState.selected} />
    <Text style={{ textAlign: 'center', marginBottom: 15, color: props.accessibilityState.selected ? "#ebdbb2" : "#a89984", fontStyle: props.accessibilityState.selected ? 'italic' : 'normal' }}>Kalkış saatleri</Text>
  </TouchableOpacity>
)

const NearbyStopsButton = (props) => (
  <TouchableOpacity
    activeOpacity={0.9}
    style={{ borderLeftWidth: 0.25, borderLeftColor: "#ebdbb2", alignItems: "center", flex: 1, backgroundColor: props.accessibilityState.selected ? "#363636" : "#161616", flexDirection: "column", justifyContent: "flex-end", padding: 5 }}
    onPress={() => {
      props.onPress();
    }}
  >
    <Icon style={{ marginTop: 5, flex:1 }} name={props.accessibilityState.selected ? 'location' : 'location-outline'} size={props.accessibilityState.selected ? 20 : 15} color={props.accessibilityState.selected ? "#ebdbb2" : "#a89984"} light={props.accessibilityState.selected} />
    <Text style={{ marginBottom: 15, color: props.accessibilityState.selected ? "#ebdbb2" : "#a89984", fontStyle: props.accessibilityState.selected ? 'italic' : 'normal', textAlign: 'center', }}>Yakın duraklar</Text>
  </TouchableOpacity>
)

const App = () => {

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#242424" }}>
     <StatusBar  barStyle="light-content"  backgroundColor="#242424" translucent={true} />

      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false, tabBarActiveBackgroundColor: "#363636", tabBarInactiveBackgroundColor: "#282828", tabBarActiveTintColor: "#ebdbb2", tabBarInactiveTintColor: "#a89984", tabBarStyle: { height: 90, borderTopWidth: 0, } }}>

          <Stack.Screen name="Home" component={HomePage} options={{ tabBarButton: HomeButton }} />

          <Stack.Screen name="Show Nearby Stops" component={NearbyStations} options={{ tabBarButton: NearbyStopsButton }} />

          <Stack.Screen name="Search Stops" component={SearchStops} options={{ tabBarButton: SearchButton }} />

          <Stack.Screen name="Departure Times" component={DepartureTimes} options={{ tabBarButton: DepartureButton }} />

        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
