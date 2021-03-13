import React, { useState } from 'react';
import { useEffect } from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'
import Slider from '@react-native-community/slider';

import {kurse} from "../Kursdaten/Kursdatei.js"
import { ScrollView } from 'react-native-gesture-handler';

export const VersionsAuswahlText =({navigation, route})=>{
    const kursIndex = route.params.kursIndex
    const uebungsIndex = route.params.uebungsIndex
    const [dauer, changeDauer] = useState(0)


    const abspielen=()=>{
        navigation.navigate("Text-Übung", {kursIndex:kursIndex, uebungsIndex:uebungsIndex, dauer:dauer})
        changeDauer(0)
    }

    
    return (
        
        <ImageBackground source={require('../../assets/Profil.png')} style={styles.imagebackground} imageStyle={{resizeMode:'stretch'}}>
            <View style={{flexDirection:'row', alignItems:'center', marginVertical:10}}>
            <Text style={styles.textM}>{kurse[kursIndex].Uebungen[uebungsIndex].Name}</Text>
                <TouchableOpacity 
                    onPress={()=>{navigation.navigate("Übungsinfo", {kursIndex:kursIndex, uebungsIndex:uebungsIndex })}}>
                    <Ionicons name="information-circle-outline" size={26} color="white" />
                </TouchableOpacity>
                
            </View>
            <ScrollView style={{marginBottom:10}}>
                <Text style={styles.text}>{kurse[kursIndex].Uebungen[uebungsIndex].Beschreibung}</Text> 
            </ScrollView>
            <View style = {{width: 250, alignSelf: "center"}}>
                <Slider
                    style={{width: 250, height: 40}}
                    minimumValue={0}
                    maximumValue={20}
                    minimumTrackTintColor="#89FFF1"
                    maximumTrackTintColor="#80DEE470"
                    thumbTintColor='#fff'
                    step={1}
                    value={dauer}
                    onValueChange={changeDauer}
                />

                <View style = {{flexDirection: "row"}}>
                    <Text style = {{...styles.text, flex: 1}}>freie Zeit</Text>
                    <Text style = {{...styles.text, flex: 1, textAlign: "center"}}>10</Text>
                    <Text style = {{...styles.text, flex: 1, textAlign: "right"}}>20</Text>
                </View>
            </View>

            <LinearGradient start={[0, 0.5]}
                end={[1, 0.5]}
                colors={['#89FFF1', '#8F92E3', '#D476D5']}
                style={styles.circleGradient}>
                    <View style={styles.innerCircle}>
                        <Text style= {styles.text}>{dauer=== 0? "frei": dauer}</Text>
                    </View>
            </LinearGradient>

            <TouchableOpacity style={styles.button} onPress={()=>abspielen()}>
                <LinearGradient
                colors={['#89FFF1', '#8F92E3', '#D476D5']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 2 }}
                style={styles.gradient}>
                    <Text style={{...styles.text, color:'#0F113A', fontSize:15}}>Übung starten</Text>
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
        borderRadius: 30, 
        width:60, 
        height:60,
        marginVertical:20
    },
    innerCircle: {
        backgroundColor: "#0F113A",
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
        flex:1,
        margin:4
      },
    alternativeDuration: {
        color: "grey",
        margin: 5,
        fontSize:25
    },
    gradient: {
        alignItems: 'center',
        borderRadius: 14,
        paddingVertical:4,
        paddingHorizontal: 20,
      },
    imagebackground: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal:25,
      },
    text: {
        fontFamily: 'Poppins_400Regular',
        color:'#fff',
        textAlignVertical:'center',
    },
    textM: {
        fontFamily: 'Poppins_500Medium',
        color:'#fff',
        textAlignVertical:'center',
        fontSize:22,
        marginRight:10
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {width:0, height:4},
        shadowRadius: 4,
        shadowOpacity: 0.4,
        marginBottom:15
      },
  });