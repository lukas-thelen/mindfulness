import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RadioButtonRN from 'radio-buttons-react-native';

import {AppContext} from './context.js';
import { useContext } from 'react';

export const StressSkala = (props) =>{
    const [stressData, changeStressData] = useState("")
    const [number, changeNumber] = useState(0)
    const fragen = ["Wie oft warst Du im letzten Monat aufgewühlt, weil etwas unerwartet passiert ist?",
                    "Wie oft hattest Du im letzten Monat das Gefühl, nicht in der Lage zu sein, die wichtigen Dinge in Deinem Leben kontrollieren zu können?",
                    "Wie oft hast DU dich im letzten Monat nervös und gestresst gefühlt?",
                    "Wie oft warst Du im letzten Monat zuversichtlich, dass Du fähig bist, ihre persönlichen Probleme zu ubewältigen?",
                    "Wie oft hast Du im letzten Monat das Gefühl, dass sich die Dinge zu Ihren Gunsten entwickeln?",
                    "Wie oft hattest Du im letzten Monat den Eindruck, nicht all Deine anstehenden Aufgaben gewachsen zu sein?",
                    "Wie oft warst Du im letzten Monat in der Lage, ärgerliche Situationen in Deinem Leben zu beeinflussen?",
                    "Wie oft hastt Du im letzten Monat das Gefühl, alles im Griff zu haben?",
                    "Wie oft hast Du dich im letzten Monat über Dinge gegeärgert, über die Du keine Kontrolle hattest?",
                    "Wie oft hattest Du im letzten Monat das Gefühl, dass sich so viele Schwierigkeiten angehäufthaben, dass Du diese nicht überwinden konntest?",
                  ]
      const [question, changeQuestion] = useState(fragen[number])
      const [buttonValue, changeButtonValue] = useState("Nächste Frage")


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
        if (buttonValue === "Abschicken"){
          props.finishInit()
        } else {
          const currentNumber = number +1
          changeNumber(currentNumber)
          changeQuestion(fragen[number])
            if (number === 9){
              changeButtonValue("Abschicken")
        }
      }
    }
    return(

        <View style={styles.pagewrap, styles.container}>
            <Text>Lass uns ein Stress-Tagebuch führen</Text>
            <Text>{question}</Text>
            <Button title={"zeige Daten"} onPress={() =>{test()}} ></Button>
            <Button title={buttonValue} onPress={() =>{weiter()}} ></Button>
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