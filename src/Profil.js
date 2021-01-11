import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useContext, useEffect } from 'react/cjs/react.development';
import { AppContext } from './context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import { Einstellungen } from './ProfilStack/Einstellungen';
import { Statistiken } from './ProfilStack/Statistiken';
import { Erfolge } from './ProfilStack/Erfolge';
import { KontoInfos } from './ProfilStack/KontoInfos';
import { AppInfos } from './ProfilStack/AppInfos';

const ProfilStack = createStackNavigator();


export const ProfilRoot = ({navigation})=> {
    const {username, appData, userData, changeAppData, changeUserData, currentUser} = useContext(AppContext);
    const userDataTemp = {...userData}


    useEffect(()=>{
      checkStreak()
    },[])

    const checkStreak=async()=>{
      const today=new Date()
      const yesterday=new Date()
      yesterday.setDate(yesterday.getDate()-1)
      if(!(userData.journal[today.toDateString()]&&userDataTemp.journal[today.toDateString()].meditations)){
        if(!(userData.journal[yesterday.toDateString()]&&userDataTemp.journal[yesterday.toDateString()].meditations)){
        
          userDataTemp.benchmarks.streak=0
          changeUserData(userData)
          appData[userData.data.eMail]=userData
          changeAppData(appData)
          const jsonvalue=JSON.stringify(appData)
          await AsyncStorage.setItem('appData', jsonvalue)
        }
      }
    }
    
      const test = ()=>{
        console.log("appData")
        console.log(appData)
        console.log("UserData")
        console.log(userData)
        console.log("CurrentUser")
        console.log(currentUser)
      }

    return(
        <View style={styles.container}>
            <Text>Hallo {username}</Text>
            <Text>Streak {userData.benchmarks.streak}</Text>
            <Button title="test" onPress={()=>{test()}}></Button>
            <Button title="Einstellungen" onPress={()=>navigation.navigate("Einstellungen")}></Button> 
            <Button title="Statistiken" onPress={()=>navigation.navigate("Statistiken")}></Button> 
            <Button title="Erfolge" onPress={()=>navigation.navigate("Erfolge")}></Button> 
        </View>
    )
}

export const ProfilScreen =() => {
  return (
      <ProfilStack.Navigator>
          <ProfilStack.Screen name="Profil" component={ProfilRoot}/>
          <ProfilStack.Screen name="Einstellungen" component={Einstellungen}/>
          <ProfilStack.Screen name="Statistiken" component={Statistiken}/>
          <ProfilStack.Screen name="Erfolge" component={Erfolge}/>
          <ProfilStack.Screen name="Konto-Informationen" component={KontoInfos}/>
          <ProfilStack.Screen name="Informationen über die App" component={AppInfos}/>
      </ProfilStack.Navigator>
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