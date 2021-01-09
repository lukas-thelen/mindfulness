import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import {AppContext} from './context.js';
import { useContext, useEffect } from 'react';
import { FreundeRoot } from './FreundeStack/FreundeRoot.js';
import { MeineFreunde } from './FreundeStack/MeineFreunde.js';
import { Puzzle } from './FreundeStack/Puzzle.js';

const FreundeStack = createStackNavigator();

export const FreundeScreen =() => {
    return (
        <FreundeStack.Navigator>
            <FreundeStack.Screen name="Freunde" component={FreundeRoot}/>
            <FreundeStack.Screen name="Meine Freunde" component={MeineFreunde}/>
            <FreundeStack.Screen name="Puzzle" component={Puzzle}/>
        </FreundeStack.Navigator>
    )
  }