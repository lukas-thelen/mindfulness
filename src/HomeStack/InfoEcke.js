import React, {useContext, useState} from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity, Alert, ScrollView, SectionList, ImageBackground, TextInput, KeyboardAvoidingView} from 'react-native';


import {AppContext} from "../context.js"; 
import {kurse} from "../Kursdaten/Kursdatei.js"
import { uebungen } from '../Kursdaten/Uebungsliste.js';
import { Ionicons } from '@expo/vector-icons';
import { withSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';

export const InfoEcke=(props)=>{
    const navigation=props.navigation
    const {gehoerteUebungen, userData} = useContext(AppContext);
    const atemuebungen = uebungen.filter(item=>item.Kategorie==="Atemübung")
    const mindfulness = uebungen.filter(item=>item.Kategorie==="Meditationen")
    const koerperuebung = uebungen.filter(item=>item.Kategorie==="Körperübung")
    const [TextValue, onChangeText] = useState('');


    const InstantStart =() =>{
        var foundPrio = null
        var found = null
        for ( var z = 0; z< uebungen.length; z++){
          if (uebungen[z].id === userData.verfuegbareUebungen[(userData.verfuegbareUebungen.length)-1]
            &&!gehoerteUebungen.includes(userData.verfuegbareUebungen[(userData.verfuegbareUebungen.length)-1])){
            foundPrio=z
          }
          if(!gehoerteUebungen.includes(uebungen[z].id)&&found===null){
            found=z
          }
        }
        if(found===null&&foundPrio===null){
          found=Math.round(Math.random()*uebungen.length)
        }
        if (foundPrio!=null) found=foundPrio
        return (
          <TouchableOpacity onPress={()=>{
              if(uebungen[found].Audio){
                navigation.navigate("Wähle eine Version", {kursIndex:uebungen[found].KursIndex, uebungsIndex:uebungen[found].UebungsIndex})
              }else{
                navigation.navigate("Wähle die Dauer", {kursIndex:uebungen[found].KursIndex, uebungsIndex:uebungen[found].UebungsIndex})
              }
          }}>
            <Ionicons name="play" size={50} color="#8F92E3" style={styles.playButton} /> 
          </TouchableOpacity>
        )
      }
    
    const renderItem =({item})=>{
        return(
            <View>
                {gehoerteUebungen.includes(item.id) ? 
                    (<View style={styles.KursItemDone}>
                        <TouchableOpacity style={styles.info}onPress={()=>{navigation.navigate("Übungsinfo", {kursIndex:item.KursIndex, uebungsIndex:item.UebungsIndex })}}>
                            <Ionicons name="information-circle-outline" size={26} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity style={{alignItems:"center", flexDirection:"row", width: '85%'}}onPress={()=>{
                            if(item.Audio){
                                navigation.navigate("Wähle eine Version", {kursIndex:item.KursIndex, uebungsIndex:item.UebungsIndex})
                            }else{
                                navigation.navigate("Wähle die Dauer", {kursIndex:item.KursIndex, uebungsIndex:item.UebungsIndex})
                            }
                        }}>
                            <View>
                            <Text style={styles.text}>{item.Name}</Text>
                                <Text style={styles.text} >Kurs: {kurse[item.KursIndex].Name}</Text>
                            </View>
                            {!userData.verfuegbareUebungen.includes(item.id)&&<Text style={{marginLeft:"auto", color:"white", fontWeight:"bold"}} >!</Text>}
                        </TouchableOpacity>
                    
                    </View>) :
                    (<View style={styles.KursItem}>

                        <TouchableOpacity style={styles.info}onPress={()=>{navigation.navigate("Übungsinfo", {kursIndex:item.KursIndex, uebungsIndex:item.UebungsIndex })}}>
                            <Ionicons name="information-circle-outline" size={26} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity style={{alignItems:"center", flexDirection:"row", width: '85%'}}onPress={()=>{
                            if(item.Audio){
                                navigation.navigate("Wähle eine Version", {kursIndex:item.KursIndex, uebungsIndex:item.UebungsIndex})
                            }else{
                                navigation.navigate("Wähle die Dauer", {kursIndex:item.KursIndex, uebungsIndex:item.UebungsIndex})
                            }
                        }}>
                            <View>
                                <Text style={styles.text}>{item.Name}</Text>
                                <Text style={styles.text} >Kurs: {kurse[item.KursIndex].Name}</Text>
                            </View>
                            {!userData.verfuegbareUebungen.includes(item.id)&&<Text style={{marginLeft:"auto", color:"white", fontWeight:"bold"}} >!</Text>}
                        </TouchableOpacity>
                    </View>)}
            </View>
            
        )
    }
 
    const alleUebeungen = [
        {
            title: "Atemübungen",
            data: atemuebungen
        },
        {
            title: "Meditationen",
            data: mindfulness
        },
        {
            title: "Körperübung",
            data: koerperuebung
        }
    ]

    const SuchListe = () => {
        const TeilListe = [
            {
                title: "Atemübungen",
                data: atemuebungen.filter(item=>{let text=item.Name.toLowerCase(); return text.includes(TextValue.toLowerCase())})
            },
            {
                title: "Mindfulness",
                data: mindfulness.filter(item=>{let text=item.Name.toLowerCase(); return text.includes(TextValue.toLowerCase())})
            },
            {
                title: "Körperübung",
                data: koerperuebung.filter(item=>{let text=item.Name.toLowerCase(); return text.includes(TextValue.toLowerCase())})
            }
        ]
        if (TextValue == '') {
            return alleUebeungen
        } else {
            return TeilListe
        }
    }

    return(
        <ImageBackground source={require('../../assets/Startseite.png')} style={styles.imagebackground} imageStyle={{resizeMode:'stretch'}}>
        
                <View style={{alignItems:"center", justifyContent:"center" ,flex:0.15}}>
                    <InstantStart />
                </View>
                <View style={{flex:0.1}}>
                <View style={styles.searchbackground}> 
                    <Ionicons name="search-outline" size={20} color="white" />
                    <TextInput
                        style={styles.search}
                        onChangeText={text => onChangeText(text)}
                        value={TextValue}
                        />
                    {TextValue!=""&&<Ionicons name="close-outline" size={32} color="white" onPress={()=>{onChangeText("")}}/>}

                </View>
                </View>
                <View style={styles.background} >
                    <View>
                    <SectionList
                        sections={SuchListe()}
                        keyExtractor={(item, index) => item + index}
                        renderItem={(item) => renderItem(item)}
                        renderSectionHeader={({ section: { title } }) => (
                            <TouchableOpacity style={styles.header}>
                                <Text style={{color: '#fff', fontSize:22, fontFamily: 'Poppins_400Regular'}}>{title}</Text>
                            </TouchableOpacity>
                        )}
                    />
                    </View>
                </View>
                
                <KeyboardAvoidingView style={{height:60}} behavior="height"/>
            
        </ImageBackground>

    )
}

const styles = StyleSheet.create({
    KursItem: {
        flex: 1,
        backgroundColor: '#464982',
        alignItems: 'center',
        flexDirection: 'row',
        height: 75,
        borderRadius: 10,
        marginVertical: 5,
        paddingHorizontal: 5
    },
    KursItemDone: {
        flex: 1,
        backgroundColor: '#46498290',
        alignItems: 'center',
        flexDirection: 'row',
        height: 75,
        borderRadius: 10,
        marginVertical: 5,
        paddingHorizontal: 5
    },
    info:{ 
        alignItems:"center", 
        justifyContent:"center", 
        marginLeft: 12,
    },
    header: {
        alignItems: 'center',
        backgroundColor: "#0F113A",
        borderRadius: 10,
    },
    search: {
        borderRadius: 10,
        paddingVertical:4,
        color: '#fff',
        fontSize: 17,
        paddingLeft: 10,
        flexGrow:1,
        fontFamily: 'Poppins_400Regular',
        justifyContent:'center'
    },
    searchbackground: {
        flexDirection:'row',
        borderRadius: 10,
        width: '85%',
        height: 35,
        alignItems:'center', 
        justifyContent: 'center', 
        backgroundColor: "#464982b2",
        borderRadius: 10,
        paddingLeft: 10,
    },
    imagebackground: {
        flex: 1,
        resizeMode: 'cover',
        alignItems:'center',
    },
    background: {
        backgroundColor: "#0F113A90",
        flex:0.75,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        width: '90%',
        padding: 10,
    },
    text: {
        color: '#fff',
        fontSize: 15,
        marginLeft: 15,
        fontFamily: 'Poppins_400Regular'
    },
    playButton: {
        shadowColor: '#000',
        shadowOffset: {width:0, height:4},
        shadowRadius: 4,
        shadowOpacity: 0.4,
    }
  });