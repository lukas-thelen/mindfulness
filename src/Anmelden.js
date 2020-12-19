import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RadioButtonRN from 'radio-buttons-react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";

import {AppContext} from './context.js';
import { useContext } from 'react';

export const Anmelden = (props) => {
  const appData = useContext(AppContext).appData
  const [eMailInput, changeEMailInput] = useState("")
  const [passwordInput, changePasswordInput] = useState("")


   //Nutzerinformationen prüfen und überarbeiten
   const checkInput =()=>{
    if (eMailInput === "" || passwordInput === ""){
      Alert.alert(
        'Unvollständig',
        'Bitte fülle alle Felder aus!',
        [{ text: 'OK'}],
        { cancelable: false }
      );
    }else{
      for (var nutzer in appData) {
        const checkUser =appData[nutzer]
        console.log("email", eMailInput)
        console.log("passwort", passwordInput)
        console.log("checkUser", checkUser.data.eMail )
        console.log("checkPasswort", checkUser.data.password )
        if(eMailInput === checkUser.data.eMail || passwordInput === checkUser.data.password){
            console.log("LockedIn")
        /*
            const currentUser = nutzer
          if(currentUser){
            const userData = checkUser
            changeUserData(userData)
            changeCurrentUser(currentUser)
            changeUsername(userData.data.name)
            changeLoggedIn(true)
          }
          */

        }

        }
        console.log(appData[nutzer])
      }
      }
    

    return(

        <View style={styles.pagewrap, styles.container}>
        
        <Text>E-Mail Adresse</Text>
        <TextInput 
            style={{ height: 20, borderColor: 'gray', borderWidth: 1, width:200, borderRadius:200, paddingLeft:10}}
            onChangeText={text =>changeEMailInput(text)}></TextInput>

        <View style={styles.trennlinie}/>


        <Text>Passwort</Text>
        <TextInput 
            style={{ height: 20, borderColor: 'gray', borderWidth: 1, width:200, borderRadius:200, paddingLeft:10}}
            onChangeText={text => changePasswordInput(text)}></TextInput>

        <View style={styles.trennlinie}/>


        <Button title={"Anmelden"} onPress={() =>{checkInput()}} ></Button>
        <Button title={"Zurück"} onPress={() =>{props.changeInitPages('StartBildschirm')}} ></Button>
      </View>
    )
}

//Styles
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
    radio:{
      width: 200,
      borderWidth: 0,
      height:30
    },
    trennlinie:{
      height:1,
      width:"100%",
      backgroundColor:"black",
      marginBottom:10,
      marginTop:10
    }
  });