import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {kurse} from "../Kursdaten/Kursdatei.js"
import {uebungen} from "../Kursdaten/Uebungsliste.js"

export const AlleUebungen=({navigation})=>{
    const renderItem =({item})=>{
        return(
            <TouchableOpacity style={styles.KursItem} onPress={()=>{navigation.navigate("Wähle eine Version", {kursIndex:item.KursIndex, uebung:item.id })}}>
                <Text>{item.Name}</Text>
                <Text>Kurs: {kurse[item.KursIndex].Name}</Text>
            </TouchableOpacity>
        )
    }
    const atemuebungen = uebungen.filter(item=>item.Kategorie==="Atemübung")
    const mindfulness = uebungen.filter(item=>item.Kategorie==="Mindfulness")

    function uebungBereitsGehoert (uebung_id) {
        return (uebung_id.indexOf(uebung_id) > -1);
    }

    return(
        <View>
            <Text>Atemübungen</Text>
            <FlatList
                data={atemuebungen}
                keyExtractor={item=>item.id}
                renderItem={renderItem}
            ></FlatList>
            <Text>Mindfullnes-Übungen</Text>
            <FlatList
                data={mindfulness}
                keyExtractor={item=>item.id}
                renderItem={renderItem}
            ></FlatList>
        </View>
    )
}

const styles = StyleSheet.create({
    KursItem: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      height:100,
    },
  });