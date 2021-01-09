import React from 'react';
import { StyleSheet, Text, View, Button, Share} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Linking from 'expo-linking';
import {AppContext} from '../context.js';
import { useContext, useEffect } from 'react';
import { FlatList } from 'react-native-gesture-handler';


export const MeineFreunde =() => {
    const {username, currentUser, userData} = useContext(AppContext)
    const friendCode = Linking.makeUrl("", {type: "friendRequest", name: username, eMail: currentUser})
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
        <View style={{height:50, width:300, backgroundColor:"white", alignSelf:"center", margin:10, justifyContent:"center", paddingLeft:20}}>
          <Text style={{fontSize:16}}>{item.name}</Text>
        </View>
      )
    }


    return (
        <View>
          <Button title="Freund:in hinzugügen" onPress={()=> {onShare()}}></Button>
          <FlatList
            data={freundeArray()}
            keyExtractor={(item, index)=>item.email}
            renderItem={renderFreunde}
          ></FlatList>
            
        </View>
    )
  }