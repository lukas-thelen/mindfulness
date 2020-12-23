import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RadioButtonRN from 'radio-buttons-react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";

import {AppContext} from './context.js';
import { useContext } from 'react';

export const StartBildschirm = (props) =>{
   

    return(
        <View style={styles.pagewrap, styles.container}>
        
        <Text>App-Name</Text>

        <View style={styles.trennlinie}/>


        <Button title={"Anmelden"} onPress={() =>{props.changeInitPages('Anmelden')}} ></Button>
        <Button title={"Registrieren"} onPress={() =>{props.changeInitPages('Registrieren')}} ></Button>
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