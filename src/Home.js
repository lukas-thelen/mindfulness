import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';

import {AppContext} from './context.js';
import { useContext, useEffect } from 'react';
import {KursAuswahl} from './HomeStack/KursAuswahl.js'
import { UebungsAuswahl } from './HomeStack/UebungsAuswahl.js';
import { VersionsAuswahl } from './HomeStack/VersionsAuswahl.js';
import { AudioPlayer } from './HomeStack/AudioPlayer.js';
import {AlleUebungen} from "./HomeStack/AlleUebungen.js"
import { kurse } from './Kursdaten/Kursdatei.js';
import { render } from 'react-dom';
import { Journal } from './HomeStack/Journal.js';
import { JournalTag } from './HomeStack/JournalTag.js';
import { StressSkalaMonthly } from './HomeStack/StressSkalaMonthly.js';
import { uebungen } from './Kursdaten/Uebungsliste.js';

const HomeStack = createStackNavigator();


//Startseite des Home-Stacks
const HomeRoot = ({navigation})=>{
  const {username, changeUsername,} = useContext(AppContext);
  const {gehoerteUebungen, changeGehoerteUebungen, userData} = useContext(AppContext);

  //Button, um da weiterzumachen, wo man aufgehört hat
  const InstantStart =(props) =>{
    if (gehoerteUebungen.includes(userData.verfuegbareUebungen[(userData.verfuegbareUebungen.length)-1])){
      return null
    }
      for ( var z = 0; z< uebungen.length; z++){
        if (uebungen[z].id === userData.verfuegbareUebungen[(userData.verfuegbareUebungen.length)-1]){
          return <Button title="nächste Übung" onPress={()=>{navigation.navigate("Wähle eine Version", {kursIndex:uebungen[z].KursIndex, uebungsIndex:uebungen[z].UebungsIndex})}}></Button>
        }
      }
    }

  return(
    <View style={styles.container}>
      <InstantStart/>
      <Text>Hallo {username}</Text> 
      <Button title={"Meine Kurse"} onPress={() =>{navigation.navigate('Meine Kurse')}} ></Button>
      <Button title={"Alle Übungen"} onPress={() =>{navigation.navigate("Alle Übungen")}} ></Button>
      <Button title={"Journal"} onPress={() =>{navigation.navigate("Journal")}} ></Button>
    </View>
  )
}


//Navigator für alle Screens im Homestack
export const HomeScreen = ()=> {
  
  const appData = useContext(AppContext).appData
  const userData = useContext(AppContext).userData
  const currentUser = useContext(AppContext).currentUser
    
    return(
        <HomeStack.Navigator>
          <HomeStack.Screen name="Home" component={HomeRoot}/>
          <HomeStack.Screen name="Meine Kurse" component={KursAuswahl}/>
          <HomeStack.Screen name="Wähle eine Übung!" component={UebungsAuswahl}/>
          <HomeStack.Screen name="Wähle eine Version" component={VersionsAuswahl}/>
          <HomeStack.Screen name="AudioPlayer" component={AudioPlayer}/>
          <HomeStack.Screen name="Alle Übungen" component={AlleUebungen}/>
          <HomeStack.Screen name="Journal" component={Journal}/>
          <HomeStack.Screen name="individueller Tag" component={JournalTag}/>
          <HomeStack.Screen name="Stress-Umfrage" component={StressSkalaMonthly}/>
        </HomeStack.Navigator>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });