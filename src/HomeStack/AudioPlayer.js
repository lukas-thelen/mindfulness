import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';

import {AppContext} from "../context.js"; 
import { useContext } from 'react';
import {kurse} from "../Kursdaten/Kursdatei.js"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react/cjs/react.development';

export const AudioPlayer =({navigation, route})=>{
    const kurs=route.params.kursIndex
    const uebung=route.params.uebungsIndex
    const sprecher=route.params.sprecherIndex
    const dauer=route.params.dauerIndex

    const gehoerteUebungen = useContext(AppContext).gehoerteUebungen;
    const changeGehoerteUebungen = useContext(AppContext).changeGehoerteUebungen;
    const [isPlaying, changeIsPlaying] = useState(true)
    const [playedTime, changePlayedTime] = useState(0)

    const soundObject = new Audio.Sound(); 

    useEffect(()=>{
        play(0)
    },[])

    async function play(time) {

        try { 
            await soundObject.loadAsync(kurse[kurs].Uebungen[uebung].VersionenNachSprecher[sprecher].VersionenNachDauer[dauer].Dateipfad)
            await soundObject.setStatusAsync({shouldPlay:true, positionMillis:playedTime});
            }
            catch(e) {
                console.log(e)
            }
        }

    function addGehoerteUebung() {
        gehoerteUebungen.push(kurse[kurs].Uebungen[uebung].id)
        changeGehoerteUebungen(gehoerteUebungen)
        console.log(gehoerteUebungen)
    }

    addGehoerteUebung()

    return(
        <View>
            <Text>Ordnername: {kurse[kurs].Ordnername}</Text>
            <Text>Dateiname: {kurse[kurs].Uebungen[uebung].VersionenNachSprecher[sprecher].VersionenNachDauer[dauer].Dateiname}</Text>
            {isPlaying ? <Button title='Pause' onPress={async () => {changePlayedTime(await soundObject.getStatusAsync()); await soundObject.pauseAsync(); changeIsPlaying(false)}}></Button> : <Button title='Play' onPress={async() => {await play(playedTime); changeIsPlaying(true)}}></Button>}
        </View>
    );

}

