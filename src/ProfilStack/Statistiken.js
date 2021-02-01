import React from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from '@react-native-community/checkbox';

import {AppContext} from '../context.js';
import { useContext, useEffect, useState } from 'react';
import { LineChart, Grid, XAxis, YAxis, BarChart } from 'react-native-svg-charts'
import { Chart, VerticalAxis, HorizontalAxis, Line } from 'react-native-responsive-linechart'



export const Statistiken = () => {
    const [dailyStress, changeDailyStress] =useState(false)
    const [craving, changeCraving] =useState(false)
    const [pflichten, changePflichten] =useState(false)
    const [stimmung, changeStimmung] =useState(false)
    const [morgenStunden,changeMorgenStunden]=useState(null)
    const [heuteStunden, changeHeuteStunden]=useState(null)
    const [willMeditate, changeWillMeditate]=useState(false)
    const [meditations, changeMeditations] =useState(true)
    const [minutes, changeMinutes] =useState(false)
    const [maxValue, changeMaxValue] = useState(4)
    const {userData, cahngeUserData, appData, changeAppData}=useContext(AppContext)
    const contentInset = { top: 20, bottom: 20 }
    const colors = ["#65fe35", "#5792ff", "#aaaa00", "#ccaa00", "#4499ed", "#99aaff", "#de2277", "#47be78"]

    useEffect(()=>{
        let max= 4
        if (meditations){
            var max2 = Math.max.apply(Math, getData().meditations.map(function(o) { return o.y; }))
            if (max2 > max){
                max = max2
            }
        }
        if (minutes){
            var max2 = Math.max.apply(Math, getData().minutes.map(function(o) { return o.y; }))
            if (max2> max){
                max = max2
            }
        }
        if (heuteStunden){
            var max2 = Math.max.apply(Math, getData().heuteStunden.map(function(o) { return o.y; }))
            if (max2> max){
                max = max2
            }
        }
        if (morgenStunden){
            var max2 = Math.max.apply(Math, getData().morgenStunden.map(function(o) { return o.y; }))
            if (max2> max){
                max = max2
            }
        }
        changeMaxValue(max)
    }, [meditations, minutes,heuteStunden,morgenStunden])

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

    const getData=()=>{
        const amountArray=[]
        const minutesArray=[]
        const dailyStressArray =[]
        const cravingArray=[]
        const stimmungArray=[]
        const pflichtenArray =[]
        const heuteStundenArray=[]
        const morgenStundenArray=[]
        var dayString=""
        var yesterdayString=""
        const day=new Date()
        const yesterday = new Date()
        yesterday.setDate(day.getDate()-1)
        while(amountArray.length<7){
            dayString=day.toDateString()
            yesterdayString=yesterday.toDateString()
            if(userData.journal[dayString]&&userData.journal[dayString].meditations){
                amountArray.push({y:userData.journal[dayString].meditations,x:6-amountArray.length})
                minutesArray.push({y:userData.journal[dayString].meditationMinutes,x:6-minutesArray.length })
                
            }else{
                amountArray.push({y:0,x:6-amountArray.length})
                minutesArray.push({y:0,x:6-minutesArray.length})
            }
            if(userData.journal[dayString]&&userData.journal[dayString].stimmung){
                dailyStressArray.push({y:userData.journal[dayString].stress,x:6-dailyStressArray.length })
                cravingArray.push({y:userData.journal[dayString].craving,x:6-cravingArray.length })
                stimmungArray.push({y:userData.journal[dayString].stimmung,x:6-stimmungArray.length })
                pflichtenArray.push({y:userData.journal[dayString].pflichten,x:6-pflichtenArray.length })
                heuteStundenArray.push({y:userData.journal[dayString].heuteStunden,x:6-heuteStundenArray.length })
            } else {
                dailyStressArray.push({y:0,x:6-dailyStressArray.length })
                cravingArray.push({y:0,x:6-cravingArray.length })
                stimmungArray.push({y:0,x:6-stimmungArray.length })
                pflichtenArray.push({y:0,x:6-pflichtenArray.length })
                heuteStundenArray.push({y:0,x:6-heuteStundenArray.length })
            }

            if(userData.journal[yesterdayString]&&userData.journal[yesterdayString].morgenStunden){
                morgenStundenArray.push({y:userData.journal[yesterdayString].morgenStunden,x:6-morgenStundenArray.length })
            }else {
                morgenStundenArray.push({y:0,x:6-morgenStundenArray.length })
            }
            day.setDate(day.getDate()-1)
            yesterday.setDate(yesterday.getDate()-1)
        }
        amountArray.reverse()
        return {meditations:amountArray, minutes:minutesArray, dailyStress:dailyStressArray, craving: cravingArray, stimmung: stimmungArray, pflichten:pflichtenArray, heuteStunden: heuteStundenArray, morgenStunden: morgenStundenArray}
    }

   //Monatlicher Stress
    const getHistoryStress=()=>{
        const stressArray=[]
        var monthString=""
        const day=new Date()
        while(stressArray.length<6){
            monthString = day.toDateString()
            monthString=monthString[4]+monthString[5]+monthString[6]+monthString[11]+monthString[12]+monthString[13]+monthString[14]
            if(userData.progress.stressData[monthString]){
                stressArray.push({
                    stress:userData.progress.stressData[monthString].level,
                    month:day.getMonth()
                })
            }else{
                stressArray.push({
                    stress:0,
                    month:day.getMonth()
                })
            }
            day.setMonth(day.getMonth()-1)
        }
        stressArray.reverse() 
        return stressArray
    }

    const tagesÜbersetzer={0:"So", 1:"Mo", 2:"Di", 3:"Mi", 4:"Do", 5:"Fr", 6:"Sa"}
    const monatsÜbersetzer={0:"Jan", 1:"Feb", 2:"Mär", 3:"Apr", 4:"Mai", 5:"Jun", 6:"Jul", 7:"Aug", 8:"Sep", 9:"Okt", 10:"Nov", 11:"Dez"}

    const resize=(array)=>{
        for (var i=0; i< array.length; i++){
            array[i].y = array[i].y/4*maxValue
        }
        return array
    }

    return (
        <View>
            <View style={styles.stats}>
                <Text >Minuten: {""+getMeditation("minutes")}</Text>
            </View>
            <View style={styles.stats}>
                <Text >Anzahl: {""+getMeditation("amount")}</Text>
            </View>
        
            <View style={{flexDirection:"row"}}>
                <Chart
                    style={{ height:220, flex: 0.93, backgroundColor: '#eee'}}
                    xDomain={{ min: 0, max: 6 }}
                    yDomain={{ min: 0, max: maxValue }}
                    padding={{ left: 30, top: 10, bottom: 20, right: 20 }}
                >
                    <VerticalAxis tickCount={5} theme={{labels:{formatter:x=>x.toFixed(1)}}} />
                    <HorizontalAxis tickCount={7} theme={{labels:{formatter:x=>tagesÜbersetzer[(1+x+new Date().getDay())%7]}}}/>
                    {meditations&&<Line data={getData().meditations} smoothing="cubic-spline" theme={{ stroke: { color: colors[0], width: 3 } }} />}
                    {minutes&&<Line data={getData().minutes} smoothing="cubic-spline" theme={{ stroke: { color: colors[1], width: 3 } }} />}
                    {dailyStress&&<Line data={resize(getData().dailyStress)} smoothing="cubic-spline" theme={{ stroke: { color: colors[2], width: 3 } }} />}
                    {craving&&<Line data={resize(getData().craving)} smoothing="cubic-spline" theme={{ stroke: { color: colors[3], width: 3 } }} />}
                    {stimmung&&<Line data={resize(getData().stimmung)} smoothing="cubic-spline" theme={{ stroke: { color: colors[4], width: 3 } }} />}
                    {pflichten&&<Line data={resize(getData().pflichten)} smoothing="cubic-spline" theme={{ stroke: { color: colors[5], width: 3 } }} />}
                    {heuteStunden&&<Line data={getData().heuteStunden} smoothing="cubic-spline" theme={{ stroke: { color: colors[6], width: 3 } }} />}
                    {morgenStunden&&<Line data={getData().morgenStunden} smoothing="cubic-spline" theme={{ stroke: { color: colors[7], width: 3 } }} />}

                </Chart>

                <View style= {{flexDirection:"column", flex: 0.07, justifyContent:"space-between", marginBottom:15}}>
                    <Text>+ +</Text>
                    <Text>+</Text>
                    <Text>°</Text>
                    <Text>-</Text>
                    <Text>- -</Text>
                </View>
            </View>
            
            <View style={{flexDirection:"row", alignItems:"center"}}>
                <CheckBox value={meditations} onValueChange={(newValue) => changeMeditations(newValue)}/>
                <View style={{marginLeft:5, marginRight:5, height:10, width:10, borderRadius:100, backgroundColor:colors[0]}}/>
                <Text>Anzahl der Meditationen</Text>
            </View>
            <View style={{flexDirection:"row", alignItems:"center"}}>
                <CheckBox value={minutes} onValueChange={(newValue) => changeMinutes(newValue)}/>
                <View style={{marginLeft:5, marginRight:5, height:10, width:10, borderRadius:100, backgroundColor:colors[1]}}/>
                <Text>Meditierte Minuten</Text>
            </View>
            <View style={{flexDirection:"row", alignItems:"center"}}>
                <CheckBox value={stimmung} onValueChange={(newValue) => changeStimmung(newValue)}/>
                <View style={{marginLeft:5, marginRight:5, height:10, width:10, borderRadius:100, backgroundColor:colors[4]}}/>
                <Text>Stimmung</Text>
            </View>
            <View style={{flexDirection:"row", alignItems:"center"}}>
                <CheckBox value={dailyStress} onValueChange={(newValue) => changeDailyStress(newValue)}/>
                <View style={{marginLeft:5, marginRight:5, height:10, width:10, borderRadius:100, backgroundColor:colors[2]}}/>
                <Text>Stress (täglich)</Text>
            </View>
            <View style={{flexDirection:"row", alignItems:"center"}}>
                <CheckBox value={craving} onValueChange={(newValue) => changeCraving(newValue)}/>
                <View style={{marginLeft:5, marginRight:5, height:10, width:10, borderRadius:100, backgroundColor:colors[3]}}/>
                <Text>Craving</Text>
            </View>
            <View style={{flexDirection:"row", alignItems:"center"}}>
                <CheckBox value={pflichten} onValueChange={(newValue) => changePflichten(newValue)}/>
                <View style={{marginLeft:5, marginRight:5, height:10, width:10, borderRadius:100, backgroundColor:colors[5]}}/>
                <Text>Pflichterfüllung</Text>
            </View>
            <View style={{flexDirection:"row", alignItems:"center"}}>
                <CheckBox value={heuteStunden} onValueChange={(newValue) => changeHeuteStunden(newValue)}/>
                <View style={{marginLeft:5, marginRight:5, height:10, width:10, borderRadius:100, backgroundColor:colors[6]}}/>
                <Text>Tatsächliche Spielstunden</Text>
            </View>
            <View style={{flexDirection:"row", alignItems:"center"}}>
                <CheckBox value={morgenStunden} onValueChange={(newValue) => changeMorgenStunden(newValue)}/>
                <View style={{marginLeft:5, marginRight:5, height:10, width:10, borderRadius:100, backgroundColor:colors[7]}}/>
                <Text>Vorgenommene Spielstunden</Text>
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
    stats:{
        alignSelf:"center",
        width:150,
        margin:20

    }
  });
