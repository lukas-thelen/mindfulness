import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {AppContext} from '../context.js';
import { useContext, useEffect, useState } from 'react';
import { LineChart, Grid, XAxis, YAxis } from 'react-native-svg-charts'


export const Statistiken = () => {
    const [typeOfChart, changeTypeOfChart] =useState("meditations")
    const {userData, cahngeUserData, appData, changeAppData}=useContext(AppContext)
    const contentInset = { top: 20, bottom: 20 }

    const getMeditation=(version)=>{
        var minutes=0
        var amount=0
        for(i in userData.journal){
            if(userData.journal[i].meditations){
                amount+=parseInt(userData.journal[i].meditations)
                minutes+=parseInt(userData.journal[i].meditationMinutes)  
            }
        }
        if(version==="minutes"){
            return minutes
        }else if(version==="amount"){
            return amount
        }
    }

    const getHistory=()=>{
        const amountArray=[]
        const minutesArray=[]
        var dayString=""
        const day=new Date()
        while(amountArray.length<7){
            dayString=day.toDateString()
            if(userData.journal[dayString]&&userData.journal[dayString].meditations){
                amountArray.push({
                    meditations:userData.journal[dayString].meditations,
                    minutes:userData.journal[dayString].meditationMinutes,
                    date:day.getDay()
                })
            }else{
                amountArray.push({
                    meditations:0,
                    minutes:0,
                    date:day.getDay()
                })
            }
            day.setDate(day.getDate()-1)
        }
        amountArray.reverse() 
        return amountArray
    }

    const tagesÜbersetzer={0:"So", 1:"Mo", 2:"Di", 3:"Mi", 4:"Do", 5:"Fr", 6:"Sa"}

    return (
        <View>
            <Text>Minuten: {""+getMeditation("minutes")}</Text>
            <Text>Anzahl: {""+getMeditation("amount")}</Text>
            <View style={{ flexDirection: 'row', display: "flex" }}>
                <YAxis
                        data={getHistory()}
                        yAccessor={({item})=>item[typeOfChart]}
                        contentInset={contentInset}
                        svg={{
                            fill: 'grey',
                            fontSize: 10,
                        }}
                        numberOfTicks={10}
                        formatLabel={(value) => `${value}`}
                        style={{ flex: 0.1, marginBottom: 15 }}
                    />
                    <View style={{ flex: 0.8 }}>
                        <LineChart
                            style={{ height: 200}}
                            data={getHistory()}
                            yAccessor={({item})=>item[typeOfChart]}
                            svg={{ stroke: 'rgb(134, 65, 244)' }}
                            contentInset={{left: 10, right: 10, top:20, bottom:20}}
                        >
                            <Grid />
                        </LineChart>
                    
                    <XAxis
                            style={{ marginHorizontal: -10}}
                            data={getHistory()}
                            formatLabel={(index, value) => tagesÜbersetzer[getHistory()[index].date]}
                            contentInset={{ left: 20, right: 20 }}
                            svg={{ fontSize: 10, fill: 'black' }}
                        />
                    </View>
                </View>
                <View style={styles.reihe}>
                    <Button title="Minuten"disabled={typeOfChart==="minutes"&&true}onPress={()=>{changeTypeOfChart("minutes")}}></Button>
                    <Button title="Anzahl"disabled={typeOfChart==="meditations"&&true}onPress={()=>{changeTypeOfChart("meditations")}}></Button>
                </View>
        </View>
    )
}

const styles = StyleSheet.create({
    reihe: {
        flexDirection:"row",
        alignItems: "flex-start", 
        justifyContent: "center",
    },
  });
