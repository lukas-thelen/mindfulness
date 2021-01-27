import React from 'react';
import { StyleSheet, Text, View, Button, FlatList,TouchableOpacity, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

import {AppContext} from '../context.js';
import { useContext, useEffect, useState } from 'react';
import { uebungen } from '../Kursdaten/Uebungsliste.js';
import { LinearGradient } from 'expo-linear-gradient';

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
              return (
              <TouchableOpacity onPress={()=>{navigation.navigate("Wähle eine Version", {kursIndex:uebungen[z].KursIndex, uebungsIndex:uebungen[z].UebungsIndex})}}>
                  <Ionicons name="play" size={50} color="#464982" /> 
              </TouchableOpacity>
              )
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
                    <Text style={weekchange===0&&today.getDay()===((index+1)%7)?{color:"#D874D4", fontWeight:'bold', flex:1}:{color:"white", fontWeight:'bold', flex:1}}>{item} {dateOfDay.getDate()}.{dateOfDay.getMonth()+1}</Text>
                    {userData.journal[dateOfDay.toDateString()]&&userData.journal[dateOfDay.toDateString()].meditations?<View style={{backgroundColor:"#D874D4", width:10, height:10, borderRadius:100, marginRight:20}}/>:null}
            </TouchableOpacity>
        )
    }

    return (
        <ImageBackground source={require('../../assets/Startseite.png')} style={styles.imagebackground}>
            <View style={{flex:1, alignItems:'center'}}>
                
                <View style={{alignItems:"center", justifyContent:"center" ,flex:0.15}}>
                    <InstantStart/>
                </View>
                
                <View style={styles.background}>
                    <FlatList 
                        style={{margin:5, width:'95%'}}
                        data={wochentage}
                        keyExtractor={(item, index)=>index.toString()}
                        renderItem={renderTag}>
                    </FlatList>
                </View>

                <View style={{flex:0.25, alignContent:'center'}}>
                    <View style={styles.reihe}>
                        <TouchableOpacity style={styles.button} onPress={()=>{changeWeekchange(weekchange-1)}}>
                            <Text style={styles.text}>Woche davor</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={()=>{changeWeekchange(0)}}>
                            <Text style={styles.text}>Aktuelle Woche</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={()=>{changeWeekchange(weekchange+1)}}>
                            <Text style={styles.text}>Woche danach</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{alignItems:'center', padding:10}}>
                        {stressAktiv()?<Text style={styles.text}>Behalte deinen Stress im Blick! Fülle jetzt die Umfrage für diesen Monat aus!</Text>:
                        <Text>Du hast erst vor kurzem eine Stress-Umfrage durchgeführt!</Text>}
                    </View>
                    
                    <View style={{alignItems:'center'}}>
                        <TouchableOpacity styles={{alignItems: 'center', justifyContent: 'center'}} disabled={stressAktiv()?false:true} onPress={()=>{navigation.navigate("Stress-Umfrage",{monthly:true})}}>
                            <LinearGradient
                            colors={['#D476D5', '#C77BD8', '#8F92E3']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 2 }}
                            style={styles.gradient}>
                                <Text style={styles.text}>Zur Stress-Umfrage</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    tag: {
        flexDirection:"row",
        backgroundColor: '#464982',
        alignItems: 'center',
        height:50,
        paddingLeft:30,
        borderRadius: 10,
        marginVertical: 3.5,
    },
    tagEdited:{
        flexDirection:"row",
        backgroundColor: '#46498270',
        alignItems: 'center',
        height:50,
        paddingLeft:30, 
        borderRadius: 10,
        marginVertical: 3.5,
    },
    reihe: {
        flexDirection:"row",
        alignItems: "center", 
        justifyContent: "space-around",
        marginTop: 15,
    },
    imagebackground: {
        flex: 1,
        resizeMode: 'cover',
    },
    background: {
        backgroundColor: "#0F113A90",
        flex:0.6,
        borderRadius: 10,
        alignItems: 'center',
        width: '90%',
    },
    text: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
    gradient: {
        alignItems: 'center',
        borderRadius: 15,
        paddingBottom: 4,
        paddingTop: 4,
        paddingHorizontal: 20,
      },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
        borderColor: '#fff',
        borderWidth: 1,
        padding: 3,
    },
  });