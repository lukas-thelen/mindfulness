import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useContext } from 'react/cjs/react.development';
import { AppContext } from './context';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ProfilScreen = ()=> {
    const {username} = useContext(AppContext);
    const {appData} = useContext(AppContext)
    const {userData} = useContext(AppContext)
    const {currentUser} = useContext(AppContext)
    const {changeLoggedIn} = useContext(AppContext)
    const {changeCurrentUser} = useContext(AppContext)
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