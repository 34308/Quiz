import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './Components/Home';
import Results from './Components/Results';
import Contract from './Components/Contract';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import TestScreen from './Components/TestScreen';
import {useEffect, useState} from 'react';
import {getData} from './Components/StorageHelper';
import WaitingScreen from './Components/WaitingScreen';
import SplashScreen from 'react-native-splash-screen';

const refreshToken = () => {
  return new Promise(res => setTimeout(res, 1000));
};
export default function App() {
  const [hasLaunched, setHasLaunched] = useState(false);
  const [hasTimeElapsed, setTimeElapsed] = useState(false);
  useEffect(() => {
    if (!hasLaunched) {
      getData().then(r => {
        if (r) {
          console.log('1');
          setHasLaunched(true);
        }
      });
    }
  }, [hasLaunched]);
  const Stack = createNativeStackNavigator();
  const Drawer = createDrawerNavigator();
  function DrawerF() {
    return (
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Results" component={Results} />
        <Drawer.Screen name="Test" component={TestScreen} />
      </Drawer.Navigator>
    );
  }
  function Stack1() {
    return (
      <Stack.Navigator
        initialRouteName={'Contract'}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name={'Drawer'} component={DrawerF} />
        <Stack.Screen name={'Contract'} component={Contract} />
      </Stack.Navigator>
    );
  }
  function Navigators() {
    return (
      <NavigationContainer>
        {hasLaunched ? <DrawerF /> : <Stack1 />}
      </NavigationContainer>
    );
  }
  refreshToken().then(() => {
    setTimeElapsed(true);
    SplashScreen.hide();
  });

  return (
    <NavigationContainer>
      {hasLaunched ? <DrawerF /> : <Stack1 />}
    </NavigationContainer>
  );
}
