import React from 'react';
import { StyleSheet, Text, View, Button, Switch, TextInput, TouchableOpacity, Platform, ImageBackground} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {AppContext} from '../context.js';
import { useContext, useEffect, useState } from 'react';
import DateTimePicker from "@react-native-community/datetimepicker"; 
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { FlatList } from 'react-native-gesture-handler';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

export const Einstellungen = ({navigation}) => {
const initTime = new Date()
initTime.setHours(18)
initTime.setMinutes(0)

const [notifications, changeNotifications] = useState(true);
const [timepicker, showTimepicker] = useState(false);
const [times, changeTimes] = useState([initTime]);
const [indexTime, changeIndexTime] = useState(0)
const [anzahl, changeAnzahl]=useState(1)
const [hinweis, zeigeHinweis]=useState(false)

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
        if(number>5){
            number=5
            zeigeHinweis(true)
        }else{zeigeHinweis(false)}
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
                <Text style={styles.text}>{index+1}. Uhrzeit:  </Text>
                <TouchableOpacity onPress={()=>{showTimepicker(true); changeIndexTime(index)}}>
                    <Text style={styles.text}>{item!=null ? item.getHours().toString()+":"+minutes+" Uhr":"(hier eingeben)"}</Text>
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
        <ImageBackground source={require('../../assets/Profil.png')} style={styles.imagebackground}>

                <View style={{flex:0.6, paddingTop:40, alignItems:'center'}}>
                    <View style= {styles.reihe}>
                        <Ionicons name="notifications-outline" size={16} color="white" />
                        <Text style={{...styles.text, marginLeft:4}}>Erinnerungen: </Text>
                        <Switch 
                            trackColor={{ false: "#3D3D3D", true: "#80DEE4" }}
                            ios_backgroundColor="#3D3D3D"
                            thumbColor='#fff'
                            onValueChange={()=>{changeNotifications(!notifications)}} value={notifications}
                        />
                    </View>

                    {notifications&& <View style= {styles.reihe}>
                        <Text style={styles.text}>Anzahl: </Text>
                        <TextInput 
                            defaultValue={""+anzahl}
                            style={{color: '#fff', paddingVertical:6, paddingHorizontal:20, borderColor:'#fff', borderWidth: 1, borderRadius:10, textAlign:'center', marginRight:5}}
                            keyboardType={'numeric'} onChangeText={number => {onChangeAnzahl(number)}}>
                        </TextInput>
                        {hinweis&&<Text style={{color:"red", fontWeight:"bold"}}>!</Text>}
                    </View>}

                    {notifications&& <View style={{height:'50%'}}>
                        <FlatList
                            data={times}
                            keyExtractor={(item, index)=>index.toString()}
                            renderItem={renderUhrzeit}
                        ></FlatList>
                    </View>}

                    <View style={{marginTop:10}}>
                        <TouchableOpacity style={styles.button} onPress={()=>storeData()}>
                            <LinearGradient
                                colors={['#D476D5', '#C77BD8', '#8F92E3']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 2 }}
                                style={styles.gradient}>
                                    <Text style={styles.text}>Speichern</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{flex:0.3, width:'90%', alignItems:'center'}}>
                    <View style={styles.background}>
                        {/*<Button title="Test2" onPress={async()=>{const test = await Notifications.getAllScheduledNotificationsAsync(); console.log(test)}}></Button>*/}
                        <TouchableOpacity style={styles.item} onPress={()=>navigation.navigate("Konto-Informationen")}>
                         <Ionicons name="finger-print-outline" size={16} color="white" />
                            <Text style={{...styles.text, marginLeft:4}}>Account</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{...styles.item, flexDirection:'row'}} onPress={()=>navigation.navigate("Informationen über die App")}>
                            <Ionicons name="phone-portrait-outline" size={16} color="white" />
                            <Text style={{...styles.text, marginLeft:4}}>Informationen über die App</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{flex:0.1}}>
                <   TouchableOpacity style={{alignItems:"center", flexDirection:'row'}} onPress={() => logout() }> 
                        <Ionicons name="log-out-outline" size={24} color="white" />
                        <Text style={{color:'#fff', fontSize:18, textDecorationLine:'underline', marginLeft:5}}>Abmelden</Text>
                    </TouchableOpacity>
                </View>
                
                <View style={{height:60}}/>
        </ImageBackground>
    )
}

//Styles
const styles = StyleSheet.create({
    item: {
        backgroundColor: '#464982',
        borderRadius: 10,
        height: 50,
        marginVertical: 4,
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        flexDirection:'row'
    },
    reihe: {
        flexDirection:"row",
        alignItems: "center", 
        justifyContent: "center",
        marginVertical: 10,
    },
    imagebackground: {
        flex: 1,
        alignItems:'center'
    },
    background: {
        backgroundColor: "#0F113A90",
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical:10,
        width: '100%',
        marginBottom:20,
    },
    text: {
        color: '#fff',
        fontSize: 16,
    },
    gradient: {
        alignItems: 'center',
        borderRadius: 14,
        paddingVertical: 5,
        paddingHorizontal: 30,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {width:0, height:4},
        shadowRadius: 4,
        shadowOpacity: 0.4,
    },
  });