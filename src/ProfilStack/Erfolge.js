import React from 'react';
import { StyleSheet, Text, View, Button , FlatList, TouchableOpacity, Modal, ImageBackground} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {AppContext} from '../context.js';
import { useContext, useEffect, useState } from 'react';
import { benchmarks } from '../benchmarks.js';

export const Erfolge = () => {
    const [modal, changeModal]=useState("")
    const {userData, changeNewBenchmark, changeUserData, changeAppData, appData, currentUser} = useContext(AppContext)
    const userDataTemp={...userData}

    useEffect(()=>{
        check10()
    },[])

    const check10 =async()=>{
        if(userData.benchmarks.benchmarks10===0&&userData.benchmarks.benchmarksReached.length>=10){
            userDataTemp.benchmarks.benchmarks10=1
            userDataTemp.benchmarks.benchmarksReached=userDataTemp.benchmarks.benchmarksReached.concat(["xErfolge"])
            changeNewBenchmark(["xErfolge"])
            changeUserData(userDataTemp)
            appData[currentUser]=userDataTemp
            changeAppData(appData)
            const jsonValue = JSON.stringify(appData)
            await AsyncStorage.setItem('appData', jsonValue)
        }
    }

    const benchmarkArray = () =>{
        const array = []
        for (benchmark in benchmarks) {
            benchmarks[benchmark].reached = userData.benchmarks.benchmarksReached.includes(benchmark)
            benchmarks[benchmark].key = benchmark
            array.push(benchmarks[benchmark])

        } 
        return array
    }

    const renderBenchmark = ({item}) => {
        const percent = ((userData.benchmarks[item.var]/item.goal)*100).toString() + "%"
        return(
            <TouchableOpacity onPress={()=>changeModal(item.key)}style = {{flex:1, padding:10, margin:10, backgroundColor: "#0F113A90"}}>
                <Text style = {item.reached?{color: "black"}:{color:"white"}}>{item.title}</Text>
                <View style = {{height:12,borderWidth:1, borderColor:"black", borderRadius:100, marginTop:15}}>
                    <View style = {{maxWidth:"100%", minWidth: 3, width:percent, backgroundColor: "#89FFE3", height: "100%", borderRadius:100}}></View>
                </View>
            </TouchableOpacity>
        );
    }


    const percentage=(item)=>{
        if(item){return ((userData.benchmarks[item.var]/item.goal)*100).toString() + "%"}
        return null
    }
    return (
        <ImageBackground source={require('../../assets/Profil.png')} style={styles.imagebackground}>
            <View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modal!=""}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style={{flex:0.3, justifyContent:"space-between"}}>
                                <Text style={{color:"white", fontSize:22}}>{benchmarks[modal]&&benchmarks[modal].title}</Text>
                                <Text style={{color:"white"}}>{benchmarks[modal]&&benchmarks[modal].description}</Text>
                                <View style = {{height:12,borderWidth:1, borderColor:"black", borderRadius:100,width:200, alignSelf:"center"}}>
                                    <View style = {{maxWidth:"100%", minWidth: 3, width:percentage(benchmarks[modal]), backgroundColor: "#89FFE3", height: "100%", borderRadius:100}}></View>
                                </View>
                            </View>
                            <View style={{flex:0.7, justifyContent:"flex-end"}}>
                                <TouchableOpacity title="zurück" onPress={()=>changeModal("")}>
                                    <Text style={{color:"white"}}>Zurück</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                <FlatList
                        numColumns={2}
                        data={benchmarkArray()}
                        keyExtractor={(item, index)=>item.key}
                        renderItem={renderBenchmark}
                        style={{width:"100%"}}
                    ></FlatList>
            </View>
            <View style={{height:60}}/>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    pagewrap:{
      width: '100%',
      height: '100%'
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    modalView: {
        backgroundColor: '#0F113A',
        width: '90%',
        height:"60%",
        borderColor: '#8F92E3',
        borderWidth: 1,
        borderRadius: 15,
        borderRadius: 15,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {width:0, height:4},
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 5,
        justifyContent:"space-between"
    },
    imagebackground: {
        flex: 1,
        
    },
  });