import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RadioButtonRN from 'radio-buttons-react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";

import {AppContext} from './context.js';
import { useContext } from 'react';


export const Registrieren =(props)=>{
    const [eMail, changeEMail] = useState("")
    const [password, changePassword] = useState("")
    const [name, changeName] = useState("")
    const [birthday, changeBirthday] = useState(new Date())
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
      userData.birthday = birthday;


      changeUsername(name)
      props.changeInitPages('AchtsamkeitsAbfrage')
      props.changeUserData(userData)
    }

    //Nutzerinformationen prüfen und überarbeiten
    const abschicken =()=>{
      if (eMail === "" || password === "" || name===""|| dateChanged===false || gender === ""){
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

    const test = () =>{
        console.log(name)
        console.log(birthday)
        console.log(gender)
    }
    
    return(
      <View style={styles.pagewrap, styles.container}>
        <Text>Registrierung</Text>
        <Text>Name:</Text>
        <TextInput 
            style={{ height: 20, borderColor: 'gray', borderWidth: 1, width:200, borderRadius:200, paddingLeft:10}}
            onChangeText={text => changeName(text)}></TextInput>


        <View style={styles.trennlinie}/>


        <Text>Geburtsdatum:</Text>
        <TouchableOpacity onPress={()=>{showDatepicker(true)}}>{dateChanged ?
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
        />

        <View style={styles.trennlinie}/>


        <Text>E-Mail:</Text>
        <TextInput 
            style={{ height: 20, borderColor: 'gray', borderWidth: 1, width:200, borderRadius:200, paddingLeft:10}}
            onChangeText={text => changeEMail(text)}></TextInput>

        <View style={styles.trennlinie}/>

        <Text>Passwort:</Text>
        <TextInput 
            style={{ height: 20, borderColor: 'gray', borderWidth: 1, width:200, borderRadius:200, paddingLeft:10}}
            onChangeText={text => changePassword(text)}></TextInput>

        <View style={styles.trennlinie}/>


        <Text>Geschlecht:</Text>
        <RadioButtonRN
          boxStyle={styles.radio}
          data={genderData}
          selectedBtn={(e) => changeGender(e.label)}
        />

        <View style={styles.trennlinie}/>

        <Button title={"zeige Daten"} onPress={() =>{test()}} ></Button>
        <Button title={"anmelden"} onPress={() =>{abschicken()}} ></Button>
        <Button title={"Zurück"} onPress={() =>{props.changeInitPages('StartBildschirm')}} ></Button>
      </View>
    )
  }

//Styles
const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    pagewrap:{
      width: '100%',
      height: '100%'
    },
    radio:{
      width: 200,
      borderWidth: 0,
      height:30
    },
    trennlinie:{
      height:1,
      width:"100%",
      backgroundColor:"black",
      marginBottom:10,
      marginTop:10
    }
  });