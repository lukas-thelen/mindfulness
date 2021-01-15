import React, { useState, useContext } from 'react';
import { Button, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AsyncStorage from '@react-native-async-storage/async-storage';
import RadioButtonRN from 'radio-buttons-react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";

import {AppContext} from './context.js';
import { globalStyles } from './globalStyles.js';


export const Registrieren =(props)=>{
    const [eMail, changeEMail] = useState("")
    const [password, changePassword] = useState("")
    const [name, changeName] = useState("")
    const [birthday, changeBirthday] = useState(new Date())
    const [age, changeAge] =useState(null)
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
      userData.gender = gender;
      //userData.birthday = birthday;
      userData.age = age;


      changeUsername(name)
      props.changeInitPages('AchtsamkeitsAbfrage')
      props.changeUserData(userData)
    }

    //Nutzerinformationen prüfen und überarbeiten
    const abschicken =()=>{
      if (eMail === "" || password === "" || name===""|| age===0 || gender === ""){
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

          [{ text: 'zum Anmelden', onPress: () => props.changeInitPages('Anmelden') }, {text:"ok"}],
          { cancelable: false }
        );
      }else{
        storeData()
      }
    }


    const genderData = [
      {label: 'männlich'},{label: 'weiblich'},{label: 'divers'}];

    //Geburtstag bestätigen
    const handleConfirm = (selectedDate) => {
      changeBirthday(new Date(selectedDate))
      showDatepicker(false)
      changeDateChanged(true)
    };
    
    return(
      <KeyboardAwareScrollView 
        style={{ backgroundColor: '#4c69a5'}}
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={globalStyles.container}
        scrollEnabled={false}
      >
      <View style={globalStyles.pagewrap, styles.registrierenContainer}>
      <Text style={{fontSize:25}}>Registrierung</Text>
        <Text>Nutzer-Kennung:</Text>
        <Text style={{fontSize:12}}>(muss eindeutig sein)</Text>
        <TextInput 
            style={{ height: 20, borderColor: 'gray', borderWidth: 1, width:200, borderRadius:200, paddingLeft:10}}
            onChangeText={text => changeEMail(text)} autoCapitalize = 'none'></TextInput>

        <View style={globalStyles.trennlinie}/>

        <Text>Passwort:</Text>
        <TextInput 
            autoCapitalize = 'none'
            style={{ height: 20, borderColor: 'gray', borderWidth: 1, width:200, borderRadius:200, paddingLeft:10}}
            onChangeText={text => changePassword(text)}></TextInput>

        <View style={globalStyles.trennlinie}/>

        <Text>Vorname:</Text>
        <TextInput 
            style={{ height: 20, borderColor: 'gray', borderWidth: 1, width:200, borderRadius:200, paddingLeft:10}}
            onChangeText={text => changeName(text)}></TextInput>


        <View style={globalStyles.trennlinie}/>

        

        <Text>Alter:</Text>
        <TextInput 
            style={{ height: 20, borderColor: 'gray', borderWidth: 1, width:200, borderRadius:200, paddingLeft:10}}
            onChangeText={age => changeAge(age)} keyboardType={'numeric'}></TextInput>
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

        <View style={globalStyles.trennlinie}/>

        <Text>Geschlecht:</Text>
        <RadioButtonRN
          boxStyle={globalStyles.radio}
          data={genderData}
          selectedBtn={(e) => changeGender(e.label)}
        />

        <View style={globalStyles.trennlinie}/>
        <Button title={"weiter"} onPress={() =>{abschicken()}} ></Button>
        <Button title={"Zurück"} onPress={() =>{props.changeInitPages('StartBildschirm')}} ></Button>
      </View>
      </KeyboardAwareScrollView>
    )
  }

  const styles = StyleSheet.create({
    registrierenContainer:{
      flex: 1,
      width: '100%',
      backgroundColor: '#fff',
      alignItems: 'center',
      marginTop:60
    }
  })