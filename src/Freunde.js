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
            <FreundeStack.Screen name="Freunde" component={FreundeRoot} options={{
            title: 'Freunde',
            headerStyle: {
              backgroundColor: '#0F113A',
            },
            headerTintColor: '#D476D5',
            headerTitleStyle: {
              fontSize: 25,
              borderColor: '#D476D5',
              borderWidth:1,
              borderRadius: 15,
              paddingHorizontal: 10,
            },
          }}/>
            <FreundeStack.Screen name="Meine Freunde" component={MeineFreunde} options={{
            title: 'Meine Freunde',
            headerStyle: {
              backgroundColor: '#0F113A',
            },
            headerTintColor: '#D476D5',
            headerTitleStyle: {
              fontSize: 25,
              borderColor: '#D476D5',
              borderWidth:1,
              borderRadius: 15,
              paddingHorizontal: 10,
            },
          }}/>
            <FreundeStack.Screen name="Puzzle" component={Puzzle} options={{
            title: 'Puzzle',
            headerStyle: {
              backgroundColor: '#0F113A',
            },
            headerTintColor: '#D476D5',
            headerTitleStyle: {
              fontSize: 25,
              borderColor: '#D476D5',
              borderWidth:1,
              borderRadius: 15,
              paddingHorizontal: 10,
            },
          }}/>
        </FreundeStack.Navigator>
    )
  }