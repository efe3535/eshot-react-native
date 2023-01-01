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
import Icon from 'react-native-vector-icons/Ionicons';

const HomePage = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  return (

    <SafeAreaView style={Styles.safeAreaView}>
      <Text style={{fontSize:26, color:"#ebdbb2", textAlign:'center', fontFamily:'poppins' }}>ESHOT otobüslerini inceleyebileceğiniz uygulamaya hoş geldiniz!</Text>
      <Icon name="bus" style={{padding:65}} size={150} color={"#ebdbb2"} />
    </SafeAreaView>
  );
}


export default HomePage;