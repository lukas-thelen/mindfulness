import React from 'react';
import { StyleSheet, Text, View, Button, ImageBackground} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {AppContext} from '../context.js';
import { useContext, useEffect } from 'react';
import { ScrollView } from 'react-native-gesture-handler';

export const AppInfos = () => {

    const infoUeberUns = "Wir sind eine Gruppe von Studierenden, die sich als Ziel gesetzt haben, ihr in den letzten Jahren erlerntes Wissen in der Psychologie und der Informationstechnologie effizient und professionell, im Rahmen eines Praxisprojekts, anzuwenden.\n\n"+
                        "Unser Ziel ist die Entwicklung einer App, durch die Gamer*innen ihre Achtsamkeit in gewohnter Umgebung trainieren und verbessern können. Wir wollen dir zeigen, wie Du mit simplen Methoden deine Achtsamkeit trainierst und diese dazu nutzt, um aufmerksamer durch dein Leben zu gehen.​"

    const unsereMission = "Unser Ziel ist es deine Achtsamkeit zu verbessern.\n"+
                            "Hierzu nutzen wir verschiedene Achtsamkeitstechniken und Methoden, die wir speziell für Gamer*innen angepasst haben. Dafür haben wir unsere App „Upgrade your mind“ entwickelt. Diese soll eine simple und ansprechende Lernumgebung speziell für Gamer*innen schaffen, in der Du mit Entspannung und Konzentration kognitive Eigenschaften trainieren kannst. Diese werden dich nachhaltig und weiterführend im aktuellen Moment und deiner Zukunft unterstützen.\n"+
                            "Lass uns dein Partner beim Erreichen deiner Ziele sein.​"

    return (
        <ImageBackground source={require('../../assets/Profil.png')} style={styles.imagebackground} imageStyle={{resizeMode:'stretch'}}>
            <ScrollView style={{width:'100%'}} contentContainerStyle={{alignItems:'center'}}>
                <View style={styles.background}>
                    <Text style={styles.textM}> Wer sind wir?</Text>
                    <Text style={styles.text}>{infoUeberUns}</Text>
                </View>
                <View style={styles.background}>
                    <Text style={styles.textM}>Unsere Mission</Text>
                    <Text style={styles.text}>{unsereMission}</Text>
                </View>
                <View style={{height:60}} />
            </ScrollView>
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
        fontFamily:'Poppins_400Regular',
        textAlign:'left'
    },
    textM: {
        color:'#fff',
        fontSize: 20,
        fontFamily:'Poppins_500Medium',
        marginBottom:5,
        textAlign:'center'
    },
    background: {
        backgroundColor:'#0F113A90',
        width:'90%',
        padding:20,
        borderRadius:10,
        marginVertical:10
    }
});