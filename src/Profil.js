import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { useContext, useEffect } from 'react';
import { AppContext } from './context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import { Einstellungen } from './ProfilStack/Einstellungen';
import { Statistiken } from './ProfilStack/Statistiken';
import { Erfolge } from './ProfilStack/Erfolge';
import { KontoInfos } from './ProfilStack/KontoInfos';
import { AppInfos } from './ProfilStack/AppInfos';
import { Feather } from '@expo/vector-icons';

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
          <View style={{flexDirection:"row", justifyContent:"space-between", width:"100%", padding:15}}>
              <TouchableOpacity onPress={()=>test()}>
                <Feather name="user" size={50} color="white" />
                <Text style={{textAlign:"center"}}>{username}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>navigation.navigate("Einstellungen")}>
                <Feather name="settings" size={50} color="white" />
              </TouchableOpacity>
          </View>
            <View style={styles.container}>
            <Text>Streak {userData.benchmarks.streak}</Text>
            <TouchableOpacity title="Statistiken" onPress={()=>navigation.navigate("Statistiken")}></TouchableOpacity> 
            <TouchableOpacity title="Erfolge" onPress={()=>navigation.navigate("Erfolge")}></TouchableOpacity> 
            </View>
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
      backgroundColor: '#0F113A',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });