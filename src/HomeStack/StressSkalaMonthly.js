import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RadioButtonRN from 'radio-buttons-react-native';
import Slider from '@react-native-community/slider';

import {AppContext} from '../context.js';
import { useContext } from 'react';
import { abs } from 'react-native-reanimated';

export const StressSkalaMonthly = ({navigation,route}) =>{
    const [stressData, changeStressData] = useState(2)
    const {userData, appData, changeAppData, changeUserData}=useContext(AppContext)
    const userDataTemp={...userData}
    //Die perceived Stress Skala Fragen, auf die mit frage und number zugegriffen wird die aktuelle Frage ist gleichquestions[number]
    const [number, changeNumber] = useState(0)
    const questions = ["Wie oft warst Du im letzten Monat aufgewühlt, weil etwas unerwartet passiert ist?",
                    "Wie oft hattest Du im letzten Monat das Gefühl, nicht in der Lage zu sein, die wichtigen Dinge in Deinem Leben kontrollieren zu können?",
                    "Wie oft hast DU dich im letzten Monat nervös und gestresst gefühlt?",
                    "Wie oft warst Du im letzten Monat zuversichtlich, dass Du fähig bist, ihre persönlichen Probleme zu ubewältigen?",
                    "Wie oft hast Du im letzten Monat das Gefühl, dass sich die Dinge zu Ihren Gunsten entwickeln?",
                    "Wie oft hattest Du im letzten Monat den Eindruck, nicht all Deinen anstehenden Aufgaben gewachsen zu sein?",
                    "Wie oft warst Du im letzten Monat in der Lage, ärgerliche Situationen in Deinem Leben zu beeinflussen?",
                    "Wie oft hast Du im letzten Monat das Gefühl, alles im Griff zu haben?",
                    "Wie oft hast Du dich im letzten Monat über Dinge gegeärgert, über die Du keine Kontrolle hattest?",
                    "Wie oft hattest Du im letzten Monat das Gefühl, dass sich so viele Schwierigkeiten angehäufthaben, dass Du diese nicht überwinden konntest?",
                  ]

      // Variablen für den dynamischen Button (von "Nächste Frage" --> Abschicken)
      const [question, changeQuestion] = useState(questions[number])
      const [buttonValue, changeButtonValue] = useState("Nächste Frage")

      //Variable um Stresslevel zu kalkulieren
      const [calculatedStressLevel,addStress] = useState(0)

    const storeMonthlyData=async()=>{
      const today = new Date()
      var dateString = today.toDateString()
      dateString=dateString[4]+dateString[5]+dateString[6]+dateString[11]+dateString[12]+dateString[13]+dateString[14]
      userDataTemp.progress.stressData[dateString]={date:new Date(), level:calculatedStressLevel}
      changeUserData(userDataTemp)
      appData[userDataTemp.data.eMail]=userData
      changeAppData(appData)
      const jsonvalue=JSON.stringify(appData)
      await AsyncStorage.setItem('appData', jsonvalue)
      navigation.goBack()
    }

  
    // Stress-Level angeben
    const skala = ["Nie","Fast nie","Manchmal","Ziemlich oft","Sehr oft"]
    const stressLevel = [
      {label: skala[0]},{label: skala[1]},{label: skala[2]},{label: skala[3]},{label: skala[4]}];


    //Kalkulation des Stresslevels    
    const calculateStress =()=>{
        if (number === 0 || number === 1 || number === 2 || number === 5 || number === 8 || number === 9){
              console.log("Erste if mit number= ",number)
              const currentStress = calculatedStressLevel + stressData+1;
              addStress(currentStress);
              console.log("Currentstress: ",currentStress)
            } else{
            if (number === 3 || number === 4 || number === 6 || number === 7){
              console.log("Zweite if mit number= ",number)
              const currentStress = calculatedStressLevel + (stressData-5)*(-1);
              addStress(currentStress);
              console.log("Currentstress: ",currentStress)
            }
        }
        weiter()
       }

    
    // Setzt die nächste Frage, sollte es die letzte Frage in questions sein, beendet sie die Umfrage und beendet Init
    const weiter = () =>{
      if (buttonValue === "Abschicken"){
          storeMonthlyData()
      } else {
        const currentNumber = number +1
        changeNumber(currentNumber)
        const currentQuestion = currentNumber
        changeQuestion(questions[currentQuestion])
        if (number === 8){
          changeButtonValue("Abschicken")
        }
        changeStressData(2)
      }
    }
    return(

        <View style={styles.pagewrap, styles.container}>
            <Text>Lass uns ein Stress-Tagebuch führen</Text>
            <Text>{question}</Text>
            <Slider
                style={{width: 200, height: 40}}
                minimumValue={0}
                maximumValue={4}
                minimumTrackTintColor="green"
                maximumTrackTintColor="grey"
                step={1}
                value={stressData}
                onValueChange={changeStressData}
            />
            <View style={{flexDirection:"row", width:240, justifyContent:"space-evenly"}}>
              <Text style={stressData===0?{fontSize:13}:{fontSize:8}}>Nie</Text>
              <Text style={stressData===1?{fontSize:13}:{fontSize:8}}>Fast Nie</Text>
              <Text style={stressData===2?{fontSize:13}:{fontSize:8}}>Manchmal</Text>
              <Text style={stressData===3?{fontSize:13}:{fontSize:8}}>Ziemlich Oft</Text>
              <Text style={stressData===4?{fontSize:13}:{fontSize:8}}>Sehr Oft</Text>
            </View>
            <Button title={buttonValue} onPress={() =>{calculateStress()}} ></Button>

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