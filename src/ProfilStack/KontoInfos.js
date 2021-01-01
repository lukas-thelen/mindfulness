import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {AppContext} from '../context.js';
import { useContext, useEffect, useState } from 'react';

export const KontoInfos = () => {
    const {appData, userData, changeAppData, changeUserData, changeLoggedIn,changeCurrentUser} = useContext(AppContext)
    const [eMail, changeEmail] = useState("")
    const [altesPasswort, changeAltesPasswort] = useState("")
    const [neuesPasswort, changeNeuesPasswort] = useState("")
    const [neuesPasswort2, changeNeuesPasswort2] = useState("")
    var appDataTemp = {...appData}


    // Löscht die Account-Daten aus dem Local Storage
    const afterConfirm = async() => {
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

    }

    // Ändert das Passwort des Nutzers nach Eingabe des Alten und zweifacher Eingabe des (identisch) Neuen
    const passwortBestätigen = async () => {
        console.log(userData.data.password)
        if (altesPasswort === userData.data.password){
            
            if (neuesPasswort === neuesPasswort2){
                userData.data.passwort=neuesPasswort
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
        <View  style = {styles.container}>
            <Text>Mein Konto!</Text>

            <Text>E-Mail: {userData.data.eMail}</Text>

            <View style = {styles.reihe}>
            <Text>Neue E-Mail</Text>
                <TextInput style={{ height: 20, borderColor: 'gray', borderWidth: 1, width:200, borderRadius:200, paddingLeft:10}}
                            onChangeText={eMail => changeEmail(eMail)}></TextInput>
            </View>

            <Button title="Bestätigen" onPress={()=>eMailBestätigen()}></Button>

            <View style={styles.trennlinie}/>


            <View style = {styles.reihe}>
                <Text>Altes Passwort</Text>
                <TextInput style={{ height: 20, borderColor: 'gray', borderWidth: 1, width:200, borderRadius:200, paddingLeft:10}}
                            onChangeText={passwort => changeAltesPasswort(passwort)}></TextInput>
            </View>

            <View style = {styles.reihe}>
                <Text>Neues Passwort:</Text>
                <TextInput style={{ height: 20, borderColor: 'gray', borderWidth: 1, width:200, borderRadius:200, paddingLeft:10}}
                            onChangeText={passwort => changeNeuesPasswort(passwort)}></TextInput>
            </View>

            <View style = {styles.reihe}>
                <Text>Neues Passwort bestätigen:</Text>
                <TextInput style={{ height: 20, borderColor: 'gray', borderWidth: 1, width:200, borderRadius:200, paddingLeft:10}}
                            onChangeText={passwort => changeNeuesPasswort2(passwort)}></TextInput>
            </View>


            <Button title="Bestätigen" onPress={()=>passwortBestätigen()}></Button>

            <View style={styles.trennlinie}/>

            <TouchableOpacity onPress={()=>{deleteAccount()}}>
                    <Text>Konto löschen</Text>
                </TouchableOpacity>

            <Button title="Test" onPress={()=>console.log(appData)}></Button>
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

    container: {
        alignItems: "center",

    },

    trennlinie:{
        height:1,
        width:"100%",
        backgroundColor:"black",
        marginBottom:10,
        marginTop:10
      }

  });