import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RadioButtonRN from 'radio-buttons-react-native';

import {AppContext} from './context.js';
import { useContext } from 'react';


export const Achtsamkeitsabfrage =(props)=>{
    const [mindfulnessLevelData, changeMindfulnessLevel] = useState("")

    // Nutzerinfos im AsyncStorage speichern
    const storeData = async () => {
      const userData ={mindfulnessLevelData:mindfulnessLevelData}
      try {
        const jsonValue = JSON.stringify(userData)
        await AsyncStorage.setItem('userData', jsonValue)
        props.changeLoggedIn(true)
      } catch (e) {
        console.log(e)
      }
    }

    //Nutzerinformationen prüfen und überarbeiten
    const abschicken =()=>{
      if (mindfulnessLevelData === ""){
        Alert.alert(
          'Unvollständig',
          'Bitte fülle alle Felder aus!',
          [{ text: 'OK'}],
          { cancelable: false }
        );
      }else{
        storeData()
      }
    }

    // Mindfulness-Level angeben
    const mindfulnessLevel = [
      {label: 'Anfänger'},{label: 'Fortgeschrittener'},{label: 'Experte'}];

    // Überprüft Eingabe  
    const test = () =>{
        console.log(mindfulnessLevelData)
    }
    
    return(
      <View style={styles.pagewrap, styles.container}>
        
        <Text>Wie gut kennst du dich mit Achtsamkeitstechniken aus?:</Text>
        <RadioButtonRN
          boxStyle={styles.radio}
          data={mindfulnessLevel}
          selectedBtn={(e) => changeMindfulnessLevel(e.label)}
        />

        <View style={styles.trennlinie}/>

        <Button title={"zeige Daten"} onPress={() =>{test()}} ></Button>
        <Button title={"anmelden"} onPress={() =>{abschicken()}} ></Button>
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