import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CheckBox } from 'react-native-elements'

import {AppContext} from '../context.js';
import { useContext, useEffect, useState } from 'react';
import { LineChart, Grid, XAxis, YAxis, BarChart } from 'react-native-svg-charts'
import { Chart, VerticalAxis, HorizontalAxis, Line } from 'react-native-responsive-linechart'
import { ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';



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
    const [showMonthly, changeShowMonthly] = useState(false)
    const {userData, cahngeUserData, appData, changeAppData}=useContext(AppContext)
    const contentInset = { top: 20, bottom: 20 }
    const colors = ["#9400d3", "#8F92E3", "#fe5d9f", "#D476D5",'#ffc6ff', "#6495ED", "#acecf7", "#84dcc6"]

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
            if(userData.journal[dayString]&&userData.journal[dayString].journalChanged){
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
                    y:userData.progress.stressData[monthString].level,
                    x:11-stressArray.length
                })
            }else{
                stressArray.push({
                    y:0,
                    x:11-stressArray.length
                })
            }
            day.setMonth(day.getMonth()-1)
        }
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
        <ImageBackground source={require('../../assets/Profil.png')} style={styles.imagebackground} imageStyle={{resizeMode:'stretch'}}>
        
            <View style={{flex:0.15, justifyContent:'center', alignSelf:'center'}}>
                <View style={styles.streak}>
                    <Text style={{...styles.text, fontSize:14}}>Anzahl Übungen: {""+getMeditation("amount")}</Text>
                    <Text style={{...styles.text, marginLeft:'auto', fontSize:14}}>Minuten: {""+getMeditation("minutes")}</Text>
                </View>
            </View>

            <View style={{width:"90%", alignSelf:"center", flex:0.85}}>
                <View style={{flexDirection:"row", flex:0.07}}> 
                <TouchableOpacity style={!showMonthly?{...styles.tab, backgroundColor:"#464982"}:{...styles.tab, backgroundColor:"#46498290"}} onPress={()=>changeShowMonthly(false)}><Text style={styles.text}>täglich</Text></TouchableOpacity>
                <TouchableOpacity style={showMonthly?{...styles.tab, backgroundColor:"#464982"}:{...styles.tab, backgroundColor:"#46498290"}} onPress={()=>changeShowMonthly(true)}><Text style={styles.text}>monatlich</Text></TouchableOpacity>
                </View>
                
                {showMonthly?
                <LinearGradient
                colors={['#464982', '#0F113A90']}
                start={{ x: 1, y: 0 }}
                end={{ x: 0.9, y: 0.5}}
                style={styles.chartBackground}>
                <View style={{flex:1}}>
                    <View style={{flexShrink:1}}>
                        <Chart
                                style={{ height:220}}
                                xDomain={{ min: 6, max: 11 }}
                                yDomain={{ min: 0, max: 50 }}
                                padding={{ left: 30, top: 10, bottom: 20, right: 20 }}
                            >
                                <VerticalAxis tickCount={5} theme={{labels:{formatter:x=>x.toFixed(1), label:{color: '#fff', fontFamily:'Poppins_400Regular'}}}} />
                                <HorizontalAxis tickCount={6} theme={{labels:{formatter:x=>monatsÜbersetzer[(1+x+new Date().getMonth())%12], label:{color: '#fff', fontFamily:'Poppins_400Regular'}}}}/>
                                <Line data={getHistoryStress()} smoothing="none" theme={{ stroke: { color: colors[3], width: 4 } }} />
                        </Chart>
                    </View>
                    <View style={{flexDirection:"row", alignItems:"center", marginTop:20, marginLeft:10}}>
                            <View style={{marginLeft:5, marginRight:10, height:10, width:10, borderRadius:100, backgroundColor:colors[3]}}/>
                            <Text style={styles.text}>Stress</Text>
                    </View>
                </View>
                </LinearGradient>
                :
                <LinearGradient
                colors={['#464982', '#0F113A90']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0.2, y: 0.5}}
                style={styles.chartBackground}>
                <View style={{flex:1}}>
                    <View style={{flexDirection:"row", flexShrink:1}}>
                        <Chart
                            style={{ height:220, flex: 0.93}}
                            xDomain={{ min: 0, max: 6 }}
                            yDomain={{ min: 0, max: maxValue }}
                            padding={{ left: 30, top: 10, bottom: 20, right: 5 }}
                        >
                            <VerticalAxis tickCount={5} theme={{labels:{formatter:x=>x.toFixed(1), label:{color: '#fff', fontFamily: 'Poppins_400Regular'}}}} />
                            <HorizontalAxis tickCount={7} theme={{labels:{formatter:x=>tagesÜbersetzer[(1+x+new Date().getDay())%7], label:{color: '#fff', fontFamily: 'Poppins_400Regular'}}}}/>
                            {meditations&&<Line data={getData().meditations} smoothing="cubic-spline" theme={{ stroke: { color: colors[0], width: 3 } }} />}
                            {minutes&&<Line data={getData().minutes} smoothing="cubic-spline" theme={{ stroke: { color: colors[1], width: 3 } }} />}
                            {stimmung&&<Line data={resize(getData().stimmung)} smoothing="cubic-spline" theme={{ stroke: { color: colors[2], width: 3 } }} />}
                            {dailyStress&&<Line data={resize(getData().dailyStress)} smoothing="cubic-spline" theme={{ stroke: { color: colors[3], width: 3 } }} />}
                            {craving&&<Line data={resize(getData().craving)} smoothing="cubic-spline" theme={{ stroke: { color: colors[4], width: 3 } }} />}
                            {pflichten&&<Line data={resize(getData().pflichten)} smoothing="cubic-spline" theme={{ stroke: { color: colors[5], width: 3 } }} />}
                            {heuteStunden&&<Line data={getData().heuteStunden} smoothing="cubic-spline" theme={{ stroke: { color: colors[6], width: 3 } }} />}
                            {morgenStunden&&<Line data={getData().morgenStunden} smoothing="cubic-spline" theme={{ stroke: { color: colors[7], width: 3 } }} />}

                        </Chart>

                        <View style= {{flexDirection:"column", flex: 0.07, justifyContent:"space-between", marginBottom:12}}>
                            <Text style={{color:'#fff'}}>+ +</Text>
                            <Text style={{color:'#fff'}}>+</Text>
                            <Text style={{color:'#fff'}}>°</Text>
                            <Text style={{color:'#fff'}}>-</Text>
                            <Text style={{color:'#fff'}}>- -</Text>
                        </View>
                    </View>
                    <ScrollView style={{flex:0.5}}>
                        <View style={{flexDirection:"row", alignItems:"center"}}>
                            <CheckBox uncheckedColor={'#ccc'} checkedColor={'#89FFF1'} checked={meditations} onPress={() => changeMeditations(!meditations)}/>
                            <View style={{marginRight:10, height:10, width:10, borderRadius:100, backgroundColor:colors[0]}}/>
                            <Text style={styles.text}>Anzahl der Meditationen</Text>
                        </View>
                        <View style={{flexDirection:"row", alignItems:"center"}}>
                            <CheckBox uncheckedColor={'#ccc'} checkedColor={'#89FFF1'} checked={minutes} onPress={() => changeMinutes(!minutes)}/>
                            <View style={{marginRight:10, height:10, width:10, borderRadius:100, backgroundColor:colors[1]}}/>
                            <Text style={styles.text}>Meditierte Minuten</Text>
                        </View>
                        <View style={{flexDirection:"row", alignItems:"center"}}>
                            <CheckBox uncheckedColor={'#ccc'} checkedColor={'#89FFF1'} checked={stimmung} onPress={() => changeStimmung(!stimmung)}/>
                            <View style={{marginRight:10, height:10, width:10, borderRadius:100, backgroundColor:colors[2]}}/>
                            <Text style={styles.text}>Stimmung</Text>
                        </View>
                        <View style={{flexDirection:"row", alignItems:"center"}}>
                            <CheckBox uncheckedColor={'#ccc'} checkedColor={'#89FFF1'} checked={dailyStress} onPress={() => changeDailyStress(!dailyStress)}/>
                            <View style={{marginRight:10, height:10, width:10, borderRadius:100, backgroundColor:colors[3]}}/>
                            <Text style={styles.text}>Stress (täglich)</Text>
                        </View>
                        <View style={{flexDirection:"row", alignItems:"center"}}>
                            <CheckBox uncheckedColor={'#ccc'} checkedColor={'#89FFF1'} checked={craving} onPress={() => changeCraving(!craving)}/>
                            <View style={{marginRight:10, height:10, width:10, borderRadius:100, backgroundColor:colors[4]}}/>
                            <Text style={styles.text}>Craving</Text>
                        </View>
                        <View style={{flexDirection:"row", alignItems:"center"}}>
                            <CheckBox uncheckedColor={'#ccc'} checkedColor={'#89FFF1'} checked={pflichten} onPress={() => changePflichten(!pflichten)}/>
                            <View style={{marginRight:10, height:10, width:10, borderRadius:100, backgroundColor:colors[5]}}/>
                            <Text style={styles.text}>Pflichterfüllung</Text>
                        </View>
                        <View style={{flexDirection:"row", alignItems:"center"}}>
                            <CheckBox uncheckedColor={'#ccc'} checkedColor={'#89FFF1'} checked={heuteStunden} onPress={() => changeHeuteStunden(!heuteStunden)}/>
                            <View style={{marginRight:10, height:10, width:10, borderRadius:100, backgroundColor:colors[6]}}/>
                            <Text style={styles.text}>Tatsächliche Spielstunden</Text>
                        </View>
                        <View style={{flexDirection:"row", alignItems:"center"}}>
                            <CheckBox uncheckedColor={'#ccc'} checkedColor={'#89FFF1'} checked={morgenStunden} onPress={()=>changeMorgenStunden(!morgenStunden)}/>
                            <View style={{marginRight:10, height:10, width:10, borderRadius:100, backgroundColor:colors[7]}}/>
                            <Text style={styles.text}>Vorgenommene Spielstunden</Text>
                        </View>
                    </ScrollView>
                </View>
                </LinearGradient>}
                
            </View>
            <View style={{height:60}}/>
        
        </ImageBackground>
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
        margin:10
    },
    tab:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
    },
    chartBackground:{
        flex:0.93,
        paddingTop:10,
        paddingHorizontal:10
    },
    imagebackground: {
        flexGrow: 1,
        width:'100%'
    },
    text: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 16,
        color:'#fff'
    },
    streak: {
        backgroundColor: '#464982',
        borderRadius: 10,
        height: 50,
        marginVertical: 4,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 15,
        width: '90%',
        flexDirection: 'row',
    },
  });
