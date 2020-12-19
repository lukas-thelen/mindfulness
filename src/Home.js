import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppContext} from './context.js';
import { useContext } from 'react';

export const HomeScreen = ()=> {
  const username = useContext(AppContext).username;
  const changeLoggedIn = useContext(AppContext).changeLoggedIn
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