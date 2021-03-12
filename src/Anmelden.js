import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RadioButtonRN from 'radio-buttons-react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";

import {AppContext} from './context.js';
import { useContext } from 'react';
import { globalStyles } from './globalStyles.js';
import { LinearGradient } from 'expo-linear-gradient';
import { ImageBackground } from 'react-native';

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
        <ImageBackground source={require('../assets/Anmelden.png')} style={styles.imagebackground} imageStyle={{resizeMode:'stretch'}}>
        
          <Text style= {{...styles.textM, marginVertical: 50, fontSize: 30}}>Anmeldung</Text>
          
          <Text style= {{...styles.text, alignSelf:'flex-start', marginLeft:'18%'}}>Benutzername</Text>
          <TextInput 
              style={styles.textinput}
              onChangeText={text =>changeEMailInput(text)} autoCapitalize = 'none'>
          </TextInput>

          <Text style={{...styles.text, alignSelf:'flex-start', marginLeft:'18%'}}>Passwort</Text>
          <TextInput 
              style={{...styles.textinput, marginBottom:50}}
              onChangeText={text => changePasswordInput(text)} autoCapitalize = 'none'  ></TextInput>


          <TouchableOpacity style={styles.button} onPress={()=>checkInput() }>
              <LinearGradient
              colors={['#D476D5', '#C77BD8', '#8F92E3']}
              start={{ x: 0, y: 0.4 }}
              end={{ x: 0, y: 1 }}
              style={styles.gradient}>
                <Text style={{...styles.text, fontSize:18}}>Anmelden</Text>
              </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.containertext2} onPress={() =>props.changeInitPages('StartBildschirm')}>
                <Text style={{...styles.text, fontSize:14, textDecorationLine: "underline"}}>Zurück</Text>
          </TouchableOpacity>
    
      </ImageBackground>
    )
}

//Styles
const styles = StyleSheet.create({
    textinput: {
      paddingVertical:5,
      paddingHorizontal:20, 
      backgroundColor: '#464982', 
      width:'70%', 
      borderRadius:10,
      color:'#fff',
      fontSize:16,
      fontFamily:'Poppins_400Regular',
      marginBottom: 20, 
    },
    containertext2: {
      alignItems:'center',
      marginTop: 10
    },
    radio:{
      width: 200,
      borderWidth: 0,
      height:30
    },
    gradient: {
      alignItems: 'center',
      borderRadius: 18,
      paddingBottom: 4,
      paddingTop: 4,
      paddingHorizontal: 20,
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: {width:0, height:4},
      shadowRadius: 4,
      shadowOpacity: 0.4,
      marginBottom:10
    },
    text: {
      color:'#fff',
      fontSize:17,
      fontFamily:'Poppins_400Regular'
    }, 
    textM: {
      color:'#fff',
      fontFamily:'Poppins_500Medium'
    },
    imagebackground: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });