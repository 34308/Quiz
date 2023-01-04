import { Text, StyleSheet, TouchableOpacity} from "react-native";
import * as React from "react";
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {Card} from "react-native-elements";
import {useEffect, useState} from 'react';
import {getAllTestFromNet} from './serverConnector';
import shuffle from 'lodash.shuffle'
import {db} from './dbConnector';
import NetInfo from '@react-native-community/netinfo';
import SplashScreen from 'react-native-splash-screen';
import { StackActions } from '@react-navigation/native';



export default function TestCard (){
    const navigation = useNavigation();
    const [tests,setTests]=useState([]);
    const [shufled,setShufled]=useState(false);
    if(!shufled){
        getTests();
        setShufled(true);
    }
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

    async function getTests () {
        NetInfo.fetch().then(async state => {
            if (state.isConnected) {
                setTests(shuffle(await getAllTestFromNet()));
                SplashScreen.hide();
            } else {
                setTestFromDatabase();
                SplashScreen.hide();
            }
        })
    }
    return(
        tests.map((u, i) => {
            return (
                <TouchableOpacity key={u.name} onPress={()=>{
                    console.log(u.id,u.name);
                    navigation.dispatch(StackActions.push('Drawer',{screen:u.name},{id:u.id,name:u.name}));

                }}>
                    <Card>
                        <Card.Title>{u.name}</Card.Title>
                        <Card.Divider />
                        <Text style={styles.textTag}>{u.tags.toString()}</Text>
                        <Text >{u.level}</Text>
                        <Text >{u.numberOfTasks+" Pytań."}</Text>
                        <Card.Divider />
                        <Text >{u.description}</Text>
                    </Card>
                </TouchableOpacity>
            );
        })
    );
}

const styles = StyleSheet.create({
    container: {
    flexFlow: 'row',
    justifyContent: "space-evenly",
    alignItems: 'center',
    backgroundColor: "#6804CD",
    width: "100%",
    height:30,
    },

    textTag: {

        color: '#0027FF',
        fontWeight: 'bold',
    }
});


