import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity, ImageBackground,Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'

import {kurse, sprecherBilder} from "../Kursdaten/Kursdatei.js"
import { AppContext } from '../context.js';

export const VersionsAuswahl =({navigation, route})=>{
    const {userData}=useContext(AppContext)
    const [sprecher, changeSprecher] = useState(Object.keys(sprecherBilder)[0])
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

    useEffect(()=>{
        if(userData.lastVoice){
            changeSprecher(userData.lastVoice)
        }
    },[])

    const renderSprecher =({item})=>{
        return(
            <TouchableOpacity style={styles.SelectedItem} onPress={()=>{changeSprecher(item.Sprecher)}}>
                <Image source={sprecherBilder[item.Sprecher]} style={item.Sprecher===sprecher ?{width:160, height:160}:{width:140, height:140, opacity:0.4}}></Image>
                <Text style={{...styles.text, color:'white'}}>{item.Sprecher}</Text>
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
        <ImageBackground source={require('../../assets/Profil.png')} style={styles.imagebackground} imageStyle={{resizeMode:'stretch'}}>
            
            <View style={{flexDirection:'row', alignItems:'center', marginVertical:20}}>
                <Text style={styles.textM}>{kurse[kursIndex].Uebungen[uebungsIndex].Name}</Text>
                <TouchableOpacity style={{marginLeft:10}} onPress={()=>{navigation.navigate("Übungsinfo", {kursIndex:kursIndex, uebungsIndex:uebungsIndex })}}>
                    <Ionicons name="information-circle-outline" size={26} color="white" />
                </TouchableOpacity>
            </View>

            <Text style={{...styles.text, marginBottom:20, alignSelf:'flex-start'}}>{kurse[kursIndex].Uebungen[uebungsIndex].Beschreibung}</Text> 
        
            <View style={{height:"30%"}}>
                <FlatList
                    numColumns={2}
                    data={kurse[kursIndex].Uebungen[uebungsIndex].VersionenNachSprecher}
                    keyExtractor={item=>item.Sprecher}
                    renderItem={renderSprecher}
                ></FlatList>
            </View>
            {/*sprecher===""? <Text>...</Text>:
            <FlatList 
                numColumns={3}
                data={kurse[kursIndex].Uebungen[uebungsIndex].VersionenNachSprecher[sprecherIndex].VersionenNachDauer}
                keyExtractor={item=>item.Dauer.toString()}
                renderItem={renderDauer}
                ></FlatList> */}
            <View style = {{flexDirection: "row", justifyContent: "center"}}>
                <View style= {{flex:1, justifyContent: "center", alignItems: "flex-end"}}>
                    {dauerArray().indexOf(dauer) > 0&&<TouchableOpacity onPress = {()=> changeDauer(dauerArray()[dauerArray().indexOf(dauer)-1])}>
                            <Text style =  {styles.alternativeDuration}>{dauerArray()[dauerArray().indexOf(dauer)-1]}</Text>
                        </TouchableOpacity>}
                </View>

                <LinearGradient start={[0, 0.5]}
                    end={[1, 0.5]}
                    colors={['#89FFF1', '#8F92E3', '#D476D5']}
                    style={styles.circleGradient}>
                    <View style={styles.innerCircle}>
                    <Text style= {{...styles.text, fontSize:30}}>{dauer}</Text>
                    </View>
                </LinearGradient>

                <View style= {{flex:1,justifyContent: "center"}}>
                    {dauerArray().indexOf(dauer) < dauerArray().length-1&&<TouchableOpacity  onPress = {() => changeDauer(dauerArray()[dauerArray().indexOf(dauer)+1])}>
                            <Text style =  {styles.alternativeDuration}>{dauerArray()[dauerArray().indexOf(dauer)+1]}</Text>
                        </TouchableOpacity>}
                </View>
            </View>
            {sprecher!=""&&dauerIndex()!=-1?
                <TouchableOpacity style={styles.button} onPress={()=>abspielen()}>
                    <LinearGradient
                    colors={['#89FFF1', '#8F92E3', '#D476D5']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 2 }}
                    style={styles.gradient}>
                        <Text style={{...styles.text, color:'#0F113A', fontSize:15}}>Übung starten</Text>
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
        justifyContent:"center",
        alignItems:"center",
        opacity:0.4
    },
    SelectedItem: {
        justifyContent:"center",
        alignItems:"center",
        opacity:1
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
    circleGradient:{
        borderRadius: 40, 
        width:80, 
        height:80, 
        marginBottom: 40
    },
    innerCircle: {
        margin: 4,
        backgroundColor: "#0F113A",
        borderRadius: 100,
        flex:1,
        alignItems: "center",
        justifyContent: "center"
      },
    alternativeDuration: {
        color: "grey",
        margin: 5,
        fontSize:25,
        fontFamily:'Poppins_400Regular'
    },
    imagebackground: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal:30,
    },
    gradient: {
        alignItems: 'center',
        borderRadius: 14,
        paddingVertical:4,
        paddingHorizontal: 20,
        marginBottom: 50
      },
    text: {
        fontFamily: 'Poppins_400Regular',
        color:'#fff',
        textAlign:'left',
    },
    textM: {
        fontFamily: 'Poppins_500Medium',
        color:'#fff',
        textAlign:'center',
        fontSize:22,
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