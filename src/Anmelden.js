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
        <Text style= {{color: '#fff', marginBottom: 80, fontSize: 40}}>Anmeldung</Text>
        <Text style= {{color: '#fff'}}>Benutzername</Text>
        <TextInput 
            style={styles.textinput}
            onChangeText={text =>changeEMailInput(text)} autoCapitalize = 'none'></TextInput>

        <View style={globalStyles.trennlinie}/>


        <Text style={{color: '#fff'}}>Passwort</Text>
        <TextInput 
            style={styles.textinput}
            onChangeText={text => changePasswordInput(text)} autoCapitalize = 'none'  ></TextInput>

        <View style={globalStyles.trennlinie}/>

        <TouchableOpacity style={styles.containertext1} onPress={()=>checkInput() }>
              <Text style={{color: '#fff', fontSize: 20}}>Anmelden</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.containertext2} onPress={() =>props.changeInitPages('StartBildschirm')}>
              <Text style={{color: '#fff', fontSize: 10}}>Zurück</Text>
        </TouchableOpacity>
      </View>
    )
}

//Styles
const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      backgroundColor: '#0F113A',
      alignItems: 'center',
      justifyContent: 'center',
    },
    textinput: {
      height: '3%', 
      borderColor: '#464982', 
      backgroundColor: '#464982', 
      borderWidth: 10, 
      width:200, 
      borderRadius:200, 

    },
    containertext1: {
      alignItems:'center',
      width: '40%',
      height: '4%',
      borderRadius: 100,
      backgroundColor: '#80DEE4',
      marginTop: 60,
      shadowColor: 'black',
      shadowOpacity: 0.8,
      elevation: 10,
      shadowRadius: 8,
      shadowOffset : { width: 10, height: 5}
    },
    containertext2: {
      alignItems:'center',
      marginTop: 15
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