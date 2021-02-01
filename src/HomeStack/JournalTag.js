import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Slider from '@react-native-community/slider';
import { LinearGradient } from 'expo-linear-gradient';

import {AppContext} from '../context.js';
import { useContext, useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const JournalTag = ({navigation, route}) => {
    const [stimmung, changeStimmung]= useState(3)
    const [spielStunden, changeSpielStunden]=useState(null)
    const [tatsächlicheStunden, changeTatsächlicheStunden]=useState(null)
    const [sonstiges, changeSonstiges]=useState("")
    const {userData, appData, changeUserData, CurrentUser, changeAppData} =useContext(AppContext)
    const userDataTemp = {...userData}
    const today = new Date()
    const date = new Date(route.params.date)
    const stimmungsÜbersetzung={0:"sehr schlecht", 1:"schlecht", 2:"eher schlecht", 3:"neutral", 4:"eher gut", 5:"gut", 6:"sehr gut"}

    const status=()=>{
        if(today.toDateString()===date.toDateString()){
            return"present"
        }else if(today>date){
            return"past"
        }else{
            return"future"
        }
    }

    useState(()=>{
        if (userDataTemp.journal[date.toDateString()] && userDataTemp.journal[date.toDateString()].journalChanged){
            changeStimmung(userDataTemp.journal[date.toDateString()].stimmung)
            changeSpielStunden(userDataTemp.journal[date.toDateString()].spielStunden)
            changeSonstiges(userDataTemp.journal[date.toDateString()].sonstiges)
            changeTatsächlicheStunden(userDataTemp.journal[date.toDateString()].tatsächlicheStunden)
        }
    },[])

    const storeData =async()=>{
        if (!userDataTemp.journal[date.toDateString()]){
            userDataTemp.journal[date.toDateString()]={}
        }
        userDataTemp.journal[date.toDateString()].stimmung=stimmung
        userDataTemp.journal[date.toDateString()].spielStunden=spielStunden
        userDataTemp.journal[date.toDateString()].tatsächlicheStunden=tatsächlicheStunden
        userDataTemp.journal[date.toDateString()].sonstiges=sonstiges
        userDataTemp.journal[date.toDateString()].journalChanged=true
        changeUserData(userDataTemp)
        appData[userDataTemp.data.eMail]=userData
        changeAppData(appData)
        const jsonvalue=JSON.stringify(appData)
        await AsyncStorage.setItem('appData', jsonvalue)
    }

    return (
        <ImageBackground source={require('../../assets/Profil.png')} style={styles.imagebackground}>
            <View style={{alignItems:"center"}}>
                <Text style={styles.text25}>Datum: {date.getDate()}.{date.getMonth()+1}</Text>
                <Text style={styles.text25}>Platz für deine Gedanken:</Text>
                <View style={styles.trennlinie}></View>
                <View style={styles.background}>
                    <Text style={status()==="past"||status()==="future"?{...styles.text, color:"#ffffff70"}:styles.text}>Wie geht's dir heute?</Text>
                    <Slider
                        style={{width: 200, height: 40}}
                        minimumValue={0}
                        maximumValue={6}
                        minimumTrackTintColor='#89FFF1'
                        maximumTrackTintColor='#D476D5'
                        customMinimumTrack={(
                            <LinearGradient
                            start={{x: .74, y: .26}}
                            end={{x: 0, y: .77}}
                            colors={['#ff8960', '#ff62a5']}
                            style={{
                                width: '100%',
                                height: '100%',
                            }}
                            />
                        )}
                        customMaximumTrack={(
                            <LinearGradient
                                start={{x: .74, y: .26}}
                                end={{x: 0, y: .77}}
                                colors={['#efefef', '#c1c0c9']}
                                style={{
                                width: '100%',
                                height: '100%',
                                }}
                            />
                        )}
                        customThumb={(
                            <LinearGradient
                            start={{x: .74, y: .26}}
                            end={{x: 0, y: .77}}
                            colors={['#ff8960', '#ff62a5']}
                            style={{
                                width: 36,
                                height: 36,
                                margin: 2,
                                borderRadius: 36 / 2,
                                borderWidth: 4,
                                borderColor: '#fff',
                                elevation: 1
                            }}
                            />
                        )}
                        step={1}
                        value={stimmung}
                        onValueChange={changeStimmung}
                        disabled={status()==="past"||status()==="future"? true:false}
                    />
                <Text style={status()==="past"||status()==="future"?{...styles.text, color:"#ffffff70"}:styles.text}>{stimmungsÜbersetzung[stimmung]}</Text>
                </View>
                <View style={styles.background}>
                    <Text style={status()==="past"?{...styles.text, color:"#ffffff70"}:styles.text}>Wie viele Stunden möchte ich heute spielen?</Text>
                    <TextInput editable={status()==="past"? false:true} defaultValue={spielStunden} keyboardType={'numeric'} onChangeText={changeSpielStunden} style={styles.textInput}></TextInput>
                </View>
                <View style={styles.background}>
                    <Text style={status()==="future"?{...styles.text, color:"#ffffff70"}:styles.text}>Wie viele Stunden habe ich tatsächlich gespielt?</Text>
                    <TextInput editable={status()==="future"? false:true} defaultValue={tatsächlicheStunden} keyboardType={'numeric'} onChangeText={changeTatsächlicheStunden} style={styles.textInput}></TextInput>
                </View>
                <View style={{...styles.background, justifyContent:'flex-start'}}>
                    <Text style={styles.text}>Möchtest du noch was loswerden?</Text>
                    <TextInput blurOnSubmit={true} multiline={true}defaultValue={sonstiges} onChangeText={changeSonstiges} style={styles.textBox}></TextInput>
                </View>
                <TouchableOpacity style={styles.button} onPress={()=>storeData()}>
                    <LinearGradient
                        colors={['#89FFF1', '#80DEE4', '#8F92E3', '#D476D5']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.gradient}>
                            <Text style={{color:'#0F113A'}}>Speichern</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
            <View style={{height:60}}/>
        </ImageBackground>
    )
}
const styles = StyleSheet.create({
    textInput:{ 
        borderColor: '#ffffff90', 
        borderWidth: 1,
        borderRadius:10,
        color: '#fff',
        textAlign: 'center',
        paddingVertical:6, 
        paddingHorizontal:20,
    },
    textBox:{ 
        height: 130,
        borderColor: '#ffffff90', 
        borderWidth: 1, 
        width:'100%', 
        borderRadius:10, 
        padding:10,
        textAlignVertical:"top",
        color: '#fff',
    },
    trennlinie:{
        height:1,
        width:"100%",
        marginBottom:10,
        marginTop:10
    },
    reihe: {
        //flex:1,
        flexDirection:"row",
        alignItems: "flex-start", 
        justifyContent: "center",
    },
    imagebackground: {
        flex: 1,
        resizeMode: 'cover',
    },
    text: {
        color: '#fff',
        marginBottom: 5,
    },
    text25: {
        color: '#fff',
        fontSize: 25,
    },
    gradient: {
        alignItems: 'center',
        borderRadius: 14,
        paddingVertical: 5,
        paddingHorizontal: 30,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {width:0, height:4},
        shadowRadius: 4,
        shadowOpacity: 0.4,
    },
    background: {
        backgroundColor: "#0F113A90",
        padding:20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent:'center',
        width: '90%',
        marginVertical: 6,
    },
  });
