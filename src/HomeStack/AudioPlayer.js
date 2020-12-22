import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';

import {kurse} from "../Kursdaten/Kursdatei.js"
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AudioPlayer =({navigation, route})=>{
    const kurs=route.params.kursIndex
    const uebung=route.params.uebungsIndex
    const sprecher=route.params.sprecherIndex
    const dauer=route.params.dauerIndex

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

    async function saveUebung() {
        try {
            await AsyncStorage.removeItem(JSON.stringify(kurse[kurs].Uebungen[uebung]))
        } finally {
            const jsonValue = JSON.stringify(kurse[kurs].Uebungen[uebung])
            await AsyncStorage.setItem(jsonValue, 'true')
        }
    }

    saveUebung()

    return(
        <View>
            <Text>Ordnername: {kurse[kurs].Ordnername}</Text>
            <Text>Dateiname: {kurse[kurs].Uebungen[uebung].VersionenNachSprecher[sprecher].VersionenNachDauer[dauer].Dateiname}</Text>
            <Button title='Stop' onPress={() => soundObject.stopAsync()}></Button>
        </View>
    );
}

