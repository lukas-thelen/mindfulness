import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RadioButtonRN from 'radio-buttons-react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useEffect } from 'react';


export const Anmelden =(props)=>{
    const [name, changeName] = useState("")
    const [birthday, changeBirthday] = useState(new Date())
    const [gender, changeGender] = useState("")
    const [datepicker, showDatepicker] = useState(false)
    const [dateChanged, changeDateChanged] = useState(false)

    const storeData = async () => {
      const userData ={loggedIn:true, name:name, gender:gender, birthday:birthday}
      try {
        const jsonValue = JSON.stringify(userData)
        await AsyncStorage.setItem('userData', jsonValue)
        props.changeLoggedIn(true)
        console.log("erfolgreich")
      } catch (e) {
        console.log(e)
      }
    }

    const abschicken =()=>{
      if (name===""|| dateChanged===false || gender === ""){
        Alert.alert(
          'Unvollständig',
          'Bitte fülle alle Felder aus!',
          [{ text: 'OK'}],
          { cancelable: false }
        );
      }else{
        //storeData()
      }
    }

    const data = [
      {
        label: 'männlich'
       },
       {
        label: 'weiblich'
       },
       {
         label: 'divers'
       }
      ];

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

        <Text>Geschlecht:</Text>
        <RadioButtonRN
          boxStyle={styles.radio}
          data={data}
          selectedBtn={(e) => changeGender(e.label)}
        />

        <View style={styles.trennlinie}/>
        
        <Button title={"zeige Daten"} onPress={() =>{test()}} ></Button>
        <Button title={"anmelden"} onPress={() =>{abschicken()}} ></Button>
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