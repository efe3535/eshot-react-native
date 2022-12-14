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
  TouchableOpacity,
  FlatList,
  View,
  ActivityIndicator,
  Platform,

  //PermissionsAndroid
} from 'react-native';

import { fetch as pinningFetch } from 'react-native-ssl-pinning';

import Styles from './styles.js';
import html_script from '../html_script.js'
import WebView from 'react-native-webview'
import Geolocation from 'react-native-geolocation-service';

import Icon from 'react-native-vector-icons/Ionicons';


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
      var marker = L.marker([${lat.toString()}, ${lon.toString()}],).addTo(mymap)
    `)
  }

  getNearestStop = (lat, lon) => {
    console.log(lat)
    console.log(lon)
    //return fetch(`https://openapi.izmir.bel.tr/api/eshot/yakinduraklar/${lat}/${lon}`)
    console.log(Platform.OS)
    if (Platform.OS != "android") {
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
                  id: durakAdlar.length != 0 ? durakAdlar[durakAdlar.length - 1]['id'] + 1 : 0,
                  durakAd: responseJson[keys]['Adi'],
                  durakId: responseJson[keys]['Id'].toString(),
                  durakMesafe: responseJson[keys]['Mesafe'].toString().split(".")[0] + "." + responseJson[keys]['Mesafe'].toString().split(".")[1].slice(0, 1),
                  gecenHatlar: responseJson[keys]['GecenHatlar'].map(hatlar => hatlar["HatNo"])
                }
              ])
            //console.log()
            if (responseJson[keys]['KoorX'] != undefined) {
              setDurakKoordinatlar(durakKoordinatlar => [
                ...durakKoordinatlar,
                {
                  'x': responseJson[keys]['KoorX'],
                  'y': responseJson[keys]['KoorY'],
                }
              ]);
            }
          }
          //  console.log([responseJson[0]['KoorX'], responseJson[0]['KoorY']])
          setIlkKoordinat([responseJson[0]['KoorX'], responseJson[0]['KoorY']]);
          //   console.log(durakAdlar);
        }).catch((error) => console.warn(error))
        .finally(() => {
          setLoading(false);
        });
    } else {
      return pinningFetch(`https://openapi.izmir.bel.tr/api/eshot/yakinduraklar/${lat}/${lon}`, { method: 'GET', timeoutInterval: 10000, sslPinning: { certs: ['mycert'] } })
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
                  id: durakAdlar.length != 0 ? durakAdlar[durakAdlar.length - 1]['id'] + 1 : 0,
                  durakAd: responseJson[keys]['Adi'],
                  durakId: responseJson[keys]['Id'].toString(),
                  durakMesafe: responseJson[keys]['Mesafe'].toString().split(".")[0] + "." + responseJson[keys]['Mesafe'].toString().split(".")[1].slice(0, 1),
                  gecenHatlar: responseJson[keys]['GecenHatlar'].map(hatlar => hatlar["HatNo"])
                }
              ])
            //console.log()
            if (responseJson[keys]['KoorX'] != undefined) {
              setDurakKoordinatlar(durakKoordinatlar => [
                ...durakKoordinatlar,
                {
                  'x': responseJson[keys]['KoorX'],
                  'y': responseJson[keys]['KoorY'],
                }
              ]);
            }
          }
          //  console.log([responseJson[0]['KoorX'], responseJson[0]['KoorY']])
          setIlkKoordinat([responseJson[0]['KoorX'], responseJson[0]['KoorY']]);
          //   console.log(durakAdlar);
        }).catch((error) => console.warn(error))
        .finally(() => {
          setLoading(false);
        });
    }
  }

  const getLocation = () => {
    setLoading(true);
    Geolocation.getCurrentPosition(
      (position) => {
        getNearestStop(position.coords.latitude, position.coords.longitude);
        setLoading(false);
      },
      (error) => {
        // See error code charts below.
        //console.log(error.code, error.message)

        /*const granted = PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Lokasyon izni",
            message:
              "Lokasyon izni gerekli " +
              "Yak??n duraklar?? g??rmek i??in lokasyon izni gerekli",
            buttonNegative: "Hay??r, te??ekk??rler",
            buttonPositive: "Evet"
          })
          */

        // getLocation();
        console.log(error)
        Geolocation.requestAuthorization('whenInUse');
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }

  useEffect(() => {
    getLocation();
    //console.log(ilkKoordinat[0], ilkKoordinat[1])
  }, [])

  const markLocations = () => {
    if (durakKoordinatlar.length > 0) {
      for (var keys in durakKoordinatlar) {
        myref.current.injectJavaScript(`
        L.marker([${durakKoordinatlar[keys]['x']}, ${durakKoordinatlar[keys]['y']}], {icon: greenIcon}).addTo(mymap)
true
        `)
      }
      myref.current.injectJavaScript(`
      mymap.setView([${durakKoordinatlar[0]['x']}, ${durakKoordinatlar[0]['y']}], 18)
   true `)
    }
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
    main: { backgroundColor: "#121212", flex: 1, alignContent: 'center', alignItems: 'center', paddingBottom: 35, paddingTop: 15 },
    map: {
      width: 300,
      height: 300,
      margin: 15
    },

  });

  const renderItem = ({ item }) => (
    <View style={{ backgroundColor: "#161616", padding: 15, margin: 15, borderRadius: 15, justifyContent: 'center', alignContent: "center", }}>
      <Text style={{ textAlign: 'center', color: "#ebdbb2" }}>
        {item.durakId} ??? {item.durakAd}{"\n" + "Mesafe: " + item.durakMesafe} metre
      </Text>
      <Text style={{ color: "#ebdbb2", fontWeight: 'bold', fontSize: 15, textAlign: 'center' }}>Gecen hatlar:{"\n"}<Text style={{ color: "#d3869b", textAlign: 'center', fontWeight: '700', marginTop: 5 }}> -> {item.gecenHatlar.join("\n -> ")}</Text></Text>
    </View>
  );

  //const [position, setPosition] = useState([]);
  return (
    <View style={{ flex: 1, backgroundColor: '#121212' }}>
      <View style={styles.main}>
        <View style={styles.container}>
          <WebView ref={myref} source={{ html: html_script }} style={styles.map} />
        </View>
        <Text style={{ fontFamily:"poppins", color: "#ebdbb2", }}>En yak??n duraklar:</Text>
        <ActivityIndicator animating={isLoading} size={isLoading ? 50 : 0} color={"#ebdbb2"} />
        <FlatList numColumns={1} data={durakAdlar} renderItem={renderItem} keyExtractor={item => item.id} nestedScrollEnabled style={{ marginBottom: 5, marginTop: 5 }} />
        <View style={{ marginTop: 15, flexDirection: 'row' }}>
          <Icon name='refresh' size={30} color={"#ebdbb2"} style={{ backgroundColor: "#282828", justifyContent: 'center',  marginRight: 25, marginBottom: 10, alignContent: 'center', alignSelf: 'center', padding: 15, marginTop: 10, borderRadius: 6, textAlignVertical: 'center' }} onPress={() => { setLoading(true); getLocation() }} />
          <TouchableOpacity
            activeOpacity={0.9}
            style={{ alignItems: "center", justifyContent: 'center', alignContent: 'center', padding: 15, backgroundColor: "#282828", borderRadius: 6, }}
            onPress={markLocations}>
            <Text style={{ color: "#ebdbb2", textAlign: 'center', textAlignVertical: 'center' }}>En yak??n dura??a git</Text>
          </TouchableOpacity>

        </View>
      </View>
    </View>
  );
}

export default NearbyStations;