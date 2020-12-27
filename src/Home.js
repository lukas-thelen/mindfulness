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

const HomeStack = createStackNavigator();


//Startseite des Home-Stacks
const HomeRoot = ({navigation})=>{
  const {username, changeUsername} = useContext(AppContext);
  const {gehoerteUebungen, changeGehoerteUebungen} = useContext(AppContext);

  //Button, um da weiterzumachen, wo man aufgehört hat
  const InstantStart =(props) =>{
    if (!gehoerteUebungen[0]){
      return <Button title="nächste Übung" onPress={()=>{navigation.navigate("Wähle eine Version", {kursIndex:0, uebungsIndex:0})}}></Button>
    }
    const letzteUebungsId = gehoerteUebungen[gehoerteUebungen.length-1]
    for(i in kurse){
      for(j in kurse[i].Uebungen){
        if (kurse[i].Uebungen[j].id===letzteUebungsId){
          const letzterKurs = parseInt(i)
          const letzteUebung = parseInt(j)
          if (letzteUebung+1<kurse[letzterKurs].Uebungen.length){
            return  <Button title="nächste Übung" onPress={()=>{navigation.navigate("Wähle eine Version", {kursIndex:letzterKurs, uebungsIndex:letzteUebung+1})}}></Button>
          }else{
              if (letzterKurs+1<kurse.length){
                  return <Button title="nächste Übung" onPress={()=>{navigation.navigate("Wähle eine Version", {kursIndex:letzterKurs+1, uebungsIndex:0})}}></Button>
              }
          }
        }
      }
    }
    return null
  }

  return(
    <View style={styles.container}>
      <InstantStart/>
      <Text>Hallo {username}</Text> 
      <Button title={"Meine Kurse"} onPress={() =>{navigation.navigate('Meine Kurse')}} ></Button>
      <Button title={"Alle Übungen"} onPress={() =>{navigation.navigate("Alle Übungen")}} ></Button>
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