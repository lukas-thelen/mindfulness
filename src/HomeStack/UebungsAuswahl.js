import React from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity } from 'react-native';
import { AppContext } from '../context.js';

import {kurse} from "../Kursdaten/Kursdatei.js"

export const UebungsAuswahl =({navigation, route})=>{
    const gehoerteUebungen = useContext(AppContext).gehoerteUebungen
    const renderItem =({item})=>{
        return(
            <TouchableOpacity style={styles.UebungsItem} onPress={()=>{navigation.navigate("Wähle eine Version", {kursIndex:kursIndex, uebung:item.id})}}>
                {gehoerteUebungen.includes(item.id) ? <Text style={{color: "grey"}}>{item.Name}</Text> : <Text >{item.Name}</Text>}
            </TouchableOpacity>    
        )
    }
    const kursIndex = kurse.findIndex(item => item.id === route.params.kurs) 

    return (
        <View>
            <FlatList
                data={kurse[kursIndex].Uebungen}
                keyExtractor={item=>item.id}
                renderItem={renderItem}
            ></FlatList>
        </View>
    )
}

const styles = StyleSheet.create({
    UebungsItem: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      height:100,
    },
  });