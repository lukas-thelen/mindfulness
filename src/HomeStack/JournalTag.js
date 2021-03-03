import React from 'react';

import { StyleSheet, Text, View, Button, TextInput, ImageBackground, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Slider from '@react-native-community/slider';
import { LinearGradient } from 'expo-linear-gradient';
import { CheckBox } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';


import {AppContext} from '../context.js';
import { useContext, useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { KeyboardAvoidingView } from 'react-native';

export const JournalTag = ({navigation, route}) => {

    const [stimmung, changeStimmung]= useState(2)
    const [stress, changeStress]= useState(2)
    const [craving, changeCraving]= useState(2)
    const [pflichten, changePflichten]= useState(2)
    const [morgenStunden,changeMorgenStunden]=useState(null)
    const [heuteStunden, changeHeuteStunden]=useState(null)
    const [willMeditate, changeWillMeditate]=useState(false)
    const [sonstiges, changeSonstiges]=useState("")
    const [editable, changeEditable] = useState(true)
    const [gamingTimeStatus, changeGamingTimeStatus] = useState(null)
    const {userData, appData, changeUserData, CurrentUser, changeAppData} =useContext(AppContext)
    const userDataTemp = {...userData}
    const today = new Date()
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate()-1)

    const date = new Date(route.params.date)
    const dateBefore =new Date()
    dateBefore.setDate(date.getDate()-1)
    
    const stimmungsÜbersetzung={0:"sehr schlecht", 1:"schlecht", 2:"neutral", 3:"gut", 4:"sehr gut"}
    const stressÜbersetzung={0:"gar nicht", 1:"eher wenig", 2:"durchschnittlich", 3:"eher stark", 4:"sehr stark"}
    const cravingÜbersetzung={0:"nie", 1:"selten", 2:"manchmal", 3:"oft", 4:"immer"}
    const pflichtenÜbersetzung={0:"nein", 1:"eher nein", 2:"jaein", 3:"eher ja", 4:"ja"}


    useEffect(()=>{
        if(today.toDateString()===date.toDateString()|| yesterday.toDateString()===date.toDateString()){
            changeEditable(true)
        }else{
            changeEditable(false)
        }
    },[])

    useState(()=>{
        if (userDataTemp.journal[date.toDateString()] && userDataTemp.journal[date.toDateString()].journalChanged){
            changeStimmung(userDataTemp.journal[date.toDateString()].stimmung)
            changeHeuteStunden(userDataTemp.journal[date.toDateString()].heuteStunden)
            changeMorgenStunden(userDataTemp.journal[date.toDateString()].morgenStunden)
            changeStress(userDataTemp.journal[date.toDateString()].stress)
            changeCraving(userDataTemp.journal[date.toDateString()].craving)
            changePflichten(userDataTemp.journal[date.toDateString()].pflichten)
            changeWillMeditate(userDataTemp.journal[date.toDateString()].willMeditate)
            changeSonstiges(userDataTemp.journal[date.toDateString()].sonstiges)
        }
    },[])

    const storeData =async()=>{
        if (!userDataTemp.journal[date.toDateString()]){
            userDataTemp.journal[date.toDateString()]={}
        }
        userDataTemp.journal[date.toDateString()].stimmung=stimmung
        userDataTemp.journal[date.toDateString()].stress=stress
        userDataTemp.journal[date.toDateString()].craving=craving
        userDataTemp.journal[date.toDateString()].pflichten=pflichten
        userDataTemp.journal[date.toDateString()].morgenStunden=morgenStunden
        userDataTemp.journal[date.toDateString()].heuteStunden=heuteStunden
        userDataTemp.journal[date.toDateString()].willMeditate=willMeditate
        userDataTemp.journal[date.toDateString()].sonstiges=sonstiges
        userDataTemp.journal[date.toDateString()].journalChanged=true
        changeUserData(userDataTemp)
        appData[userDataTemp.data.eMail]=userData
        changeAppData(appData)
        const jsonvalue=JSON.stringify(appData)
        await AsyncStorage.setItem('appData', jsonvalue)
        navigation.goBack()
    }

    useEffect(()=>{
        if(userDataTemp.journal[dateBefore.toDateString()]&&userDataTemp.journal[dateBefore.toDateString()].morgenStunden){
            if(heuteStunden===null||heuteStunden===0) changeGamingTimeStatus(null)
            let plan = parseInt(userDataTemp.journal[dateBefore.toDateString()].morgenStunden)
            let act = parseInt(heuteStunden)
            console.log(plan)
            console.log(act)
            if(act&&plan>act){
                changeGamingTimeStatus("Super! Du hast heute "+(plan-act)+" Stunde(n) weniger gespielt als du vor hattest!")
            }else if(plan<act){
                changeGamingTimeStatus("Du hast heute "+(act-plan)+" Stunde(n) mehr gespielt als du vor hattest!")
            }else if(plan===act){
                changeGamingTimeStatus("Du hast heute genau so viel gespielt wie du vorhattest.")
            }else{
                changeGamingTimeStatus(null)
            }
        }
    },[heuteStunden])

    return (
        <ImageBackground source={require('../../assets/Profil.png')} style={styles.imagebackground} imageStyle={{resizeMode:'stretch'}}>
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}>
        <ScrollView style={{width:'100%'}}>
            <View style = {{alignItems: "center"}}>
                <Text style={styles.text25}>Datum: {date.getDate()}.{date.getMonth()+1}</Text>
                <Text style={styles.text25}>Platz für deine Gedanken:</Text>
                <View style={styles.trennlinie}></View>
                <View style={styles.background}>
                    <Text style={!editable?{...styles.text, color:"#ffffff70"}:styles.text}>Wie geht's dir heute?</Text>
                    <Slider
                        style={{width: 200, height: 40}}
                        minimumValue={0}
                        maximumValue={4}
                        minimumTrackTintColor='#89FFF1'
                        maximumTrackTintColor='#D476D5'
                        step={1}
                        value={stimmung}
                        onValueChange={changeStimmung}
                        disabled={!editable? true:false}
                    />
                  <Text style={!editable?{...styles.text, color:"#ffffff70"}:styles.text}>{stimmungsÜbersetzung[stimmung]}</Text>
                </View>

                <View style={styles.background}>
                <Text style={!editable?{...styles.text, color:"#ffffff70"}:styles.text}>Wie gestresst fühlst Du dich heute?</Text>
                <Slider
                    style={{width: 200, height: 40}}
                    minimumValue={0}
                    maximumValue={4}
                    minimumTrackTintColor='#89FFF1'
                    maximumTrackTintColor='#D476D5'
                    step={1}
                    value={stress}
                    onValueChange={changeStress}
                    disabled={!editable? true:false}
                />
                <Text style={!editable?{...styles.text, color:"#ffffff70"}:styles.text}>{stressÜbersetzung[stress]}</Text>
                </View>

                <View style={styles.background}>
                <Text style={!editable?{...styles.text, color:"#ffffff70"}:styles.text}>Wie oft hast Du heute in deinem Alltag daran gedacht zu spielen?</Text>
                <Ionicons name="game-controller-outline" size={22} color="white" />
                <Slider
                    style={{width: 200, height: 40}}
                    minimumValue={0}
                    maximumValue={4}
                    minimumTrackTintColor='#89FFF1'
                    maximumTrackTintColor='#D476D5'
                    step={1}
                    value={craving}
                    onValueChange={changeCraving}
                    disabled={!editable? true:false}
                />
                <Text style={!editable?{...styles.text, color:"#ffffff70"}:styles.text}>{cravingÜbersetzung[craving]}</Text>
                </View>

                <View style={styles.background}>
                <Text style={!editable?{...styles.text, color:"#ffffff70"}:styles.text}>Hast Du deine Pflichten heute zufriedenstellend erledigt? </Text>
                <Slider
                    style={{width: 200, height: 40}}
                    minimumValue={0}
                    maximumValue={4}
                    minimumTrackTintColor='#89FFF1'
                    maximumTrackTintColor='#D476D5'
                    step={1}
                    value={pflichten}
                    onValueChange={changePflichten}
                    disabled={!editable? true:false}
                />
                <Text style={!editable?{...styles.text, color:"#ffffff70"}:styles.text}>{pflichtenÜbersetzung[pflichten]}</Text>
                </View>

                <View style={styles.background}>
                    <Text style={!editable?{...styles.text, color:"#ffffff70"}:styles.text}>Wie viele Stunden hast Du heute gespielt?</Text>
                    <Ionicons name="game-controller-outline" size={22} color="white" />
                    <TextInput editable={!editable? false:true} defaultValue={heuteStunden} keyboardType={'numeric'} onChangeText={changeHeuteStunden} style={styles.textInput}></TextInput>
                    {heuteStunden!=null&&<Text>{gamingTimeStatus}</Text>}  
                </View>

                <View style={styles.background}>
                <Text style={!editable?{...styles.text, color:"#ffffff70"}:styles.text}>Wie viele Stunden hast Du vor morgen zu spielen?</Text>
                <Ionicons name="game-controller-outline" size={22} color="white" />
                <TextInput editable={!editable? false:true} defaultValue={morgenStunden} keyboardType={'numeric'} onChangeText={changeMorgenStunden} style={styles.textInput}></TextInput>
                </View>

                <View style={{...styles.background, flexDirection:'row'}}>
                <Text style={!editable?{color:"#ffffff70"}:{color:'#fff'}}>Hast Du vor morgen zu meditieren?</Text>
                <CheckBox uncheckedColor={!editable?"#ffffff70":'#fff'} checkedColor={'#89FFF1'} checked={willMeditate} disabled={!editable? true:false} onPress={() => changeWillMeditate(!willMeditate)}/>
                </View>
                
                <View style={styles.background}>
                <Text style={styles.text}>Möchtest du noch was loswerden?</Text>
                <TextInput blurOnSubmit={true} multiline={true}defaultValue={sonstiges} onChangeText={changeSonstiges} style={styles.textBox}></TextInput>
                </View>
                
                <View style={styles.trennlinie}/>
                <TouchableOpacity style={styles.button} onPress={()=>storeData()}>
                <LinearGradient
                    colors={['#89FFF1', '#80DEE4', '#8F92E3', '#D476D5']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.gradient}>
                    <Text style={{color:'#0F113A'}}>Speichern</Text>
                </LinearGradient>  
                </TouchableOpacity>
                <View style={styles.trennlinie}/>
                
                <View style={{height:60}}/>
            </View>
            
        </ScrollView>
        </KeyboardAvoidingView>
        </ImageBackground>

    )
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        width:'100%',
    },
    textInput:{ 
        borderColor: '#ffffff90', 
        borderWidth: 1,
        borderRadius:10,
        color: '#fff',
        textAlign: 'center',
        paddingVertical:6, 
        paddingHorizontal:20,
        marginTop:5,
        fontFamily:'Poppins_400Regular',
        fontSize:14
    },
    textBox:{ 
        height: 130,
        borderColor: '#ffffff90', 
        borderWidth: 1, 
        width:'100%', 
        borderRadius:10, 
        padding:10,
        textAlignVertical:"top",
        color: '#fff',
        fontFamily:'Poppins_400Regular',
        fontSize:14
    },
    trennlinie:{
        height:1,
        width:"100%",
        marginBottom:10,
        marginTop:10
    },
    reihe: {
        //flex:1,
        flexDirection:"row",
        alignItems: "flex-start", 
        justifyContent: "center",
    },
    imagebackground: {
        flex: 1,
        alignItems: 'center',
    },
    text: {
        color: '#fff',
        marginBottom: 5,
        textAlign: 'center',
        fontFamily:'Poppins_400Regular',
        fontSize: 14
    },
    text25: {
        color: '#fff',
        fontSize: 22,
        fontFamily:'Poppins_400Regular'
    },
    gradient: {
        alignItems: 'center',
        borderRadius: 14,
        paddingVertical: 5,
        paddingHorizontal: 30,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {width:0, height:4},
        shadowRadius: 4,
        shadowOpacity: 0.4,
    },
    background: {
        backgroundColor: "#46498280",
        padding:20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent:'center',
        width: '85%',
        marginVertical: 6,
    },
  });
