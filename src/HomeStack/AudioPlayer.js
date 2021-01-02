import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity, Modal } from 'react-native';
import { Audio } from 'expo-av';

import {AppContext} from "../context.js"; 
import { useContext } from 'react';
import {kurse} from "../Kursdaten/Kursdatei.js"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react/cjs/react.development';

const soundObject = new Audio.Sound();


//AudioPlayer- Component
export const AudioPlayer =({navigation, route})=>{
    const [modalVisible, changeModalVisible] = useState(false)
    const [isPlaying, changeIsPlaying] = useState(true)

    //Indizes für Arrays aus Kursdatei
    const kurs=route.params.kursIndex
    const uebung=route.params.uebungsIndex
    const sprecher=route.params.sprecherIndex
    const dauer=route.params.dauerIndex
    const dauerInMinuten=kurse[kurs].Uebungen[uebung].VersionenNachSprecher[sprecher].VersionenNachDauer[dauer].Dauer

    const {gehoerteUebungen, changeGehoerteUebungen, appData, changeAppData, currentUser, userData, changeUserData} = useContext(AppContext)
    var gehoerteUebungenTemp = [...gehoerteUebungen]
    const userDataTemp={...userData}

    const today=new Date()
    
    //spielt beim Öffnen die Audio-Datei ab
    useEffect(()=>{
        play(0)
    },[])

    //wenn beim schließen mehr als 90% gespielt sind, wird die Übung als gehört verarbeitet
    //unloading der Sound-Datei
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

    //wenn die Audio zu Ende gespielt hat, wird der Modal Component eingeblendet
    const endOfAudio =(playbackStatus)=>{
        if (playbackStatus.didJustFinish){
            changeModalVisible(true)
        }
    }

    //abspielen der Datei
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

    //Übung zu gehörten hinzufügen und AppData im Storage speichern
    const addGehoerteUebung=async()=> {
        if (!gehoerteUebungenTemp.includes(kurse[kurs].Uebungen[uebung].id) || !gehoerteUebungenTemp[0]){
            gehoerteUebungenTemp.push(kurse[kurs].Uebungen[uebung].id)
            changeGehoerteUebungen(gehoerteUebungenTemp)
            userDataTemp.gehoerteUebungen=gehoerteUebungenTemp
            appData[currentUser].gehoerteUebungen=gehoerteUebungenTemp
        }
        if(!userDataTemp.journal[today.toDateString()]){
            userDataTemp.journal[today.toDateString()]={}
            userDataTemp.journal[today.toDateString()].meditations=1
            userDataTemp.journal[today.toDateString()].meditationMinutes=dauerInMinuten
        }else{
            if(userDataTemp.journal[today.toDateString()].meditations){
                userDataTemp.journal[today.toDateString()].meditations=userDataTemp.journal[today.toDateString()].meditations+1
                userDataTemp.journal[today.toDateString()].meditationMinutes=userDataTemp.journal[today.toDateString()].meditationMinutes+dauerInMinuten
            }else{
                userDataTemp.journal[today.toDateString()].meditations=1
                userDataTemp.journal[today.toDateString()].meditationMinutes=dauerInMinuten
            }
        }
        changeUserData(userDataTemp)
        appData[currentUser].journal=userDataTemp.journal
        changeAppData(appData)
        const jsonValue = JSON.stringify(appData)
        await AsyncStorage.setItem('appData', jsonValue)
    }

    //Button, um nächste Übung zu starten
    const nextUebung=()=>{
        if (uebung+1<kurse[kurs].Uebungen.length){
            return  <Button title="nächste Übung" onPress={()=>{navigation.navigate("Wähle eine Version", {kursIndex:kurs, uebungsIndex:uebung+1})}}></Button>
        }else{
            if (kurs+1<kurse.length){
                return <Button title="nächste Übung" onPress={()=>{navigation.navigate("Wähle eine Version", {kursIndex:kurs+1, uebungsIndex:0})}}></Button>
            }else{
                return null
            }
        }
    }

    return(
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Herzlichen Glückwunsch. Du hast die Übung erfolgreich beendet!</Text>
                    <Button title="zum Hauptmenü" onPress={()=>{navigation.navigate("Home")}}></Button>
                    {nextUebung()}
                </View>
                </View>
            </Modal>
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

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    modalView: {
      margin: 20,
      width:"80%",
      height:"80%",
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
  });

