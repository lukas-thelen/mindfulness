import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Slider from '@react-native-community/slider';

import {AppContext} from '../context.js';
import { useContext, useEffect, useState } from 'react';

export const JournalTag = ({navigation, route}) => {
    const [stimmung, changeStimmung]= useState(2)
    const [spielStunden, changeSpielStunden]=useState(null)
    const [tatsächlicheStunden, changeTatsächlicheStunden]=useState(null)
    const [sonstiges, changeSonstiges]=useState("")
    const {userData, appData, changeUserData, CurrentUser, changeAppData} =useContext(AppContext)
    const userDataTemp = {...userData}
    const today = new Date()
    const date = new Date(route.params.date)
    const stimmungsÜbersetzung={0:"sehr schlecht", 1:"eher schlecht", 2:"neutral", 3:"eher gut", 4:"sehr gut"}

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
        <View style={{alignItems:"center"}}>
            <Text style={{fontSize:25}}>Datum: {date.getDate()}.{date.getMonth()+1}</Text>
            <Text style={{fontSize:25}}>Platz für deine Gedanken:</Text>
            <View style={styles.trennlinie}></View>
            <Text style={status()==="past"||status()==="future"?{color:"grey"}:{color:"black"}}>Wie geht's dir heute?</Text>
            <Slider
                style={{width: 200, height: 40}}
                minimumValue={0}
                maximumValue={4}
                minimumTrackTintColor="green"
                maximumTrackTintColor="red"
                step={1}
                value={stimmung}
                onValueChange={changeStimmung}
                disabled={status()==="past"||status()==="future"? true:false}
            />
            <Text>{stimmungsÜbersetzung[stimmung]}</Text>
            <View style={styles.trennlinie}/>
            <Text style={status()==="past"?{color:"grey"}:{color:"black"}}>Wie viele Stunden möchte ich heute spielen?</Text>
            <TextInput editable={status()==="past"? false:true} defaultValue={spielStunden} keyboardType={'numeric'} onChangeText={changeSpielStunden} style={styles.textInput}></TextInput>
            <View style={styles.trennlinie}/>
            <Text style={status()==="future"?{color:"grey"}:{color:"black"}}>Wie viele Stunden habe ich tatsächlich gespielt?</Text>
            <TextInput editable={status()==="future"? false:true} defaultValue={tatsächlicheStunden} keyboardType={'numeric'} onChangeText={changeTatsächlicheStunden} style={styles.textInput}></TextInput>
            <View style={styles.trennlinie}/>
            <Text>Möchtest du noch was loswerden?</Text>
            <TextInput blurOnSubmit={true} multiline={true}defaultValue={sonstiges} onChangeText={changeSonstiges} style={styles.textBox}></TextInput>
            <Button title="speichern"   onPress={()=>storeData()}></Button>
        </View>
    )
}
const styles = StyleSheet.create({
    tag: {
      backgroundColor: '#fff',
      justifyContent: 'center',
      height:50,
      borderColor:"black",
      borderBottomWidth:1,
      paddingLeft:30,
    },
    textInput:{ 
        height: 20, 
        borderColor: 'gray', 
        borderWidth: 1, 
        width:200, 
        borderRadius:200, 
        paddingLeft:10
    },
    textBox:{ 
        height: 200, 
        borderColor: 'gray', 
        borderWidth: 1, 
        width:300, 
        borderRadius:10, 
        paddingLeft:10,
        textAlignVertical:"top",
    },
    trennlinie:{
        height:1,
        width:"100%",
        backgroundColor:"black",
        marginBottom:10,
        marginTop:10
    },
    reihe: {
        //flex:1,
        flexDirection:"row",
        alignItems: "flex-start", 
        justifyContent: "center",
    }
  });