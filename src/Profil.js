import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, ImageBackground } from 'react-native';
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
      <ImageBackground source={require('../assets/Profil.png')} style={styles.imagebackground}>
        <View style={styles.container}>
          
          <View style={{flexDirection:"row", justifyContent:"space-between", width:"100%", padding:15, flex:0.15}}>
            <TouchableOpacity onPress={()=>test()}>
              <Feather name="user" size={50} color="white" />
              <Text style={{textAlign:"center", color:'#fff'}}>{username}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate("Einstellungen")}>
              <Feather name="settings" size={50} color="white" />
            </TouchableOpacity>
          </View>

          <View style={{flex:0.2, alignItems:'center', width:'90%'}}>
          <TouchableOpacity style={styles.streak} onPress={()=>navigation.navigate("Statistiken")}>
              <Text style={{color:'#fff'}}>Streak {userData.benchmarks.streak}</Text>
              <Text style={{color:'#fff', marginLeft:'auto'}}>Gesamtminuten </Text>
            </TouchableOpacity> 
          </View>

          <View style={{flex:0.65, width: '90%'}}>
            <View style={styles.background}>
                <TouchableOpacity style={styles.item} onPress={()=>navigation.navigate("Statistiken")}>
                  <Text style={{color:'#fff'}}>Statistiken</Text>
                </TouchableOpacity> 
                <TouchableOpacity style={styles.item} onPress={()=>navigation.navigate("Erfolge")}>
                  <Text style={{color:'#fff'}}>Erfolge</Text>
                </TouchableOpacity>
            </View>
          </View>

        </View>
      </ImageBackground>
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
      alignItems: 'center',
      justifyContent: 'center',
    },
    item: {
      backgroundColor: '#464982',
      borderRadius: 10,
      height: 50,
      marginVertical: 3.5,
      alignItems: 'center',
      justifyContent: 'center',
      width: '90%',
    },
    streak: {
      backgroundColor: '#464982',
      borderRadius: 10,
      height: 50,
      marginVertical: 4,
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingHorizontal: 15,
      width: '90%',
      flexDirection: 'row',
    },
    background: {
      backgroundColor: "#0F113A90",
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical:10,
    },
    imagebackground: {
      flex: 1,
      resizeMode: 'cover',
    },
  });