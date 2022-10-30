import React, { useState } from 'react';
import type {Node} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';


import HomePage from './widgets/homePage';
import NearbyStations from './widgets/showNearbyStops';
import SearchStops from './widgets/searchStops';

import Styles from './widgets/styles';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App: () => Node = () => {
  return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown:false}}>
          <Stack.Screen name="Home" component={HomePage} />
          <Stack.Screen name="Show Nearby Stops" component={NearbyStations} />
          <Stack.Screen name="Search Stops" component={SearchStops} />
        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default App;
