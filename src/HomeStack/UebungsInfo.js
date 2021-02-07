import React, { useState, Component } from 'react';
import { useEffect } from 'react';
import { render } from 'react-dom';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';

import {kurse} from "../Kursdaten/Kursdatei.js"

export const UebungsInfo =({navigation, route})=>{

    const kursIndex = route.params.kursIndex
    const uebungsIndex = route.params.uebungsIndex

    function generateKogProzList() {
        const KogProzListe = []
        for (var i = 0; i<kurse[kursIndex].Uebungen[uebungsIndex].KognitiveProzesse.length; i++){
            KogProzListe.push({title: kurse[kursIndex].Uebungen[uebungsIndex].KognitiveProzesse[i].Name, content: kurse[kursIndex].Uebungen[uebungsIndex].KognitiveProzesse[i].Beschreibung})
        }
        return KogProzListe
    }
   
  class AccordionView extends Component {
    state = {
      activeSections: [],
    };
   
    _renderHeader = section => {
      return (
        <View style={styles.header}>
          <Text style={styles.headerText}>{section.title}</Text>
        </View>
      );
    };
   
    _renderContent = section => {
      return (
        <View style={styles.content}>
          <Text>{section.content}</Text>
        </View>
      );
    };
   
    _updateSections = activeSections => {
      this.setState({ activeSections });
    };
   
    render() {
      return (
        <View style={styles.container}>
            <Text style={{fontSize:18}}>Informationen zur Übung: {kurse[kursIndex].Uebungen[uebungsIndex].Name}</Text>
            <Text></Text>
            <Text style={{textAlign:"justify"}}>{kurse[kursIndex].Uebungen[uebungsIndex].Info}</Text>
            <Text></Text>
            <Text>Angesprochene kognitive Prozesse:</Text>
            <Accordion
                sections={generateKogProzList()}
                activeSections={this.state.activeSections}
                renderHeader={this._renderHeader}
                renderContent={this._renderContent}
                onChange={this._updateSections}/>
            </View>
      );
    }
}
    return (
        <AccordionView></AccordionView>
    )
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