import React, { useState, useContext } from 'react';
import { Button, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ScrollView, Modal, ImageBackground} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AsyncStorage from '@react-native-async-storage/async-storage';
import RadioButtonRN from 'radio-buttons-react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { CheckBox } from 'react-native-elements'

import {AppContext} from './context.js';
import { globalStyles } from './globalStyles.js';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';


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
    const [agbs, changeAgbs] = useState(false)

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
      <ImageBackground source={require('../assets/Registrieren.png')} style={styles.imagebackground} imageStyle={{resizeMode:'cover'}}>
        <Modal 
          animationType="slide"
          transparent={true}
          visible={agbs}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity onPress={()=>{changeAgbs(false)}} style={{alignSelf:"flex-start", marginBottom:5}}>
                <Ionicons name="close-outline" color="white" size={50}></Ionicons>
              </TouchableOpacity>
              <View style={{height:2, backgroundColor:"white", width:"100%"}}/>
              <AGBs/>
            </View>
          </View>
        </Modal>
        <KeyboardAwareScrollView 
          style={{width:'100%'}}
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
            <Text style={{...styles.text, fontSize:14, textDecorationLine:'underline'}} onPress={()=>{changeAgbs(true)}}>Ich bin einverstanden mit den AGB</Text>
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
      fontFamily:'Poppins_400Regular',
      textAlign:"justify"
    }, 
    heading: {
      color:'#fff',
      fontSize:22,
      fontFamily:'Poppins_400Regular',
      marginVertical:10,
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
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    modalView: {
      backgroundColor: '#0F113A',
      width: '90%',
      height:"80%",
      borderColor: '#8F92E3',
      borderWidth: 1,
      borderRadius: 15,
      borderRadius: 15,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {width:0, height:4},
      shadowOpacity: 0.4,
      shadowRadius: 4,
      elevation: 5,
      justifyContent:"space-around"
    },
  })

const AGBs =()=>{
  return(
    <ScrollView>
      <Text style={styles.heading}>Haftung für Inhalte </Text>
      <Text style={styles.text}>Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen. </Text>
      <Text style={styles.heading}>Urheberrecht</Text>
      <Text style={styles.text}>Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen. </Text>
      <Text style={styles.heading}>1. Anbieter der App</Text>
      <Text style={styles.text}>“Upgrade your mind” </Text>
      <Text style={styles.text}>Universität Duisburg-Essen </Text>
      <Text style={styles.text}>Forsthausweg 2  </Text>
      <Text style={styles.text}>47057 Duisburg </Text>
      <Text style={styles.heading}>2. Leistungsinhalt App </Text>
      <Text style={styles.text}>Die App “Upgrade your mind” stellt Audiodateien und Informationen zur Verfügung mit denen Sie meditieren können. Zudem kann durch tägliche Angaben zum Befinden der eigene Fortschritt verfolgt werden. Ziel der Anwendung ist es Ihre Achtsamkeit zu fördern. “Upgrade your mind” behält sich das Recht vor, die App jederzeit in einer dem Nutzer zumutbaren Art und Weise zu ändern, z.B. um diese weiter zu entwickeln und qualitativ zu verbessern. Dies gilt sowohl für technische als auch inhaltliche Weiterentwicklungen.  </Text>
      <Text style={styles.heading}>3. Haftungs- beschränkung  </Text>
      <Text style={styles.text}>“Upgrade your mind” wendet bei der Auswahl, Pflege und Aktualität der Inhalte die von einem Verlag üblicherweise zu erwartende Sorgfalt an. Allerdings übernimmt “Upgrade your mind” keine Gewähr für die inhaltliche Richtigkeit, Aktualität und Vollständigkeit der zur Verfügung gestellten Inhalte und deren Auswahl sowie Zusammenstellungen. Dies gilt insbesondere auch soweit “Upgrade your mind” auf die Zulieferung von Texten Dritter angewiesen ist.  </Text>
      <Text style={styles.text}>Soweit die Verfügbarkeit der App von Leistungen Dritter (insbesondere Telekommunikationsanbietern) abhängig ist übernimmt “Upgrade your mind” keine Haftung. Für Schäden wegen der Verletzung des Lebens, des Körpers oder der Gesundheit, bei Vorsatz oder grober Fahrlässigkeit von “Upgrade your mind”, eines gesetzlichen Vertreters oder Erfüllungsgehilfen, sowie bei Schäden, die unter eine gewährte Garantie oder Zusicherung fallen, haftet “Upgrade your mind” nach den gesetzlichen Vorschriften. </Text>
      <Text style={styles.text}>Bei leichter Fahrlässigkeit haftet “Upgrade your mind” nur auf Ersatz der vertragstypischen, vorhersehbaren Schäden und nur, soweit eine Pflicht, deren ordnungsgemäße Erfüllung die Durchführung dieses Vertrages überhaupt erst ermöglicht und auf deren Einhaltung der Vertragspartner vertrauen durfte (Kardinalpflicht), durch “Upgrade your mind”, einen gesetzlichen Vertreter oder Erfüllungsgehilfen verletzt worden ist. Im Übrigen ist die Haftung, soweit gesetzlich zulässig, ausgeschlossen. </Text>
      <Text style={styles.heading}>4. Urheberrecht </Text>
      <Text style={styles.text}>Bei den zusammengestellten Inhalten der App handelt es sich um eigens von “Upgrade your mind” erstellten Audiodateien zur Meditation. “Upgrade your mind” ist Rechteinhaber bezüglich aller sonstigen Elemente der App, insbesondere hinsichtlich der Nutzungs- und Leistungsschutzrechte an Inhalten und Dokumenten. </Text>
      <Text style={styles.heading}>5. Schlussbestimmungen </Text>
      <Text style={styles.text}>Erfüllungsort und Gerichtsstand ist Duisburg. Es gilt ausschließlich das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts. Sollten einzelne dieser Bestimmungen unwirksam sein oder nachträglich unwirksam werden, berührt dies nicht die Gültigkeit der Bestimmungen insgesamt. </Text>
    </ScrollView>
  )
}