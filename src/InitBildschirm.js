import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RadioButtonRN from 'radio-buttons-react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";

import {AppContext} from './context.js';
import { useContext } from 'react';
export const StartBildschirm = (props) =>{
   

    return(
        <View style={styles.pagewrap, styles.container}>
        
        <Text style={{fontSize:30, fontWeight:"bold", color: '#fff'}}>Upgrade</Text>
        <Text style={{fontSize:20, fontWeight:"bold", color: '#fff'}}>Your Mind</Text>

        <View style={styles.trennlinie}/>

        <TouchableOpacity style={styles.containertext1} onPress={() =>props.changeInitPages('Anmelden')}>
              <Text style={{color: '#fff', fontSize: 20}}>Anmelden</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.containertext1} onPress={() =>props.changeInitPages('Registrieren')}>
              <Text style={{color: '#fff', fontSize: 20}}>Registrieren</Text>
        </TouchableOpacity>
      </View>
      

    )
}

//Styles
const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      backgroundColor: '#0F113A',
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
    },
    containertext1: {
      alignItems:'center',
      width: '40%',
      height: '4%',
      borderRadius: 100,
      backgroundColor: '#80DEE4',
      marginTop: 30,
      shadowColor: 'black',
      shadowOpacity: 0.8,
      elevation: 10,
      shadowRadius: 8,
      shadowOffset : { width: 10, height: 5}
    },
  });