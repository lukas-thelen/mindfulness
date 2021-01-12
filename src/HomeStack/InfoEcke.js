import React, {useContext} from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity, Alert } from 'react-native';

import {AppContext} from "../context.js"; 
import {kurse} from "../Kursdaten/Kursdatei.js"
import { uebungen } from '../Kursdaten/Uebungsliste.js';

export const InfoEcke=(props)=>{
    const navigation=props.navigation
    const renderItem =({item})=>{
        return(
            <View style={styles.KursItem}>
                    <TouchableOpacity style={styles.info}onPress={()=>{navigation.navigate("Übungsinfo", {kursIndex:item.KursIndex, uebungsIndex:item.UebungsIndex })}}><Text>i</Text></TouchableOpacity>
                    <Text></Text>
                    <TouchableOpacity style={{height:"100%",width:"100%", justifyContent:"center"}}onPress={()=>{navigation.navigate("Wähle eine Version", {kursIndex:item.KursIndex, uebungsIndex:item.UebungsIndex })}} title="Play">
                        {gehoerteUebungen.includes(item.id) ? <Text style={{color: "grey"}}>{item.Name}</Text> : <Text >{item.Name}</Text>}
                        {gehoerteUebungen.includes(item.id) ? <Text style={{color: "grey"}}>Kurs: {kurse[item.KursIndex].Name}</Text> : <Text >Kurs: {kurse[item.KursIndex].Name}</Text>}
                    </TouchableOpacity>
                
            </View>
        )
    }
    const {gehoerteUebungen, userData} = useContext(AppContext);
    const atemuebungen = uebungen.filter(item=>item.Kategorie==="Atemübung"&&userData.verfuegbareUebungen.includes(item.id))
    const mindfulness = uebungen.filter(item=>item.Kategorie==="Mindfulness"&&userData.verfuegbareUebungen.includes(item.id))
 

    return(
        <View>
            <Text>Atemübungen</Text>
            <FlatList
                data={atemuebungen}
                keyExtractor={item=>item.id}
                renderItem={renderItem}
            ></FlatList>
            <Text>Mindfulnes-Übungen</Text>
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
      flexDirection: 'row',
      height:100,
    },
    info:{
        borderWidth:1, 
        borderRadius:100, 
        width:25, 
        height:25, 
        alignItems:"center", 
        justifyContent:"center", 
        backgroundColor:"white"
    }
  });