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
      <Text style={{fontSize:25, color: '#fff'}}>Registrierung</Text>
        <Text style={styles.text}>Benutzername</Text>
        <Text style={{fontSize:12, color: '#fff'}}>(muss eindeutig sein)</Text>
        <TextInput 
            style={styles.textinput}
            onChangeText={text => changeEMail(text)} autoCapitalize = 'none'></TextInput>

        <View style={globalStyles.trennlinie}/>

        <Text style={styles.text}>Passwort</Text>
        <TextInput 
            autoCapitalize = 'none'
            style={styles.textinput}
            onChangeText={text => changePassword(text)}></TextInput>

        <View style={globalStyles.trennlinie}/>

        <Text style={styles.text}>Vorname</Text>
        <TextInput 
            style={styles.textinput}
            onChangeText={text => changeName(text)}></TextInput>


        <View style={globalStyles.trennlinie}/>

        

        <Text style={styles.text}>Alter</Text>
        <TextInput 
            style={styles.textinput}
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

        <Text style={styles.text}>Geschlecht</Text>
        <RadioButtonRN
          boxStyle={globalStyles.radio}
          data={genderData}
          selectedBtn={(e) => changeGender(e.label)}
        />

        <View style={globalStyles.trennlinie}/>
        <TouchableOpacity style={styles.containertext1} onPress={() =>abschicken()}>
              <Text style={{color: '#fff', fontSize: 18}}>Registrieren</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.containertext2} onPress={() =>props.changeInitPages('StartBildschirm')}>
              <Text style={{color: '#fff', fontSize: 10}}>Zurück</Text>
        </TouchableOpacity>
      </View>
      </KeyboardAwareScrollView>
    )
  }

  const styles = StyleSheet.create({
    registrierenContainer:{
      flex: 1,
      width: '100%',
      backgroundColor: '#0F113A',
      alignItems: 'center',
      marginTop:60
    },
    textinput: {
      height: '3%', 
      borderColor: '#464982', 
      backgroundColor: '#464982', 
      borderWidth: 10, 
      width:200, 
      borderRadius:200, 
    },
    text: {
      color: '#fff'
    },
    containertext1: {
      alignItems:'center',
      width: '40%',
      height: '4%',
      borderRadius: 100,
      backgroundColor: '#80DEE4',
      marginTop: 60,
      shadowColor: 'black',
      shadowOpacity: 0.8,
      elevation: 10,
      shadowRadius: 8,
      shadowOffset : { width: 10, height: 5}
    },
    containertext2: {
      alignItems:'center',
      marginTop: 15
    },
    containertext3: {

    }
    
  })