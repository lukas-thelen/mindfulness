import React, {useState, useContext} from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image } from 'react-native';
import { AppContext } from './context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Progress from 'react-native-progress';

export const Appeinfuehrung =(props) => {
    const {userData, appData, changeUserData, changeAppData, currentUser} =useContext(AppContext)
    const [counter, changeCounter] = useState(0)
    const userDataTemp={...userData}

    const introSteps =[
        {bild: require("mindfulness/assets/Intro/Screenshot_01.jpg"), text:"Wir zeigen dir kurz die wichtigsten Funktionen der App. \n Das ist deine Startseite! Von hier aus kommst du über den Play-Button oder die Kurse schnell zu den Übungen."},
        {bild: require("mindfulness/assets/Intro/Screenshot_02.jpg"), text:"Für jede Übung kannst du dir den Sprecher aussuchen. Manchmal stehen dir zusätzlich unterschiedlich lange Übungen zur Verfügung."},
        {bild: require("mindfulness/assets/Intro/Screenshot_03.jpg"), text:"Swipe auf der Startseite nach rechts, um zu deinem Tagebuch-Bereich zu kommen."},
        {bild: require("mindfulness/assets/Intro/Screenshot_04.jpg"), text:"Hier hast du die Möglichkeit, am Ende des Tages dein Befinden zu dokumentieren."},
        {bild: require("mindfulness/assets/Intro/Screenshot_05.jpg"), text:"Wenn du nach links swipest, kommst du zur Auflistung aller Übungen. Aber achtung: Übungen, die deinem Level nicht entsprechen, sind mit ! markiert. "},
        {bild: require("mindfulness/assets/Intro/Screenshot_07.jpg"), text:"In der Tabbar unten findest du den Bereich \"Freunde\", in dem du Zusammen mit deinen Freinden Puzzles lösen kannst."},
        {bild: require("mindfulness/assets/Intro/Screenshot_08.jpg"), text:"Teile dazu einfach die Links mit deinen Freunden und schon profitiert ihr auch vom Forschritt der Anderen."},
        {bild: require("mindfulness/assets/Intro/Screenshot_09.jpg"), text:"So könnt ihr Schritt für Schritt neue Motive aufdecken."},
        {bild: require("mindfulness/assets/Intro/Screenshot_10.jpg"), text:"Außerdem kommt ihr über die Tabbar zu eurem Profilbereich, in dem ihr eure Erfolge und Statistiken einsehen könnt."},

    ]
    
    const handleFinish =async()=>{
        userDataTemp.introSeen="true"
        changeUserData(userDataTemp)
        appData[currentUser]=userDataTemp
        changeAppData(appData)
        const jsonValue = JSON.stringify(appData)
        await AsyncStorage.setItem('appData', jsonValue)
        props.changeEinfuehrungVisible(false)
    }
    const weiter=()=>{
        if(counter===introSteps.length-1){
            handleFinish()
        }else{
            changeCounter(x=>x+1)
        }
    }
    return(
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <Text style={{...styles.text, fontSize:20, marginVertical:10}}>Herzlich Willkommen bei Upgrade your Mind!</Text>
                <Image source={introSteps[counter].bild}style={{flex:1.1,}} resizeMode="contain"/>
                <View style={{flex:0.4, width:"110%", marginBottom:10, paddingVertical:5, justifyContent:"center"}}>
                    <Text style={styles.text}>{introSteps[counter].text}</Text>
                </View>
                <View style={{flexDirection:"row"}}>
                {counter!=0&&<TouchableOpacity style={{backgroundColor:"#D476D5",marginBottom:10, flex:1, marginHorizontal:5, borderRadius:15}} onPress={()=>{changeCounter(x=>x-1)}}>
                        <Text style={styles.text}>{counter===0?" ":"zurück"}</Text>
                    </TouchableOpacity>}
                    <TouchableOpacity style={{backgroundColor:"#D476D5",marginBottom:10, flex:1, marginHorizontal:5, borderRadius:15}} onPress={()=>{weiter()}}>
                        <Text style={styles.text}>{counter===introSteps.length-1?"fertig":"weiter"}</Text>
                    </TouchableOpacity>
                </View> 
                    <TouchableOpacity style={{marginBottom:20}} onPress={()=>{handleFinish()}}>
                        <Text style={{...styles.text, textDecorationLine:"underline"}}>überspringen</Text>
                    </TouchableOpacity>
                <Progress.Bar progress={counter/(introSteps.length-1)} width={300}height={3} color="white" borderColor="#00000000" unfilledColor="#0F113A" style={{marginBottom:5}} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    modalView: {
      backgroundColor: '#0F113A',
      width: '90%',
      height:"90%",
      borderColor: '#8F92E3',
      borderWidth: 1,
      borderRadius: 15,
      borderRadius: 15,
      paddingHorizontal: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {width:0, height:4},
      shadowOpacity: 0.4,
      shadowRadius: 4,
      elevation: 5,
    },
    text: {
      fontFamily: 'Poppins_400Regular',
      fontSize:16,
      color:'#fff',
      textAlign:"center"
    },
  });