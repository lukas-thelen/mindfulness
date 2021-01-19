import React, { useState } from 'react';
import { useEffect } from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'

import {kurse} from "../Kursdaten/Kursdatei.js"

export const VersionsAuswahl =({navigation, route})=>{
    const [sprecher, changeSprecher] = useState("männlich")
    const kursIndex = route.params.kursIndex
    const uebungsIndex = route.params.uebungsIndex
    const sprecherIndex = kurse[kursIndex].Uebungen[uebungsIndex].VersionenNachSprecher.findIndex(item => item.Sprecher === sprecher)
    const dauerArray=() => {
        const array = []
        for(let b=0; b<kurse[kursIndex].Uebungen[uebungsIndex].VersionenNachSprecher[sprecherIndex].VersionenNachDauer.length; b++){
            array.push(kurse[kursIndex].Uebungen[uebungsIndex].VersionenNachSprecher[sprecherIndex].VersionenNachDauer[b].Dauer)
        }
        return array
    }
    const [dauer, changeDauer] = useState(dauerArray()[Math.ceil(dauerArray().length/2)-1])

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
        changeSprecher("");
        changeDauer(0)
    }

    

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
                    colors={['#EFBB35', '#4AAE9B']}
                    style={{borderRadius: 100, width:80, height:80, alignSelf:"center"}}>
                    <View style={styles.circleGradient}>
                    <Text style= {{fontSize: 35}}>{dauer}</Text>
                    </View>
                </LinearGradient>

                <View style= {{flex:1,justifyContent: "center"}}>
                {dauerArray().indexOf(dauer) < dauerArray().length-1&&<TouchableOpacity  onPress = {() => changeDauer(dauerArray()[dauerArray().indexOf(dauer)+1])}>
                        <Text style =  {styles.alternativeDuration}>{dauerArray()[dauerArray().indexOf(dauer)+1]}</Text>
                    </TouchableOpacity>}
                </View>
            </View>

            {sprecher!=""&&dauerIndex()!=-1?
                <TouchableOpacity style={{alignSelf:"center"}}onPress={()=>abspielen()}>
                    <Ionicons name="play" size={50} color="black" /> 
                </TouchableOpacity>:
                <View style={{alignSelf:"center"}}>
                    <Ionicons name="play" size={50} color="lightgrey" /> 
                </View>
            }
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