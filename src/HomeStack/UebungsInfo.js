import React, { useState, Component } from 'react';
import { useEffect } from 'react';
import { render } from 'react-dom';
import { ImageBackground } from 'react-native';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity, ScrollView, Linking } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import {kurse} from "../Kursdaten/Kursdatei.js"

export const UebungsInfo =({navigation, route})=>{

    const kursIndex = route.params.kursIndex
    const uebungsIndex = route.params.uebungsIndex
    const [activeSections, changeActiveSections] = useState([])
    const [activeSectionsGeneral, changeActiveSectionsGeneral] = useState([])
    const [generalHeight, changeGeneralHeight] = useState(0)
    const [effectsHeight, changeEffectsHeight] = useState(0)
    const [moreGeneral, changeMoreGeneral]=useState(false)
    const [moreEffect, changeMoreEffect]=useState(false)
    const [showGeneral, changeShowGeneral] = useState(true)
    const blockHeight=300

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
            <View style={{flexDirection:"row", flex:0.07, marginTop:15}}> 
              <TouchableOpacity style={showGeneral?{...styles.tab, backgroundColor:"#464982"}:{...styles.tab, backgroundColor:"#46498290"}} onPress={()=>changeShowGeneral(true)}><Text style={styles.text}>Allgemein</Text></TouchableOpacity>
              <TouchableOpacity style={!showGeneral?{...styles.tab, backgroundColor:"#464982"}:{...styles.tab, backgroundColor:"#46498290"}} onPress={()=>changeShowGeneral(false)}><Text style={styles.text}>Wirkung</Text></TouchableOpacity>
            </View>
              {showGeneral?
                <LinearGradient
                  colors={['#464982', '#0F113A90']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 0.4}}
                  style={styles.container}>
                  <ScrollView>
                    <View style={styles.inner}>
                      <Text style={styles.textM}>{kurse[kursIndex].Uebungen[uebungsIndex].Name}</Text>

                      {/* Nur der Text wird angezeigt, wenn der Text kurz genug ist */}
                      {generalHeight<blockHeight+30?
                        <View onLayout={(event) => {var {x, y, width, height} = event.nativeEvent.layout;changeGeneralHeight(height)}}>
                          <Text style={{...styles.text, textAlign:'left', marginBottom:30}} >
                            {kurse[kursIndex].Uebungen[uebungsIndex].Allgemeines}
                          </Text>
                          {kurse[kursIndex].Uebungen[uebungsIndex].Referenz&&<View><Text style={{...styles.text, textAlign:'left'}}>Audioaufnahmen von:</Text>
                                <Text style={{...styles.text, textAlign:'left', marginBottom:20, textDecorationLine:"underline"}} onPress={()=>{Linking.openURL("https://www.youtube.com/watch?v=gqCtSL8WcpA")}}>Stephan Faulhaber</Text></View>}
                                </View>
                        :
                        <View>

                          {/* äußerer View beschneidet Text, wenn "mehr anzeigen" nicht aktiviert ist*/}
                          {moreGeneral?
                            <View>
                            <Text style={{...styles.text, textAlign:'left', marginBottom:10}}>{kurse[kursIndex].Uebungen[uebungsIndex].Allgemeines}</Text>
                            {kurse[kursIndex].Uebungen[uebungsIndex].Referenz&&<View><Text style={{...styles.text, textAlign:'left'}}>Audioaufnahmen von:</Text>
                                <Text style={{...styles.text, textAlign:'left', marginBottom:20, textDecorationLine:"underline"}} onPress={()=>{Linking.openURL("https://www.youtube.com/watch?v=gqCtSL8WcpA")}}>Stephan Faulhaber</Text></View>}
                                </View>:
                            <View style={{maxHeight:blockHeight, overflow:"hidden", flex:1,marginBottom:10}}>
                              <LinearGradient
                                colors={['#ffffff00', '#ffffffb0']}
                                start={{ x: 0.5, y: 0.96 }}
                                end={{ x: 0.5, y: 0.99}}
                                style={{flexShrink:1}}>
                                <Text style={{...styles.text, textAlign:'left', marginBottom:20}}>{kurse[kursIndex].Uebungen[uebungsIndex].Allgemeines}</Text>
                                {kurse[kursIndex].Uebungen[uebungsIndex].Referenz&&<View><Text style={{...styles.text, textAlign:'left'}}>Audioaufnahmen von:</Text>
                                <Text style={{...styles.text, textAlign:'left', marginBottom:20, textDecorationLine:"underline"}} onPress={()=>{Linking.openURL("https://www.youtube.com/watch?v=gqCtSL8WcpA")}}>Stephan Faulhaber</Text></View>}
                              </LinearGradient>
                            </View>
                          }
                          <TouchableOpacity onPress={()=>{changeMoreGeneral(!moreGeneral)}}>
                            <Text style={{...styles.text, marginBottom:20, textDecorationLine:"underline"}}>{moreGeneral?"weniger anzeigen":"mehr anzeigen"}</Text>
                          </TouchableOpacity>
                        </View>
                      }
                      <Accordion
                          sections={generateGeneralList()}
                          touchableComponent={TouchableOpacity}
                          activeSections={activeSectionsGeneral}
                          renderHeader={_renderHeader}
                          renderContent={_renderContent}
                          onChange={changeActiveSectionsGeneral}/>
                    </View>
                  </ScrollView>
                </LinearGradient>
              :
                <LinearGradient
                  colors={['#464982', '#0F113A90']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 0.4}}
                  style={styles.container}>
                  <ScrollView>
                    <View style={styles.inner}>
                      <Text style={styles.textM}>{kurse[kursIndex].Uebungen[uebungsIndex].Name}</Text>
                      {/* Nur der Text wird angezeigt, wenn der Text kurz genug ist */}
                      {effectsHeight<blockHeight+30?
                          <Text style={{...styles.text, textAlign:'left', marginBottom:30}} onLayout={(event) => {var {x, y, width, height} = event.nativeEvent.layout;changeEffectsHeight(height)}}>
                            {kurse[kursIndex].Uebungen[uebungsIndex].Info}
                          </Text>
                        :
                        <View>

                          {/* äußerer View beschneidet Text, wenn "mehr anzeigen" nicht aktiviert ist*/}
                          {moreEffect?
                            <Text style={{...styles.text, textAlign:'left', marginBottom:10}}>{kurse[kursIndex].Uebungen[uebungsIndex].Info}</Text>:
                            <View style={{maxHeight:blockHeight, overflow:"hidden", flex:1,marginBottom:10}}>
                              <LinearGradient
                                colors={['#ffffff00', '#ffffffb0']}
                                start={{ x: 0.5, y: 0.96 }}
                                end={{ x: 0.5, y: 0.99}}
                                style={{flexShrink:1}}>
                                <Text style={{...styles.text, textAlign:'left', marginBottom:20}}>{kurse[kursIndex].Uebungen[uebungsIndex].Info}</Text>
                              </LinearGradient>
                            </View>
                          }
                          <TouchableOpacity onPress={()=>{changeMoreEffect(!moreEffect)}}>
                            <Text style={{...styles.text, marginBottom:20, textDecorationLine:'underline'}}>{moreEffect?"weniger anzeigen":"mehr anzeigen"}</Text>
                          </TouchableOpacity>
                        </View>
                      }
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
                </LinearGradient>
              }
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