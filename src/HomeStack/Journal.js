import React from 'react';
import { StyleSheet, Text, View, Button, FlatList,TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import {AppContext} from '../context.js';
import { useContext, useEffect, useState } from 'react';
import { uebungen } from '../Kursdaten/Uebungsliste.js';
import { LinearGradient } from 'expo-linear-gradient';

export const Journal = (props) => {
    const navigation=props.navigation
    const {userData, gehoerteUebungen} = useContext(AppContext)

    const [weekchange, changeWeekchange] =useState(0)
    const [xHeight,changeXHeight] = useState(400)

    const wochentage=["Mo", "Di","Mi","Do", "Fr", "Sa", "So"]
    const wochentageToString={0:"Montag", 1:"Dienstag", 2:"Mittwoch", 3:"Donnerstag", 4:"Freitag", 5:"Samstag", 6:"Sonntag"}
    const today = new Date()
    const date=today.getDate()

    const styles = StyleSheet.create({
        tag: {
            backgroundColor: '#464982',
            paddingLeft:30,
            borderRadius: 10,
            height: (xHeight-44.5)/7,
            marginBottom: 3.5,
            flexDirection: "row",
            alignItems: 'center',
        },
        tagEdited:{
            backgroundColor: '#464982b2',
            paddingLeft:30, 
            borderRadius: 10,
            height: (xHeight-44.5)/7,
            marginBottom: 3.5,
            flexDirection: "row",
            alignItems: 'center',
        },
        reihe: {
            flexDirection:"row",
            alignItems: "center", 
            justifyContent: "space-around",
            marginTop: 15,
        },
        imagebackground: {
            flex: 1,
            alignItems:'center'
        },
        background: {
            backgroundColor: "#0F113Ab2",
            flex:0.6,
            borderRadius: 10,
            alignItems: 'center',
            width: '90%',
        },
        text: {
            color: '#fff',
            fontSize: 14,
            textAlign: 'center',
            fontFamily: 'Poppins_400Regular'
        },
        gradient: {
            alignItems: 'center',
            borderRadius: 15,
            paddingVertical: 5,
            paddingHorizontal: 20,
          },
        buttonRand: {
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 6,
            borderColor: '#fff',
            borderWidth: 1,
            padding: 3,
        },
        button: {
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#000',
            shadowOffset: {width:0, height:4},
            shadowRadius: 4,
            shadowOpacity: 0.4,
        },
        playButton: {
            shadowColor: '#000',
            shadowOffset: {width:0, height:4},
            shadowRadius: 4,
            shadowOpacity: 0.4,
        }
      });

    const InstantStart =() =>{
    var foundPrio = null
    var found = null
    for ( var z = 0; z< uebungen.length; z++){
        if (uebungen[z].id === userData.verfuegbareUebungen[(userData.verfuegbareUebungen.length)-1]
        &&!gehoerteUebungen.includes(userData.verfuegbareUebungen[(userData.verfuegbareUebungen.length)-1])){
        foundPrio=z
        }
        if(!gehoerteUebungen.includes(uebungen[z].id)&&found===null){
        found=z
        }
    }
    if(found===null&&foundPrio===null){
        found=Math.round(Math.random()*uebungen.length)
    }
    if (foundPrio!=null) found=foundPrio
    return (
        <TouchableOpacity onPress={()=>{
            if(uebungen[found].Audio){
            navigation.navigate("Wähle eine Version", {kursIndex:uebungen[found].KursIndex, uebungsIndex:uebungen[found].UebungsIndex})
            }else{
            navigation.navigate("Wähle die Dauer", {kursIndex:uebungen[found].KursIndex, uebungsIndex:uebungen[found].UebungsIndex})
            }
        }}>
        <Ionicons name="play" size={50} color="#464982" style={styles.playButton} /> 
        </TouchableOpacity>
    )
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
                    <Text style={weekchange===0&&today.getDay()===((index+1)%7)?{color:"#D874D4", fontFamily:'Poppins_500Medium', flex:1}:{color:"white", fontFamily:'Poppins_500Medium', flex:1}}>{item} {dateOfDay.getDate()}.{dateOfDay.getMonth()+1}</Text>
                    {userData.journal[dateOfDay.toDateString()]&&userData.journal[dateOfDay.toDateString()].meditations?<MaterialCommunityIcons name="meditation" size={25} color="#D874D4" style={{marginRight:20}}/>:null}
            </TouchableOpacity>
        )
    }

    return (
        <ImageBackground source={require('../../assets/Startseite.png')} style={styles.imagebackground} imageStyle={{resizeMode:'stretch'}}>
            
                <View style={{alignItems:"center", justifyContent:"center" ,flex:0.15}}>
                    <InstantStart/>
                </View>
                
                <View style={styles.background} onLayout={(event)=>{var{height}=event.nativeEvent.layout;changeXHeight(height)}}>
                    <FlatList 
                        style={{marginVertical:10, width:'95%'}}
                        data={wochentage}
                        keyExtractor={(item, index)=>index.toString()}
                        renderItem={renderTag}>
                    </FlatList>
                </View>

                <View style={{flex:0.25, alignContent:'center', width:'100%', paddingHorizontal:10}}>
                    <View style={styles.reihe}>
                        <TouchableOpacity style={styles.buttonRand} onPress={()=>{changeWeekchange(weekchange-1)}}>
                            <Text style={styles.text}>Woche davor</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonRand} onPress={()=>{changeWeekchange(0)}}>
                            <Text style={styles.text}>Aktuelle Woche</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonRand} onPress={()=>{changeWeekchange(weekchange+1)}}>
                            <Text style={styles.text}>Woche danach</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{alignItems:'center', padding:10}}>
                        {stressAktiv()?<Text style={styles.text}>Behalte deinen Stress im Blick! Fülle jetzt die Umfrage für diesen Monat aus!</Text>:
                        <Text style={styles.text}>Du hast deine Stress-Umfrage für diesen Monat durchgeführt!</Text>}
                    </View>
                    
                    <View style={styles.button}>
                        <TouchableOpacity styles={styles.button} disabled={stressAktiv()?false:true} onPress={()=>{navigation.navigate("Stress-Umfrage",{monthly:true})}}>
                            <LinearGradient
                                colors={['#D476D5', '#C77BD8', '#8F92E3']}
                                start={{ x: 0, y: 0.4 }}
                                end={{ x: 0, y: 1 }}
                                style={stressAktiv()?styles.gradient:{...styles.gradient, opacity:0.4}}>
                                    <Text style={styles.text}>Zur Stress-Umfrage</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            
            <View style={{height:60}}/>
        </ImageBackground>
    )



}