import { Text, StyleSheet, TouchableOpacity} from "react-native";
import * as React from "react";
import { useNavigation} from '@react-navigation/native';
import {Card} from "react-native-elements";
import {useState} from 'react';
let placeholder=[{"id":"62032610069ef9b2616c761e","name":"Moda na sukces","description":"Quiz z najważniejszych wydarzeń serialu.","tags":["tv","tasiemiec","serial"],"level":"średni","numberOfTasks":5}]

export default function TestCard (){
    const navigation = useNavigation();
    const [tests,setTests]=useState(placeholder);
    getRTestFromNet();
    async function getRTestFromNet() {
        try {
            const response = await fetch('https://tgryl.pl/quiz/tests');
            const json = await response.json();
            setTests(json);
        } catch (error) {
            console.error(error);
        }
    }
    return(
        tests.map((u, i) => {
            return (
                <TouchableOpacity key={u.name} onPress={() => navigation.navigate('Test',{id:u.id})}>
                    <Card>
                        <Card.Title>{u.name}</Card.Title>
                        <Card.Divider />
                        <Text style={styles.textTag}>{u.tags}</Text>
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


