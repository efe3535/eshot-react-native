import React, { useState, useRef, useEffect } from 'react';
import type { Node } from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  //Dimensions,
  FlatList,
  View,
} from 'react-native';

import { fetch } from 'react-native-ssl-pinning';

import Styles from './styles.js';
import html_script from '../html_script.js'
import WebView from 'react-native-webview'


const NearbyStations = ({ navigation, route }) => {
  const [isLoading, setLoading] = useState(false);
  const [eshot, setEshot] = useState({});
  const [durakAdlar, setDurakAdlar] = useState([]);
  const [durakKoordinatlar, setDurakKoordinatlar] = useState([]);
  const [ilkKoordinat, setIlkKoordinat] = useState([]);

  const myref = useRef(null);
  _goToMyPosition = (lat, lon) => {
    //console.log(lat, lon)
    myref.current.injectJavaScript(`
      mymap.setView([${lat.toString()}, ${lon.toString()}], 100)
      L.marker([${lat.toString()}, ${lon.toString()}]).addTo(mymap)
    `)
  }

  getNearestStop = (lat, lon) => {
    //console.log(lat)
    //console.log(lon)
    //return fetch(`https://openapi.izmir.bel.tr/api/eshot/yakinduraklar/${lat}/${lon}`)
    return fetch(`https://openapi.izmir.bel.tr/api/eshot/yakinduraklar/${lat}/${lon}`, { method: 'GET', timeoutInterval: 10000, sslPinning: { certs: ['mycert'] } })
      .then((response) => response.json())
      .then((responseJson) => {
        //return [responseJson[0].KoorX, responseJson[0].KoorY]
        setEshot(responseJson);
        setDurakAdlar([]);
        for (var keys in responseJson) {
          //setDurakAdlar([... responseJson[key][0]]);
          setDurakAdlar(durakAdlar => 
            [
              ...durakAdlar, 
              {
                id: durakAdlar.length!=0 ? durakAdlar[durakAdlar.length - 1]['id']+1 : 0,
                durakAd: responseJson[keys]['Adi'], 
                durakId: responseJson[keys]['Id'].toString(),
                durakMesafe: responseJson[keys]['Mesafe'].toString().split(".")[0] + "." + responseJson[keys]['Mesafe'].toString().split(".")[1].slice(0,1) 
              }
            ])
              
          setDurakKoordinatlar(durakKoordinatlar => [
            ...durakKoordinatlar,
            {
              'x': responseJson[keys]['KoorX'],
              'y': responseJson[keys]['KoorY'],
            }
          ]);
        }
        //  console.log([responseJson[0]['KoorX'], responseJson[0]['KoorY']])
        setIlkKoordinat([responseJson[0]['KoorX'], responseJson[0]['KoorY']]);
        //   console.log(durakAdlar);
      }).catch((error) => console.warn(error))
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    setLoading(true);
    getNearestStop(route.params.koorX, route.params.koorY);
    //console.log(ilkKoordinat[0], ilkKoordinat[1])
  }, [])

  const markLocations = () => {
    for (var keys in durakKoordinatlar) {
      myref.current.injectJavaScript(`
      L.marker([${durakKoordinatlar[keys]['x']}, ${durakKoordinatlar[keys]['y']}]).addTo(mymap)
      `)
    }
    myref.current.injectJavaScript(`
      mymap.setView([${durakKoordinatlar[0]['x']}, ${durakKoordinatlar[0]['y']}], 100)
    `)
  }

  const styles = StyleSheet.create({
    container: {
      width: 300,
      height: 300,
      backgroundColor: "#121212",
      alignContent: 'center',
      justifyContent: 'center',
      alignItems: 'center'
    },
    main: { backgroundColor: "#121212", flex: 1, alignContent: 'center', alignItems: 'center', paddingBottom:35, paddingTop:15 },
    map: {
      width: 300,
      height: 300,
      margin: 15
    },

  });

  const renderItem = ({ item }) => (
    <View style={{ backgroundColor: "#1d2021", padding: 15, margin: 15, borderRadius: 15, justifyContent: 'center', alignContent: "center", }}>
        <Text style={{textAlign:'center'}}>
            {item.durakId} — {item.durakAd}{"\n" + "Mesafe: " + item.durakMesafe} metre
        </Text>
    </View>
);

  //const [position, setPosition] = useState([]);
  return (
    <View style={{ flex: 1, backgroundColor: '#121212' }}>
      <View style={styles.main}>
        <Text style={Styles.welcome}>Your location: {route.params.koorX}, {route.params.koorY}</Text>
        <View style={styles.container}>
          <WebView ref={myref} source={{ html: html_script }} style={styles.map} />
        </View>
        <Text style={{ fontWeight: '900' }}>En yakin duraklar:</Text>
        <FlatList numColumns={1} data={durakAdlar} renderItem={renderItem} keyExtractor={item => item.id} nestedScrollEnabled />
        <View style={{marginTop:15}}>
          <Button title='en yakin duraga git' onPress={markLocations} />
        </View>
      </View>
    </View>
  );
}

export default NearbyStations;