import React, { useState } from 'react';
import type {Node} from 'react';
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
} from 'react-native';


import HomePage from './widgets/homePage';
import NearbyStations from './widgets/showNearbyStops';
import SearchStops from './widgets/searchStops';

import Styles from './widgets/styles';

import { NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// react-native-vector-icons/Ionicons otherwise.
import Icon from 'react-native-vector-icons/FontAwesome5';

const Stack = createBottomTabNavigator();

const HomeButton = ( props ) => (
    <TouchableOpacity 
    activeOpacity={0.9} 
    style={{alignItems: "center", flex: 1, backgroundColor: props.accessibilityState.selected ? "#363636" : "#282828", flexDirection: "column", justifyContent: "flex-end"}} 
    onPress={props.onPress}
    >
      <Icon name='home' size={props.accessibilityState.selected ? 20 : 15} color={"#ebdbb2"}/>
      <Text style={{marginBottom:15, color:"#ebdbb2"}}>Ana sayfa</Text>
    </TouchableOpacity>
  );

 const SearchButton = ( props ) => (
    <TouchableOpacity 
    activeOpacity={0.9} 
    style={{alignItems: "center", flex: 1, backgroundColor: props.accessibilityState.selected ? "#363636" : "#282828", flexDirection: "column", justifyContent: "flex-end"}} 
    onPress={props.onPress }
    >
      <Icon name='bus' size={props.accessibilityState.selected ? 20 : 15} color={"#ebdbb2"} light={props.accessibilityState.selected}/>
      <Text style={{marginBottom:15, color:"#ebdbb2"}}>Durak ara</Text>
    </TouchableOpacity>
  )

const App: () => Node = () => {
  return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown:false, tabBarActiveBackgroundColor:"#363636", tabBarInactiveBackgroundColor:"#282828", tabBarActiveTintColor:"#ebdbb2", tabBarInactiveTintColor:"#a89984", tabBarStyle:{height:60,}}}>
        
          <Stack.Screen name="Home" component={HomePage} options={{tabBarButton:HomeButton}} />
          
          <Stack.Screen name="Show Nearby Stops" component={NearbyStations} options={{tabBarButton:()=>null}} />
          
          <Stack.Screen name="Search Stops" component={SearchStops} options={{tabBarButton:SearchButton}} />
        
        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default App;
