import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity, Modal } from 'react-native';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import * as Progress from 'react-native-progress';

import {AppContext} from "../context.js"; 
import { useContext, useEffect } from 'react';
import {kurse} from "../Kursdaten/Kursdatei.js"
import {uebungen} from "../Kursdaten/Uebungsliste.js"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { benchmarks, checkBenchmarks } from '../benchmarks.js';

const soundObject = new Audio.Sound();


//AudioPlayer- Component
export const AudioPlayer =({navigation, route})=>{
    const [modalVisible, changeModalVisible] = useState(false)
    const [isPlaying, changeIsPlaying] = useState(true)
    const [progress, changeProgress] = useState(0)

    //Indizes für Arrays aus Kursdatei
    const kurs=route.params.kursIndex
    const uebung=route.params.uebungsIndex
    const sprecher=route.params.sprecherIndex
    const dauer=route.params.dauerIndex
    const dauerInMinuten=kurse[kurs].Uebungen[uebung].VersionenNachSprecher[sprecher].VersionenNachDauer[dauer].Dauer

    const {gehoerteUebungen, changeGehoerteUebungen, appData, changeAppData, currentUser, userData, changeUserData, changeNewBenchmark} = useContext(AppContext)
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


    // Zeit-Abhängige Benchmarks: Zeit setzen
    const kriegeZeit=(zeit) => {
        const date = new Date()
        date.setHours(zeit +1)
        date.setMinutes(0)
        return date
    }


    //wenn die Audio zu Ende gespielt hat, wird der Modal Component eingeblendet
    const endOfAudio =(playbackStatus)=>{
        if (playbackStatus.didJustFinish){
            changeModalVisible(true)
        }
        changeProgress(playbackStatus.positionMillis/playbackStatus.durationMillis)
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

        userDataTemp.alleGehoertenUebungen.push(kurse[kurs].Uebungen[uebung].id)
        if (!gehoerteUebungenTemp.includes(kurse[kurs].Uebungen[uebung].id) || !gehoerteUebungenTemp[0]){
            //wenn Übung bisher noch nie gemacht wurde
            gehoerteUebungenTemp.push(kurse[kurs].Uebungen[uebung].id)
            changeGehoerteUebungen(gehoerteUebungenTemp)
            userDataTemp.gehoerteUebungen=gehoerteUebungenTemp

            // Benchmark Anzahl verschiedener Übungen
            userDataTemp.benchmarks.xMeditations = userDataTemp.gehoerteUebungen.length
        }

        // Verfügbare Übung hinzufügen
        if (userDataTemp.verfuegbareUebungen[(userDataTemp.verfuegbareUebungen.length)-1] === kurse[kurs].Uebungen[uebung].id){
            if (uebung+1<kurse[kurs].Uebungen.length){
                userDataTemp.verfuegbareUebungen.push( kurse[kurs].Uebungen[uebung+1].id)
            }else{
                console.log("Tesesetgkdfjgbshbfgs")
                if (kurs+1<kurse.length){
                    userDataTemp.verfuegbareUebungen.push( kurse[kurs+1].Uebungen[0].id)
                }
            }
        }


        if(!userDataTemp.friends.pieces){
            userDataTemp.friends.pieces=0
        }
        userDataTemp.friends.pieces+=1

        //heute Listungen im Journal
        var firstAtDay = false
        if(!userDataTemp.journal[today.toDateString()]){
            userDataTemp.journal[today.toDateString()]={}
            userDataTemp.journal[today.toDateString()].meditations=1
            userDataTemp.journal[today.toDateString()].meditationMinutes=dauerInMinuten
            firstAtDay = true
        }else{
            if(userDataTemp.journal[today.toDateString()].meditations){
                userDataTemp.journal[today.toDateString()].meditations+=1
                userDataTemp.journal[today.toDateString()].meditationMinutes+=dauerInMinuten
            }else{
                userDataTemp.journal[today.toDateString()].meditations=1
                userDataTemp.journal[today.toDateString()].meditationMinutes=dauerInMinuten
                firstAtDay = true
            }
        }

        //Benchmarks - generelle Anzahl und Dauer
        userDataTemp.benchmarks.meditations += 1;
        userDataTemp.benchmarks.meditationMinutes+= dauerInMinuten;

        // Benchmarks - Uhrzeit abhängig
        if ( kriegeZeit(10) > new Date()){
            userDataTemp.benchmarks.meditationsEarly += dauerInMinuten
        } 
        if ( kriegeZeit(20) < new Date()){
            userDataTemp.benchmarks.meditationsLate += dauerInMinuten
        } 
        if ( kriegeZeit(23) < new Date()){
            userDataTemp.benchmarks.meditationsNight += dauerInMinuten
        } 

        //Benchmark - Anzahl der Wiederholungen der häufigsten Übung
        const filter = userDataTemp.alleGehoertenUebungen.filter(word=>word===kurse[kurs].Uebungen[uebung].id)
        if(filter.length>userDataTemp.benchmarks.maxRepeats){
            userDataTemp.benchmarks.maxRepeats=filter.length
        }

        // Streak um 1 erhöhen, wenn erforderlich
        const yesterday = new Date()
        yesterday.setDate(yesterday.getDate()-1)
        if(userDataTemp.journal[yesterday.toDateString()]&&userDataTemp.journal[yesterday.toDateString()].meditations&&firstAtDay){
            console.log("steak +1")
            userDataTemp.benchmarks.streak+=1
        }else if (firstAtDay){
            userDataTemp.benchmarks.streak=1
        }


       // Überprüfen, ob neuer Benchmark erreicht und, wenn ja --> Einfügen in userDataTemp
        const currentlyReached = checkBenchmarks(userDataTemp)
        if (currentlyReached.length > 0){
            userDataTemp.benchmarks.benchmarksReached=userDataTemp.benchmarks.benchmarksReached.concat(currentlyReached)
            changeNewBenchmark(currentlyReached)
        }

        //Daten speichern
        changeUserData(userDataTemp)
        appData[currentUser]=userDataTemp
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
        <View style={{alignItems:"center", justifyContent:"center", flex:1}}>
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
            {isPlaying ?
                <TouchableOpacity onPress={async () => {await soundObject.pauseAsync(); changeIsPlaying(false)}}>
                    <Ionicons name="pause" size={50} color="black" /> 
                </TouchableOpacity>:
                <TouchableOpacity onPress={async() => {await soundObject.playAsync(); changeIsPlaying(true)}}>
                    <Ionicons name="play" size={50} color="black" /> 
                </TouchableOpacity>}
                <Progress.Bar progress={progress} width={200} />
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
    },

  });

