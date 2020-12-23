import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useContext } from 'react/cjs/react.development';
import { AppContext } from './context';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ProfilScreen = ()=> {
    const username = useContext(AppContext).username;
    const appData = useContext(AppContext).appData
    const userData = useContext(AppContext).userData
    const currentUser = useContext(AppContext).currentUser
    const changeLoggedIn = useContext(AppContext).changeLoggedIn
    const changeCurrentUser = useContext(AppContext).changeCurrentUser
    const logout = async () => {
        try {
          await AsyncStorage.removeItem('currentUser')
          changeLoggedIn(false)
          changeCurrentUser("")
          console.log("erfolgreich")
        } catch (e) {
          console.log(e)
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
            <Button title="abmelden" onPress={()=>{logout()}}></Button> 
            <Button title="test" onPress={()=>{test()}}></Button>
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