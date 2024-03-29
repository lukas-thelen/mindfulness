import React from 'react';
import { StyleSheet, Text, View, Button, FlatList, Modal, TouchableOpacity, Share, ImageBackground} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import {AppContext} from '../context.js';
import { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import { redirectURL } from '../../appDaten.js';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { images } from '../../assets/Puzzles/puzzleImg.js';



export const FreundeRoot =({navigation}) => {
    const {userData, changeUserData, changeAppData, appData, currentUser, forceUpdate}=useContext(AppContext)
    const userDataTemp={...userData}

    const [modalVisible, changeModalVisible] = useState(false)
    const [selectedFriends, changeSelectedFriends] = useState([currentUser,])

    useEffect(()=>{},[forceUpdate])

    const getMotif=()=>{
      if(!userDataTemp.friends.motifs){
        userDataTemp.friends.motifs=[]
      }
      var found = false
      var number = 0
      var motif = ""
      if(userDataTemp.friends.motifs.length===Object.keys(images).length){
        number = Math.floor(Math.random() * Object.keys(images).length)
        motif = Object.keys(images)[number]
        userDataTemp.friends.motifs=[motif]
        found = true
      }
      while (!found){
        number = Math.floor(Math.random() * Object.keys(images).length)
        if(!userDataTemp.friends.motifs.includes(Object.keys(images)[number])){ 
          motif = Object.keys(images)[number]
          userDataTemp.friends.motifs.push(motif)
          found = true
        }
      }
      return motif
    }

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
        const id =getRandomString(8)
        const motif = getMotif()
        userDataTemp.friends.puzzles[id]={id:id, pieces:0, friends:selectedFriends, log:{}, motif:motif}
        const friendsNames = getFriendsNames()
        var message = Linking.makeUrl("", {type: "newPuzzle", id:id, name:userData.data.name, user:currentUser, friends:JSON.stringify(selectedFriends), friendsNames:JSON.stringify(friendsNames), motif:motif})
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
            changeModalVisible(false)
          } else if (result.action === Share.dismissedAction) {
            changeModalVisible(false)
          }
        } catch (error) {
          alert(error.message);
        }
      };

    const puzzleArray=()=>{
        const array=[]
        const finishedArray=[]
        for(puzzle in userData.friends.puzzles){
          if(userData.friends.puzzles[puzzle].pieces<12){
            array.push(userData.friends.puzzles[puzzle])
          }else{
            finishedArray.push(userData.friends.puzzles[puzzle])
          }
        }
        //console.log(finishedArray)
        array.reverse()
        finishedArray.reverse()
        const allArray = array.concat(finishedArray)
        return allArray
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
            <TouchableOpacity style={styles.puzzle} onPress={()=>{navigation.navigate("Puzzle",{id:item.id}) }}>
                <MaterialCommunityIcons name="puzzle-outline" size={22} color="#fff" />
                <Text style={{...styles.textM, marginLeft:5, flex:1}}>{puzzleText(item.friends)}</Text>
                {item.pieces===12&&<Ionicons name="trophy-outline" size={22} color="#fff" style={{marginRight:15}}/>}
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
            <Text style={styles.textM}>{item.name}</Text>
          </TouchableOpacity>
        )
      }
    return (
      <ImageBackground source={require('../../assets/Profil.png')} style={styles.imagebackground} imageStyle={{resizeMode:'stretch'}}>
        
            <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
              >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                      <FlatList
                          style={{marginVertical:10, width:'95%'}}
                          data={freundeArray()}
                          keyExtractor={(item, index)=>item.email}
                          renderItem={renderFreunde}
                      ></FlatList>
                      <TouchableOpacity style={styles.button} disabled={selectedFriends.length===1&&true} onPress={()=>neuesPuzzle()}>
                        <LinearGradient
                            colors={['#D476D5', '#C77BD8', '#8F92E3']}
                            start={{ x: 0, y: 0.4 }}
                            end={{ x: 0, y: 1 }}
                            style={styles.gradient}>
                                <Text style={{...styles.text, fontSize:17}}>Erstellen</Text>
                        </LinearGradient>
                      </TouchableOpacity>
                      <TouchableOpacity style={{marginTop:20}} onPress={()=>{changeModalVisible(false), changeSelectedFriends([currentUser,])}}>
                        <Text style={{...styles.text, textDecorationLine:'underline'}}>Abbrechen</Text>
                      </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            
            <View style={{flex:0.15, width:'100%'}}>
              <TouchableOpacity style={{alignItems:'flex-end', marginTop:20, marginRight:20}} onPress={()=> {navigation.navigate("Meine Freunde")}}>
                <Ionicons name="people-outline" size={30} color={'#fff'} style={{marginRight:40}}/> 
                <Text style={styles.text}>Meine Freunde</Text>
              </TouchableOpacity>
            </View>

            <View style={{flex:0.85, alignItems:'center', width:'100%'}}>
              <Text style={{...styles.text, fontSize:22, marginBottom:20}}>PUZZLES</Text>
              <View style={styles.background}>
                <FlatList
                    style={{marginVertical:10, width:'95%'}}
                    data={puzzleArray()}
                    keyExtractor={(item, index)=>item.id}
                    renderItem={renderPuzzle}
                    extraData={puzzleArray()}
                ></FlatList>
                <TouchableOpacity style={styles.puzzleNeu}onPress={()=> {changeModalVisible(true)}}>
                <MaterialCommunityIcons name="puzzle-plus-outline" size={22} color="#fff" />
                  <Text style={{...styles.textM, marginLeft:5}}>Neues Puzzle</Text>
                </TouchableOpacity>
              </View>
            </View>
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
      width: '90%',
      height:"60%",
      borderColor: '#8F92E3',
      borderWidth: 1,
      borderRadius: 15,
      borderRadius: 15,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {width:0, height:4},
      shadowOpacity: 0.4,
      shadowRadius: 4,
      elevation: 5,
      justifyContent:"space-between"
    },
    friend:{
        height:45, 
        width:'100%', 
        backgroundColor:"#464982", 
        alignSelf:"center", 
        justifyContent:"center", 
        paddingLeft:20,
        borderRadius:10,
        marginBottom:10
    },
    selectedFriend:{
        height:45, 
        width:'100%', 
        backgroundColor:'#89FFF1b2', 
        alignSelf:"center", 
        justifyContent:"center", 
        paddingLeft:20,
        borderRadius:10,
        marginBottom:10
    },
    puzzle:{
      height:50, 
      width:'100%', 
      backgroundColor:"#464982", 
      alignSelf:"flex-end", 
      alignItems:"center", 
      paddingLeft:20,
      flexDirection:"row",
      borderRadius:10,
      marginBottom:10
    },
    puzzleNeu:{
      height:50, 
      width:'95%', 
      backgroundColor:"#D874D4", 
      alignSelf:"center", 
      alignItems:"center",
      justifyContent:'center',
      borderRadius:10,
      flexDirection:'row'
    },
    imagebackground: {
      flex: 1,
      alignItems: 'center',
    },
    background: {
      backgroundColor: "#0F113A90",
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding:10,
      width: '90%',
      height: '75%',
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
    gradient: {
      alignItems: 'center',
      borderRadius: 17,
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
  });