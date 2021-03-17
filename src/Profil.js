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
import { Ionicons } from '@expo/vector-icons';
import { StressSkalaMonthly } from './ProfilStack/StressSkalaMonthly';

const ProfilStack = createStackNavigator();


export const ProfilRoot = ({navigation})=> {
    const {username, appData, userData, changeAppData, changeUserData, currentUser} = useContext(AppContext);
    const userDataTemp = {...userData}


    useEffect(()=>{
      checkStreak()
    },[])

    const getMinutes=(version)=>{
      var minutes=0
      var amount=0
      for(i in userData.journal){
          if(userData.journal[i].meditations){
              amount+=parseInt(userData.journal[i].meditations)
              minutes+=parseInt(userData.journal[i].meditationMinutes)  
          }
      }
      return minutes
  }

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
      <ImageBackground source={require('../assets/Profil.png')} style={styles.imagebackground} imageStyle={{resizeMode:'stretch'}}>
          
          <View style={{flexDirection:"row", justifyContent:"space-between", width:"100%", padding:15, flex:0.15}}>
            <TouchableOpacity onPress={()=>test()}>
              <Ionicons name="person-outline" size={36} color="white" />
              <Text style={{...styles.text,textAlign:"center", fontSize:16}}>{username}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate("Einstellungen")}>
              <Ionicons name="cog-outline" size={36} color="white" />
            </TouchableOpacity>
          </View>


          <View style={{flex:0.2, alignItems:'center', width:'90%'}}>
          <View style={styles.streak} >
              <Ionicons name="flame-outline" size={16} color="white" />
              <Text style={{...styles.text, marginLeft:4}}>Streak {userData.benchmarks.streak}</Text>
              <Text style={{...styles.text, marginLeft:'auto'}}>Gesamtminuten {getMinutes()}</Text>
            </View> 
          </View>

          <View style={{flex:0.65, width: '90%'}}>
            <View style={styles.background}>
                <TouchableOpacity style={styles.item} onPress={()=>navigation.navigate("Statistiken")}>
                  <Ionicons name="stats-chart-outline" size={16} color="white" />
                  <Text style={{...styles.text, marginLeft:10}}>Statistiken</Text>
                </TouchableOpacity> 
                <TouchableOpacity style={styles.item} onPress={()=>navigation.navigate("Erfolge")}>
                  <Ionicons name="trophy-outline" size={16} color="white" />
                  <Text style={{...styles.text, marginLeft:10}}>Erfolge</Text>
                </TouchableOpacity>
            </View>
          </View>

          <View style={{height:60}}/>
      </ImageBackground>
    )
}

export const ProfilScreen =() => {
  return (
      <ProfilStack.Navigator>
          <ProfilStack.Screen name="Profil" component={ProfilRoot} options={{
            title: 'Profil',
            headerStyle: {
              backgroundColor: '#0F113A',
            },
            headerTintColor: '#D476D5',
            headerTitleStyle: {
              fontSize: 25,
              fontFamily: 'Poppins_500Medium'
            },
          }}/>
          <ProfilStack.Screen name="Einstellungen" component={Einstellungen} options={{
            title: 'Einstellungen',
            headerStyle: {
              backgroundColor: '#0F113A',
            },
            headerTintColor: '#D476D5',
            headerTitleStyle: {
              fontSize: 25,
              fontFamily: 'Poppins_500Medium'
            },
          }}/>
          <ProfilStack.Screen name="Stress-Umfrage" component={StressSkalaMonthly} options={{
            title: 'Stress-Umfrage',
            headerStyle: {
              backgroundColor: '#0F113A',
            },
            headerTintColor: '#D476D5',
            headerTitleStyle: {
              fontSize: 25,
              fontFamily: 'Poppins_500Medium'
            },
          }}/>
          <ProfilStack.Screen name="Statistiken" component={Statistiken} options={{
            title: 'Statistiken',
            headerStyle: {
              backgroundColor: '#0F113A',
            },
            headerTintColor: '#D476D5',
            headerTitleStyle: {
              fontSize: 25,
              fontFamily: 'Poppins_500Medium'
            },
          }}/>
          <ProfilStack.Screen name="Erfolge" component={Erfolge} options={{
            title: 'Erfolge',
            headerStyle: {
              backgroundColor: '#0F113A',
            },
            headerTintColor: '#D476D5',
            headerTitleStyle: {
              fontSize: 25,
              fontFamily: 'Poppins_500Medium'
            },
          }}/>
          <ProfilStack.Screen name="Konto-Informationen" component={KontoInfos} options={{
            title: 'Account',
            headerStyle: {
              backgroundColor: '#0F113A',
            },
            headerTintColor: '#D476D5',
            headerTitleStyle: {
              fontSize: 25,
              fontFamily: 'Poppins_500Medium'
            },
          }}/>
          <ProfilStack.Screen name="Informationen über die App" component={AppInfos} options={{
            title: 'Appinfo',
            headerStyle: {
              backgroundColor: '#0F113A',
            },
            headerTintColor: '#D476D5',
            headerTitleStyle: {
              fontSize: 25,
              fontFamily: 'Poppins_500Medium'
            },
          }}/>
      </ProfilStack.Navigator>
  )
}

const styles = StyleSheet.create({
    item: {
      backgroundColor: '#464982',
      borderRadius: 10,
      height: 50,
      marginVertical: 3.5,
      alignItems: 'center',
      justifyContent: 'center',
      width: '90%',
      flexDirection: 'row'
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
      alignItems:'center'
    },
    text: {
      color:'#fff',
      fontFamily:'Poppins_400Regular',
      fontSize:14
    }
  });