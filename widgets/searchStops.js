import React, { useState, useRef, useEffect } from 'react';
import type { Node } from 'react';
import {
    Button,
    SafeAreaView,
    TextInput,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    FlatList,
    View,
} from 'react-native';

import { fetch } from 'react-native-ssl-pinning';
import Styles from './styles.js';
const SearchStops = ({ navigation }) => {

    // const [search, setSearch] = useState("");
    const [durakListe, setDurakListe] = useState([]);
    const [val, setVal] = useState("");
    

    const fetchStops = () => {
        setDurakListe([]);
        console.log(val)

        fetch("https://openapi.izmir.bel.tr/api/eshot/durakara/" + encodeURI(val), { method: 'GET', timeoutInterval: 10000, sslPinning: { certs: ['mycert'] },})
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                for (let key in responseJson["Duraklar"]) {
                    console.log(responseJson["Duraklar"][key]['Adi'])
                    setDurakListe(
                        durakListe => [
                            ...durakListe,
                            {
                                //   description: responseJson["Duraklar"][key]['DurakId'] + ' - ' + responseJson["Duraklar"][key]['Adi'] + '\nGecen hatlar: ' + responseJson["Duraklar"][key]['GecenHatNumaralari'].split(";").join("-") + '\n',
                                durakId: responseJson["Duraklar"][key]['DurakId'],
                                durakAdi: responseJson["Duraklar"][key]['Adi'],
                                gecenHatlar: responseJson["Duraklar"][key]['GecenHatNumaralari'].split(";"),
                                id: durakListe.length != 0 ? durakListe[durakListe.length - 1]['id'] + 1 : 0
                            }
                        ]
                    );
                }
                console.log(durakListe);
            });
    }



    const renderItem = ({ item }) => (
        <View style={{ backgroundColor: "#1d2021", padding: 15, margin: 15,  borderRadius: 15, }}>
            <Text style={{textAlign:'center'}}>
                {item.durakId} — {item.durakAdi}
            </Text>
            <View style={{ margin: 15, backgroundColor: "#2f3131", padding: 5, borderRadius:15, borderColor:"#363636", borderWidth:2 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 15, textAlign: 'center' }}>Geçen hatlar:</Text>
                <Text style={{ color: "#d3869b", textAlign: 'center', fontWeight: '700', marginTop:5 }}>• {item.gecenHatlar.join("\n• ")}</Text>
            </View>
        </View>
    );


    return (
        <SafeAreaView style={Styles.safeAreaView}>
            <TextInput placeholder='Durak adi veya numarasi' style={
                { backgroundColor: "#161616", borderColor: "#282828", borderWidth: 1, width: "60%", padding: 15, margin: 5 }} onChangeText={setVal} value={val} />
            <Text>{val.length >= 3 ? "" : "Arama butonu durak adi veya numarasi girene kadar erisilemez."}</Text>
            <View style={{ marginTop: 15 }}>
                <Button disabled={val.length >= 3 ? false : true} title='Search' color="#3c3836" onPress={fetchStops} />
            </View>

            <FlatList numColumns={1} data={durakListe} renderItem={renderItem} keyExtractor={item => item.id} nestedScrollEnabled style={{width:"100%", marginTop:15, marginBottom:15, borderRadius:15}} />

        </SafeAreaView>
    );
}


export default SearchStops;