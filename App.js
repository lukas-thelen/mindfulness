import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {HomeScreen} from './src/Home.js';
import {ProfilScreen} from './src/Profil.js';
import {Anmelden} from './src/Anmelden.js'

const Tab = createBottomTabNavigator();

const Tabnavigator = () =>{
  return(
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Profil" component={ProfilScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}


//App-Component
export default function App() {
  const [loggedIn, changeLoggedIn] = useState(false);
  
  useEffect(()=>{
    getData()
  });

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userData')
      const userData=jsonValue != null ? JSON.parse(jsonValue) : null;
      if(userData.loggedIn){
        console.log("shdfjahsgdafhsd")
        changeLoggedIn(true)
        console.log("sdfgsdf")
      }
    } catch(e) {
      // error reading value
    }
  }

  return (
    <View style={styles.pagewrap}>
      {loggedIn ? <Tabnavigator style={styles.container}/> : <Anmelden changeLoggedIn={changeLoggedIn}/>}
    </View>
  );
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
  }
});
