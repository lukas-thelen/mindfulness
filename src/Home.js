import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const HomeScreen = ()=> {
    const storeData = async () => {
        try {
          await AsyncStorage.setItem('userData', null)
          console.log("erfolgreich")
        } catch (e) {
          console.log(e)
        }
      }

    return(
        <View style={styles.container}>
            <Text>Homescreen</Text> 
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