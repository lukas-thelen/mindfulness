import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppContext} from './context.js';
import { useContext } from 'react';

export const HomeScreen = ()=> {
  const username = useContext(AppContext).username;
  const changeLoggedIn = useContext(AppContext).changeLoggedIn
  const appData = useContext(AppContext).appData
  const userData = useContext(AppContext).userData
  const currentUser = useContext(AppContext).currentUser
    const storeData = async () => {
        try {
          await AsyncStorage.removeItem('currentUser')
          changeLoggedIn(false)
          console.log("erfolgreich")
        } catch (e) {
          console.log(e)
        }
      }

    return(
        <View style={styles.container}>
            <Text>Hallo {username}</Text> 
            <Button title={"abmelden"} onPress={() =>{storeData()}} ></Button>
            <Button title={"test"} onPress={()=>{
                        console.log("appData")
                        console.log(appData)
                        console.log("UserData")
                        console.log(userData)
                        console.log("CurrentUser")
                        console.log(currentUser)
            }}/>
        </View>
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