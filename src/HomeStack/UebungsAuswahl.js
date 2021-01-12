import { useCardAnimation } from '@react-navigation/stack';
import React from 'react';
import { useContext } from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity } from 'react-native';
import { AppContext } from '../context.js';

import {kurse} from "../Kursdaten/Kursdatei.js"

export const UebungsAuswahl =({navigation, route})=>{
    const {gehoerteUebungen, userData} = useContext(AppContext)
    const renderItem =({item, index})=>{
        var available=false
        if(userData.verfuegbareUebungen.includes(item.id)){
            available=true
        }
        if(available){
            return(
                <TouchableOpacity style={styles.UebungsItem} onPress={()=>{navigation.navigate("Wähle eine Version", {kursIndex:kursIndex, uebungsIndex:index})}}>
                    {gehoerteUebungen.includes(item.id) ? <Text style={{color: "grey"}}>{item.Name}</Text> : <Text >{item.Name}</Text>}
                </TouchableOpacity>    
            )
        }else{
            return(
                <View style={styles.UebungsItemUnavailable}>
                    {gehoerteUebungen.includes(item.id) ? <Text style={{color: "grey"}}>{item.Name}</Text> : <Text >{item.Name}</Text>}
                </View>    
            )
        }
        
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
    UebungsItemUnavailable: {
        flex: 1,
        backgroundColor: '#dddddd',
        alignItems: 'center',
        justifyContent: 'center',
        height:100,
      }
  });