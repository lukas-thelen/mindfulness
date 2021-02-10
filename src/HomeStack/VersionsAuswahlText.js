import React, { useState } from 'react';
import { useEffect } from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'
import Slider from '@react-native-community/slider';

import {kurse} from "../Kursdaten/Kursdatei.js"

export const VersionsAuswahlText =({navigation, route})=>{
    const kursIndex = route.params.kursIndex
    const uebungsIndex = route.params.uebungsIndex
    const [dauer, changeDauer] = useState(0)


    const abspielen=()=>{
        navigation.navigate("Text-Übung", {kursIndex:kursIndex, uebungsIndex:uebungsIndex, dauer:dauer})
        changeDauer(0)
    }

    
    return (
        
        <ImageBackground source={require('../../assets/Profil.png')} style={styles.imagebackground}>
            <View >
                <TouchableOpacity 
                    style={styles.info}
                    onPress={()=>{navigation.navigate("Übungsinfo", {kursIndex:kursIndex, uebungsIndex:uebungsIndex })}}
                ><Text>i</Text></TouchableOpacity>
                
            </View>
            <Text style={{marginBottom:'5%', fontSize:30, color: '#fff', textAlignVertical: 'center'}}>{kurse[kursIndex].Uebungen[uebungsIndex].Name}</Text>
            <Text style={{marginBottom:'5%', color: '#fff', textAlignVertical: 'center'}}>{kurse[kursIndex].Uebungen[uebungsIndex].Beschreibung}</Text> 
            

            <View style = {{width: 250, alignSelf: "center"}}>
                <Slider
                    style={{width: 250, height: 40}}
                    minimumValue={0}
                    maximumValue={20}
                    minimumTrackTintColor="#89FFF1"
                    maximumTrackTintColor="#80DEE470"
                    step={1}
                    value={dauer}
                    onValueChange={changeDauer}
                />

                <View style = {{flexDirection: "row"}}>
                <Text style = {{flex: 1, color: '#fff'}}>freie Zeit</Text>
                <Text style = {{flex: 1, textAlign: "center", color: '#fff'}}>10</Text>
                <Text style = {{flex: 1, textAlign: "right", color: '#fff'}}>20</Text>
                </View>
            </View>

            <LinearGradient start={[0, 0.5]}
                    end={[1, 0.5]}
                    colors={['#89FFF1', '#8F92E3', '#D476D5']}
                    style={{borderRadius: 40, width:80, height:80, alignSelf:"center", marginTop: '10%', marginBottom: '5%'}}>
                    <View style={styles.circleGradient}>
                    <Text style= {{fontSize: 30, color: '#fff'}}>{dauer=== 0? "frei": dauer}</Text>
                    </View>
                </LinearGradient>

                <TouchableOpacity style={{alignSelf:"center"}}onPress={()=>abspielen()}>
                    <LinearGradient
                    colors={['#89FFF1', '#8F92E3', '#D476D5']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 2 }}
                    style={styles.gradient}>
                        <Text style={styles.text25}>Übung starten</Text>
                    </LinearGradient>
                </TouchableOpacity>   
            <View style={{height:60}}/>
            </ImageBackground>
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
        backgroundColor:"#fff",
        marginLeft: '80%',
        marginTop: '10%'
    },
    circleGradient: {
        margin: 4,
        backgroundColor: "#141744",
        borderRadius: 100,
        flex:1,
        alignItems: "center",
        justifyContent: "center"
      },
    alternativeDuration: {
        color: "grey",
        margin: 5,
        fontSize:25
    },
    gradient: {
        alignItems: 'center',
        borderRadius: 13,
        paddingBottom: 4,
        paddingTop: 4,
        paddingHorizontal: 20,
        marginBottom: 50
      },
    imagebackground: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
      },
  });