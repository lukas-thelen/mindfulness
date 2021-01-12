import React, {useContext} from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity, Alert, ScrollView, SectionList} from 'react-native';

import {AppContext} from "../context.js"; 
import {kurse} from "../Kursdaten/Kursdatei.js"
import { uebungen } from '../Kursdaten/Uebungsliste.js';
import { Ionicons } from '@expo/vector-icons';

export const InfoEcke=(props)=>{
    const navigation=props.navigation
    const {gehoerteUebungen, userData} = useContext(AppContext);
    const atemuebungen = uebungen.filter(item=>item.Kategorie==="Atemübung")
    const mindfulness = uebungen.filter(item=>item.Kategorie==="Mindfulness")
    const koerperuebung = uebungen.filter(item=>item.Kategorie==="Körperübung")


    const InstantStart =() =>{
        if (gehoerteUebungen.includes(userData.verfuegbareUebungen[(userData.verfuegbareUebungen.length)-1])){
          return null
        }
          for ( var z = 0; z< uebungen.length; z++){
            if (uebungen[z].id === userData.verfuegbareUebungen[(userData.verfuegbareUebungen.length)-1]){
              return <TouchableOpacity onPress={()=>{navigation.navigate("Wähle eine Version", {kursIndex:uebungen[z].KursIndex, uebungsIndex:uebungen[z].UebungsIndex})}}>
                  <Ionicons name="play" size={50} color="black" /> 
              </TouchableOpacity>
            }
        }
    }
    
    const renderItem =({item})=>{
        return(
            <View style={styles.KursItem}>
                    <TouchableOpacity style={styles.info}onPress={()=>{navigation.navigate("Übungsinfo", {kursIndex:item.KursIndex, uebungsIndex:item.UebungsIndex })}}><Text>i</Text></TouchableOpacity>
                    <Text></Text>
                    <TouchableOpacity style={{height:"100%",width:"90%", alignItems:"center", flexDirection:"row", marginRight:20}}onPress={()=>{navigation.navigate("Wähle eine Version", {kursIndex:item.KursIndex, uebungsIndex:item.UebungsIndex })}} title="Play">
                        <View>
                            {gehoerteUebungen.includes(item.id) ? <Text style={{color: "grey"}}>{item.Name}</Text> : <Text >{item.Name}</Text>}
                            {gehoerteUebungen.includes(item.id) ? <Text style={{color: "grey"}}>Kurs: {kurse[item.KursIndex].Name}</Text> : <Text >Kurs: {kurse[item.KursIndex].Name}</Text>}
                        </View>
                        {!userData.verfuegbareUebungen.includes(item.id)&&<Text style={{marginLeft:"auto", color:"red", fontWeight:"bold"}} >!</Text>}
                    </TouchableOpacity>
                
            </View>
        )
    }
 
    const alleUebeungen = [
        {
            title: "Atemübungen",
            data: atemuebungen
        },
        {
            title: "Mindfulness",
            data: mindfulness
        },
        {
            title: "Körperübung",
            data: koerperuebung
        }
    ]
    return(
        <View style={{flex:1}}>
            <View style={{alignItems:"center", justifyContent:"center" ,flex:0.15}}>
                <InstantStart/>
            </View>
            <View style={{flex:0.85}}>
             <SectionList
                sections={alleUebeungen}
                keyExtractor={(item, index) => item + index}
                renderItem={(item) => renderItem(item)}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={styles.header}>{title}</Text>
                )}
            />
            </View>
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
    },
    header: {
        fontSize: 25,
        backgroundColor: "lightgrey"
      },
  });