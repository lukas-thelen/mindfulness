import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {AppContext} from '../context.js';
import { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';


export const FreundeRoot =({navigation}) => {
    return (
        <View>
            <Text>FREUNDE</Text>
            <Button title="Meine Freunde" onPress={()=> {navigation.navigate("Meine Freunde")}}></Button>
        </View>
    )
  }