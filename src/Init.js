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


export const Init =(props)=>{
    const [initPages, changeInitPages] = useState('StartBildschirm');
    const [userData, changeUserData] = useState({});
    const [progressData, changeProgressData] = useState({});
    const appData = useContext(AppContext).appData;
    const changeCurrentUser = useContext(AppContext).changeCurrentUser;
    const changeUserDataContext = useContext(AppContext).changeUserData;
    const changeAppData = useContext(AppContext).changeAppData;


    // erstellt die Objekt-Struktur
    const finishInit =async() => {
        try {
            appData[userData.eMail] = {}
            appData[userData.eMail].data = userData
            appData[userData.eMail].progress = progressData
            changeUserDataContext(appData[userData.eMail])
            changeCurrentUser(userData.eMail)
            const jsonValue = JSON.stringify(appData)
            await AsyncStorage.setItem('appData', jsonValue)
            await AsyncStorage.setItem('currentUser', userData.eMail)
            } catch (e) {
              console.log(e)
            }
          props.changeLoggedIn(true)
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
  