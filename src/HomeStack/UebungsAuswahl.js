import { useCardAnimation } from '@react-navigation/stack';
import React from 'react';
import { useContext } from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity, ImageBackground, Dimensions} from 'react-native';
import { AppContext } from '../context.js';

import {kurse} from "../Kursdaten/Kursdatei.js"

export const UebungsAuswahl =({navigation, route})=>{
    const {gehoerteUebungen, userData} = useContext(AppContext)
    const renderItem =({item, index})=>{
        var available=false
        if(userData.verfuegbareUebungen.includes(item.id)){
            available=true
        }
        if(available){
            return(
                <View>
                    {gehoerteUebungen.includes(item.id) ? 
                        <TouchableOpacity style={styles.UebungsItemDone} onPress={()=>{if(item.Audio){navigation.navigate("Wähle eine Version", {kursIndex:kursIndex, uebungsIndex:index})}else{navigation.navigate("Wähle die Dauer", {kursIndex:kursIndex, uebungsIndex:index})}}}>
                        <   Text style={styles.text}>{item.Name}</Text>
                        </TouchableOpacity> : 
                        <TouchableOpacity style={styles.UebungsItem} onPress={()=>{if(item.Audio){navigation.navigate("Wähle eine Version", {kursIndex:kursIndex, uebungsIndex:index})}else{navigation.navigate("Wähle die Dauer", {kursIndex:kursIndex, uebungsIndex:index})}}}>
                            <Text style={styles.text}>{item.Name}</Text>
                        </TouchableOpacity>}
                </View>
            )
        }else{
            return(
                <View style={styles.UebungsItemUnavailable}>
                    {gehoerteUebungen.includes(item.id) ? <Text style={styles.text}>{item.Name}</Text> : <Text style={styles.text}>{item.Name}</Text>}
                </View>    
            )
        }
        
    }
    const kursIndex = kurse.findIndex(item => item.id === route.params.kurs) 

    return (
        <ImageBackground source={require('../../assets/Startseite.png')} style={styles.imagebackground}>
            <View style={{flex:1, alignItems:'center'}}>
                <View style={{flex:0.2}} />
                <View style={styles.background}>
                    <FlatList
                        data={kurse[kursIndex].Uebungen}
                        keyExtractor={item=>item.id}
                        renderItem={renderItem}
                        style={{width:'90%'}}
                    ></FlatList>
                </View>
                <View style={{flex:0.1}} />
            </View>
        </ImageBackground>
    )
}

const uebungheight = Dimensions.get('screen').height * 0.45 / 4

const styles = StyleSheet.create({
    UebungsItem: {
      backgroundColor: '#464982',
      alignItems: 'center',
      justifyContent: 'center',
      height:uebungheight,
      borderRadius: 10,
      marginVertical: 8,
    },
    UebungsItemDone: {
        backgroundColor: '#46498290',
        alignItems: 'center',
        justifyContent: 'center',
        height:uebungheight,
        borderRadius: 10,
        marginVertical: 8,
    },
    UebungsItemUnavailable: {
        backgroundColor: '#3D3D3D',
        alignItems: 'center',
        justifyContent: 'center',
        height:uebungheight,
        borderRadius: 10,
        marginVertical:8, 
    },
    imagebackground: {
        flex: 1,
        resizeMode: 'cover',
    },
    background: {
        backgroundColor: "#0F113A90",
        flex:0.7,
        borderRadius: 10,
        alignItems: 'center',
        width: '90%',
        paddingVertical: 10,
    },
    text: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
  });