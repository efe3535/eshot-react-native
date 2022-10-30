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
    View,
} from 'react-native';

import { fetch } from 'react-native-ssl-pinning';
import Styles from './styles.js';
const SearchStops = ({ navigation }) => {

    // const [search, setSearch] = useState("");
    const [durakListe, setDurakListe] = useState([]);
    function fetchStops(text) {
        setDurakListe([]);
        fetch(`https://openapi.izmir.bel.tr/api/eshot/durakara/${text}`, { method: 'GET', timeoutInterval: 10000, sslPinning: { certs: ['mycert'] } })
            .then((response) => response.json())
            .then((responseJson) => {
                for (let key in responseJson["Duraklar"]) {
                    console.log(responseJson["Duraklar"][key]['Adi'])
                    setDurakListe(
                        durakListe => [
                            ...durakListe, 
                            responseJson["Duraklar"][key]['DurakId'] + ' - ' + responseJson["Duraklar"][key]['Adi'] + '\nGecen hatlar: ' + responseJson["Duraklar"][key]['GecenHatNumaralari'].split(";").join("-") + '\n']);
                }
                console.log(durakListe.toString());
        });
    }

    const handleSearch = (text) => {
        //setSearch(text);
        console.log(text);
        if (text.length > 1 && text.length <= 5) {
            fetchStops(text);
        }
    }

    return (
        <SafeAreaView style={Styles.safeAreaView}>
            <TextInput placeholder='Durak numarasi' style={
                { backgroundColor: "#161616", borderColor: "#282828", borderWidth: 1, width: "60%" }} onChangeText={handleSearch} />
            <ScrollView>
            <Text>{durakListe.join("")}</Text>
            </ScrollView>
        </SafeAreaView>
    );
}


export default SearchStops;