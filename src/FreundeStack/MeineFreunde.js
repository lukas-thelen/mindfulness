import React from 'react';
import { StyleSheet, Text, View, Button, Share} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Linking from 'expo-linking';
import {AppContext} from '../context.js';
import { useContext, useEffect } from 'react';


export const MeineFreunde =() => {
    const {username, currentUser} = useContext(AppContext)
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


    return (
        <View>
            <Button title="Freund:in hinzugügen" onPress={()=> {onShare()}}></Button>
        </View>
    )
  }