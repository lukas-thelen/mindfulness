import React, { useState, Component } from 'react';
import { useEffect } from 'react';
import { render } from 'react-dom';
import { ImageBackground } from 'react-native';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import { Ionicons } from '@expo/vector-icons';

import {kurse} from "../Kursdaten/Kursdatei.js"

export const UebungsInfo =({navigation, route})=>{

    const kursIndex = route.params.kursIndex
    const uebungsIndex = route.params.uebungsIndex
    const [activeSections, changeActiveSections] = useState([])

    function generateKogProzList() {
        const KogProzListe = []
        for (var i = 0; i<kurse[kursIndex].Uebungen[uebungsIndex].KognitiveProzesse.length; i++){
            KogProzListe.push({title: kurse[kursIndex].Uebungen[uebungsIndex].KognitiveProzesse[i].Name, content: kurse[kursIndex].Uebungen[uebungsIndex].KognitiveProzesse[i].Beschreibung})
        }
        return KogProzListe
    }
   
   
     const _renderHeader = (content, id, isActive, sections) => {
      return (
        <View style={isActive?{...styles.header, backgroundColor:"#D476D5"}:styles.header}>
          <Text style={{...styles.text, textDecorationLine:'underline', marginRight:5}}>{content.title}</Text>
          <Ionicons name="information-circle-outline" size={20} color="white" />
        </View>
      );
    };
   
     const _renderContent = (content, id, isActive, sections) => {
      return (
        <View style={{alignItems:'center',flex:1}}>
          <Text style={{...styles.text, fontSize:14}}>{content.content}</Text>
        </View>
      );
    };
      return (
        <ImageBackground source={require('../../assets/Profil.png')} style={styles.imagebackground} imageStyle={{resizeMode:'stretch'}}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.container}>
            <Text style={styles.textM}>{kurse[kursIndex].Uebungen[uebungsIndex].Name}</Text>
            <Text style={{...styles.text, textAlign:'left', marginBottom:30}}>{kurse[kursIndex].Uebungen[uebungsIndex].Info}</Text>
            <Text style={{...styles.text, marginBottom:15}}>Angesprochene kognitive Prozesse:</Text>
            <Accordion
                sections={generateKogProzList()}
                touchableComponent={TouchableOpacity}
                activeSections={activeSections}
                renderHeader={_renderHeader}
                renderContent={_renderContent}
                onChange={changeActiveSections}/>
          </View>
          <View style={{height:60}}/>
        </ScrollView>
        </ImageBackground>
      );
  }


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#0F113A90",
        width:'90%',
        paddingHorizontal:20, 
        paddingVertical:20,
        borderRadius:15 
    },
    contentContainer: {
      alignItems:'center',
      width:'100%',
    },
    header: {
        alignItems: 'center',
        borderRadius:10,
        paddingVertical:3,
        flexDirection:'row',
        justifyContent:'center'
    },
    text: {
      color: '#fff',
      fontSize: 16,
      fontFamily: 'Poppins_400Regular',
      textAlign: 'center'
    },
    textM: {
      fontFamily:'Poppins_500Medium',
      fontSize:18,
      color:'#fff',
      marginBottom:20
    },
    imagebackground: {
      flex: 1,
      alignItems:'center',
    },
  });