import React, { useState } from 'react';
import { useEffect } from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity, TouchableHighlight, Modal, Alert} from 'react-native';

import {kurse} from "../Kursdaten/Kursdatei.js"

export const UebungsInfo =({navigation, route})=>{

    const kursIndex = route.params.kursIndex
    const uebungsIndex = route.params.uebungsIndex
    const [hasBeenClicked, setHasBeenClicked] = useState(false)

    const onPress = () => {
        setHasBeenClicked(!hasBeenClicked)
    }

    const renderItem =({item, index})=>{
        if (hasBeenClicked == false){
            return (
                <TouchableOpacity onPress={onPress}><Text>{item.Name}</Text></TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity onPress={onPress}>
                    <Text>{item.Name}</Text>
                    <Text>{item.Beschreibung}</Text>
                </TouchableOpacity>
            )
        }
    }
    
    return (
        <View style={styles.container}>
            <Text style={{fontSize:18}}>Informationen zur Übung: {kurse[kursIndex].Uebungen[uebungsIndex].Name}</Text>
            <Text></Text>
            <Text style={{textAlign:"justify"}}>{kurse[kursIndex].Uebungen[uebungsIndex].Info}</Text>
            <FlatList  
                data={kurse[kursIndex].Uebungen[uebungsIndex].KognitiveProzesse}
                keyExtractor={item=>item.id}
                renderItem={renderItem}
            ></FlatList>
        </View>
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
    }
  });