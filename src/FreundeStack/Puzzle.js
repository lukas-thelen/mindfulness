import React from 'react';
import { StyleSheet, Text, View, Button, FlatList, Modal, Share, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {AppContext} from '../context.js';
import { useContext, useEffect, useState } from 'react';
import { roundToNearestPixel } from 'react-native/Libraries/Utilities/PixelRatio';
import * as Linking from 'expo-linking';
import { checkBenchmarks } from '../benchmarks.js';
import { redirectURL } from '../../appDaten.js';
import { images } from '../../assets/Puzzles/puzzleImg.js';


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
                <Image style={styles.image} source={images.Waage[index]}/>
                
            )
        }else{
            return(
                <View style={{borderWidth:1, height:90, flex:0.25}}>
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
        var re = /(.*)(\?.*)/;
        message = message.replace(re, redirectURL+"$2");
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
        <View>
        {userData.friends.puzzles[route.params.id]&&<View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text>Wie viele Teile möchstest du einsetzen?</Text>
                        <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-around", width:200, marginTop:30}}>
                            <Text>{layedPieces}</Text>
                            <View style={{flexDirection:"column"}}>
                                <Button disabled={layedPieces>=userData.friends.pieces||layedPieces>=maxNeeded()}title="+" onPress={()=>{changeLayedPieces(layedPieces+1)}}></Button>
                                <Button disabled={layedPieces<=1}title="-" onPress={()=>{changeLayedPieces(layedPieces-1)}}></Button>
                            </View>
                        </View>
                        <Button title="abbrechen" onPress={()=>{changeModalVisible(false), changeLayedPieces(1)}}></Button>
                        <Button title="einsetzen" onPress={()=>{layPieces()}}></Button>
                    </View>
                </View>
            </Modal>
            <Text>{puzzleText(userData.friends.puzzles[route.params.id].friends)}</Text>
            <View style={{width:360, alignSelf:"center"}}>
                <FlatList
                    numColumns={4}
                    data={[5,9,0,11,3,6,8,1,10,2,7,4]}
                    keyExtractor={(item, index)=>index}
                    renderItem={renderPuzzleTeile}
                ></FlatList>
            </View>
            <Text>{userData.friends.pieces}</Text>
            <Button disabled={maxNeeded()===0||userData.friends.pieces===0}title="Puzzleteile einsetzen" onPress={()=>einsetzen()}></Button>
            <Button title="Puzzle löschen" onPress={()=>löschen()}></Button>
        </View>}
        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    modalView: {
      margin: 20,
      width:"80%",
      height:"80%",
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    image:{
        borderWidth:1, 
        height:90, 
        flex:0.25
    }
  });