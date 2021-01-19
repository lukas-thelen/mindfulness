import React from 'react';
import { StyleSheet, Text, View, Button, Switch, TextInput, TouchableOpacity, Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {AppContext} from '../context.js';
import { useContext, useEffect, useState } from 'react';
import DateTimePicker from "@react-native-community/datetimepicker"; 
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { FlatList } from 'react-native-gesture-handler';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

export const Einstellungen = ({navigation}) => {
const initTime = new Date()
initTime.setHours(18)
initTime.setMinutes(0)

const [notifications, changeNotifications] = useState(true);
const [timepicker, showTimepicker] = useState(false);
const [times, changeTimes] = useState([initTime]);
const [indexTime, changeIndexTime] = useState(0)
const [anzahl, changeAnzahl]=useState(1)

const {appData, userData, changeAppData, changeUserData, changeLoggedIn,changeCurrentUser} = useContext(AppContext)
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
        }),
    });

    useEffect(()=>{
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

    const setNotifications=async()=>{
        Notifications.cancelAllScheduledNotificationsAsync()
        if(notifications){
            for(var t=0;t<times.length;t++){
                if(Platform.OS === 'ios'){
                    const { status } = await Permissions.getAsync(
                        Permissions.NOTIFICATIONS
                      );
                      if (status !== 'granted') {
                        await Permissions.askAsync(Permissions.NOTIFICATIONS);
                      }
                    }
                    Notifications.scheduleNotificationAsync({
                        content: {
                          title: 'Ugrade Your Mind!',
                          body: "Hattest du heute schon die Zeit runterzukommen? Starte jetzt eine neue Übung.",
                        },
                        trigger: {
                            hour: times[t].getHours(), 
                            minute: times[t].getMinutes(), 
                            repeats: true
                        }
                    });
                
            }
    }
}


    const logout = async () => {
        try {
            Notifications.cancelAllScheduledNotificationsAsync()
            await AsyncStorage.removeItem('currentUser')
            changeLoggedIn(false)
            changeCurrentUser("")
        } catch (e) {
          console.log(e)
        }
      }

    const storeData = async ()=>{
        setNotifications()
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
                {Platform.OS === 'ios'?
                    <DateTimePickerModal
                    value={times[index]>0? times[index]:initTime}
                    isVisible={timepicker}
                    display="spinner"
                    mode="time"
                    onConfirm={handleConfirm}
                    onCancel={showTimepicker}
                  />:<View>{timepicker && <DateTimePicker
                    value = {times[index]>0? times[index]:initTime}
                    is24Hour={true}
                    display="spinner"
                    mode="time"
                    onChange={(event, value)=>handleConfirm(value)}              
                />}</View>
                }
                </View>
        )
    }

    return (
        <View style ={{flex:1}}>
            <View style= {styles.reihe}>
                <Text>Erinnerungen</Text>
                <Switch onValueChange={()=>{changeNotifications(!notifications)}} value={notifications}/>
            </View>

            {notifications&& <View style= {styles.reihe}>
                <Text>Anzahl</Text>
                <TextInput 
                    defaultValue={""+anzahl}

                    style={{ height: 20, borderColor: 'gray', borderWidth: 1, width:200, borderRadius:200, paddingLeft:10}}
                    keyboardType={'numeric'} onChangeText={number => onChangeAnzahl(number)}>
                </TextInput>
            </View>}

            {notifications&&
                <FlatList
                    data={times}
                    keyExtractor={(item, index)=>index.toString()}
                    renderItem={renderUhrzeit}
                ></FlatList>
            }
            <View style={{justifyContent:"flex-end", flex:1, marginBottom:20}}>
                <Button title="Speichern" onPress={()=>storeData()}></Button>
                {/*<Button title="Test2" onPress={async()=>{const test = await Notifications.getAllScheduledNotificationsAsync(); console.log(test)}}></Button>*/}
                <Button title="Konto-Einstellungen" onPress={()=>navigation.navigate("Konto-Informationen")}></Button>
                <Button title="Informationen über die App" onPress={()=>navigation.navigate("Informationen über die App")}></Button>
                <TouchableOpacity style={{alignItems:"center"}} onPress={() => logout() }> 
                    <Text>Abmelden</Text>
                </TouchableOpacity>
            </View>
            
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