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
        <View style={styles.container}>
        <Text style={{fontSize:40, fontWeight:"bold", color: '#fff', marginBottom: 10}}>Upgrade</Text>
        <Text style={{fontSize:25, fontWeight:"bold", color: '#fff',marginBottom: 60}}>your mind</Text>

        
        <TouchableOpacity style={styles.containertext1} onPress={() =>props.changeInitPages('Anmelden')}>
          <Text style={{color: '#fff', fontSize: 25, }}>Anmelden</Text>
           
          </TouchableOpacity>
          <TouchableOpacity style={styles.containertext2} onPress={() =>props.changeInitPages('Registrieren')}>
                <Text style={{color: '#fff', fontSize: 17,textDecorationLine: "underline"}}>Registrieren</Text>
          </TouchableOpacity>
          <Image source={require('../assets/Mädchen(1).png')} style={styles.image}/>
        </View>
        </ImageBackground>
        
       
      
      

    )
}

//Styles
const styles = StyleSheet.create({
    container:{
      flex: 1,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center' ,
    },
    pagewrap:{
      width: '100%',
      height: '100%',
    },
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
      width: '55%',
      height: '5%',
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
      marginTop: 15,
      
    },
    imagebackground: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      position: 'absolute',
      top: '72%',
      left: '54%',
      width: 150,
      height: 150
     
    },
  
  });