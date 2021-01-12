import React from 'react';
import { StyleSheet, Text, View, Button, FlatList, Modal, TouchableOpacity, Share} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import {AppContext} from '../context.js';
import { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import { redirectURL } from '../../appDaten.js';


export const FreundeRoot =({navigation}) => {
    const {userData, changeUserData, changeAppData, appData, currentUser, forceUpdate}=useContext(AppContext)
    const userDataTemp={...userData}

    const [modalVisible, changeModalVisible] = useState(false)
    const [selectedFriends, changeSelectedFriends] = useState([currentUser,])

    useEffect(()=>{},[forceUpdate])

    function getRandomString(length) {
        var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var result = '';
        for ( var i = 0; i < length; i++ ) {
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
        return result;
    }
    const getFriendsNames=()=>{
        const array = []
        for (var k=0; k<selectedFriends.length;k++){
            if(selectedFriends[k]===currentUser){
                array.push(userData.data.name)
            }else{
                array.push(userData.friends.friends[selectedFriends[k]].name)
            }
        }
        return array
    }
    
    const neuesPuzzle=async()=>{
        changeModalVisible(false)
        const id =getRandomString(8)
        userDataTemp.friends.puzzles[id]={id:id, pieces:0, friends:selectedFriends, log:{}}
        const friendsNames = getFriendsNames()
        var message = Linking.makeUrl("", {type: "newPuzzle", id:id, name:userData.data.name, user:currentUser, friends:JSON.stringify(selectedFriends), friendsNames:JSON.stringify(friendsNames)})
        var re = /(.*)(\?.*)/;
        message = message.replace(re, "Lass uns zusammen ein neuen Puzzle beginnen: "+redirectURL+"$2");
        changeUserData(userDataTemp)
        appData[currentUser]=userDataTemp
        changeAppData(appData)
        const jsonValue = JSON.stringify(appData)
        await AsyncStorage.setItem('appData', jsonValue) 
        onShare(message)
        changeSelectedFriends([currentUser,])
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

    const puzzleArray=()=>{
        const array=[]
        for(puzzle in userData.friends.puzzles){
            array.push(userData.friends.puzzles[puzzle])
        }
        return array
    }

    const freundeArray=()=>{
        const array=[]
        for(friend in userData.friends.friends){
          array.push({name:userData.friends.friends[friend].name, email:friend})
        }
        return array
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

    const renderPuzzle=({item})=>{
        return (
            <TouchableOpacity style={styles.puzzle}onPress={()=>{navigation.navigate("Puzzle",{id:item.id}) }}>
                <MaterialCommunityIcons name="puzzle-outline" size={24} color="black" />
                <Text style={{fontSize:16}}>{puzzleText(item.friends)}</Text>
            </TouchableOpacity>
        )
    }
    
    const renderFreunde=({item, index})=>{
        return(
          <TouchableOpacity style={selectedFriends.length>0&&selectedFriends.includes(item.email)?styles.selectedFriend:styles.friend} 
            onPress={()=>{
                if(!selectedFriends.includes(item.email)){
                    const temp = [...selectedFriends]
                    temp.push(item.email)
                    changeSelectedFriends(temp)
                }else{
                    const ind = selectedFriends.indexOf(item.email)
                    const temp = [...selectedFriends]
                    temp.splice(ind,1)
                    changeSelectedFriends(temp)
                }               
            }}
          >
            <Text style={{fontSize:16}}>{item.name}</Text>
          </TouchableOpacity>
        )
      }
    return (
        <View>
            <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
              >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                    <FlatList
                        data={freundeArray()}
                        keyExtractor={(item, index)=>item.email}
                        renderItem={renderFreunde}
                    ></FlatList>
                    <Button title="abbrechen" onPress={()=>{changeModalVisible(false), changeSelectedFriends([currentUser,])}}></Button>
                    <Button disabled={selectedFriends.length===1&&true}title="erstellen" onPress={()=>neuesPuzzle()}></Button>
                    </View>
                </View>
            </Modal>
            <Button title="Meine Freunde" onPress={()=> {navigation.navigate("Meine Freunde")}}></Button>
            <Text style={{textAlign:"center", fontSize:22, margin:20}}>PUZZLES</Text>
            <View style={{height:"60%", backgroundColor:"#e1e1e1", width:"95%", alignSelf:"center", borderWidth:1, borderRadius:20}}>
              <FlatList
                  data={puzzleArray()}
                  keyExtractor={(item, index)=>item.id}
                  renderItem={renderPuzzle}
                  extraData={puzzleArray()}
              ></FlatList>
            </View>
            <TouchableOpacity style={{width:50, height:50, borderRadius:100, backgroundColor:"white", justifyContent:"center", alignItems:"center", borderWidth:2, alignSelf:"center", marginTop:25}}onPress={()=> {changeModalVisible(true)}}>
              <MaterialCommunityIcons name="puzzle-plus-outline" size={35} color="black" />
            </TouchableOpacity>
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
      justifyContent:"space-between"
    },
    friend:{
        height:40, 
        width:300, 
        backgroundColor:"white", 
        alignSelf:"center", 
        margin:10, 
        justifyContent:"center", 
        paddingLeft:20
    },
    selectedFriend:{
        height:40, 
        width:300, 
        backgroundColor:"white", 
        alignSelf:"center", 
        margin:10, 
        justifyContent:"center", 
        paddingLeft:20,
        backgroundColor:"#aaccaa"
    },
    puzzle:{
      height:40, 
      width:300, 
      backgroundColor:"white", 
      alignSelf:"center", 
      margin:10, 
      alignItems:"center", 
      paddingLeft:20,
      flexDirection:"row"
    }
  });