import React, {useState, useEffect, useContext} from 'react';
import { Button, StyleSheet, Text, View, Modal,Alert,ActivityIndicator , SafeAreaView} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
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


  useEffect(()=>{
    
    Linking.addEventListener('url', (url)=>{
      let { path, queryParams } = Linking.parse(url.url)
      console.log("EventListener")
      handleUrl(queryParams)
    })
    waitForLink()
  },[])

  const waitForLink= async()=>{
    const myUrl = await Linking.getInitialURL()
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
        userDataTemp.friends.puzzles[queryParams.id] = {id:queryParams.id, pieces:0, friends:friends, log:{}}
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
        <Modal
                  animationType="slide"
                  transparent={true}
                  visible={newBenchmark.length>0}
              >
                <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={{fontSize:30}}>{benchmarks[newBenchmark[0]]&&benchmarks[newBenchmark[0]].title}</Text>
                    <Text style={{fontSize:15}}>{benchmarks[newBenchmark[0]]&&benchmarks[newBenchmark[0]].description}</Text>
                    <Button title={"weiter"} onPress={()=>{newBenchmarkTemp.shift();changeNewBenchmark(newBenchmarkTemp)}}></Button>
                </View>
                </View>
          </Modal>
        
        <NavigationContainer>
          <Tab.Navigator 
            initialRouteName="Home"
            tabBarOptions={{
              activeTintColor: '#D476D5',
              inactiveTintColor: '#fff',
              style:{
                height:60,
                borderTopLeftRadius:15,
                borderTopRightRadius:15,
                backgroundColor: '#0F113A',
                position:"absolute"
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
                  <AntDesign name="home" size={30} color={focused?'#D476D5':"#fff"} />
                ),
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

  //Wrap für gesamte App - cond. Rendering für angemeldet/nicht angemeldet
  return (
    <AppContext.Provider value={appContext}>
      <View style={{backgroundColor:'#000'}}>
      <SafeAreaView style={styles.pagewrap}>
        {isLoading?<View style={{height:"100%",justifyContent:"center"}}><ActivityIndicator size="large" color="black"/></View>:<View>
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
    margin: 20,
    width:"80%",
    height:"80%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
});