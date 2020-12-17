import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RadioButtonRN from 'radio-buttons-react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";

import {AppContext} from './context.js';
import { useContext } from 'react';

export const Anmelden = (props) => {



    return(

        <View style={styles.pagewrap, styles.container}>
        
        <Text>E-Mail Adresse</Text>
        <TextInput 
            style={{ height: 20, borderColor: 'gray', borderWidth: 1, width:200, borderRadius:200, paddingLeft:10}}
            onChangeText={text => changeName(text)}></TextInput>

        <View style={styles.trennlinie}/>


        <Text>Passwort</Text>
        <TextInput 
            style={{ height: 20, borderColor: 'gray', borderWidth: 1, width:200, borderRadius:200, paddingLeft:10}}
            onChangeText={text => changeName(text)}></TextInput>

        <View style={styles.trennlinie}/>


        <Button title={"Anmelden"} onPress={() =>{props.finishInit()}} ></Button>
        <Button title={"Zurück"} onPress={() =>{props.changeInitPages('StartBildschirm')}} ></Button>
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
    },
    radio:{
      width: 200,
      borderWidth: 0,
      height:30
    },
    trennlinie:{
      height:1,
      width:"100%",
      backgroundColor:"black",
      marginBottom:10,
      marginTop:10
    }
  });