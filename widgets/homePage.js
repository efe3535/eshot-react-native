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

import Styles from './styles.js';
import {NavigationContainer} from '@react-navigation/native';
import Geolocation from 'react-native-geolocation-service';
//import MapView from 'react-native-maps';

const HomePage = ( { navigation } ) => {
    
    

    //const [position, setPosition] = useState([]);
  return (
    <SafeAreaView style={Styles.safeAreaView}>
      <Button title='Get location' onPress={() => {
        Geolocation.getCurrentPosition(
          (position) => {
            //setPosition([position.coords.latitude, position.coords.longitude]);
            navigation.navigate("Show Nearby Stops", {koorX: position.coords.latitude, koorY: position.coords.longitude});
        },
          (error) => {
            // See error code charts below.
            console.log(error.code, error.message);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
      }}/>
      <Button title='Search stops' onPress={() => {
            navigation.navigate("Search Stops");
      }} color="#ae3333"/>
    </SafeAreaView>
  );
}
  

export default HomePage;