import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {AppContext} from '../context.js';
import { useContext, useEffect } from 'react';

export const AppInfos = () => {

    return (
        <Text>Ich bin deine AppInfos!</Text>
    )
}