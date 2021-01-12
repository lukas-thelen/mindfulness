import React, { useState } from 'react';
import { useEffect } from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity } from 'react-native';

import {kurse} from "../Kursdaten/Kursdatei.js"

export const UebungsInfo =({navigation, route})=>{

    const kursIndex = route.params.kursIndex
    const uebungsIndex = route.params.uebungsIndex

    return (
        <View style={styles.container}>
            <Text style={{fontSize:18}}>Informationen zur Übung: {kurse[kursIndex].Uebungen[uebungsIndex].Name}</Text>
            <Text></Text>
            <Text style={{textAlign:"justify"}}>{kurse[kursIndex].Uebungen[uebungsIndex].Info}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft:20,
        paddingRight:20,
        
    }
  });