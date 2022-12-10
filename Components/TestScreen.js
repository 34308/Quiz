import {FlatList, StyleSheet, Text, View} from 'react-native';
import * as React from 'react';
import {Button, Card} from 'react-native-elements';
import {LinearProgress} from '@rneui/themed';

const questions = [
  {
    name: 'Question 1',
    question: 'jak wlozyc slonia do lodowki w 3 krokach?',
    answers: [
      {a: 'otworz wloz zamknij'},
      {b: 'nie da sie'},
      {c: 'to pytanie jest glupie'},
      {d: 'wloz slonia do lodowki'},
    ],
  },
];
function Question() {
  const answers = [
    {
      a: 'otworz ',
      b: 'nie da sie',
      c: 'to pytanie',
      d: 'wloz slonia ',
    },
  ];
  return (
    <Card containerStyle={{height: 300, alignContent: 'space-between'}}>
      <View style={{flexDirection: 'row', margin: 10}}>
        <View style={{flexDirection: 'column', margin: 10}}>
          <View style={{flexDirection: 'row', margin: 10}}>
            <Button title="to pytanie " />
          </View>
          <View style={{flexDirection: 'row', margin: 10}}>
            <Button title="to pytanie " />
          </View>
        </View>
        <View style={{flexDirection: 'column', margin: 10}}>
          <View style={{flexDirection: 'row', margin: 10}}>
            <Button title="to pytanie " />
          </View>
          <View style={{flexDirection: 'row', margin: 10}}>
            <Button title="to pytanie " />
          </View>
        </View>
      </View>
    </Card>
  );
}

export default function TestScreen({navigation}) {
  return (
    <Card>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignContent: 'space-around',
          marginTop: 8,
        }}>
        <Text style={{flex: 1}}> Question x of x</Text>
        <Text style={{flex: 0}}>Time</Text>
      </View>
      <LinearProgress
        style={{height: 10, marginVertical: 10}}
        value={0.2}
        variant="determinate"
      />
      <Text style={styles.header}>{questions[0].name}</Text>
      <Text>{questions[0].question}</Text>
      <Question />
    </Card>
  );
}

const styles = StyleSheet.create({
  buttonscontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 5,
    width: '40%',
    alignSelf: 'flex-end',
  },
  container: {
    flexFlow: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#6804CD',
    width: '100%',
    height: 30,
  },

  textTag: {
    color: '#0027FF',
    fontWeight: 'bold',
  },
  header: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  timer: {
    flexDirection: 'column',
    textAlign: 'right',
    alignItems: 'flex-end',
  },
});
