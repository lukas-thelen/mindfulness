import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import {kurse} from "../Kursdaten/Kursdatei.js"

export const KursAuswahl =({navigation})=>{
    const renderItem =({item})=>{
        return(
            <TouchableOpacity onPress={()=>{navigation.navigate("Wähle eine Übung!", {kurs:item.id})}}>
                <LinearGradient
                    colors={['#89FFF1', '#80DEE4', '#8F92E3', '#D476D5']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.gradient}>
                    <Text style={{color:'#0F113A', fontSize:20}}>{item.Name}</Text>
                </LinearGradient>  
            </TouchableOpacity>    
        )
    }
    return (
        <ImageBackground source={require('../../assets/Startseite.png')} style={styles.imagebackground}>
            <View style={{flex:1}}>
                <View style={{flex:1}} />
                <View style={{alignItems:'center', flex:2}}>
                    <FlatList
                        data={kurse}
                        keyExtractor={item=>item.id}
                        renderItem={renderItem}
                        style = {{width: '90%'}}
                    ></FlatList>
                </View>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    gradient: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        height: 60,
        marginVertical: 15,
    },
    imagebackground: {
        flex: 1,
        resizeMode: 'cover',
    },
  });