import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';

export const Anmelden =(props)=>{
    const [name, changeName] = useState("")
    const [birthday, changeBirthday] = useState("")
    const [gender, changeGender] = useState("")

    const storeData = async () => {
      const userData ={loggedIn:true}
      try {
        const jsonValue = JSON.stringify(userData)
        await AsyncStorage.setItem('userData', jsonValue)
        props.changeLoggedIn(true)
        console.log("erfolgreich")
      } catch (e) {
        console.log(e)
      }
    }

    const test = () =>{
        console.log(name)
        console.log(birthday)
        console.log(gender)
    }
    
    return(
      <View style={styles.pagewrap, styles.container}>
        <Text>Name:</Text>
        <TextInput 
            style={{ height: 20, borderColor: 'gray', borderWidth: 1, marginBottom:20}}
            onChangeText={text => changeName(text)}></TextInput>
        {/*<DateTimePicker/>*/}
        <Button title={"zeige Daten"} onPress={() =>{test()}} ></Button>
        <Button title={"anmelden"} onPress={() =>{storeData()}} ></Button>
      </View>
    )
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