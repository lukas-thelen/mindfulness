import React, {useState, useEffect, useContext} from 'react';
import { Button, StyleSheet, Text, View, Modal,ActivityIndicator , SafeAreaView,Keyboard, Image, TouchableOpacity,StatusBar,Alert} from 'react-native';
import { DarkTheme, NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Linking from 'expo-linking';
import {HomeScreen} from './src/Home.js';
import {ProfilScreen} from './src/Profil.js';
import {AppContext} from './src/context.js';
import { Init } from './src/Init.js';
import { benchmarks } from './src/benchmarks.js';
import { FreundeScreen } from './src/Freunde.js';
import cloneDeep from 'lodash/cloneDeep';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useFonts, Poppins_400Regular, Poppins_500Medium } from '@expo-google-fonts/poppins';
import { LinearGradient } from 'expo-linear-gradient';
import { Appeinfuehrung } from './src/Einfuehrung.js';




const Tab = createBottomTabNavigator();

const LoadingScreen=()=>{
  return(
    <ActivityIndicator/>
  )
}

export const Tabnavigator = () =>{
  const {newBenchmark, changeNewBenchmark, userData, changeAppData,changeUserData, appData,currentUser, changeForceUpdate, forceUpdate} = useContext(AppContext)
  const newBenchmarkTemp =[...newBenchmark]
  const userDataTemp = cloneDeep(userData)
  const [einfuehrungVisible, changeEinfuehrungVisible]=useState(false)


  useEffect(()=>{
    
    Linking.addEventListener('url', (url)=>{
      let { path, queryParams } = Linking.parse(url.url)
      console.log("EventListener")
      handleUrl(queryParams)
    })
    waitForLink()
    if(!userData.introSeen) changeEinfuehrungVisible(true)
  },[])

  const waitForLink= async()=>{
    const myUrl = await Linking.getInitialURL()
    console.log(myUrl)
    let { path, queryParams } = Linking.parse(myUrl)
    handleUrl(queryParams)
  }

  const handleUrl= (queryParams)=>{
    if(!userDataTemp.friends){
      userDataTemp.friends = {friends:{}}
    }
    if(queryParams.type === "friendRequest"){
      console.log("new Friend Request by "+ queryParams.eMail)
      if(!userDataTemp.friends.friends[queryParams.eMail]){
        userDataTemp.friends.friends[queryParams.eMail] = {name: queryParams.name}
      }
    }
    if(queryParams.type === "newPuzzle"){
      console.log("New Puzzle created by "+ queryParams.name)
      var friends = JSON.parse(queryParams.friends)
      var friendsNames = JSON.parse(queryParams.friendsNames)
      var motif = queryParams.motif
      var includesMe = false
      for (var k=0; k<friends.length;k++){
        if(!(userDataTemp.friends.friends[friends[k]]||friends[k]===currentUser)){
          userDataTemp.friends.friends[friends[k]] = {name: friendsNames[k]}
        }
        if(friends[k]===currentUser){
          includesMe= true
        }
      }
      if(!userDataTemp.friends.puzzles[queryParams.id]&&includesMe){
        userDataTemp.friends.puzzles[queryParams.id] = {id:queryParams.id, pieces:0, friends:friends, log:{}, motif:motif}
      }
    }
    if(queryParams.type === "puzzlePieces"){
      console.log("Puzzle Pieces")
      if(!userDataTemp.friends.puzzles[queryParams.puzzleId]){
        console.log("Puzzle nicht gefunden")
      }else{
        if(userDataTemp.friends.puzzles[queryParams.puzzleId].log[queryParams.id]){
          console.log("Teile bereits erhalten")
        }else{
          userDataTemp.friends.puzzles[queryParams.puzzleId].pieces= parseInt(userDataTemp.friends.puzzles[queryParams.puzzleId].pieces)+parseInt(queryParams.pieces)
          userDataTemp.friends.puzzles[queryParams.puzzleId].log[queryParams.id]={id:queryParams.id, puzzleId:queryParams.puzzleId, pieces:queryParams.pieces, user:queryParams.user}
        }
      } 
    }
    changeForceUpdate("") 
    changeForceUpdate("neue Updates im Freunde-Tab") 
    changeUserData(userDataTemp)
    appData[userDataTemp.data.eMail]=userDataTemp
    changeAppData(appData)
    const jsonvalue=JSON.stringify(appData)
    storeData(jsonvalue)
  }

  const storeData=async(jsonvalue)=>{
    await AsyncStorage.setItem('appData', jsonvalue)
  }


  return(
    
    <View style = { {height: "100%", width: "100%"}}>
      <StatusBar hidden={false} barStyle="light-content"/>
        <Modal
                  animationType="slide"
                  transparent={true}
                  visible={newBenchmark.length>0}
              >
                <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={{...styles.text, textAlign:'center', color:'#D476D5'}}>Neuer Erfolg!</Text>
                    <Text style={{...styles.text, fontSize:28, textAlign:'center'}}>{benchmarks[newBenchmark[0]]&&benchmarks[newBenchmark[0]].title}</Text>
                    <View style ={{padding:15, backgroundColor: "#464982b2", borderRadius:8}}>
                      <Image style={{alignSelf:"center"}}source={benchmarks[newBenchmark[0]]&&benchmarks[newBenchmark[0]].picture}/>
                    </View>
                    <Text style={{...styles.text, textAlign:'center'}}>{benchmarks[newBenchmark[0]]&&benchmarks[newBenchmark[0]].description}</Text>
                    <TouchableOpacity styles={styles.button} onPress={()=>{newBenchmarkTemp.shift();changeNewBenchmark(newBenchmarkTemp);console.log("hallo")}}>
                    <LinearGradient
                            colors={['#D476D5', '#C77BD8', '#8F92E3']}
                            start={{ x: 0, y: 0.4 }}
                            end={{ x: 0, y: 1 }}
                            style={styles.gradient}>
                                <Text style={{...styles.text, fontSize:17}}>YAY!</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
                </View>
          </Modal>
          <Modal visible={einfuehrungVisible} transparent={true}>
            <Appeinfuehrung changeEinfuehrungVisible={changeEinfuehrungVisible}/>
          </Modal>
        
        <NavigationContainer theme={DarkTheme}>
          <Tab.Navigator 
            initialRouteName="Home"
            tabBarOptions={{
              activeTintColor: '#D476D5',
              inactiveTintColor: '#fff',
              keyboardHidesTabBar:true,
              style:{
                height:60,
                borderTopLeftRadius:15,
                borderTopRightRadius:15,
                backgroundColor: '#0F113A',
                position:"absolute",
                borderTopWidth:0
              },
              showLabel:false,
            }}
          >
            <Tab.Screen 
              name="Freunde" 
              component={FreundeScreen}
              options={{
                tabBarIcon: ({focused}) => (
                  <Ionicons name="people-outline" size={36} color={focused?'#D476D5':"#fff"} />
                ),
              }}
            />
            <Tab.Screen 
              name="Home" 
              component={HomeScreen} 
              options={{
                tabBarIcon: ({ focused }) => (
                  <AntDesign name="home" size={30} color={focused?'#D476D5':"#fff"}/>
                ),
              }}
              listeners={{
                tabPress: e => {
                  if(forceUpdate===""){
                    changeForceUpdate("reset Home Page") 
                  }else{
                    changeForceUpdate("") 
                  }
                }
              }}
            />
            <Tab.Screen 
              name="Profil" 
              component={ProfilScreen} 
              options={{
                tabBarIcon: ({ focused }) => (
                  <Ionicons name="person-outline" size={30} color={focused?'#D476D5':"#fff"} />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
    </View>
  );
}

//App-Component
export default function App() {
  const [loggedIn, changeLoggedIn] = useState(false);
  const [username, changeUsername] =useState("")
  const [appData, changeAppData] = useState({})
  const [userData, changeUserData] = useState({});
  const [currentUser, changeCurrentUser] = useState("")
  const [isLoading, changeIsLoading] = useState(true)
  const [gehoerteUebungen, changeGehoerteUebungen] =useState([])
  const [newBenchmark, changeNewBenchmark] = useState([])
  const [forceUpdate, changeForceUpdate] =useState(false)
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
  });


  //wird einmalig beim ersten rendern des Components ausgeführt
  useEffect(()=>{
    getData()
  },[]);

  const appContext ={
    username, changeUsername,
    
    userData, changeUserData,

    loggedIn, changeLoggedIn,

    appData, changeAppData,

    currentUser, changeCurrentUser,

    gehoerteUebungen, changeGehoerteUebungen,

    newBenchmark, changeNewBenchmark,

    forceUpdate, changeForceUpdate,

  }

  //lädt Daten aus dem AsyncStorage und setzt die entsprechenden Werte im Kontext ein
  const getData = async () => {
    console.log("gestartet")
    try {
      const appDataV = await AsyncStorage.getItem('appData')
      const currentUserV = await AsyncStorage.getItem('currentUser')
      if (appDataV != null){
        const appDataTemp = JSON.parse(appDataV)
        const currentUserTemp = currentUserV
        console.log(currentUserTemp)
        changeAppData(appDataTemp)
        if(currentUserTemp){
          const userDataTemp = appDataTemp[currentUserTemp]
          const gehoerteUebungenTemp = userDataTemp.gehoerteUebungen
          changeUserData(userDataTemp)
          changeCurrentUser(currentUserTemp)
          changeGehoerteUebungen(gehoerteUebungenTemp)
          changeUsername(userDataTemp.data.name)
          changeLoggedIn(true)
        }
      }
    } catch(e) {
      console.log(e)
    }
    changeIsLoading(false)
  }
  const handleUnhandledTouches=()=>{
    Keyboard.dismiss()
    return false;
  }

  //Wrap für gesamte App - cond. Rendering für angemeldet/nicht angemeldet
  return (
    <AppContext.Provider value={appContext}>
      <View style={{backgroundColor:'#000'}} onStartShouldSetResponder={handleUnhandledTouches}>
      <SafeAreaView style={styles.pagewrap}>
        {isLoading||!fontsLoaded?<View style={{height:"100%",justifyContent:"center"}}><ActivityIndicator size="large" color="black"/></View>:<View>
          {loggedIn ? <Tabnavigator style={styles.container}/> : <Init changeLoggedIn={changeLoggedIn}/>}</View>
        }
      </SafeAreaView>
      </View>
    </AppContext.Provider>

  );
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
    height: '100%',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  modalView: {
    backgroundColor: '#0F113A',
    width: '90%',
    height:"60%",
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
  text: {
    fontFamily: 'Poppins_400Regular',
    fontSize:16,
    color:'#fff',
  },
  gradient: {
    alignItems: 'center',
    borderRadius: 17,
    paddingVertical: 5,
    paddingHorizontal: 30,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width:0, height:4},
    shadowRadius: 4,
    shadowOpacity: 0.4,
  },
});