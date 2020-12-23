import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';

import {AppContext} from './context.js';
import { useContext } from 'react';
import {KursAuswahl} from './HomeStack/KursAuswahl.js'
import { UebungsAuswahl } from './HomeStack/UebungsAuswahl.js';
import { VersionsAuswahl } from './HomeStack/VersionsAuswahl.js';
import { AudioPlayer } from './HomeStack/AudioPlayer.js';
import {AlleUebungen} from "./HomeStack/AlleUebungen.js"

const HomeStack = createStackNavigator();

const HomeRoot = ({navigation})=>{
  const username = useContext(AppContext).username;
  const storeData = async () => {
    try {
      await AsyncStorage.removeItem('userData')
      console.log("erfolgreich")
    } catch (e) {
      console.log(e)
    }
  }

  const goToKursAuswahl =()=>{
    navigation.navigate('Meine Kurse')
  }

  return(
    <View style={styles.container}>
      <Text>Hallo {username}</Text> 
      <Button title={"Meine Kurse"} onPress={() =>{goToKursAuswahl()}} ></Button>
      <Button title={"Alle Übungen"} onPress={() =>{navigation.navigate("Alle Übungen")}} ></Button>
    </View>
  )
}

export const HomeScreen = ()=> {
  const username = useContext(AppContext).username;


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