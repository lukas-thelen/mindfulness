import React, { useState, Component } from 'react';
import { useEffect } from 'react';
import { render } from 'react-dom';
import { ImageBackground } from 'react-native';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import {kurse} from "../Kursdaten/Kursdatei.js"

export const UebungsInfo =({navigation, route})=>{

    const kursIndex = route.params.kursIndex
    const uebungsIndex = route.params.uebungsIndex
    const [activeSections, changeActiveSections] = useState([])
    const [activeSectionsGeneral, changeActiveSectionsGeneral] = useState([])
    const [showGeneral, changeShowGeneral] = useState(true)

    function generateKogProzList() {
        const KogProzListe = []
        for (var i = 0; i<kurse[kursIndex].Uebungen[uebungsIndex].KognitiveProzesse.length; i++){
            KogProzListe.push({title: kurse[kursIndex].Uebungen[uebungsIndex].KognitiveProzesse[i].Name, content: kurse[kursIndex].Uebungen[uebungsIndex].KognitiveProzesse[i].Beschreibung})
        }
        return KogProzListe
    }

    function generateGeneralList(){
        return[
          {title:"Herkunft", content:kurse[kursIndex].Uebungen[uebungsIndex].Herkunft},
          {title:"Effekt", content:kurse[kursIndex].Uebungen[uebungsIndex].Effekt}
        ]
    }
   
     const _renderHeader = (content, id, isActive, sections) => {
      return (
        <View style={isActive?{...styles.header, borderBottomWidth:1}:styles.header}>
          <Ionicons style={{flex:0.1}}name={isActive?"caret-down-outline":"caret-forward-outline"} size={20} color="white" />
          <Text style={{...styles.text, marginLeft:5, flex:0.9, textAlign:"left"}}>{content.title}</Text>
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
          <View style={{width:"90%", alignSelf:"center", flex:1}}>
            <View style={{flexDirection:"row", flex:0.07}}> 
              <TouchableOpacity style={showGeneral?{...styles.tab, backgroundColor:"#464982"}:{...styles.tab, backgroundColor:"#46498290"}} onPress={()=>changeShowGeneral(true)}><Text style={styles.text}>Allgemein</Text></TouchableOpacity>
              <TouchableOpacity style={!showGeneral?{...styles.tab, backgroundColor:"#464982"}:{...styles.tab, backgroundColor:"#46498290"}} onPress={()=>changeShowGeneral(false)}><Text style={styles.text}>Wirkung</Text></TouchableOpacity>
            </View>
              {showGeneral?<LinearGradient
                colors={['#464982', '#0F113A90']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0.1, y: 0.3}}
                style={styles.container}>
                <ScrollView>
                  <View style={styles.inner}>
                    <Text style={styles.textM}>{kurse[kursIndex].Uebungen[uebungsIndex].Name}</Text>
                    <Text style={{...styles.text, textAlign:'left', marginBottom:30}}>{kurse[kursIndex].Uebungen[uebungsIndex].Allgemeines}</Text>
                    <Accordion
                        sections={generateGeneralList()}
                        touchableComponent={TouchableOpacity}
                        activeSections={activeSectionsGeneral}
                        renderHeader={_renderHeader}
                        renderContent={_renderContent}
                        onChange={changeActiveSectionsGeneral}/>
                  </View>
              </ScrollView>
              </LinearGradient>:
              <LinearGradient
              colors={['#464982', '#0F113A90']}
              start={{ x: 1, y: 0 }}
              end={{ x: 0.9, y: 0.3}}
              style={styles.container}>
                <ScrollView>
                  <View style={styles.inner}>
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
              </ScrollView>
              </LinearGradient>}
          </View>
          <View style={{height:60}}/>
        </ImageBackground>
      );
  }


const styles = StyleSheet.create({
    container: {
        flex: 0.93,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius:15,
        borderBottomRightRadius:15 
    },
    inner:{
      flex: 1,
      paddingHorizontal:20, 
      paddingVertical:20,
    },
    contentContainer: {
      alignItems:'center',
      width:'100%',
    },
    header: {
        alignItems: 'center',
        paddingVertical:3,
        flexDirection:'row',
        justifyContent:'flex-start',
        borderColor:"white",
        borderTopWidth:1
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
    tab:{
      flex:1,
      alignItems:"center",
      justifyContent:"center",
      borderTopLeftRadius:20,
      borderTopRightRadius:20,
  },
  chartBackground:{
    flex:0.93,
    paddingTop:10,
    paddingHorizontal:10
},
  });