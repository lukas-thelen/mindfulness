import React, { useState } from 'react';
import { useEffect } from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity } from 'react-native';

import {kurse} from "../Kursdaten/Kursdatei.js"

export const VersionsAuswahl =({navigation, route})=>{
    const [sprecher, changeSprecher] = useState("")
    const [dauer, changeDauer] = useState(0)

    /*useEffect(()=>{
        return(()=>{
        changeSprecher("");
        changeDauer(0)
        })
    },[])*/

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
        changeSprecher("");
        changeDauer(0)
    }

    const kursIndex = route.params.kursIndex
    const uebungsIndex = route.params.uebungsIndex
    const sprecherIndex = kurse[kursIndex].Uebungen[uebungsIndex].VersionenNachSprecher.findIndex(item => item.Sprecher === sprecher)
    const dauerIndex =()=>{
         return kurse[kursIndex].Uebungen[uebungsIndex].VersionenNachSprecher[sprecherIndex].VersionenNachDauer.findIndex(item => item.Dauer === dauer)
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
            <FlatList
                numColumns={2}
                data={kurse[kursIndex].Uebungen[uebungsIndex].VersionenNachSprecher}
                keyExtractor={item=>item.Sprecher}
                renderItem={renderSprecher}
            ></FlatList>
            {sprecher===""? <Text>...</Text>:
            <FlatList 
                numColumns={3}
                data={kurse[kursIndex].Uebungen[uebungsIndex].VersionenNachSprecher[sprecherIndex].VersionenNachDauer}
                keyExtractor={item=>item.Dauer.toString()}
                renderItem={renderDauer}
            ></FlatList>}
            <Button title="Play"onPress={()=>{console.log(dauer);console.log(sprecher);abspielen()}}></Button>
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
    }
  });