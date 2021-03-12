import React, { useState, useContext } from 'react';
import { Button, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AsyncStorage from '@react-native-async-storage/async-storage';
import RadioButtonRN from 'radio-buttons-react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { CheckBox } from 'react-native-elements'

import {AppContext} from './context.js';
import { globalStyles } from './globalStyles.js';
import { LinearGradient } from 'expo-linear-gradient';
import { ImageBackground } from 'react-native';


export const Registrieren =(props)=>{
    const [eMail, changeEMail] = useState("")
    const [password, changePassword] = useState("")
    const [name, changeName] = useState("")
    const [birthday, changeBirthday] = useState(new Date())
    const [age, changeAge] =useState(null)
    const [agb, changeAgb] =useState(false)
    const [gender, changeGender] = useState("")
    const [datepicker, showDatepicker] = useState(false)
    const [dateChanged, changeDateChanged] = useState(false)

    const changeUsername = useContext(AppContext).changeUsername;
    const {username, appData} = useContext(AppContext);

    // Nutzerinfos im AsyncStorage speichern
    const storeData = async () => {
      const userData = props.userData;
      userData.loggedIn=true;
      userData.eMail = eMail;
      userData.password = password;
      userData.name = name;
      //userData.birthday = birthday;
      userData.age = age;


      changeUsername(name)
      props.changeInitPages('AchtsamkeitsAbfrage')
      props.changeUserData(userData)
    }

    //Nutzerinformationen prüfen und überarbeiten
    const abschicken =()=>{
      if (eMail === "" || password === "" || name===""|| age===0){
        Alert.alert(
          'Unvollständig',
          'Bitte fülle alle Felder aus!',
          [{ text: 'OK'}],
          { cancelable: false }
        );
      }else if(password.length<5){
        Alert.alert(
          'Zu unsicher!',
          'Dein Passwort muss mehr als 5 Zeichen haben!',

          [{ text: 'Ok'}],
          { cancelable: false }
        );
      }else if(appData[eMail]){
        Alert.alert(
          'E-Mail-Adresse bereits vergeben',
          'Unter dieser Adresse besteht bereits ein Konto. Versuche dich damit anzumelden!',
          { cancelable: false }
        );
      }else if(!agb){
        Alert.alert(
          'Bitte stimme unseren AGB zu!',
          '',

          [{ text: 'Zum Anmelden', onPress: () => props.changeInitPages('Anmelden') }, {text:"OK"}],
          { cancelable: false }
        );
      }else{
        storeData()
      }
    }

    //Geburtstag bestätigen
    const handleConfirm = (selectedDate) => {
      changeBirthday(new Date(selectedDate))
      showDatepicker(false)
      changeDateChanged(true)
    };
    
    return(
      <ImageBackground source={require('../assets/Registrieren.png')} style={styles.imagebackground} imageStyle={{resizeMode:'stretch'}}>
        <KeyboardAwareScrollView 
          style={{width:'100%'}}
          resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={globalStyles.container}
          scrollEnabled={false}
        >
        <View style={styles.registrierenContainer}>
          <Text style={{...styles.textM, fontSize:25, marginTop:50, marginBottom: 50}}>Registrierung</Text>
          
        <Text style={{...styles.text, alignSelf:'flex-start', marginLeft:'18%'}}>Vorname</Text>
          <TextInput 
              style={styles.textinput}
              onChangeText={text => changeName(text)}></TextInput>

          <Text style={{...styles.text, alignSelf:'flex-start', marginLeft:'18%'}}>Alter</Text>
          <TextInput 
              style={styles.textinput}
              onChangeText={age => changeAge(age)} keyboardType={'numeric'}></TextInput>
          
          <Text style={{...styles.text, alignSelf:'flex-start', marginLeft:'18%', marginTop:50}}>Benutzername</Text>
          <TextInput 
              style={styles.textinput}
              onChangeText={text => changeEMail(text)} autoCapitalize = 'none'></TextInput>


          <Text style={{...styles.text, alignSelf:'flex-start', marginLeft:'18%'}}>Passwort</Text>
          <TextInput 
              autoCapitalize = 'none'
              style={styles.textinput}
              onChangeText={text => changePassword(text)}></TextInput>

      
          {/*<TouchableOpacity onPress={()=>{showDatepicker(true)}}>{dateChanged ?
            <Text>{birthday.getDate()}.{birthday.getMonth()+1}.{birthday.getFullYear()}</Text>:
            <Text>hier eingeben</Text>}
          </TouchableOpacity>
          <DateTimePickerModal
            value={birthday}
            isVisible={datepicker}
            display="spinner"
            mode="date"
            onConfirm={handleConfirm}
            onCancel={showDatepicker}
          />*/}
          
          <View style={{flexDirection:"row", alignItems:"center", justifyContent:'center'}}>
            <CheckBox uncheckedColor={'#ccc'} checkedColor={'#89FFF1'} checked={agb} onPress={() => changeAgb(!agb)}/>
            <Text style={{...styles.text, fontSize:14, textDecorationLine:'underline'}}>Ich bin einverstanden mit den AGB</Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={() =>abschicken()}>
              <LinearGradient
              colors={['#D476D5', '#C77BD8', '#8F92E3']}
              start={{ x: 0, y: 0.4 }}
              end={{ x: 0, y: 1 }}
              style={styles.gradient}>
                <Text style={{...styles.text, fontSize:18}}>Registrieren</Text>
              </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity  onPress={() =>props.changeInitPages('StartBildschirm')}>
                <Text style={{...styles.text, fontSize: 14, textDecorationLine: "underline", marginTop:15}}>Zurück</Text>
          </TouchableOpacity>
          
        </View>
        </KeyboardAwareScrollView>
      </ImageBackground>
    )
  }

  const styles = StyleSheet.create({
    registrierenContainer:{
      flex: 1,
      width: '100%',
      alignItems: 'center',
    },
    textinput: {
      paddingVertical:5,
      paddingHorizontal:20, 
      backgroundColor: '#464982', 
      width:'70%', 
      borderRadius:10,
      color:'#fff',
      fontSize:16,
      fontFamily:'Poppins_400Regular',
      marginBottom: 20, 
    },
    gradient: {
      alignItems: 'center',
      borderRadius: 18,
      paddingBottom: 4,
      paddingTop: 4,
      paddingHorizontal: 20,
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: {width:0, height:4},
      shadowRadius: 4,
      shadowOpacity: 0.4,
      marginVertical:10
    },
    radio:{
      width: 200,
      borderWidth: 0,
      height:30,
    },
    text: {
      color:'#fff',
      fontSize:17,
      fontFamily:'Poppins_400Regular'
    }, 
    textM: {
      color:'#fff',
      fontFamily:'Poppins_500Medium'
    },
    imagebackground: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width:'100%'
    },
  })