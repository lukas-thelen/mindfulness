import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, TouchableOpacity, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

import {AppContext} from '../context.js';
import { useContext, useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

export const KontoInfos = () => {
    const {appData, userData, changeAppData, changeUserData, changeLoggedIn,changeCurrentUser} = useContext(AppContext)
    const [eMail, changeEMail] = useState("")
    const [altesPasswort, changeAltesPasswort] = useState("")
    const [neuesPasswort, changeNeuesPasswort] = useState("")
    const [neuesPasswort2, changeNeuesPasswort2] = useState("")
    var appDataTemp = {...appData}


    // Löscht die Account-Daten aus dem Local Storage
    const afterConfirm = async() => {
        Notifications.cancelAllScheduledNotificationsAsync()
        delete appDataTemp[userData.data.eMail]
        console.log(appDataTemp)
        changeCurrentUser("")
        changeAppData(appDataTemp)
        const jsonvalue=JSON.stringify(appDataTemp)
        await AsyncStorage.setItem('appData', jsonvalue)

        changeLoggedIn(false)
    }


     // Lässt bestätigen, ob die Löschung des Accounts wirklich durchgeführt werden soll
    const deleteAccount = async() => {
        Alert.alert(
            'Achtung.',
            'Willst du deinen Account wirklich löschen?',
    
            // Wenn "Löschen" betätigt wird, werden die AccountDaten gelöscht
            [{ text: 'Löschen', onPress: () => afterConfirm() } , { text: 'Abbrechen' }],
            { cancelable: true }
          );
    }


    // Ändert die Email-Adresse des Nutzers
    const eMailBestätigen = async () => {
        console.log(appDataTemp)
        delete appDataTemp[userData.data.eMail]
        console.log(appDataTemp)
        userData.data.eMail=eMail
        changeUserData(userData)
        appDataTemp[userData.data.eMail]=userData
        changeAppData(appDataTemp)
        const jsonvalue=JSON.stringify(appDataTemp)
        await AsyncStorage.setItem('appData', jsonvalue)
        changeEMail("")
    }

    // Ändert das Passwort des Nutzers nach Eingabe des Alten und zweifacher Eingabe des (identisch) Neuen
    const passwortBestätigen = async () => {
        console.log(userData.data.password)
        if (altesPasswort === userData.data.password){
            
            if (neuesPasswort === neuesPasswort2){
                if(neuesPasswort.length>5){
                    userData.data.password=neuesPasswort
                    changeUserData(userData)
                    appDataTemp[userData.data.eMail]=userData
                    changeAppData(appDataTemp)
                    const jsonvalue=JSON.stringify(appDataTemp)
                    await AsyncStorage.setItem('appData', jsonvalue)

                    changeAltesPasswort("")
                    changeNeuesPasswort("")
                    changeNeuesPasswort2("")

                    Alert.alert(
                        'Passwort wurde geändert.',
                        '',

                        [{ text: 'Ok'}],
                        { cancelable: false }
                    );
                }else{
                    Alert.alert(
                        'Zu unsicher!',
                        'Dein Passwort muss mehr als 5 Zeichen haben!',
    
                        [{ text: 'Ok'}],
                        { cancelable: false }
                      );
                }
            } else {

                Alert.alert(
                    '"Neues Passwort" entspricht nicht "Passwort bestätigen".',
                    'Versuche es erneut!',

                    [{ text: 'Ok'}],
                    { cancelable: false }
                  );
            }
        } else {
            Alert.alert(
                'Dein altes Passwort wurde nicht korrekt eingegeben.',
                'Versuche es erneut!',

                [{ text: 'Ok'}],
                { cancelable: false }
              );
        }
    }


    return (
        <ImageBackground source={require('../../assets/Profil.png')} style={styles.imagebackground}>
            <View  style = {styles.container}>
                <Text style={{color:'#fff', padding:30, fontSize: 35}}>Mein Konto!</Text>

                <Text style={{color:'#fff'}}>E-Mail: {userData.data.eMail}</Text>

                <View style = {styles.reihe}>
                <Text style={{color:'#fff'}}>Neue E-Mail</Text>
                    <TextInput style={{ height: 20, borderColor: 'gray', borderWidth: 1, width:200, borderRadius:200, paddingLeft:10}}
                                onChangeText={eMail => changeEMail(eMail)} value={eMail}></TextInput>
                </View>
                <View>
                        <TouchableOpacity style={styles.button} onPress={()=>storeData()}>
                            <LinearGradient
                                colors={['#D476D5', '#C77BD8', '#8F92E3']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 2 }}
                                style={styles.gradient}>
                                    <Text style={styles.text}>Bestätigen</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>

                {/*<Button title="Bestätigen" onPress={()=>eMailBestätigen()}></Button>*/}

                <View style={styles.trennlinie}/>


                <View style = {styles.reihe}>
                    <Text style={{color:'#fff'}}>Altes Passwort</Text>
                    <TextInput style={{ height: 20, borderColor: 'gray', borderWidth: 1, width:200, borderRadius:200, paddingLeft:10}}
                                onChangeText={passwort => changeAltesPasswort(passwort)} value={altesPasswort}></TextInput>
                </View>

                <View style = {styles.reihe}>
                    <Text style={{color:'#fff'}}>Neues Passwort:</Text>
                    <TextInput style={{ height: 20, borderColor: 'gray', borderWidth: 1, width:200, borderRadius:200, paddingLeft:10}}
                                onChangeText={passwort => changeNeuesPasswort(passwort)} value={neuesPasswort}></TextInput>
                </View>

                <View style = {styles.reihe}>
                    <Text style={{color:'#fff'}}>Neues Passwort bestätigen:</Text>
                    <TextInput style={{ height: 20, borderColor: 'gray', borderWidth: 1, width:200, borderRadius:200, paddingLeft:10}}
                                onChangeText={passwort => changeNeuesPasswort2(passwort)} value={neuesPasswort2}></TextInput>
                </View>

                <View>
                        <TouchableOpacity style={styles.button} onPress={()=>storeData()}>
                            <LinearGradient
                                colors={['#D476D5', '#C77BD8', '#8F92E3']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 2 }}
                                style={styles.gradient}>
                                    <Text style={styles.text}>Bestätigen</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                {/*<Button title="Bestätigen" onPress={()=>passwortBestätigen()}></Button>*/}

                <View style={styles.trennlinie}/>

                <TouchableOpacity onPress={()=>{deleteAccount()}}>
                        <Text style={{color:'#fff'}} >Konto löschen</Text>
                    </TouchableOpacity>
            </View>
         </ImageBackground>
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

    container: {
        alignItems: "center"
        ,

    },

    trennlinie:{
        height:1,
        width:"100%",
        backgroundColor:"black",
        marginBottom:10,
        marginTop:10
    },
    background: {
        backgroundColor: "#0F113A90",
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical:10,
    },
    
    imagebackground:{
        flex: 1,
        alignItems:'center'
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
        padding: 20,
    },

  });