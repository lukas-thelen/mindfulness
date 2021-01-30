import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button,TouchableOpacity, Image, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

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
import { LinearGradient } from 'expo-linear-gradient';
import { VersionsAuswahlText } from './HomeStack/VersionsAuswahlText.js';
import { TextPlayer } from './HomeStack/TextPlayer.js';


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

          return (
          <TouchableOpacity onPress={()=>{
              if(uebungen[z].Audio){
                navigation.navigate("Wähle eine Version", {kursIndex:uebungen[z].KursIndex, uebungsIndex:uebungen[z].UebungsIndex})
              }else{
                navigation.navigate("Wähle die Dauer", {kursIndex:uebungen[z].KursIndex, uebungsIndex:uebungen[z].UebungsIndex})
              }
          }}>
            <Ionicons name="play" size={50} color="white" /> 
          </TouchableOpacity>
        )
      }
    }
  }

  return(
    <ViewPager style={styles.viewPager} initialPage={1}>
      <View key="1">
        <InfoEcke navigation={navigation}/>
      </View>
      <View key="2" >
        <ImageBackground source={require('../assets/Startseite.png')} style={styles.imagebackground}>
          
          <View style={{flex: 2.5}}></View>
          <Text style={styles.text25}>Hallo {username}!</Text> 
          <Text style={{...styles.text25, marginBottom: 20}}>Schön, dass du wieder da bist!</Text>
          
          <InstantStart /> 
          
          <Image source={require('../assets/Mädchen(1).png')} style={styles.image}/>
          
          <TouchableOpacity style={styles.button} onPress={() =>{navigation.navigate('Meine Kurse')}} >
            <LinearGradient
              colors={['#D476D5', '#C77BD8', '#8F92E3']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 2 }}
              style={styles.gradient}>
                <Text style={styles.text25}>Meine Kurse</Text>
            </LinearGradient>
          </TouchableOpacity>
          
          {/*<Button title={"Alle Übungen"} onPress={() =>{navigation.navigate("Alle Übungen")}} ></Button>
            <Button title={"Journal"} onPress={() =>{navigation.navigate("Journal")}} ></Button>
            <Button title={"Info-Ecke"} onPress={() =>{navigation.navigate("Info Ecke")}} ></Button>*/}
          <View style={styles.container}></View>
        </ImageBackground>
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
          <HomeStack.Screen options={{title:"test"}} name="individueller Tag" component={JournalTag}/>
          <HomeStack.Screen name="Stress-Umfrage" component={StressSkalaMonthly}/>
          <HomeStack.Screen name="Info Ecke" component={InfoEcke}/>
          <HomeStack.Screen name="Übungsinfo" component={UebungsInfo}/>
          <HomeStack.Screen name="Wähle die Dauer" component={VersionsAuswahlText}/>
          <HomeStack.Screen name="Text-Übung" component={TextPlayer}/>
        </HomeStack.Navigator>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    viewPager: {
      flex: 1,
    },
    imagebackground: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      margin: 20,
      width: 200,
      height: 200,
    },
    text25: {
      color: '#fff',
      fontSize: 25,
    },
    gradient: {
      alignItems: 'center',
      borderRadius: 20,
      paddingBottom: 4,
      paddingTop: 4,
      paddingHorizontal: 20,
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: {width:0, height:4},
      shadowRadius: 4,
      shadowOpacity: 0.4,
    }
  });