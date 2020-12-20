import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {HomeScreen} from './src/Home.js';
import {ProfilScreen} from './src/Profil.js';
import {Registrieren} from './src/Registrieren.js';
import {Anmelden} from './src/Anmelden.js';
import {StartBildschirm} from './src/InitBildschirm.js';
import {AppContext} from './src/context.js';
import {AchtsamkeitsAbfrage} from './src/AchtsamkeitsAbfrage.js';
import { Init } from './src/Init.js';

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
  const [username, changeUsername] =useState("")
  const [appData, changeAppData] = useState({})
  const [userData, changeUserData] = useState({});
  const [currentUser, changeCurrentUser] = useState("")
  const [isLoading, changeIsLoading] = useState(true)
  
  useEffect(()=>{
    getData()
  },[]);

  const appContext ={
    username:username, 
    changeUsername:(name)=>{changeUsername(name)},
    
    userData:userData,
    changeUserData:(x) =>{changeUserData(x)},

    loggedIn:loggedIn,
    changeLoggedIn:(x) =>{changeLoggedIn(x)},

    appData:appData,
    changeAppData:(x) =>{changeAppData(x)},

    currentUser:currentUser,
    changeCurrentUser:(x) =>{changeCurrentUser(x)},

  }

  const getData = async () => {
    console.log("gestartet")
    try {
      const appDataV = await AsyncStorage.getItem('appData')
      const currentUserV = await AsyncStorage.getItem('currentUser')
      if (appDataV != null){
        const appDataTemp = JSON.parse(appDataV)
        const currentUserTemp = currentUserV
        changeAppData(appDataTemp)
        if(currentUserTemp){
          const userDataTemp = appDataTemp[currentUserTemp]
          changeUserData(userDataTemp)
          changeCurrentUser(currentUserTemp)
          changeUsername(userDataTemp.data.name)
          changeLoggedIn(true)
        }
      }
    } catch(e) {
      console.log(e)
    }

    changeIsLoading(false)
  }

  return (


    <AppContext.Provider value={appContext}>
      <View style={styles.pagewrap}>
        {loggedIn ? <Tabnavigator style={styles.container}/> : <Init changeLoggedIn={changeLoggedIn}/>}
      </View>
    </AppContext.Provider>

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
