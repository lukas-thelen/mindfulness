import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';

import {AppContext} from "../context.js"; 
import { useContext } from 'react';
import {kurse} from "../Kursdaten/Kursdatei.js"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react/cjs/react.development';

const soundObject = new Audio.Sound();

export const AudioPlayer =({navigation, route})=>{
    const kurs=route.params.kursIndex
    const uebung=route.params.uebungsIndex
    const sprecher=route.params.sprecherIndex
    const dauer=route.params.dauerIndex

    const gehoerteUebungen = useContext(AppContext).gehoerteUebungen;
    const changeGehoerteUebungen = useContext(AppContext).changeGehoerteUebungen;
    const appData = useContext(AppContext).appData
    const changeAppData = useContext(AppContext).changeAppData
    const currentUser = useContext(AppContext).currentUser
    const [isPlaying, changeIsPlaying] = useState(true)

     

    useEffect(()=>{
        play(0)
    },[])

    useEffect(()=>{
        return async ()=>{      
            const status = await soundObject.getStatusAsync()
            const millis = status.positionMillis
            const duration = status.durationMillis
            if(millis/duration>0.9){
                addGehoerteUebung()
            }
            await soundObject.unloadAsync()
        }
    },[])

    const endOfAudio =(playbackStatus)=>{
        if (playbackStatus.didJustFinish){
            console.log("fertig abgespielt")
        }
    }

    async function play(time) {

        try { 
            await soundObject.loadAsync(kurse[kurs].Uebungen[uebung].VersionenNachSprecher[sprecher].VersionenNachDauer[dauer].Dateipfad)
            await soundObject.setOnPlaybackStatusUpdate(endOfAudio)
            await soundObject.playFromPositionAsync(time)
            }
            catch(e) {
                console.log(e)
            }
        }

    async function addGehoerteUebung() {
        if (!gehoerteUebungen.includes(kurse[kurs].Uebungen[uebung].id)){
            gehoerteUebungen.push(kurse[kurs].Uebungen[uebung].id)
            changeGehoerteUebungen(gehoerteUebungen)
            appData[currentUser].gehoerteUebungen=gehoerteUebungen
            changeAppData(appData)
            const jsonValue = JSON.stringify(appData)
            await AsyncStorage.setItem('appData', jsonValue)
            console.log(gehoerteUebungen)
        }
    }

    return(
        <View>
            <Text>Ordnername: {kurse[kurs].Ordnername}</Text>
            <Text>Dateiname: {kurse[kurs].Uebungen[uebung].VersionenNachSprecher[sprecher].VersionenNachDauer[dauer].Dateiname}</Text>
            {isPlaying ? 
                <Button title='Pause' onPress={async () => {
                    await soundObject.pauseAsync(); changeIsPlaying(false)
                }}></Button> : 
                <Button title='Play' onPress={async() => {await soundObject.playAsync(); changeIsPlaying(true)}}></Button>}
        </View>
    );

}

