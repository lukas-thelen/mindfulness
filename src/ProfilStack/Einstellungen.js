import React from 'react';
import { StyleSheet, Text, View, Button, Switch, TextInput, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {AppContext} from '../context.js';
import { useContext, useEffect, useState } from 'react';
import DateTimePickerModal from "@react-native-community/datetimepicker"; 
import { FlatList } from 'react-native-gesture-handler';

export const Einstellungen = () => {
const initTime = new Date()
initTime.setHours(18)
initTime.setMinutes(0)

const [notifications, changeNotifications] = useState(true);
const [timepicker, showTimepicker] = useState(false);
const [times, changeTimes] = useState([initTime]);
const [indexTime, changeIndexTime] = useState(0)
const [anzahl, changeAnzahl]=useState(1)

const {appData, userData, changeAppData, changeUserData} = useContext(AppContext)

    useEffect(()=>{
        console.log(userData.data.notificationTimes)
        if(userData.data.notificationTimes){
            var temp = []
            for (var y = 0; y < userData.data.notificationTimes.length; y++){
                temp.push(new Date(userData.data.notificationTimes[y]))
            }
            changeTimes(temp)
            changeNotifications(userData.data.notifications)
            changeAnzahl(userData.data.notificationTimes.length)

        }
    },[])

    const storeData = async ()=>{
        userData.data.notifications=notifications
        userData.data.notificationTimes=times
        changeUserData(userData)
        appData[userData.data.eMail]=userData
        changeAppData(appData)
        const jsonvalue=JSON.stringify(appData)
        await AsyncStorage.setItem('appData', jsonvalue)
    }

    const onChangeAnzahl = (number) =>{
        number = parseInt(number)
        if (number >0){
            changeAnzahl(number)
            const timesTemp = [...times]
            const chosenAnzahl = times.length
        if (number < chosenAnzahl){
            changeTimes(timesTemp.slice(0,number))
        } else if (number > chosenAnzahl){
            for (i = chosenAnzahl; i < number; i++){
                timesTemp.push(null)
            }
            changeTimes(timesTemp)
        }
        }

    }

    const handleConfirm =(zeit)=>{
        showTimepicker(!timepicker)
        const timesTemp=[...times]
        timesTemp[indexTime]=zeit
        changeTimes(timesTemp)
        console.log(zeit)

    }

    const renderUhrzeit = ({item, index}) =>{
        if(item!=null){
            var minutes = item.getMinutes()
            if (minutes<10){
                minutes="0"+minutes.toString()
            }
        }
        return(
            <View style= {styles.reihe}>
                <Text>{index+1}. Uhrzeit:  </Text>
                <TouchableOpacity onPress={()=>{showTimepicker(true); changeIndexTime(index)}}>
                    <Text>{item!=null ? item.getHours().toString()+":"+minutes+" Uhr":"hier eingeben"}</Text>
                </TouchableOpacity>
                {timepicker && <DateTimePickerModal
                    value = {times[index]>0? times[index]:initTime}
                    is24Hour={true}
                    display="spinner"
                    mode="time"
                    onChange={(event, value)=>handleConfirm(value)}              
                />}
                </View>
        )
    }

    return (
        <View style ={{flex:1}}>
            <Text>Ich bin deine Einstellungen!{timepicker?"True":"False"}</Text>
            <View style= {styles.reihe}>
                <Text>Erinnerungen</Text>
                <Switch onValueChange={()=>{changeNotifications(!notifications)}} value={notifications}/>
            </View>

            {notifications&& <View style= {styles.reihe}>
                <Text>Anzahl</Text>
                <TextInput 
                    style={{ height: 20, borderColor: 'gray', borderWidth: 1, width:200, borderRadius:200, paddingLeft:10}}
                    keyboardType={'numeric'} onChangeText={number => onChangeAnzahl(number)}>
                </TextInput>
            </View>}

            {notifications&&
                <FlatList
                    data={times}
                    keyExtractor={(item, index)=>index.toString()}
                    renderItem={renderUhrzeit}
                ></FlatList>}

                <Button title="Speichern" onPress={()=>storeData()}></Button>
            
        </View>
    )
}

//Styles
const styles = StyleSheet.create({
    reihe: {
        //flex:1,
        flexDirection:"row",
        alignItems: "flex-start", 
        justifyContent: "center",
    },

  });