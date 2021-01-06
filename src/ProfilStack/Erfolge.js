import React from 'react';
import { StyleSheet, Text, View, Button , FlatList, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {AppContext} from '../context.js';
import { useContext, useEffect } from 'react';
import { benchmarks } from '../benchmarks.js';

export const Erfolge = () => {
    const {userData, changeNewBenchmark, changeUserData, changeAppData, appData, currentUser} = useContext(AppContext)
    const userDataTemp={...userData}

    useEffect(()=>{
        check10()
    },[])

    const check10 =async()=>{
        if(userData.benchmarks.benchmarks10===0&&userData.benchmarks.benchmarksReached.length>=1){
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
            console.log(benchmark)
            benchmarks[benchmark].reached = userData.benchmarks.benchmarksReached.includes(benchmark)
            benchmarks[benchmark].key = benchmark
            array.push(benchmarks[benchmark])

        } 
        return array
    }

    const renderBenchmark = ({item}) => {
        const percent = ((userData.benchmarks[item.var]/item.goal)*100).toString() + "%"
        console.log(percent)
        return(
            <View style = {{flex:1, padding:10, margin:10, backgroundColor: "white"}}>
                <Text style = {item.reached?{color: "black"}:{color:"grey"}}>{item.title}</Text>
                <Text style = {item.reached?{color: "black"}:{color:"grey"}}>{item.description}</Text>
                <View style = {{height:12,borderWidth:1, borderColor:"black", borderRadius:100,}}>
                    <View style = {{maxWidth:"100%", minWidth: 3, width:percent, backgroundColor: "green", height: "100%", borderRadius:100}}></View>
                </View>
            </View>
        );
    }

    return (
        <View>
            <Text>Ich bin deine Erfolge!</Text>
            <FlatList
                    numColumns={2}
                    data={benchmarkArray()}
                    keyExtractor={(item, index)=>item.key}
                    renderItem={renderBenchmark}
                ></FlatList>
        </View>
    )
}