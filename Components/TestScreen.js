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
let JSon = [];
let finished = false;
async function getQestionsFromNet(id) {
  try {
    const response = await fetch('https://tgryl.pl/quiz/test/' + id);
    const json = await response.json();
    return JSON.parse(json);
  } catch (error) {
    console.error(error);
  }
}
let placeholder = [
  {
    question: 'Kiedy okazało się, że Massimo jest ojcem Ridgea?',
    answers: [
      {
        content: 'podczas choroby Steffy, kiedy potrzebowała nerki',
        isCorrect: false,
      },
      {content: 'podczas wyjazdu do Portofino', isCorrect: false},
      {
        content:
          "podczas narodzin Ridge'a, jednak Stephanie trzymała to wszystko w tajemnicy",
        isCorrect: false,
      },
      {content: "podczas wypadku, gdy Ridge'potrzebował krwi", isCorrect: true},
    ],
    duration: 30,
  },
];
export default function TestScreen(props) {
  const [question, setQestion] = useState(placeholder);
  const countInterval = useRef(null);
  const [count, setCount] = useState(0);
  const [CurrentQ, setCurrentQ] = useState(0);
  const [Score, setScore] = useState(0);
  const max = question.length;
  console.log(getQestionsFromNet(props.route.params.id));


  function sendScore() {
    fetch('https://tgryl.pl/quiz/results', {
      method: 'POST',
      body: JSON.stringify({
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        nick: 'KSKM',
        score: {Score},
        total: {max},
        type: 'IT',
      }),
    });
  }
  function Finish() {
    clearInterval(countInterval);
    sendScore();
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
        () => setCount(old => old + 1 / question[CurrentQ].duration),
        1000,
      );
      return () => clearInterval(countInterval);
    }
  }, [CurrentQ, question]);

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
        <Text style={{flex: 0}}>{question[CurrentQ].duration}</Text>
      </View>
      <LinearProgress
        style={{height: 10, marginVertical: 10}}
        value={count}
        variant="determinate"
      />
      <Text style={styles.header}>{question[CurrentQ].question}</Text>
      <Card containerStyle={{height: 300, alignContent: 'space-between'}}>
        <View style={styles.buttonscontainer}>
          <Pressable
            style={styles.button}
            onPress={() => check(question[CurrentQ].answers[0].isCorrect)}>
            <Text style={{fontSize: 20}}>
              {question[CurrentQ].answers[0].content}
            </Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => check(question[CurrentQ].answers[1].isCorrect)}>
            <Text style={{fontSize: 20}}>
              {question[CurrentQ].answers[1].content}
            </Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => check(question[CurrentQ].answers[2].isCorrect)}>
            <Text style={{fontSize: 20}}>
              {question[CurrentQ].answers[2].content}
            </Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => check(question[CurrentQ].answers[3].isCorrect)}>
            <Text style={{fontSize: 20}}>
              {question[CurrentQ].answers[3].content}
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
