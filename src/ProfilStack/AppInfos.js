import React from 'react';
import { StyleSheet, Text, View, Button, ImageBackground} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {AppContext} from '../context.js';
import { useContext, useEffect } from 'react';

export const AppInfos = () => {

    return (
        <ImageBackground source={require('../../assets/Profil.png')} style={styles.imagebackground} imageStyle={{resizeMode:'stretch'}}>
            <Text style={styles.text}>Ich bin deine AppInfos!</Text>
        </ImageBackground>
    )
}
const styles = StyleSheet.create({
    imagebackground: {
        flex: 1,
        alignItems:'center'
    },
    text: {
        color: '#fff',
        fontSize: 16,
        fontFamily:'Poppins_400Regular'
    },
});