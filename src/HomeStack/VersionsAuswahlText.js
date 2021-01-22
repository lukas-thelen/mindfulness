import React, { useState } from 'react';
import { useEffect } from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'
import Slider from '@react-native-community/slider';

import {kurse} from "../Kursdaten/Kursdatei.js"

export const VersionsAuswahlText =({navigation, route})=>{
    const kursIndex = route.params.kursIndex
    const uebungsIndex = route.params.uebungsIndex
    const [dauer, changeDauer] = useState(0)


    const abspielen=()=>{
        navigation.navigate("Text-Übung", {kursIndex:kursIndex, dauer:dauer})
        changeDauer(0)
    }

    
    return (
        <View style={{padding:15}}>
            <View style={{flexDirection:"row"}}>
                <Text style={{marginBottom:15, fontSize:30}}>{kurse[kursIndex].Uebungen[uebungsIndex].Name}</Text>
                <TouchableOpacity 
                    style={styles.info}
                    onPress={()=>{navigation.navigate("Übungsinfo", {kursIndex:kursIndex, uebungsIndex:uebungsIndex })}}
                ><Text>i</Text></TouchableOpacity>
            </View>
            <Text style={{marginBottom:15}}>{kurse[kursIndex].Uebungen[uebungsIndex].Beschreibung}</Text> 


            <View style = {{width: 250, alignSelf: "center"}}>
                <Slider
                    style={{width: 250, height: 40}}
                    minimumValue={0}
                    maximumValue={20}
                    minimumTrackTintColor="green"
                    maximumTrackTintColor="grey"
                    step={1}
                    value={dauer}
                    onValueChange={changeDauer}
                />

                <View style = {{flexDirection: "row"}}>
                <Text style = {{flex: 1}}>freie Zeit</Text>
                <Text style = {{flex: 1, textAlign: "center"}}>10</Text>
                <Text style = {{flex: 1, textAlign: "right"}}>20</Text>
                </View>
            </View>

            <LinearGradient start={[0, 0.5]}
                    end={[1, 0.5]}
                    colors={['#EFBB35', '#4AAE9B']}
                    style={{borderRadius: 100, width:80, height:80, alignSelf:"center"}}>
                    <View style={styles.circleGradient}>
                    <Text style= {{fontSize: 35}}>{dauer=== 0? "frei": dauer}</Text>
                    </View>
                </LinearGradient>

            <TouchableOpacity style={{alignSelf:"center"}}onPress={()=>abspielen()}>
                <Ionicons name="play" size={50} color="black" /> 
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    SprecherItem: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        height:100,
        margin:3,
        borderRadius:100,
        marginBottom:10,
    },
    SelectedItem: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        height:100,
        margin:3,
        borderRadius:100,
        marginBottom:10,
        borderWidth:3,
        borderColor:"#ffccdc",
    },
    DauerItem:{
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        height:100,
        width:100,
        margin:3,
        borderRadius:100,
        marginBottom:10,
        alignSelf:"center"
    },
    SelectedDauerItem:{
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        height:100,
        width:100,
        margin:3,
        borderRadius:100,
        marginBottom:10,
        borderWidth:3,
        borderColor:"#ffccdc",
        alignSelf:"center"
    },
    info:{
        borderWidth:1, 
        borderRadius:100, 
        width:25, 
        height:25, 
        alignItems:"center", 
        justifyContent:"center", 
        backgroundColor:"white"
    },
    circleGradient: {
        margin: 5,
        backgroundColor: "white",
        borderRadius: 100,
        flex:1,
        alignItems: "center",
        justifyContent: "center"
      },
    alternativeDuration: {
        color: "grey",
        margin: 5,
        fontSize:25
    }
  });