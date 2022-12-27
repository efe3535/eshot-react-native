import React, { useState } from 'react';
import type { Node } from 'react';
import {
  ActivityIndicator,
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
import { NavigationContainer } from '@react-navigation/native';
import Geolocation from 'react-native-geolocation-service';

const HomePage = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  return (

    <SafeAreaView style={Styles.safeAreaView}>
      <Text style={{fontSize:26, color:"#ebdbb2", textAlign:'center', fontFamily:'poppins' }}>ESHOT otobüslerini inceleyebileceğiniz uygulamaya hoş geldiniz!</Text>
      {/*}<View style={{marginTop:15}}>
      <Button color="#83a598" title='Yakin duraklar' onPress={() => {
        setLoading(true);
        Geolocation.getCurrentPosition(
          (position) => {
            //setPosition([position.coords.latitude, position.coords.longitude]);
            navigation.navigate("Show Nearby Stops", { koorX: position.coords.latitude, koorY: position.coords.longitude });
            setLoading(false);
          },
          (error) => {
            // See error code charts below.
            console.log(error.code, error.message);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      }} />
      </View>
      <ActivityIndicator animating={loading} size={loading ? 50 : 0}/>
      <View style={{ marginTop: 15 }}>
        <Button title='Durak ara' onPress={() => {
          navigation.navigate("Search Stops");
        }} color="#ae3333" />
      </View>  {*/}
    </SafeAreaView>
  );
}


export default HomePage;