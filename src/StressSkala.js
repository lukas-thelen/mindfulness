import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RadioButtonRN from 'radio-buttons-react-native';

import {AppContext} from './context.js';
import { useContext } from 'react';

export const StressSkala = (props) =>{
    const [stressData, changeStressData] = useState("")
    const fragen = ["Wie oft warst Du im letzten Monat aufgewühlt, weil etwas unerwartet passiert ist?",
                    "Wie oft hattest Du im letzten Monat das Gefühl, nicht in der Lage zu sein, die wichtigen Dinge in Deinem Leben kontrollieren zu können?"
                  ]

    // Nutzerinfos im AsyncStorage speichern
    const storeData = async () => {
      const progressData = props.progressData;
      progressData.stressData = stressData;
      props.changeProgressData(progressData)
    }


    //Nutzerinformationen prüfen und überarbeiten
    const abschicken =()=>{
        if (stressData === ""){
          /*Alert.alert(
            'Unvollständig',
            'Bitte wähle dein Level!',
            [{ text: 'OK'}],
            { cancelable: false }
            ); */
            props.finishInit()

        }else{
          props.finishInit()
        }
      }
    const weiter = () =>{
        console.log("Weiter")
    }
    return(

        <View style={styles.pagewrap, styles.container}>
            <Text>Lass uns ein Stress-Tagebuch führen</Text>
            <Button title={"zeige Daten"} onPress={() =>{test()}} ></Button>
            <Button title={"Weiter"} onPress={() =>{weiter()}} ></Button>
            <Button title={"Abschicken"} onPress={() =>{abschicken()}} ></Button>
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