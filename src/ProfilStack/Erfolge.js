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
            <TouchableOpacity style ={{justifyContent:'space-between', flex:1, padding:10, margin:10, backgroundColor: "#46498280", borderRadius:8}} onPress={()=>changeModal(item.key)}>
                <Text style = {item.reached?{...styles.text, fontFamily:'Poppins_500Medium'}:{...styles.text, color:"#ffffff90"}}>{item.title}</Text>
                <View style = {{height:12, borderRadius:100, marginTop:15, backgroundColor:'#00000050'}}>
                    <View style={{maxWidth:"100%", minWidth: 3, width:percent, backgroundColor: "#89FFE3", height: "100%", borderRadius:100}}></View>
                </View>
            </TouchableOpacity>
        );
    }


    const percentage=(item)=>{
        if(item){return ((userData.benchmarks[item.var]/item.goal)*100).toString() + "%"}
        return null
    }
    return (
        <ImageBackground source={require('../../assets/Profil.png')} style={styles.imagebackground} imageStyle={{resizeMode:'stretch'}}>
            <View style={{flex:1}}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modal!=""}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style={{flex:0.5, justifyContent:"space-between"}}>
                                <Text style={{...styles.text, alignSelf:'center', textAlign:'center', fontSize:22}}>{benchmarks[modal]&&benchmarks[modal].title}</Text>
                                <Text style={{...styles.text, textAlign:'center', fontSize:16}}>{benchmarks[modal]&&benchmarks[modal].description}</Text>
                                <View style = {{height:12, backgroundColor:'#333', borderRadius:100,width:200, alignSelf:"center"}}>
                                    <View style = {{maxWidth:"100%", minWidth: 3, width:percentage(benchmarks[modal]), backgroundColor: "#89FFE3", height: "100%", borderRadius:100}}></View>
                                </View>
                            </View>
                            <View style={{flex:0.5, justifyContent:"flex-end"}}>
                                <TouchableOpacity  onPress={()=>changeModal("")}>
                                    <Text style={{...styles.text, fontSize:15, textDecorationLine:'underline'}}>Zurück</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                <View style={{flex:1}}>
                    <FlatList
                        numColumns={2}
                        data={benchmarkArray()}
                        keyExtractor={(item, index)=>item.key}
                        renderItem={renderBenchmark}
                        style={{width:"100%"}}
                    ></FlatList>
                    <View style={{height:60}} />
                </View>
            </View>
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
    text: {
        fontFamily: 'Poppins_400Regular',
        color:'#fff',
        fontSize:14,
        alignSelf:'center',
        textAlign: 'center'
    }
  });