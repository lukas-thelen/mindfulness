import React from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from '@react-native-community/checkbox';

import {AppContext} from '../context.js';
import { useContext, useEffect, useState } from 'react';
import { LineChart, Grid, XAxis, YAxis, BarChart } from 'react-native-svg-charts'
import { Chart, VerticalAxis, HorizontalAxis, Line } from 'react-native-responsive-linechart'



export const Statistiken = () => {
    const [typeOfChart, changeTypeOfChart] =useState("meditations")
    const [showStress, changeShowStress] =useState(false)
    const [stress, changeStress] =useState(false)
    const [meditations, changeMeditations] =useState(true)
    const [minutes, changeMinutes] =useState(false)
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

    const getData=()=>{
        const amountArray=[]
        const minutesArray=[]
        var dayString=""
        const day=new Date()
        while(amountArray.length<7){
            dayString=day.toDateString()
            if(userData.journal[dayString]&&userData.journal[dayString].meditations){
                amountArray.push({y:userData.journal[dayString].meditations,x:6-amountArray.length})
                minutesArray.push({y:userData.journal[dayString].meditationMinutes,x:6-minutesArray.length })
            }else{
                amountArray.push({y:0,x:6-amountArray.length})
                minutesArray.push({y:0,x:6-minutesArray.length})
            }
            day.setDate(day.getDate()-1)
        }
        amountArray.reverse()
        return {meditations:amountArray, minutes:minutesArray}
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

    return (
        <View>
            <View style={styles.stats}>
                <Text >Minuten: {""+getMeditation("minutes")}</Text>
            </View>
            <View style={styles.stats}>
                <Text >Anzahl: {""+getMeditation("amount")}</Text>
            </View>
            <Chart
                style={{ height:220, width: '100%', backgroundColor: '#eee'}}
                xDomain={{ min: 0, max: 6 }}
                yDomain={{ min: 0, max: 20 }}
                padding={{ left: 30, top: 10, bottom: 20, right: 20 }}
            >
                <VerticalAxis tickValues={[0, 4, 8, 12, 16, 20]} />
                <HorizontalAxis tickCount={7} theme={{labels:{formatter:x=>tagesÜbersetzer[(1+x+new Date().getDay())%7]}}}/>
                {meditations&&<Line data={getData().meditations} smoothing="none" theme={{ stroke: { color: 'blue', width: 1 } }} />}
                {minutes&&<Line data={getData().minutes} smoothing="none" theme={{ stroke: { color: 'red', width: 1 } }} />}
            </Chart>
            <View style={{flexDirection:"row", alignItems:"center"}}>
                <CheckBox value={meditations} onValueChange={(newValue) => changeMeditations(newValue)}/>
                <Text>Anzahl der Meditationen</Text>
            </View>
            <View style={{flexDirection:"row", alignItems:"center"}}>
                <CheckBox value={minutes} onValueChange={(newValue) => changeMinutes(newValue)}/>
                <Text>Meditierte Minuten</Text>
            </View>
            {/*{!showStress?<View style={{ flexDirection: 'row', display: "flex" }}>
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
                </View>:
                <View style={{ flexDirection: 'row', display: "flex" }}>
                    <YAxis
                        data={getHistoryStress()}
                        yAccessor={({item})=>item.stress}
                        contentInset={contentInset}
                        max={50}
                        svg={{
                            fill: 'grey',
                            fontSize: 10,
                        }}
                        numberOfTicks={10}
                        formatLabel={(value) => `${value}`}
                        style={{ flex: 0.1, marginBottom: 15 }}
                    />
                    <View style={{ flex: 0.8 }}>
                        <BarChart
                            yMax={50}
                            style={{ height: 200}}
                            data={getHistoryStress()}
                            yAccessor={({item})=>item.stress}
                            svg={{ fill:"rgb(134, 65, 244)" }}
                            contentInset={{left: 10, right: 10, top:20, bottom:20}}
                            spacingInner={0.3}
                        >
                            <Grid />
                        </BarChart>
                    
                    <XAxis
                            style={{ marginHorizontal: -10}}
                            data={getHistoryStress()}
                            formatLabel={(index, value) => monatsÜbersetzer[getHistoryStress()[index].month]}
                            contentInset={{ left: 40, right: 40 }}
                            svg={{ fontSize: 10, fill: 'black' }}
                        />
                    </View>
                    </View>}
                <View style={styles.reihe}>
                    <Button title="Minuten"disabled={typeOfChart==="minutes"&&!showStress&&true}onPress={()=>{changeTypeOfChart("minutes");changeShowStress(false)}}></Button>
                    <Button title="Anzahl"disabled={typeOfChart==="meditations"&&!showStress&&true}onPress={()=>{changeTypeOfChart("meditations");changeShowStress(false)}}></Button>
                    <Button title="Stress"disabled={showStress&&true}onPress={()=>{changeShowStress(true)}}></Button>
                </View>*/}
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
