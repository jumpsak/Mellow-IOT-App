import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider } from 'react-native-paper';
import React, { useEffect ,useState } from "react";
import {
  LandingPage,
  HomeScreen,
  DrawerScreen,
  LoginScreen,
  HeaderBar,
} from './src/screens';
import DeviceList from './src/screens/DeviceList';
import { Text, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { UserProvider, useUserContext } from './src/context/UserContext';
import * as SecureStore from 'expo-secure-store';
import { AppConfig } from './src/AppConfig';
const { odooUrl, adminToken } = AppConfig;

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function HomePage() {
  const { setId, setName, setEmail, setAvatar } = useUserContext();

  const _getUser = async (userId) => {
    await SecureStore.setItemAsync("UserId", userId.toString());
    await fetch(`${odooUrl}/api/v1/users/${userId}`, {
      method: "GET",
      headers: {
        accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        "x-api-key": `${adminToken}`,
      },
    })
      .then((res) =>
        res.json().then((data) => {
          setEmail(data.email);
          setName(data.name);
          setAvatar(data.avatar_512);
        })
      )
      .catch((error) => console.log("error: ", error));

  };


  const getValueFor = async() => {
    await SecureStore.getItemAsync("UserId")
    .then((res) => {
        _getUser(parseInt(res))
        setId(parseInt(res))
    });
  }

  useEffect(()=>{
    getValueFor();
  },[])

  return (
  //!! JumpSak, do not find a bug in this time
  // <React.StrictMode>
    <Drawer.Navigator
      // useLegacyImplementation
      drawerContent={(props) => <DrawerScreen {...props} />}>
      <Drawer.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          header: (props) => <HeaderBar {...props} />,
        }}
      />
      <Drawer.Screen 
        name="DeviceList_1"
        component={HomeScreen}
        options={{
          header: (props) => <HeaderBar {...props} />,
        }}
      />
      <Drawer.Screen 
        name="DeviceList_2"
        component={DeviceList}
        options={{
          header: (props) => <HeaderBar {...props} />,
        }}
      />
    </Drawer.Navigator>
  // </React.StrictMode>
  );
}

function LoadingPage({ navigation }) {

  // const { setId } = useUserContext();
  const [isLogIn , setLogin] = useState(false);


  const deleteLogin = async() => {
    if(!isLogIn)
      await SecureStore.deleteItemAsync("LogInOn")
  }

  // function check login
  const getLogInOn = async() => {
    await SecureStore.getItemAsync("LogInOn")
    .then((res) => {
        const login_duration = parseInt(new Date() - (res ? new Date(res) : new Date()))/60000
        setLogin((login_duration > 3 || login_duration == 0 || res == null) ? false : true)
        navigation.navigate((login_duration > 3 || login_duration == 0 || res == null) ? "LandingPage" : "HomePage")
    })
  }

  
  

  useEffect(()=>{

    // getLogInOn()
    const timer = setTimeout(()=>{
      getLogInOn()
      deleteLogin()
      // console.log("Timer Effect",new Date().getSeconds().toLocaleString())
    },3000)
    

    return () => clearTimeout(timer)
  },[])

   
  

  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Text>Loading ...</Text>
    </View>
  )
}

function App() {
  // const [userId,setUserId] = useState(0);
  // const [isLoading,setIsLoading] = useState(true);
  // const [isLogIn,setIsLogIn] = useState(false);
  // const [firstscreen,setFirstscreen] = useState('');
  
  // const getValueFor = async() => {
  //   await SecureStore.getItemAsync("UserId")
  //   .then((res) => {
  //     setUserId(parseInt(res))
  //     setFirstscreen(res ? 'HomePage' : 'LandingPage');
  //     setIsLoading(false);
  //   })
  //   .catch((err) => {
  //       setIsLoading(false);        
  //       setFirstscreen('LandingPage');
  //   })
  // }

  // const getLogInOn = async() => {
  //   await SecureStore.getItemAsync("LogInOn")
  //   .then((res) => {
  //     if (res != null){
  //       const result = parseInt(new Date() - new Date(res)) > 180000
      
  //       console.log("result",result)
  //       if (result) {
  //         setIsLogIn(false);
  //         setFirstscreen('LandingPage');
  //         setIsLoading(false)
  //         console.log("result2",result)
  //       }
  //       else {
  //         getValueFor()
  //         setIsLogIn(true)
  //         setIsLoading(false)
  //       }
  //     }
  //     else {
  //       console.log("resa",res)
  //       setFirstscreen('LandingPage');
  //       setIsLogIn(false)
  //       setIsLoading(false)
  //     }
  //   })
  // }

  // useEffect(()=>{
  //   // getValueFor()
  //   getLogInOn()
  // },[])

  // if (isLoading) {
  //   return <></>; //Or something to show that you are still warming up!
  // }

  return (
    <UserProvider>
      <NavigationContainer>
          <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName={"LoadingPage"}
          >
            <Stack.Screen name="LoadingPage" component={LoadingPage} />
            <Stack.Screen name="LandingPage" component={LandingPage} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="HomePage" component={HomePage} />
            {/* <Stack.Screen name="DeviceListPage" component={DeviceListPage} /> */}
          </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}

export default App;
