import React from 'react';
import { StyleSheet, Text, View, Button, Share, TouchableOpacity, ImageBackground} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Linking from 'expo-linking';
import {AppContext} from '../context.js';
import { useContext, useEffect } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { redirectURL } from '../../appDaten.js';
import { Ionicons } from '@expo/vector-icons'; 


export const MeineFreunde =() => {
    const {username, currentUser, userData} = useContext(AppContext)
    var friendCode = Linking.makeUrl("", {type: "friendRequest", name: username, eMail: currentUser})
    var re = /(.*)(\?.*)/;
    friendCode = friendCode.replace(re, "Füge mich als Freund hinzu: "+redirectURL+"$2");
    const onShare = async () => {
      try {
        const result = await Share.share({
          message:
              friendCode,
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

    const freundeArray=()=>{
      const array=[]
      for(friend in userData.friends.friends){
        array.push({name:userData.friends.friends[friend].name, email:friend})
      }
      return array
    }

    const renderFreunde=({item, index})=>{
      return(
        <View style={styles.friend}>
          <Text style={{color:'#fff', fontSize:16}}>{item.name}</Text>
        </View>
      )
    }


    return (
      <ImageBackground source={require('../../assets/Profil.png')} style={styles.imagebackground}>
        
          <View style={{flex:0.2, width:'100%'}}>
            <TouchableOpacity style={{alignItems:'flex-end', marginTop:20, marginRight:20}} onPress={()=> {onShare()}}>
              <Ionicons name="person-add-outline" size={30} color="#fff" style={{marginRight:40}}/>
              <Text style={{color:'#fff', fontSize:16}}>Freunde adden</Text>
            </TouchableOpacity>
          </View>
          <View style={{flex:0.8, alignItems:'center', width:'100%'}}>
            <View style={styles.background}>
              <Text style={{color:'#fff', fontSize:20, marginBottom:20}}>Meine Freunde</Text>
              <FlatList
                style={{marginVertical:10, width:'95%'}}
                data={freundeArray()}
                keyExtractor={(item, index)=>item.email}
                renderItem={renderFreunde}
              ></FlatList>
            </View>
          </View>
        
        <View style={{height:60}}/>
      </ImageBackground>
    )
  }

  const styles = StyleSheet.create({
    friend:{
      height:45, 
      width:'100%', 
      backgroundColor:"#464982", 
      alignSelf:"center", 
      justifyContent:"center", 
      paddingLeft:20,
      borderRadius:10,
    },
    imagebackground: {
      flex: 1,
      alignItems:'center'
    },
    background: {
      backgroundColor: "#0F113A90",
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding:10,
      width: '90%',
   },
  });