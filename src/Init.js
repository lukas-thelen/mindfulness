import React, {useState, useEffect} from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Registrieren} from './Registrieren.js';
import {StartBildschirm} from './InitBildschirm.js';
import {Anmelden} from './Anmelden.js';
import {AchtsamkeitsAbfrage} from './AchtsamkeitsAbfrage.js';
import {StressSkala} from './StressSkala.js';
import { useLinkProps } from '@react-navigation/native';
import {AppContext} from './context.js';
import { useContext } from 'react';
import { kurse } from './Kursdaten/Kursdatei.js';


export const Init =(props)=>{
    const [initPages, changeInitPages] = useState('StartBildschirm');
    const [userData, changeUserData] = useState({});
    const [progressData, changeProgressData] = useState({});
    const appData = useContext(AppContext).appData;
    const changeCurrentUser = useContext(AppContext).changeCurrentUser;
    const changeUserDataContext = useContext(AppContext).changeUserData;
    const changeAppData = useContext(AppContext).changeAppData;
    const changeGehoerteUebungen = useContext(AppContext).changeGehoerteUebungen;


    // erstellt die Objekt-Struktur
    const finishInit =async() => {
        try {
            appData[userData.eMail] = {}
            appData[userData.eMail].data = userData
            appData[userData.eMail].progress = progressData
            appData[userData.eMail].verfuegbareUebungen = getUebungen(progressData.mindfulnessLevelData)
            appData[userData.eMail].gehoerteUebungen = []
            appData[userData.eMail].alleGehoertenUebungen=[]
            appData[userData.eMail].journal ={}
            appData[userData.eMail].introSeen =false
            appData[userData.eMail].friends={friends:{mindfulnessBot:{name:"Mindfulness Bot"}}, puzzles:{}, pieces:0}
            appData[userData.eMail].benchmarks ={
              meditations: 0,
              meditationMinutes:0,
              meditationsEarly:0,
              meditationsLate:0,
              meditationsNight:0,
              xMeditations:0,
              allMeditations:0,
              infoScreen: 0,
              cancelCounter:0,
              maxRepeats: 0,
              puzzles:0,
              streak:0,
              benchmarks10: 0,
              benchmarksReached: []
            }
            changeUserDataContext(appData[userData.eMail])
            changeCurrentUser(userData.eMail)
            changeAppData(appData)
            changeGehoerteUebungen([])
            const jsonValue = JSON.stringify(appData)
            await AsyncStorage.setItem('appData', jsonValue)
            await AsyncStorage.setItem('currentUser', userData.eMail)
            } catch (e) {
              console.log(e)
            }
          props.changeLoggedIn(true)
    }

    const getUebungen =(level)=>{
      var i = 0
      const array = []
      while (i < level){
        for (var y = 0; y < kurse[i].Uebungen.length; y++){
            array.push(kurse[i].Uebungen[y].id)
        }
        i++
      }
      array.push(kurse[i].Uebungen[0].id)
      return array
    }

    // Navigation zwischen Initpages
    const initDict = {
      StartBildschirm: <StartBildschirm changeInitPages= {changeInitPages} userData = {userData} changeUserData = {changeUserData}/>,
        Anmelden: <Anmelden changeInitPages= {changeInitPages} userData = {userData} changeUserData = {changeUserData}/>,
        Registrieren: <Registrieren changeInitPages= {changeInitPages} userData = {userData} changeUserData = {changeUserData}/>,
        AchtsamkeitsAbfrage: <AchtsamkeitsAbfrage changeInitPages={changeInitPages} changeInitPages= {changeInitPages} progressData = {progressData} changeProgressData = {changeProgressData}/>,
        StressSkala: <StressSkala finishInit={finishInit} changeInitPages= {changeInitPages} userData={userData}  progressData = {progressData} changeProgressData = {changeProgressData}/>,

    }
    return (
        <View style = {styles.pagewrap}>
            {initDict[initPages]}
        </View>
    )


}

//Styles
const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    pagewrap:{
      width: '100%',
      height: '100%'
    }
  });
  