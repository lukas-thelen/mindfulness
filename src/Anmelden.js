import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RadioButtonRN from 'radio-buttons-react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";

import {AppContext} from './context.js';
import { useContext } from 'react';
import { globalStyles } from './globalStyles.js';

export const Anmelden = (props) => {
  const appData = useContext(AppContext).appData
  const [eMailInput, changeEMailInput] = useState("")
  const [passwordInput, changePasswordInput] = useState("")
  const changeUsername = useContext(AppContext).changeUsername;
  const changeUserData = useContext(AppContext).changeUserData;
  const changeCurrentUser = useContext(AppContext).changeCurrentUser;
  const changeLoggedIn = useContext(AppContext).changeLoggedIn;
  const changeGehoerteUebungen = useContext(AppContext).changeGehoerteUebungen;

  // Überprüft, ob appData leer ist (noch kein Eintrag)
  const checkObjectEmpty = (obj) => {
      for(var prop in obj) {
          if(obj.hasOwnProperty(prop))
              return false;
      }
  
      return true;
  }

   //Nutzerinformationen prüfen 
   const checkInput =()=>{

    // Überprüft, ob appData leer ist (noch kein Eintrag)
    const empty = checkObjectEmpty(appData)
    if (empty){
      Alert.alert(
        'Bisher liegen uns keine Anmeldedaten vor.',
        'Bitte registriere dich!',

        // Wenn bisher keine Anmelde-Daten da sind kann der Nutzer damit direkt zum Registrierungsprozess kommen
        [{ text: 'Registrieren', onPress: () => props.changeInitPages('Registrieren') }],
        { cancelable: false }
      );

      // Überpüft, ob bisher keine Eingabe gemacht wurde
    }else if (eMailInput === "" || passwordInput === "") {
      Alert.alert(
        'Unvollständig',
        'Bitte fülle alle Felder aus!',
        [{ text: 'OK'}],
        { cancelable: false }
      );
    }  else{
      var currentUser = ""

      // Geht alle Nutzer durch
      if(appData[eMailInput] && eMailInput === appData[eMailInput].data.eMail && passwordInput === appData[eMailInput].data.password){
        currentUser = appData[eMailInput].data.eMail
        console.log("Hat User gefunden")
        changeUserData(appData[eMailInput])
        changeCurrentUser(currentUser)
        changeUsername(appData[eMailInput].data.name)
        changeLoggedIn(true)
        changeGehoerteUebungen(appData[eMailInput].gehoerteUebungen)
        AsyncStorage.setItem('currentUser', currentUser)
        return true
      }else{
          Alert.alert(
            'Wir konnten die Anmeldedaten nicht finden.',
            'Bitte versuche es noch einmal.',
            [{ text: 'OK'}],
            { cancelable: false }
          );
        }

        
      }
      }
    
      
    return(

        <View style={styles.pagewrap, styles.container}>
        
        <Text>Nutzer-Kennung:</Text>
        <TextInput 
            style={{ height: 20, borderColor: 'gray', borderWidth: 1, width:200, borderRadius:200, paddingLeft:10}}
            onChangeText={text =>changeEMailInput(text)} autoCapitalize = 'none'></TextInput>

        <View style={globalStyles.trennlinie}/>


        <Text>Passwort</Text>
        <TextInput 
            style={{ height: 20, borderColor: 'gray', borderWidth: 1, width:200, borderRadius:200, paddingLeft:10}}
            onChangeText={text => changePasswordInput(text)} autoCapitalize = 'none'  ></TextInput>

        <View style={globalStyles.trennlinie}/>


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
  });