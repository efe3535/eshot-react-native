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
    ActivityIndicator,
} from 'react-native';

import { fetch } from 'react-native-ssl-pinning';
import Styles from './styles.js';
import { Icon } from 'react-native-vector-icons/FontAwesome5';
const SearchStops = ({ navigation }) => {

    // const [search, setSearch] = useState("");
    const [durakListe, setDurakListe] = useState([]);
    const [val, setVal] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchStops = () => {
        setDurakListe([]);
        setLoading(true);
        console.log(val)

        fetch("https://openapi.izmir.bel.tr/api/eshot/durakara/" + encodeURI(val), { method: 'GET', timeoutInterval: 10000, sslPinning: { certs: ['mycert'] }, })
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
           //     console.log(durakListe);
            });
            setLoading(false);
        }



    const renderItem = ({ item }) => (
        <View style={{ backgroundColor: "#181818", padding: 15, margin: 15, borderRadius: 6, }}>
            <Text style={{ textAlign: 'center' }}>
                {item.durakId} — {item.durakAdi}
            </Text>
            <View style={{ margin: 15, backgroundColor: "#212121", padding: 5, borderRadius: 6, borderColor: "#262626", borderWidth: 1 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 15, textAlign: 'center' }}>Geçen hatlar:</Text>
                <Text style={{ color: "#d3869b", textAlign: 'center', fontWeight: '700', marginTop: 5 }}>• {item.gecenHatlar.join("\n• ")}</Text>
            </View>
        </View>
    );


    return (
        <SafeAreaView style={Styles.safeAreaView}>
            <TextInput placeholder='Durak adi veya numarasi' style={
                { backgroundColor: "#161616", borderColor: "#282828", borderWidth: 1, width: "60%", padding: 15, margin: 5, marginTop:35 }} onChangeText={(text) =>{  setVal(text); setDurakListe([]) } } value={val} onFocus={()=>setDurakListe([])} />
            
            <Text>{val.length >= 3 ? "" : "Arama butonu durak adi veya numarasi girene kadar erisilemez."}</Text>
            <ActivityIndicator animating={loading}/>
               
            <TouchableOpacity
                    activeOpacity={val.length>= 3 ?0.9:1}
                    style={{ alignItems: "center", justifyContent:'center', alignContent:'center', padding:15, width:"30%", backgroundColor: val.length>= 3 ? "#282828" : "#665c54", borderRadius:6,  }}
                    onPress={val.length>=3 ? fetchStops : null}>
                    <Text style={{  color: val.length>= 3 ?"#ebdbb2":"#a89984",textAlign:'center', textAlignVertical:'center',  }}>Ara</Text>
            </TouchableOpacity>
            <FlatList  numColumns={1} data={durakListe} renderItem={renderItem} keyExtractor={item => item.id} nestedScrollEnabled style={{ width: "100%", marginTop: 15, marginBottom: 15, borderRadius: 6 }} />

        </SafeAreaView>
    );
}


export default SearchStops;