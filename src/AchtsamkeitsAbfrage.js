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
          'Bitte wähl dein Level aus',
          'Falls du dir nicht sicher bist, nimm Anfänger:in',
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
      <ImageBackground source={require('../assets/ErsteSeite.png')} style={styles.imagebackground} imageStyle={{resizeMode:'stretch'}}>
          <Text style= {{...styles.text, marginBottom:20}}>Wie gut kennst du dich mit Achtsamkeitstechniken aus?</Text>
          <RadioButtonRN
            activeColor={'#89FFF1'}
            textStyle={{fontFamily:'Poppins_400Regular', fontSize:16, color:'#fff', marginLeft:5}}
            boxStyle={styles.radio}
            box={false}
            data={mindfulnessLevel}
            selectedBtn={(e) => changeMindfulnessLevel(e.label)}
          />
          <TouchableOpacity style={styles.button} onPress={() =>{abschicken()}} >
            <LinearGradient
              colors={['#D476D5', '#C77BD8', '#8F92E3']}
              start={{ x: 0, y: 0.4 }}
              end={{ x: 0, y: 1 }}
              style={styles.gradient}>
                <Text style={styles.text}>Weiter</Text>
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
      marginTop: 10
    },
    gradient: {
      alignItems: 'center',
      borderRadius: 18,
      paddingVertical: 4,
      paddingHorizontal: 30,
      marginTop: '10%'
    },
    text: {
      color:'#fff',
      fontSize:18,
      fontFamily:'Poppins_400Regular',
      textAlign:'center'
    }, 
  });