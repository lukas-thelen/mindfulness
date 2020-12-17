import React from 'react';
import { useEffect } from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity } from 'react-native';

import {kurse} from "../Kursdaten/Kursdatei.js"

export const UebungsAuswahl =({navigation, route})=>{
    const renderItem =({item})=>{
        return(
            <TouchableOpacity style={styles.UebungsItem} onPress={()=>{navigation.navigate("Wähle eine Version", {kursIndex:kursIndex, uebung:item.id})}}>
                <Text>{item.Name}</Text>
            </TouchableOpacity>    
        )
    }
    const kursIndex = kurse.findIndex(item => item.id === route.params.kursIndex) 

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