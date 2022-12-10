import { Text, StyleSheet, TouchableOpacity} from "react-native";
import * as React from "react";
import { useNavigation} from '@react-navigation/native';
import {Card} from "react-native-elements";
export default function TestCard (){
    const navigation = useNavigation();

    const tests=[
        {
            name:'Test #1',
            tags:["tags1","tags2"],
            descriptor:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard\n' +
                '                dummy text ever since the 1500s'
        },
        {
            name:'Test #2',
            tags:["tags1","tags2"],
            descriptor:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard\n' +
                '                dummy text ever since the 1500s'
        },
        {
            name:'Test #3',
            tags:["tags1","tags2"],
            descriptor:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard\n' +
                '                dummy text ever since the 1500s'
        },
    ]

    return(
        tests.map((u, i) => {
            return (
                <TouchableOpacity key={u.name} onPress={() => navigation.navigate('Test')}>
                    <Card>
                        <Card.Title>{u.name}</Card.Title>
                        <Card.Divider />
                        <Text style={styles.textTag}>{u.tags+''}</Text>
                        <Card.Divider />
                        <Text >{u.descriptor}</Text>
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


