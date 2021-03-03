import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, TouchableOpacity, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

import {AppContext} from '../context.js';
import { useContext, useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

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
        <ImageBackground source={require('../../assets/Profil.png')} style={styles.imagebackground} imageStyle={{resizeMode:'stretch'}}>
            
            <View style={{flex:0.4, alignItems:'center', justifyContent:'center', width:'100%'}}>
                <View style = {styles.reihe}>
                    <Text style={styles.text}>Username: </Text>
                    <Text style={{...styles.text, width:'50%'}}>{userData.data.eMail}</Text>
                </View>

                <View style = {styles.reihe}>
                    <Text style={styles.text}>Neuer Username: </Text>
                        <TextInput style={styles.textInput}
                                    onChangeText={eMail => changeEMail(eMail)} value={eMail}></TextInput>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.button} onPress={()=>storeData()}>
                            <LinearGradient
                                colors={['#D476D5', '#C77BD8', '#8F92E3']}
                                start={{ x: 0, y: 0.4 }}
                                end={{ x: 0, y: 1 }}
                                style={styles.gradient}>
                                    <Text style={{...styles.text, fontSize:14}}>Bestätigen</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                </View>
            </View>
                {/*<Button title="Bestätigen" onPress={()=>eMailBestätigen()}></Button>*/}

             

            <View style={{flex:0.5, alignItems:'center', justifyContent:'flex-start', width:'100%'}}>
                <View style = {styles.reihe}>
                    <Text style={styles.text}>Altes Passwort: </Text>
                    <TextInput style={styles.textInput}
                                onChangeText={passwort => changeAltesPasswort(passwort)} value={altesPasswort}></TextInput>
                </View>

                <View style = {styles.reihe}>
                    <Text style={styles.text}>Neues Passwort: </Text>
                    <TextInput style={styles.textInput}
                                onChangeText={passwort => changeNeuesPasswort(passwort)} value={neuesPasswort}></TextInput>
                </View>

                <View style = {styles.reihe}>
                    <Text style={styles.text}>Wiederholen: </Text>
                    <TextInput style={styles.textInput}
                                onChangeText={passwort => changeNeuesPasswort2(passwort)} value={neuesPasswort2}></TextInput>
                </View>

                <View>
                        <TouchableOpacity style={styles.button} onPress={()=>storeData()}>
                            <LinearGradient
                                colors={['#D476D5', '#C77BD8', '#8F92E3']}
                                start={{ x: 0, y: 0.4 }}
                                end={{ x: 0, y: 1 }}
                                style={styles.gradient}>
                                    <Text style={{...styles.text, fontSize:14}}>Bestätigen</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                {/*<Button title="Bestätigen" onPress={()=>passwortBestätigen()}></Button>*/}
            </View>
            
            <View style={{flex:0.1, alignItems:'center', justifyContent:'center', width:'100%'}}>
                <TouchableOpacity style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}} aonPress={()=>{deleteAccount()}}>
                        <Ionicons name="trash-outline" size={18} color="white" />
                        <Text style={{...styles.text, textDecorationLine:'underline', marginLeft:5}} >Konto löschen</Text>
                </TouchableOpacity>
            </View>
            <View style={{height:60}} />
            
         </ImageBackground>
    )
}

//Styles
const styles = StyleSheet.create({
    reihe: {
        width:'100%',
        paddingHorizontal: 20,
        paddingVertical:5,
        flexDirection:"row",
        alignItems: "center", 
        justifyContent: 'space-between',
    },
    trennlinie:{
        height:1,
        width:"100%",
        marginVertical:30
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
        borderRadius: 16,
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
    text: {
        color:'#fff',
        fontFamily: 'Poppins_400Regular',
        fontSize: 16
    },
    textInput:{ 
        borderColor: '#ffffff90', 
        borderWidth: 1,
        borderRadius:14,
        color: '#fff',
        textAlign: 'left',
        paddingVertical:2, 
        paddingHorizontal:18,
        fontFamily:'Poppins_400Regular',
        fontSize:16,
        width: '50%',
    },
  });