import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './Components/Home';
import Results from './Components/Results';
import Contract from './Components/Contract';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useEffect, useState} from 'react';
import {getData, storeData} from './Components/StorageHelper';
import {
  crateTable,
  db,
  getDatabase,
  insertDetailsOfTestIntoDatabase,
  insertTestsIntoDatabase,
} from './Components/dbConnector';
import {getAllTestFromNet, getTestFromNet} from './Components/serverConnector';
import NetInfo from '@react-native-community/netinfo';

import TestScreen from './Components/TestScreen';
import shuffle from 'lodash.shuffle';

export default function App() {
  const [hasLaunched, setHasLaunched] = useState(false);
  const [hasTimeElapsed, setTimeElapsed] = useState(false);
  const [TimeChecked, setTimeChecked] = useState(false);
  const [randomT, setRandomTest] = useState([]);
  const [tests, setTests] = useState([]);
  const [state, setState] = useState(true);
  const [gotDatabase, didGetdatabase] = useState(false);
  async function getTests() {
    NetInfo.fetch().then(async state => {
      if (state.isConnected) {
        setTests(shuffle(await getAllTestFromNet()));
      } else {
        setTestFromDatabase();
      }
    });
  }
  useEffect(() => {
    if (!gotDatabase) {
      getTests();
      didGetdatabase(true);
    }

    if (!hasLaunched) {
      getData('HAS_LAUNCHED4').then(r => {
        if (r) {
          setHasLaunched(true);
        }
      });
      crateTable();
    }
  }, [getTests, hasLaunched]);

  if (!TimeChecked) {
    getData('Datex').then(d => {
      if (d === undefined) {
        downloadTests();
        storeData(Date.now().toString(), 'Datex');
      } else if (parseInt(d) - d > 86400000) {
        downloadTests();
        storeData(Date.now().toString(), 'Datex');
        console.log('date:' + (Date.now() - parseInt(d)));
      }
    });
    setTimeChecked(true);
  }
  async function downloadTests() {
    const json = await getAllTestFromNet();
    insertTestsIntoDatabase(json);
    for (const test of json) {
      insertDetailsOfTestIntoDatabase(await getTestFromNet(test.id));
    }
  }
  const Stack = createNativeStackNavigator();
  const Drawer = createDrawerNavigator();
  function DrawerF() {
    return (
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={props => {
          return (
            <DrawerContentScrollView {...props}>
              <DrawerItemList {...props} />
              <DrawerItem
                label="Download tests"
                onPress={() => downloadTests()}
              />
            </DrawerContentScrollView>
          );
        }}>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Results" component={Results} />
        {tests.map((u, i) => {
          return (
            <Drawer.Screen
              name={u.name}
              key={u.name}
              component={TestScreen}
              initialParams={{id: u.id, name: u.name}}
            />
          );
        })}
        <Drawer.Screen
          name="Random Test"
          component={TestScreen}
          initialParams={{id: -1, name: 0}}
        />
      </Drawer.Navigator>
    );
  }
  function Stack2() {
    return (
      <Stack.Navigator
        name={'root'}
        initialRouteName={'Drawer'}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name={'Drawer'} component={DrawerF} />
      </Stack.Navigator>
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

  return (
    <NavigationContainer>
      {hasLaunched ? <Stack2 /> : <Stack1 />}
    </NavigationContainer>
  );

  async function setTestFromDatabase() {
    const query = 'select * from tests';
    let tests = '[';
    let i = 0;
    db.transaction(async txn => {
      await txn.executeSql(
        query,
        [],
        (transaction, resultSet) => {
          for (var i = 0; i < resultSet.rows.length; i++) {
            tests = tests + JSON.stringify(resultSet.rows.item(i));
            if (i < resultSet.rows.length - 1) {
              tests = tests + ',';
            }
          }
          tests = tests + ']';
          setTests(shuffle(JSON.parse(tests)));
        },
        error => {
          console.log('Inserting error: ' + error.message);
        },
      );
    });
  }
}
