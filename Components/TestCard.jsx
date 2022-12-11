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
                '                dummy text ever since the 1500s',
            tasks:[{
                question:
                    'Z iloma krajami graniczy Polska?',
                answers: [
                    {
                        content: '7',
                        isCorrect: true,
                    },
                    {
                        content: '8',
                        isCorrect: false,
                    },
                    {
                        content: '9',
                        isCorrect: false,
                    },
                    {
                        content: '3',
                        isCorrect: false,
                    },
                ],
                duration: 8,
            },
                {
                    question:
                        'Dobry, zły i... ',
                    answers: [
                        {
                            content: 'Głupi',
                            isCorrect: false,
                        },
                        {
                            content: 'Brzydki',
                            isCorrect: true,
                        },
                        {
                            content: 'Dobry',
                            isCorrect: false,
                        },
                        {
                            content: 'Obojętny',
                            isCorrect: false,
                        },
                    ],
                    duration: 5,
                },
                {
                    question:
                        'Który wódz po śmierci Gajusza Mariusza, prowadził wojnę domową z Sullą ?',
                    answers: [
                        {
                            content: 'LUCJUSZ CYNNA',
                            isCorrect: false,
                        },
                        {
                            content: 'JULIUSZ CEZAR',
                            isCorrect: true,
                        },
                        {
                            content: 'LUCJUSZ MURENA',
                            isCorrect: false,
                        },
                        {
                            content: 'MAREK KRASSUS',
                            isCorrect: false,
                        },
                    ],
                    duration: 5,
                },
                {
                    question:
                        'Prosta w geometrii...',
                    answers: [
                        {
                            content: 'ma początek, ale nie ma końca',
                            isCorrect: false,
                        },
                        {
                            content: 'ma koniec, ale nie ma początku',
                            isCorrect: false,
                        },
                        {
                            content: 'nie ma początku oraz nie ma końca',
                            isCorrect: true,
                        },
                        {
                            content: 'ma początek oraz koniec',
                            isCorrect: false,
                        },
                    ],
                    duration: 10,
                },
                {
                    question:
                        'Data terrorystycznego ataku na WTC ?',
                    answers: [
                        {
                            content: '11 sierpnia 2001 r.',
                            isCorrect: false,
                        },
                        {
                            content: '11 września 2001 r.',
                            isCorrect: true,
                        },
                        {
                            content: '11 października 2001 r.',
                            isCorrect: false,
                        },
                        {
                            content: '11 lipiec 2001 r.',
                            isCorrect: false,
                        },
                    ],
                    duration: 14,
                },
                {
                    question:
                        'Pumba z filmu "Król Lew" był:',
                    answers: [
                        {
                            content: 'surykatką',
                            isCorrect: false,
                        },
                        {
                            content: 'guźcem',
                            isCorrect: true,
                        },
                        {
                            content: 'lwem',
                            isCorrect: false,
                        },
                        {
                            content: 'hienną',
                            isCorrect: false,
                        },
                    ],
                    duration: 25,
                },
            ]
        },
        {
            name:'Test #2',
            tags:["tags1","tags2"],
            descriptor:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard\n' +
                '                dummy text ever since the 1500s',
            tasks:[{
                question:
                    'Który wódz po śmierci Gajusza Mariusza, prowadził wojnę domową z Sullą ?',
                answers: [
                    {
                        content: 'LUCJUSZ CYNNA',
                        isCorrect: false,
                    },
                    {
                        content: 'JULIUSZ CEZAR',
                        isCorrect: true,
                    },
                    {
                        content: 'LUCJUSZ MURENA',
                        isCorrect: false,
                    },
                    {
                        content: 'MAREK KRASSUS',
                        isCorrect: false,
                    },
                ],
                duration: 30,
            },{
                question:
                    'Który wódz po śmierci Gajusza Mariusza, prowadził wojnę domową z Sullą ?',
                answers: [
                    {
                        content: 'LUCJUSZ CYNNA',
                        isCorrect: false,
                    },
                    {
                        content: 'JULIUSZ CEZAR',
                        isCorrect: true,
                    },
                    {
                        content: 'LUCJUSZ MURENA',
                        isCorrect: false,
                    },
                    {
                        content: 'MAREK KRASSUS',
                        isCorrect: false,
                    },
                ],
                duration: 30,
            }]
        },
        {
            name:'Test #3',
            tags:["tags1","tags2"],
            descriptor:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard\n' +
                '                dummy text ever since the 1500s',
            tasks:[{
                question:
                    'Który wódz po śmierci Gajusza Mariusza, prowadził wojnę domową z Sullą ?',
                answers: [
                    {
                        content: 'LUCJUSZ CYNNA',
                        isCorrect: false,
                    },
                    {
                        content: 'JULIUSZ CEZAR',
                        isCorrect: true,
                    },
                    {
                        content: 'LUCJUSZ MURENA',
                        isCorrect: false,
                    },
                    {
                        content: 'MAREK KRASSUS',
                        isCorrect: false,
                    },
                ],
                duration: 30,
            }]
        },
    ]

    return(
        tests.map((u, i) => {
            return (
                <TouchableOpacity key={u.name} onPress={() => navigation.navigate('Test',{tasks:u.tasks})}>
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


