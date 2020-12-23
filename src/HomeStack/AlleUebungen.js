import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {AppContext} from "../context.js"; 
import { useContext } from 'react';
import {kurse} from "../Kursdaten/Kursdatei.js"
import {uebungen} from "../Kursdaten/Uebungsliste.js"

export const AlleUebungen=({navigation})=>{
    const renderItem =({item})=>{
        return(
            <TouchableOpacity style={styles.KursItem} onPress={()=>{navigation.navigate("Wähle eine Version", {kursIndex:item.KursIndex, uebung:item.id })}}>
                {uebungBereitsGehoert(item.id) ? <Text style={{color: "grey"}}>Kurs: {item.Name}</Text> : <Text >Kurs: {item.Name}</Text>}
                {uebungBereitsGehoert(item.id) ? <Text style={{color: "grey"}}>Kurs: {kurse[item.KursIndex].Name}</Text> : <Text >Kurs: {kurse[item.KursIndex].Name}</Text>}
            </TouchableOpacity>
        )
    }
    const atemuebungen = uebungen.filter(item=>item.Kategorie==="Atemübung")
    const mindfulness = uebungen.filter(item=>item.Kategorie==="Mindfulness")
    const gehoerteUebungen = useContext(AppContext).gehoerteUebungen;

    function uebungBereitsGehoert (uebung_id) {
        console.log(gehoerteUebungen.indexOf(uebung_id) > -1)
        return (gehoerteUebungen.indexOf(uebung_id) > -1);
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