import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';

import {AppContext} from "../context.js"; 
import { useContext } from 'react';
import {kurse} from "../Kursdaten/Kursdatei.js"
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AudioPlayer =({navigation, route})=>{
    const kurs=route.params.kursIndex
    const uebung=route.params.uebungsIndex
    const sprecher=route.params.sprecherIndex
    const dauer=route.params.dauerIndex

    const gehoerteUebungen = useContext(AppContext).gehoerteUebungen;

    const soundObject = new Audio.Sound(); 

    async function play() {

        try { 
            await soundObject.loadAsync(kurse[kurs].Uebungen[uebung].VersionenNachSprecher[sprecher].VersionenNachDauer[dauer].Dateipfad)
            await soundObject.playAsync() 
            }
            catch(e) {
                console.log(e)
            }
        }
        
    play()

    function addGehoerteUebung() {
        gehoerteUebungen.push(kurse[kurs].Uebungen[uebung].id)
        console.log(gehoerteUebungen)
    }

    addGehoerteUebung()

    return(
        <View>
            <Text>Ordnername: {kurse[kurs].Ordnername}</Text>
            <Text>Dateiname: {kurse[kurs].Uebungen[uebung].VersionenNachSprecher[sprecher].VersionenNachDauer[dauer].Dateiname}</Text>
            <Button title='Stop' onPress={() => soundObject.stopAsync()}></Button>
        </View>
    );

}

