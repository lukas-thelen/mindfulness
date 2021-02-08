import React, { useState, Component } from 'react';
import { useEffect } from 'react';
import { render } from 'react-dom';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';

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
        <View style={isActive?{...styles.header, backgroundColor:"pink"}:styles.header}>
          <Text style={styles.headerText}>{content.title}</Text>
        </View>
      );
    };
   
     const _renderContent = (content, id, isActive, sections) => {
      return (
        <View style={styles.content}>
          <Text>{content.content}</Text>
        </View>
      );
    };
      return (
        <View style={styles.container}>
            <Text style={{fontSize:18}}>Informationen zur Übung: {kurse[kursIndex].Uebungen[uebungsIndex].Name}</Text>
            <Text></Text>
            <Text style={{textAlign:"justify"}}>{kurse[kursIndex].Uebungen[uebungsIndex].Info}</Text>
            <Text></Text>
            <Text>Angesprochene kognitive Prozesse:</Text>
            <Accordion
                sections={generateKogProzList()}
                touchableComponent={TouchableOpacity}
                activeSections={activeSections}
                renderHeader={_renderHeader}
                renderContent={_renderContent}
                onChange={changeActiveSections}/>
          </View>
      );
  }


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft:20,
        paddingRight:20,     
    },
    header: {
        alignItems: 'center'
    },
    content: {
        alignItems: 'center'
    }
  });