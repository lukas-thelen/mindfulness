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
import {InfoEcke} from './HomeStack/InfoEcke.js';
import { UebungsInfo } from './HomeStack/UebungsInfo.js';
import { Journal } from './HomeStack/Journal.js';
import { JournalTag } from './HomeStack/JournalTag.js';
import { StressSkalaMonthly } from './HomeStack/StressSkalaMonthly.js';
import { uebungen } from './Kursdaten/Uebungsliste.js';
import ViewPager from '@react-native-community/viewpager';

const HomeStack = createStackNavigator();


//Startseite des Home-Stacks
const HomeRoot = ({navigation})=>{
  const {username, changeUsername,} = useContext(AppContext);
  const {gehoerteUebungen, changeGehoerteUebungen, userData} = useContext(AppContext);

  //Button, um da weiterzumachen, wo man aufgehört hat
  const InstantStart =() =>{
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
    <ViewPager style={styles.viewPager} initialPage={1}>
      <View key="1">
        <InfoEcke navigation={navigation}/>
      </View>
      <View key="2"style={styles.container}>
        <InstantStart />
        <Text>Hallo {username}</Text> 
        <Button title={"Meine Kurse"} onPress={() =>{navigation.navigate('Meine Kurse')}} ></Button>
        {/*<Button title={"Alle Übungen"} onPress={() =>{navigation.navigate("Alle Übungen")}} ></Button>*/}
        <Button title={"Journal"} onPress={() =>{navigation.navigate("Journal")}} ></Button>
        <Button title={"Info-Ecke"} onPress={() =>{navigation.navigate("Info Ecke")}} ></Button>
    </View>
    <View key="3">
        <Journal navigation={navigation}/>
      </View>
    </ViewPager>
    
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
          <HomeStack.Screen name="Info Ecke" component={InfoEcke}/>
          <HomeStack.Screen name="Übungsinfo" component={UebungsInfo}/>
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
    viewPager: {
      flex: 1,
    }
  });