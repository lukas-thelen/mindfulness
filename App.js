import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect, useContext} from 'react';
import { Button, StyleSheet, Text, View, Modal } from 'react-native';
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
  const {newBenchmark, changeNewBenchmark} = useContext(AppContext)
  return(
    <View style = { {height: "100%", width: "100%"}}>
      <View style = { {height: "100%", width: "100%"}}>
        <Modal
                  animationType="slide"
                  transparent={true}
                  visible={newBenchmark===""}
              >
                <Text>Test</Text>
          </Modal>
        </View>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Profil" component={ProfilScreen} />
          </Tab.Navigator>
        </NavigationContainer>
    </View>
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
  const [gehoerteUebungen, changeGehoerteUebungen] =useState([])
  const [newBenchmark, changeNewBenchmark] = useState("")

  //wird einmalig beim ersten rendern des Components ausgeführt
  useEffect(()=>{
    getData()
  },[]);

  const appContext ={
    username, changeUsername,
    
    userData, changeUserData,

    loggedIn, changeLoggedIn,

    appData, changeAppData,

    currentUser, changeCurrentUser,

    gehoerteUebungen, changeGehoerteUebungen,

    newBenchmark, changeNewBenchmark

  }

  //lädt Daten aus dem AsyncStorage und setzt die entsprechenden Werte im Kontext ein
  const getData = async () => {
    console.log("gestartet")
    try {
      const appDataV = await AsyncStorage.getItem('appData')
      const currentUserV = await AsyncStorage.getItem('currentUser')
      if (appDataV != null){
        const appDataTemp = JSON.parse(appDataV)
        const currentUserTemp = currentUserV
        console.log(currentUserTemp)
        changeAppData(appDataTemp)
        if(currentUserTemp){
          const userDataTemp = appDataTemp[currentUserTemp]
          const gehoerteUebungenTemp = userDataTemp.gehoerteUebungen
          changeUserData(userDataTemp)
          changeCurrentUser(currentUserTemp)
          changeGehoerteUebungen(gehoerteUebungenTemp)
          changeUsername(userDataTemp.data.name)
          changeLoggedIn(true)
        }
      }
    } catch(e) {
      console.log(e)
    }

    changeIsLoading(false)
  }

  //Wrap für gesamte App - cond. Rendering für angemeldet/nicht angemeldet
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
