import React, {useContext} from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity, Alert, ScrollView, SectionList, ImageBackground, TextInput} from 'react-native';


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
    const [TextValue, onChangeText] = React.useState('');


    const InstantStart =() =>{
        if (gehoerteUebungen.includes(userData.verfuegbareUebungen[(userData.verfuegbareUebungen.length)-1])){
          return null
        }
          for ( var z = 0; z< uebungen.length; z++){
            if (uebungen[z].id === userData.verfuegbareUebungen[(userData.verfuegbareUebungen.length)-1]){

              return (
              <TouchableOpacity onPress={()=>{
                  if(uebungen[z].Audio){
                    navigation.navigate("Wähle eine Version", {kursIndex:uebungen[z].KursIndex, uebungsIndex:uebungen[z].UebungsIndex})
                  }else{
                    navigation.navigate("Wähle die Dauer", {kursIndex:uebungen[z].KursIndex, uebungsIndex:uebungen[z].UebungsIndex})
                  }
              }}>
                <Ionicons name="play" size={50} color="#464982" /> 
              </TouchableOpacity>
            )
          }
        }
      }
    
    const renderItem =({item})=>{
        return(
            <View style={styles.KursItem}>

                    <TouchableOpacity style={styles.info}onPress={()=>{navigation.navigate("Übungsinfo", {kursIndex:item.KursIndex, uebungsIndex:item.UebungsIndex })}}><Text style={{color:'#fff'}} >i</Text></TouchableOpacity>
                    <Text></Text>
                    <TouchableOpacity style={{alignItems:"center", flexDirection:"row", width: '85%'}}onPress={()=>{
                        if(item.Audio){
                            navigation.navigate("Wähle eine Version", {kursIndex:item.KursIndex, uebungsIndex:item.UebungsIndex})
                        }else{
                            navigation.navigate("Wähle die Dauer", {kursIndex:item.KursIndex, uebungsIndex:item.UebungsIndex})
                        }
                    }}>
                        <View>
                            {gehoerteUebungen.includes(item.id) ? <Text style={{...styles.text, color: "#ffffff90"}}>{item.Name}</Text> : <Text style={styles.text}>{item.Name}</Text>}
                            {gehoerteUebungen.includes(item.id) ? <Text style={{...styles.text, color: "#ffffff90"}}>Kurs: {kurse[item.KursIndex].Name}</Text> : <Text style={styles.text} >Kurs: {kurse[item.KursIndex].Name}</Text>}
                        </View>
                        {!userData.verfuegbareUebungen.includes(item.id)&&<Text style={{marginLeft:"auto", color:"white", fontWeight:"bold"}} >!</Text>}
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
        <ImageBackground source={require('../../assets/Startseite.png')} style={styles.imagebackground}>
            <View style={{flex:1, alignItems:'center'}}>
                <View style={{alignItems:"center", justifyContent:"center" ,flex:0.15}}>
                    <InstantStart />
                </View>
                <View style={styles.background} >
                    <View>
                    <SectionList
                        sections={alleUebeungen}
                        keyExtractor={(item, index) => item + index}
                        renderItem={(item) => renderItem(item)}
                        renderSectionHeader={({ section: { title } }) => (
                            <TouchableOpacity style={styles.header}>
                                <Text style={{color: '#fff', fontSize:25,}}>{title}</Text>
                            </TouchableOpacity>
                        )}
                    />
                    </View>
                </View>
            </View>
            <View style={{flex:0.85}}>
             <SectionList
                sections={SuchListe()}
                keyExtractor={(item, index) => item + index}
                renderItem={(item) => renderItem(item)}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={styles.header}>{title}</Text>
                )}
            />
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => onChangeText(text)}
                value={TextValue}
            />
            </View>
        </View>
</ImageBackground>

    )
}

const styles = StyleSheet.create({
    KursItem: {
      flex: 1,
      backgroundColor: '#464982',
      alignItems: 'center',
      flexDirection: 'row',
      height: 80,
      borderRadius: 10,
      marginVertical: 5,
      marginHorizontal: 15,
    },
    info:{ 
        borderRadius:100, 
        width:25, 
        height:25, 
        alignItems:"center", 
        justifyContent:"center", 
        backgroundColor:"#8F92E3",
        marginLeft: 10,
    },
    header: {
        alignItems: 'center',
        fontSize: 25,
        color: '#fff',
        backgroundColor: "#0F113A",
        borderRadius: 10,
        marginHorizontal: 15,
    },
    imagebackground: {
        flex: 1,
        resizeMode: 'cover',
    },
    background: {
        backgroundColor: "#0F113A90",
        flex:0.85,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        width: '95%',
        paddingTop: 10,
    },
    text: {
        color: '#fff',
        fontSize: 16,
        marginLeft: 20,
    }
  });