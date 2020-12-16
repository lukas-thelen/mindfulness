import React, {useState, useEffect} from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Anmelden} from './Anmelden.js';
import {AchtsamkeitsAbfrage} from './AchtsamkeitsAbfrage.js';
import { useLinkProps } from '@react-navigation/native';

export const Init =(props)=>{
    const [initPages, changeInitPages] = useState('Anmelden')
    const [userData, changeUserData] = useState({})
    const finishInit =async() => {
        try {
            const jsonValue = JSON.stringify(userData)
            await AsyncStorage.setItem('userData', jsonValue)
          } catch (e) {
            console.log(e)
          }
          props.changeLoggedIn(true)
    }
    const initDict = {
        Anmelden: <Anmelden changeInitPages= {changeInitPages} userData = {userData} changeUserData = {changeUserData}/>,
        AchtsamkeitsAbfrage: <AchtsamkeitsAbfrage finishInit={finishInit} changeInitPages= {changeInitPages} userData = {userData} changeUserData = {changeUserData}/>,

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
  