import React from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity } from 'react-native';

import {kurse} from "../Kursdaten/Kursdatei.js"

export const AudioPlayer =({navigation, route})=>{
    const kurs=route.params.kursIndex
    const uebung=route.params.uebungsIndex
    const sprecher=route.params.sprecherIndex
    const dauer=route.params.dauerIndex
    return(
        <View>
            <Text>Ordnername: {kurse[kurs].Ordnername}</Text>
            <Text>Dateiname: {kurse[kurs].Uebungen[uebung].VersionenNachSprecher[sprecher].VersionenNachDauer[dauer].Dateiname }</Text>
        </View>
    )
}