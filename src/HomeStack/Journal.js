import React from 'react';
import { StyleSheet, Text, View, Button, FlatList,TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

import {AppContext} from '../context.js';
import { useContext, useEffect, useState } from 'react';
import { uebungen } from '../Kursdaten/Uebungsliste.js';


export const Journal = (props) => {
    const navigation=props.navigation
    const {userData, gehoerteUebungen} = useContext(AppContext)

    const [weekchange, changeWeekchange] =useState(0)

    const wochentage=["Mo", "Di","Mi","Do", "Fr", "Sa", "So"]
    const wochentageToString={0:"Montag", 1:"Dienstag", 2:"Mittwoch", 3:"Donnerstag", 4:"Freitag", 5:"Samstag", 6:"Sonntag"}
    const today = new Date()
    const date=today.getDate()
    const InstantStart =() =>{
        if (gehoerteUebungen.includes(userData.verfuegbareUebungen[(userData.verfuegbareUebungen.length)-1])){
          return null
        }
          for ( var z = 0; z< uebungen.length; z++){
            if (uebungen[z].id === userData.verfuegbareUebungen[(userData.verfuegbareUebungen.length)-1]){
              return <TouchableOpacity onPress={()=>{navigation.navigate("Wähle eine Version", {kursIndex:uebungen[z].KursIndex, uebungsIndex:uebungen[z].UebungsIndex})}}>
                  <Ionicons name="play" size={50} color="black" /> 
              </TouchableOpacity>
            }
        }
    }

    const stressAktiv=()=>{
        var lastMonth = new Date()
        lastMonth.setMonth(lastMonth.getMonth()-1)
        var lastMonthString = lastMonth.toDateString()
        lastMonthString=lastMonthString[4]+lastMonthString[5]+lastMonthString[6]+lastMonthString[11]+lastMonthString[12]+lastMonthString[13]+lastMonthString[14]
        var dateString = today.toDateString()
        dateString=dateString[4]+dateString[5]+dateString[6]+dateString[11]+dateString[12]+dateString[13]+dateString[14]
        if(!userData.progress.stressData[dateString]){
            if(userData.progress.stressData[lastMonthString]){
                var lastDate=new Date(userData.progress.stressData[lastMonthString].date)
                lastDate.setDate(lastDate.getDate()+14)
                console.log(lastDate)
                if(lastDate<today){
                    return true
                }
                return false
            }
            return true
        }
        return false
    }


    const renderTag =({item, index})=>{
        //kann später weg
        if(!userData.journal){
            userData.journal={}
        }
        //bis hier
        const dateOfDay = new Date()
        dateOfDay.setDate(date+index-((today.getDay()+6)%7)+(weekchange*7))
        const millis = dateOfDay.getTime()
        return(
            <TouchableOpacity style={userData.journal[dateOfDay.toDateString()]&&userData.journal[dateOfDay.toDateString()].journalChanged?styles.tagEdited:styles.tag} onPress={()=>{navigation.navigate("individueller Tag", {date:millis})}}>
                <Text style={weekchange===0&&today.getDay()===((index+1)%7)?{color:"red", flex:1}:{color:"black", flex:1}}>{item} {dateOfDay.getDate()}.{dateOfDay.getMonth()+1}</Text>
                {userData.journal[dateOfDay.toDateString()]&&userData.journal[dateOfDay.toDateString()].meditations?<View style={{backgroundColor:"black", width:10, height:10, borderRadius:100, marginRight:20}}/>:null}
            </TouchableOpacity>
        )
    }

    return (
        <View>
            <View style={{alignItems:"center", marginBottom:30, marginTop:30}}>
                <InstantStart/>
            </View>
            <FlatList
            data={wochentage}
            keyExtractor={(item, index)=>index.toString()}
            renderItem={renderTag}></FlatList>
            <View style={styles.reihe}>
                <Button title="Letzte Woche"onPress={()=>{changeWeekchange(weekchange-1)}}></Button>
                <Button title="aktuelle Woche"onPress={()=>{changeWeekchange(0)}}></Button>
                <Button title="Nächste Woche"onPress={()=>{changeWeekchange(weekchange+1)}}></Button>
            </View>
            <View style={{alignItems:"center", padding:15}}>
                {stressAktiv()?<Text>Behalte deinen Stress im Blick! Fülle jetzt die Umfrage für diesen Monat aus!</Text>:
                <Text>Du hast erst vor kurzem eine Stress-Umfrage durchgeführt!</Text>}
            </View>
            <Button disabled={stressAktiv()?false:true} title="zur Stress Umfrage" onPress={()=>{navigation.navigate("Stress-Umfrage",{monthly:true})}}></Button>
        </View>
    )
}

const styles = StyleSheet.create({
    tag: {
        flexDirection:"row",
        backgroundColor: '#fff',
        alignItems: 'center',
        height:50,
        borderColor:"black",
        borderBottomWidth:1,
        paddingLeft:30,
    },
    tagEdited:{
        flexDirection:"row",
        backgroundColor: '#ddd',
        alignItems: 'center',
        height:50,
        borderColor:"black",
        borderBottomWidth:1,
        paddingLeft:30, 
    },reihe: {
        flexDirection:"row",
        alignItems: "flex-start", 
        justifyContent: "center",
    },
  });