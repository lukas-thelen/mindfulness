import React from 'react';
import { StyleSheet, Text, View, Button, FlatList, Modal, Share, Image, ImageBackground, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {AppContext} from '../context.js';
import { useContext, useEffect, useState } from 'react';
import { roundToNearestPixel } from 'react-native/Libraries/Utilities/PixelRatio';
import * as Linking from 'expo-linking';
import { checkBenchmarks } from '../benchmarks.js';
import { redirectURL } from '../../appDaten.js';
import { images } from '../../assets/Puzzles/puzzleImg.js';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const Puzzle = ({route, navigation}) => {
    const {userData, changeUserData, changeAppData, appData, currentUser, changeNewBenchmark}=useContext(AppContext)
    const userDataTemp={...userData}
    const [modalVisible, changeModalVisible] = useState(false)
    const [layedPieces, changeLayedPieces] = useState(1)

    function getRandomString(length) {
        var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var result = '';
        for ( var i = 0; i < length; i++ ) {
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
        return result;
    }
    const puzzleText=(array)=>{
        var string="Puzzle mit "
        var first = true
        for(var i=0; i<array.length;i++){
            if(!(array[i]===currentUser)){
                if (first){
                    string += ""+userData.friends.friends[array[i]].name
                    first=false
                }else if (i===array.length-1){
                    string += " und " + userData.friends.friends[array[i]].name
                }else{
                    string += ", " + userData.friends.friends[array[i]].name
                }
            }
        }
        return string
    }
    const renderPuzzleTeile=({item, index})=>{
        if(item<userDataTemp.friends.puzzles[route.params.id].pieces){
            return(
                <Image style={styles.image} source={images[userDataTemp.friends.puzzles[route.params.id].motif][index]}/>
                
            )
        }else{
            return(
                <View style={{borderWidth:1, height:80, flex:0.25}}>
                </View>
            )
        }
        
    }
    const löschen=async()=>{
        delete userDataTemp.friends.puzzles[route.params.id]
        changeUserData(userDataTemp)
        appData[currentUser]=userDataTemp
        changeAppData(appData)
        const jsonValue = JSON.stringify(appData)
        await AsyncStorage.setItem('appData', jsonValue)
        navigation.goBack()
    }

    //Nur Button
    const einsetzen=()=>{
        changeModalVisible(true)
    }

    //tatsächliches Einsetzen
    const layPieces=async()=>{

        userDataTemp.friends.puzzles[route.params.id].pieces+=layedPieces
        
        if (userDataTemp.friends.puzzles[route.params.id].pieces === 12){
            userDataTemp.benchmarks.puzzles +=1
        }
        userDataTemp.friends.pieces-=layedPieces
        const logId = getRandomString(8)
        const logData = {id:logId, puzzleId:route.params.id, pieces:layedPieces, user:currentUser}
        var message = Linking.makeUrl("", {type: "puzzlePieces", id:logId, puzzleId:route.params.id, pieces:layedPieces, user:currentUser})
        console.log(message)
        var re = /(.*)(\?.*)/;
        message = message.replace(re, "Hier sind neue Teile für unser Puzzle: "+redirectURL+"$2");
        userDataTemp.friends.puzzles[route.params.id].log[logId]=logData
        changeUserData(userDataTemp)
        appData[currentUser]=userDataTemp
        changeAppData(appData)
        const jsonValue = JSON.stringify(appData)
        await AsyncStorage.setItem('appData', jsonValue)
        changeModalVisible(false)
        changeLayedPieces(1)
        onShare(message)
        
        // Überprüfen, ob neuer Benchmark erreicht und, wenn ja --> Einfügen in userDataTemp
        const currentlyReached = checkBenchmarks(userDataTemp)
        if (currentlyReached.length > 0){
            userDataTemp.benchmarks.benchmarksReached=userDataTemp.benchmarks.benchmarksReached.concat(currentlyReached)
            changeNewBenchmark(currentlyReached)
        }

        
    }

    const onShare = async (message) => {
      try {
        const result = await Share.share({
          message:
              message,
        });
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType
          } else {
            // shared
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
        }
      } catch (error) {
        alert(error.message);
      }
    };

    const maxNeeded =()=>{
        return 12-userData.friends.puzzles[route.params.id].pieces
    } 

    return (
        <ImageBackground source={require('../../assets/Profil.png')} style={styles.imagebackground}  imageStyle={{resizeMode:'stretch'}}>
            
            {userData.friends.puzzles[route.params.id]&&<View style={{flex:1, alignItems:'center', justifyContent:'center', width:'100%'}}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={{...styles.text, fontSize:16, textAlign:'center'}}>Wie viele Teile möchstest du einsetzen?</Text>
                            <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between", marginTop:30, width:120}}>
                                <Text style={{...styles.text, fontSize:20, marginHorizontal:20}}>{layedPieces}</Text>
                                <View style={{flexDirection:"column", alignItems:'center'}}>
                                    <TouchableOpacity style={styles.plusminus} disabled={layedPieces>=userData.friends.pieces||layedPieces>=maxNeeded()} onPress={()=>{changeLayedPieces(layedPieces+1)}}>
                                        <Text style={(layedPieces>=userData.friends.pieces||layedPieces>=maxNeeded())?{...styles.text, fontSize:24, color:"#666666"}:{...styles.text, fontSize:24}}>+</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.plusminus} disabled={layedPieces<=1} onPress={()=>{changeLayedPieces(layedPieces-1)}}>
                                        <Text style={layedPieces<=1?{...styles.text, fontSize:24, color:"#666666"}:{...styles.text, fontSize:24}}>-</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <TouchableOpacity style={{...styles.button, marginTop:30}} onPress={()=>{layPieces()}}>
                                <LinearGradient
                                    colors={['#D476D5', '#C77BD8', '#8F92E3']}
                                    start={{ x: 0, y: 0.4 }}
                                    end={{ x: 0, y: 1 }}
                                    style={styles.gradient}>
                                        <Text style={{...styles.text, fontSize:16}}>Einsetzen</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                            <TouchableOpacity style={{marginTop:20}} onPress={()=>{changeModalVisible(false), changeLayedPieces(1)}}>
                                <Text style={{...styles.text, textDecorationLine:'underline'}}>Abbrechen</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                
                <View style={styles.background}>
                    <View style={{flexDirection:'row', alignItems:'center', marginBottom:16}}>
                        <MaterialCommunityIcons name="puzzle-outline" size={22} color="#fff" />
                        <Text style={{...styles.textM, fontSize:20, textAlign:'center', marginLeft:4}}>{puzzleText(userData.friends.puzzles[route.params.id].friends)}</Text>
                    </View>
                    <View style={{width:320, alignSelf:"center", backgroundColor:'#46498290'}}>
                        <FlatList
                            numColumns={4}
                            data={[5,9,0,11,3,6,8,1,10,2,7,4]}
                            keyExtractor={(item, index)=>index}
                            renderItem={renderPuzzleTeile}
                        ></FlatList>
                    </View>
                    <Text style={{...styles.text, fontSize: 13, marginVertical:10}}>Verfügbare Puzzleteile: {userData.friends.pieces}</Text>
                    <TouchableOpacity  disabled={maxNeeded()===0||userData.friends.pieces===0} style={{...styles.button, marginVertical:20}} onPress={()=>einsetzen()}>
                        <LinearGradient
                            colors={['#89FFF1', '#80DEE4', '#8F92E3', '#D476D5']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={maxNeeded()===0||userData.friends.pieces===0?{...styles.gradient, opacity:0.3}:styles.gradient}>
                                <Text style={{...styles.text, color:'#0F113A', fontSize:18}}>Teil einsetzen</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity style={{alignItems:'center', marginTop:20}} onPress={()=>löschen()}>
                        <Text style={{...styles.text, textDecorationLine:'underline', fontSize:13}}>Puzzle löschen</Text>
                    </TouchableOpacity>
                </View>
            </View>}
            <View style={{height:60}}/>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    modalView: {
        backgroundColor: '#0F113A',
        width:"90%",
        height:"60%",
        borderColor: '#8F92E3',
        borderWidth: 1,
        borderRadius: 15,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {width:0, height:4},
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 5,
        justifyContent:"center"
    },
    image:{
        borderWidth:1, 
        height:80, 
        flex:0.25
    },
    imagebackground: {
        flex: 1,
        alignItems:'center'
    },
    gradient: {
        alignItems: 'center',
        borderRadius: 18,
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
    text: {
        color:'#fff',
        fontSize: 15,
        fontFamily: 'Poppins_400Regular'
    },
    textM: {
        color:'#fff',
        fontSize: 15,
        fontFamily: 'Poppins_500Medium'
    },
    background: {
        backgroundColor: "#0F113A90",
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding:15,
        width:'90%'
     },
     plusminus:{
        marginHorizontal:20, 
        marginVertical:10,
     }
  });