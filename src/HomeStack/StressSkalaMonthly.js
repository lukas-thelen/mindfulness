import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RadioButtonRN from 'radio-buttons-react-native';
import Slider from '@react-native-community/slider';

import {AppContext} from '../context.js';
import { useContext } from 'react';
import { abs } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

export const StressSkalaMonthly = ({navigation,route}) =>{
    const [stressData, changeStressData] = useState(2)
    const {userData, appData, changeAppData, changeUserData}=useContext(AppContext)
    const userDataTemp={...userData}
    //Die perceived Stress Skala Fragen, auf die mit frage und number zugegriffen wird die aktuelle Frage ist gleichquestions[number]
    const [number, changeNumber] = useState(0)
    const questions = ["Wie oft warst Du im letzten Monat aufgewühlt, weil etwas unerwartet passiert ist?",
                    "Wie oft hattest Du im letzten Monat das Gefühl, nicht in der Lage zu sein, die wichtigen Dinge in deinem Leben kontrollieren zu können?",
                    "Wie oft hast Du dich im letzten Monat nervös und gestresst gefühlt?",
                    "Wie oft warst Du im letzten Monat zuversichtlich, dass Du fähig bist, deine persönlichen Probleme zu bewältigen?",
                    "Wie oft hast Du im letzten Monat das Gefühl gehabt, dass sich die Dinge zu deinen Gunsten entwickeln?",
                    "Wie oft hattest Du im letzten Monat den Eindruck, nicht all deinen anstehenden Aufgaben gewachsen zu sein?",
                    "Wie oft warst Du im letzten Monat in der Lage, ärgerliche Situationen in deinem Leben zu beeinflussen?",
                    "Wie oft hast Du im letzten Monat das Gefühl gehabt, alles im Griff zu haben?",
                    "Wie oft hast Du dich im letzten Monat über Dinge geärgert, über die Du keine Kontrolle hattest?",
                    "Wie oft hattest Du im letzten Monat das Gefühl, dass sich so viele Schwierigkeiten angehäuft haben, dass Du diese nicht überwinden konntest?",
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
      <ImageBackground source={require('../../assets/Profil.png')} style={styles.imagebackground} imageStyle={{resizeMode:'stretch'}}>
        
            <Text style={{color:'#fff', fontSize:20, marginBottom:50}}>Dein monatliches Stress-Tagebuch</Text>
            
            <View style={styles.background}>
            <Text style={styles.text}>{question}</Text>
            <Slider
                style={{width: 250, height: 40}}
                minimumValue={0}
                maximumValue={4}
                minimumTrackTintColor='#89FFF1'
                maximumTrackTintColor='#D476D5'
                step={1}
                value={stressData}
                onValueChange={changeStressData}
            />
            <View style={{flexDirection:"row", width:280, justifyContent:"space-around", marginLeft:20}}>
              <Text style={stressData===0?{fontSize:16, color:'#fff'}:{fontSize:10, color:'#fff'}}>Nie</Text>
              <Text style={stressData===1?{fontSize:16, color:'#fff', marginLeft:15}:{fontSize:10, color:'#fff'}}>Fast Nie</Text>
              <Text style={stressData===2?{fontSize:16, color:'#fff', marginLeft:15}:{fontSize:10, color:'#fff'}}>Manchmal</Text>
              <Text style={stressData===3?{fontSize:16, color:'#fff'}:{fontSize:10, color:'#fff'}}>Ziemlich Oft</Text>
              <Text style={stressData===4?{fontSize:16, color:'#fff'}:{fontSize:10, color:'#fff'}}>Sehr Oft</Text>
            </View>
            </View>

            <TouchableOpacity style={styles.button} onPress={() =>{calculateStress()}}>
              <LinearGradient
                colors={['#D476D5', '#C77BD8', '#8F92E3']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 2 }}
                style={styles.gradient}>
                  <Text style={{color:'#fff', fontSize:16}}>{buttonValue}</Text>
              </LinearGradient>
            </TouchableOpacity>

        </ImageBackground>
    )

}
//Styles
const styles = StyleSheet.create({
    imagebackground: {
      flex: 1,
      alignItems: 'center',
      justifyContent:'center'
    },
    radio:{
      width: 200,
      borderWidth: 0,
      height:30
    },
    text:{
      color:'#fff',
      fontSize:18,
      textAlign:'center',
      marginBottom:5
    },
    background: {
      backgroundColor: "#0F113A90",
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      padding:20,
      width: '90%',
    },
    gradient: {
      alignItems: 'center',
      borderRadius: 15,
      paddingBottom: 4,
      paddingTop: 4,
      paddingHorizontal: 20,
    },
    button: {
      marginTop: 20,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: {width:0, height:4},
      shadowRadius: 4,
      shadowOpacity: 0.4,
    },
  });