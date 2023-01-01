import React, { useState, useRef, useEffect } from 'react';
import type { Node } from 'react';
import {
    Button,
    TouchableOpacity,
    SafeAreaView,
    TextInput,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    FlatList,
    View,
    Platform,
    ActivityIndicator,
} from 'react-native';

import { fetch as pinningFetch } from 'react-native-ssl-pinning';

import Styles from './styles.js';
import { Icon } from 'react-native-vector-icons/FontAwesome5';
const DepartureTimes = ({ navigation }) => {
    const [hatListe, setHatListe] = useState([])
    const [val, setVal] = useState("");
    const fetchLines = () => {
        setHatListe([]);
        console.log("departure")
        fetch("https://openapi.izmir.bel.tr/api/eshot/hatara/" + encodeURI(val), { method: 'GET', timeoutInterval: 10000, sslPinning: { certs: ['mycert'] }, })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                for (let key in responseJson["Hatlar"]) {
                    fetch("https://openapi.izmir.bel.tr/api/eshot/hareketsaatleri/" + responseJson["Hatlar"][key]["HatId"].toString(), { method: 'GET', timeoutInterval: 10000, sslPinning: { certs: ['mycert'] }, })
                        .then((response) => response.json())
                        .then((responseJson2) => {
                            setHatListe(hatListe => [...hatListe, {

                                id: hatListe.length != 0 ? hatListe.length : 0,
                                hiciListe: responseJson2["HareketSaatleriHici"],
                                ctsListe: responseJson2["HareketSaatleriCtesi"],
                                pzrListe: responseJson2["HareketSaatleriPazar"],
                                hatId: responseJson["Hatlar"][key]["HatId"].toString(),
                                hatBaslangic: responseJson["Hatlar"][key]["HatBaslangic"],
                                hatBitis: responseJson["Hatlar"][key]["HatBitis"]
                            }
                            ])
                        })
                }
            });
    }



    const renderItem = ({ item }) => (
        <View style={{ backgroundColor: "#181818", padding: 15, margin: 15, borderRadius: 6, }}>
            <Text style={{ fontSize: 16, textAlign: 'center', fontWeight: 'bold', color: "#ebdbb2" }}><Text style={{ color: "#b8bb26" }}>{item.hatId}</Text> numara</Text>
            <Text style={{ textAlign: 'center', textDecorationLine: 'underline', color: "#ebdbb2" }}>{item.hatBaslangic} - {item.hatBitis}</Text>

            <Text style={{ textAlign: 'center', textDecorationLine: 'underline', color: "#ebdbb2", fontWeight: 'bold', fontSize: 16 }}>Hafta içi</Text>
            <Text style={{ textAlign: 'center', color:"#ebdbb2" }}>
            {hatListe.map(hici => hici["ctsListe"].map(saatler => '-> ' + ( saatler["BisikletliMiGidis"]?"🚲 ":"❌ " ) + (saatler["EngelliMiGidis"]?"🦽 ":"❌ ")  + saatler["GidisSaat"] + ' - ' + saatler['DonusSaat'] + ( saatler["BisikletliMiDonus"]?"🚲 ":"❌ " ) + (saatler["EngelliMiDonus"]?"🦽 ":"❌ ")  + ' <-'))[item.id].join("\n")}
            </Text>

            <Text style={{ textAlign: 'center', textDecorationLine: 'underline', color: "#ebdbb2", fontWeight: 'bold', fontSize: 16 }}>Cumartesi</Text>
            <Text style={{ textAlign: 'center', color:"#ebdbb2" }}>
                {hatListe.map(hici => hici["ctsListe"].map(saatler => '-> ' + ( saatler["BisikletliMiGidis"]?"🚲 ":"❌ " ) + (saatler["EngelliMiGidis"]?"🦽 ":"❌ ")  + saatler["GidisSaat"] + ' - ' + saatler['DonusSaat'] + ( saatler["BisikletliMiDonus"]?"🚲 ":"❌ " ) + (saatler["EngelliMiDonus"]?"🦽 ":"❌ ")  + ' <-'))[item.id].join("\n")}
            </Text>

            <Text style={{ textAlign: 'center', textDecorationLine: 'underline', color: "#ebdbb2", fontWeight: 'bold', fontSize: 16 }}>Pazar</Text>
            <Text style={{ textAlign: 'center', color:"#ebdbb2" }}>
                {hatListe.map(hici => hici["pzrListe"].map(saatler => '-> ' + ( saatler["BisikletliMiGidis"]?"🚲 ":"❌ " ) + (saatler["EngelliMiGidis"]?"🦽 ":"❌ ")  + saatler["GidisSaat"] + ' - ' + saatler['DonusSaat'] + ( saatler["BisikletliMiDonus"]?"🚲 ":"❌ " ) + (saatler["EngelliMiDonus"]?"🦽 ":"❌ ")  + ' <-'))[item.id].join("\n")}
            </Text>

            {/*} <View style={{ margin: 15, backgroundColor: "#212121", padding: 5, borderRadius: 6, borderColor: "#262626", borderWidth: 1 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 15, textAlign: 'center' }}>Geçen hatlar:</Text>
                    <Text style={{ color: "#d3869b", textAlign: 'center', fontWeight: '700', marginTop: 5 }}>• {item.gecenHatlar.join("\n• ")}</Text>
        </View>{*/}
        </View>
    );

    return (
        <SafeAreaView style={Styles.safeAreaView}>
            <TextInput placeholder='Otobus hat numarasi' style={
                { color:"#ebdbb2", backgroundColor: "#161616", borderColor: "#282828", borderWidth: 1, width: "60%", padding: 15, margin: 5, marginTop: 35 }} value={val} onChangeText={setVal} />
            <Text style={{color:"#ebdbb2", padding:30}}>{val.length >= 1 ? "" : "Lütfen otobüs numarası girin."}</Text>
            <TouchableOpacity
                activeOpacity={val.length >= 1 ? 0.9 : 1}
                style={{ alignItems: "center", justifyContent: 'center', alignContent: 'center', padding: 15, width: "30%", backgroundColor: val.length >= 1 ? "#282828" : "#665c54", borderRadius: 6, }}
                onPress={val.length >= 1 ? fetchLines : null}>
                <Text style={{ color: val.length >= 1 ? "#ebdbb2" : "#a89984", textAlign: 'center', textAlignVertical: 'center', }}>Ara</Text>
            </TouchableOpacity>
            <FlatList numColumns={1} data={hatListe} renderItem={renderItem} keyExtractor={item => item.id} nestedScrollEnabled style={{ width: "100%", marginTop: 15, marginBottom: 15, borderRadius: 6 }} />
        </SafeAreaView>
    );
}


export default DepartureTimes;