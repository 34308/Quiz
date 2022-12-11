import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as React from 'react';
import {Button, Card} from 'react-native-elements';
import {LinearProgress} from '@rneui/themed';
import {useEffect, useRef, useState} from 'react';
import {CommonActions, useNavigation} from '@react-navigation/native';

let finished = false;

export default function TestScreen(props) {
  const tasks = props.route.params.tasks;
  const countInterval = useRef(null);
  const [count, setCount] = useState(0);
  const [CurrentQ, setCurrentQ] = useState(0);
  const [Score, setScore] = useState(0);
  const max = tasks.length;

  function Finish() {
    clearInterval(countInterval);
    return (
      <Card>
        <Card.Title>
          Ukończyłeś test z wynikiem {Score}/{max}
        </Card.Title>
      </Card>
    );
  }

  function check(s) {
    setCount(0);
    if (CurrentQ + 1 < max) {
      setCurrentQ(CurrentQ + 1);
      console.log(CurrentQ + '   ' + max);
    } else if (CurrentQ + 1 >= max) {
      finished = true;
    }
    if (s) {
      setScore(Score + 1);
    }
  }

  useEffect(() => {
    console.log(finished);
    if (!finished) {
      countInterval.current = setInterval(
        () => setCount(old => old + 1 / tasks[CurrentQ].duration),
        1000,
      );
      return () => clearInterval(countInterval);
    }
  }, [CurrentQ, tasks]);

  return finished ? (
    <Finish />
  ) : (
    <Card>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignContent: 'space-around',
          marginTop: 8,
        }}>
        <Text style={{flex: 1}}>
          Question {CurrentQ + 1} of {max}
        </Text>
        <Text style={{flex: 0}}>{tasks[CurrentQ].duration}</Text>
      </View>
      <LinearProgress
        style={{height: 10, marginVertical: 10}}
        value={count}
        variant="determinate"
      />
      <Text style={styles.header}>{tasks[CurrentQ].question}</Text>
      <Card containerStyle={{height: 300, alignContent: 'space-between'}}>
        <View style={styles.buttonscontainer}>
          <Pressable
            style={styles.button}
            onPress={() => check(tasks[CurrentQ].answers[0].isCorrect)}>
            <Text style={{fontSize: 20}}>
              {tasks[CurrentQ].answers[0].content}
            </Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => check(tasks[CurrentQ].answers[1].isCorrect)}>
            <Text style={{fontSize: 20}}>
              {tasks[CurrentQ].answers[1].content}
            </Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => check(tasks[CurrentQ].answers[2].isCorrect)}>
            <Text style={{fontSize: 20}}>
              {tasks[CurrentQ].answers[2].content}
            </Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => check(tasks[CurrentQ].answers[3].isCorrect)}>
            <Text style={{fontSize: 20}}>
              {tasks[CurrentQ].answers[3].content}
            </Text>
          </Pressable>
        </View>
      </Card>
    </Card>
  );
}

const styles = StyleSheet.create({
  buttonscontainer: {
    height: 300,
    justifyContent: 'space-evenly',
    marginHorizontal: 5,
  },
  container: {
    flexFlow: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#6804CD',
    width: '100%',
    height: 30,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
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
