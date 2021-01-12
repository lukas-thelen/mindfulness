import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RadioButtonRN from 'radio-buttons-react-native';

import {AppContext} from './context.js';
import { useContext } from 'react';


export const AchtsamkeitsAbfrage =(props)=>{
    const [mindfulnessLevelData, changeMindfulnessLevel] = useState("")
    const levelValue = {"Anfänger:in": 0, "Fortgeschrittene:r":1, "Experte:in":2}

    // Nutzerinfos im AsyncStorage speichern
    const storeData = async () => {
      const progressData = props.progressData;
      progressData.mindfulnessLevelData = levelValue[mindfulnessLevelData];
      props.changeProgressData(progressData)
    }

    //Nutzerinformationen prüfen 
    const abschicken =()=>{
      if (mindfulnessLevelData === ""){
        Alert.alert(
          'Unvollständig',
          'Bitte wähle dein Level!',
          [{ text: 'OK'}],
          { cancelable: false }
        );
      }else{
        storeData()
        props.changeInitPages('StressSkala')
      }
    }

    // Mindfulness-Level angeben
    const mindfulnessLevel = [
      {label: 'Anfänger:in'},{label: 'Fortgeschrittene:r'},{label: 'Experte:in'}];

    
    return(
      <View style={styles.pagewrap, styles.container}>
        
        <Text>Wie gut kennst du dich mit Achtsamkeitstechniken aus?</Text>
        <RadioButtonRN
          boxStyle={styles.radio}
          box={false}
          data={mindfulnessLevel}
          selectedBtn={(e) => changeMindfulnessLevel(e.label)}
        />

        <View style={styles.trennlinie}/>
        <Button title={"Weiter"} onPress={() =>{abschicken()}} ></Button>

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