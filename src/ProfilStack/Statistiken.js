import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {AppContext} from '../context.js';
import { useContext, useEffect } from 'react';

export const Statistiken = () => {
    const {userData, cahngeUserData, appData, changeAppData}=useContext(AppContext)

    const getMeditation=(version)=>{
        var minutes=0
        var amount=0
        for(i in userData.journal){
            if(userData.journal[i].meditations){
                console.log(userData.journal[i].meditations)
                amount+=parseInt(userData.journal[i].meditations)
                minutes+=parseInt(userData.journal[i].meditationMinutes)  
            }
        }
        if(version==="minutes"){
            return minutes
        }else if(version==="amount"){
            return amount
        }
    }

    return (
        <View>
            <Text>Minuten: {""+getMeditation("minutes")}</Text>
            <Text>Anzahl: {""+getMeditation("amount")}</Text>
        </View>
    )
}