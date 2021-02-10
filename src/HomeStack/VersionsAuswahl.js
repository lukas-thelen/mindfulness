import React, { useState } from 'react';
import { useEffect } from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'

import {kurse} from "../Kursdaten/Kursdatei.js"

export const VersionsAuswahl =({navigation, route})=>{
    const [sprecher, changeSprecher] = useState("männlich")
    const kursIndex = route.params.kursIndex
    const uebungsIndex = route.params.uebungsIndex
    const sprecherIndex = kurse[kursIndex].Uebungen[uebungsIndex].VersionenNachSprecher.findIndex(item => item.Sprecher === sprecher)
    const [dauer, changeDauer] = useState(0)
    const dauerArray=() => {
        const array = []
        for(let b=0; b<kurse[kursIndex].Uebungen[uebungsIndex].VersionenNachSprecher[sprecherIndex].VersionenNachDauer.length; b++){
            array.push(kurse[kursIndex].Uebungen[uebungsIndex].VersionenNachSprecher[sprecherIndex].VersionenNachDauer[b].Dauer)
        }
        if(dauer===0||array.indexOf(dauer)===-1){
            changeDauer(array[Math.ceil(array.length/2)-1])
        }
        return array
    }
    

    useEffect(()=>{
        changeDauer(dauerArray()[Math.ceil(dauerArray().length/2)-1])
    },[sprecher])

    const renderSprecher =({item})=>{
        return(
            <TouchableOpacity style={item.Sprecher===sprecher ? styles.SelectedItem : styles.SprecherItem} onPress={()=>{changeSprecher(item.Sprecher)}}>
                <Text>{item.Sprecher}</Text>
            </TouchableOpacity>    
        )
    }
    const renderDauer =({item})=>{
        return(
            <View style={{alignItems:"center", flex:1}}>
            <TouchableOpacity style={item.Dauer===dauer ? styles.SelectedDauerItem : styles.DauerItem} onPress={()=>{changeDauer(item.Dauer)}}>
                <Text>{item.Dauer.toString()}</Text>
            </TouchableOpacity>   
            </View> 
        )
    }

    const abspielen=()=>{
        if(sprecher!=""&&dauerIndex()!=-1){
            navigation.navigate("AudioPlayer", {kursIndex:kursIndex, uebungsIndex:uebungsIndex, sprecherIndex:sprecherIndex, dauerIndex:dauerIndex()})
        }
    }

    

    const dauerIndex =()=>{
         return kurse[kursIndex].Uebungen[uebungsIndex].VersionenNachSprecher[sprecherIndex].VersionenNachDauer.findIndex(item => item.Dauer === dauer)
    }
    return (
        <ImageBackground source={require('../../assets/Profil.png')} style={styles.imagebackground}>
            <View >
                
                <TouchableOpacity 
                    style={styles.info}
                    onPress={()=>{navigation.navigate("Übungsinfo", {kursIndex:kursIndex, uebungsIndex:uebungsIndex })}}
                ><Text>i</Text></TouchableOpacity>
            </View>
            <Text style={{textAlignVertical: 'center', fontSize:25, marginBottom: '5%',color: '#fff'}}>{kurse[kursIndex].Uebungen[uebungsIndex].Name}</Text>
            <Text style={{textAlignVertical: 'center', marginBottom: '5%', color: '#fff'}}>{kurse[kursIndex].Uebungen[uebungsIndex].Beschreibung}</Text> 
            <FlatList
                numColumns={2}
                data={kurse[kursIndex].Uebungen[uebungsIndex].VersionenNachSprecher}
                keyExtractor={item=>item.Sprecher}
                renderItem={renderSprecher}
            ></FlatList>
            {/*sprecher===""? <Text>...</Text>:
            <FlatList 
                numColumns={3}
                data={kurse[kursIndex].Uebungen[uebungsIndex].VersionenNachSprecher[sprecherIndex].VersionenNachDauer}
                keyExtractor={item=>item.Dauer.toString()}
                renderItem={renderDauer}
                ></FlatList> */}
            <View style = {{flexDirection: "row", justifyContent: "center"}}>

                <View style= {{flex:1, justifyContent: "center", alignItems: "flex-end"}}>
                {dauerArray().indexOf(dauer) > 0&&<TouchableOpacity style =  {styles.alternativeDuration} onPress = {()=> changeDauer(dauerArray()[dauerArray().indexOf(dauer)-1])}>
                        <Text style =  {styles.alternativeDuration}>{dauerArray()[dauerArray().indexOf(dauer)-1]}</Text>
                    </TouchableOpacity>}
                </View>
                <LinearGradient start={[0, 0.5]}
                    end={[1, 0.5]}
                    colors={['#89FFF1', '#8F92E3', '#D476D5']}
                    style={{borderRadius: 40, width:80, height:80, alignSelf:"center", marginBottom: '10%'}}>
                    <View style={styles.circleGradient}>
                    <Text style= {{fontSize: 35, color: '#fff'}}>{dauer}</Text>
                    </View>
                </LinearGradient>

                <View style= {{flex:1,justifyContent: "center"}}>
                {dauerArray().indexOf(dauer) < dauerArray().length-1&&<TouchableOpacity  onPress = {() => changeDauer(dauerArray()[dauerArray().indexOf(dauer)+1])}>
                        <Text style =  {styles.alternativeDuration}>{dauerArray()[dauerArray().indexOf(dauer)+1]}</Text>
                    </TouchableOpacity>}
                </View>
            </View>
            {sprecher!=""&&dauerIndex()!=-1?
                <TouchableOpacity style={{alignSelf:"center", marginBottom: '20%'}}onPress={()=>abspielen()}>
                    <LinearGradient
                    colors={['#89FFF1', '#8F92E3', '#D476D5']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 2 }}
                    style={styles.gradient}>
                        <Text style={styles.text25}>Übung starten</Text>
                    </LinearGradient>
                </TouchableOpacity>:
                <View style={{alignSelf:"center"}}>
                    <Ionicons name="play" size={50} color="lightgrey" /> 
                </View>
}
            <View style={{height:60}}/>
            </ImageBackground>
    )
}

const styles = StyleSheet.create({
    SprecherItem: {
        backgroundColor: '#8F92E370',
        alignItems: 'center',
        justifyContent: 'center',
        height:50,
        width:130,
        margin:3,
        borderRadius:100,
    },
    SelectedItem: {
        backgroundColor: '#8F92E3',
        alignItems: 'center',
        justifyContent: 'center',
        height:50,
        width:130,
        margin:3,
        borderRadius:100,
        borderWidth:3,
        borderColor: '#8F92E3'
        
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
        marginTop: '22%',
        marginRight: '12%', 
        alignItems:"center", 
        justifyContent:"center", 
        backgroundColor:"white",
        marginLeft: '80%',
        marginTop: '5%'
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
    imagebackground: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
      },
    gradient: {
        alignItems: 'center',
        borderRadius: 13,
        paddingBottom: 4,
        paddingTop: 4,
        paddingHorizontal: 20,
        marginBottom: 50
      },
  });