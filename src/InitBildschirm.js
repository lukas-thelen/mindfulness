import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Image, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RadioButtonRN from 'radio-buttons-react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { LinearGradient } from 'expo-linear-gradient';

import {AppContext} from './context.js';
import { useContext } from 'react';
export const StartBildschirm = (props) =>{
   

    return(
      
      <ImageBackground source={require('../assets/ErsteSeite.png')} style={styles.imagebackground} imageStyle={{resizeMode:'stretch'}}>
       
        <Text style={{...styles.textM, fontSize:40, marginBottom: 2}}>Upgrade</Text>
        <Text style={{...styles.textM, fontSize:25, marginBottom: 60}}>your mind</Text>

        
        <TouchableOpacity style={styles.containertext1} onPress={() =>props.changeInitPages('Anmelden')}>
          <Text style={{...styles.text, fontSize: 20}}>Anmelden</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.containertext2} onPress={() =>props.changeInitPages('Registrieren')}>
            <Text style={{...styles.text, fontSize: 16,textDecorationLine: "underline"}}>Registrieren</Text>
        </TouchableOpacity>
        <Image source={require('../assets/Mädchen(1).png')} style={styles.image}/>
       
      </ImageBackground>
        
       
      
      

    )
}

//Styles
const styles = StyleSheet.create({
    radio:{
      width: 200,
      borderWidth: 0,
      height:30,
    },
    trennlinie:{
      height:1,
      width:"100%",
      backgroundColor:"black",
      marginBottom:10,
      marginTop:10,
    },
    containertext1: {
      alignItems:'center',
      paddingHorizontal: 40,
      paddingVertical: 5,
      borderRadius: 100,
      backgroundColor: '#464982',
      marginTop: 30,
      shadowColor: 'black',
      shadowOpacity: 0.8,
      elevation: 10,
      shadowRadius: 8,
      shadowOffset : { width: 10, height: 5}
    },
    containertext2: {
      alignItems:'center',
      marginTop: 20,
      
    },
    imagebackground: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      position: 'absolute',
      top: '75%',
      left: '56%',
      width: 150,
      height: 150
    },
    text: {
      color:'#fff',
      fontSize:16,
      fontFamily:'Poppins_400Regular'
    }, 
    textM: {
      color:'#fff',
      fontFamily:'Poppins_500Medium'
    } 
  });