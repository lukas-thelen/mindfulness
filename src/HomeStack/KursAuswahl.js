import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity } from 'react-native';

import {kurse} from "../Kursdaten/Kursdatei.js"

export const KursAuswahl =({navigation})=>{
    const renderItem =({item})=>{
        return(
            <TouchableOpacity style={styles.KursItem} onPress={()=>{navigation.navigate("Wähle eine Übung!", {kurs:item.id})}}>
                <Text>{item.Name}</Text>
            </TouchableOpacity>    
        )
    }
    return (
        <View>
            <FlatList
                data={kurse}
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