import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RadioButtonRN from 'radio-buttons-react-native';

import {AppContext} from './context.js';
import { useContext } from 'react';
import { LinearGradient } from 'expo-linear-gradient';


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
      <ImageBackground source={require('../assets/ErsteSeite.png')} style={styles.imagebackground}>
          <Text style= {{color: '#fff'}}>Wie gut kennst du dich mit Achtsamkeitstechniken aus?</Text>
          <RadioButtonRN
            boxStyle={styles.radio}
            box={false}
            data={mindfulnessLevel}
            selectedBtn={(e) => changeMindfulnessLevel(e.label)}
          />
          <TouchableOpacity style={styles.button} onPress={() =>{abschicken()}} >
            <LinearGradient
              colors={['#D476D5', '#C77BD8', '#8F92E3']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 2 }}
              style={styles.gradient}>
                <Text style={styles.text25}>Weiter</Text>
            </LinearGradient>
          </TouchableOpacity>
        </ImageBackground>
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
      height:30,
    },

    imagebackground: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: {width:0, height:4},
      shadowRadius: 4,
      shadowOpacity: 0.4,
    },
    gradient: {
      alignItems: 'center',
      borderRadius: 10,
      paddingBottom: 4,
      paddingTop: 4,
      paddingHorizontal: 20,
      marginTop: '10%'
    },
  });