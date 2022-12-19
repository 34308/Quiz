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
import {Component, useEffect, useRef, useState} from 'react';
import {CommonActions, useNavigation} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';

function sendScore(Score, max, type) {
  fetch('https://tgryl.pl/quiz/result', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      nick: 'KSKM',
      score: Score.toString(),
      total: max.toString(),
      type: type.toString(),
    }),
  });
  console.log('wykonano: ' + Score + '  ' + max);
}

export default class TestScreen extends Component {
  setQuestion(json) {
    console.log('json: ' + json);
    this.setState(previousState => ({
      question: json,
    }));
  }
  constructor(props) {
    super(props);
    this.state = {
      question: null,
      countInterval: null,
      count: 0,
      CurrentQ: 0,
      Score: 0,
      max: 0,
      loaded: false,
      finished: false,
      type: props.route.params.name,
    };
    this.getQestionsFromNet(props.route.params.id);
  }
  componentDidMount() {
    setInterval(() => {
      this.setState(old => ({
        count:
          old.count + 1 / this.state.question[this.state.CurrentQ].duration,
      }));
      console.log(this.state.count);
    }, 1000);
  }
  componentDidUpdate(
    prevProps: Readonly<P>,
    prevState: Readonly<S>,
    snapshot: SS,
  ) {
    if (this.state.count >= 1) {
      this.NextQ();
    }
  }
  NextQ = () => {
    this.setState({
      count: 0,
    });
    if (this.state.CurrentQ + 1 < this.state.max) {
      this.setCurrentQ(this.state.CurrentQ + 1);
    } else if (this.state.CurrentQ + 1 >= this.state.max) {
      this.setState({
        finished: true,
      });
    }
  };
  Finish() {
    sendScore(this.state.Score, this.state.max, this.state.type);
    return (
      <Card>
        <Card.Title>
          Ukończyłeś test z wynikiem {this.state.Score}/{this.state.max}
        </Card.Title>
      </Card>
    );
  }
  setCurrentQ(number) {
    this.setState(previousState => ({
      CurrentQ: number,
    }));
  }
  setLoaded(state) {
    this.setState(previousState => ({
      loaded: state,
    }));
  }
  setScore(number) {
    this.setState(previousState => ({
      Score: number,
    }));
  }
  setMax(number) {
    this.setState(previousState => ({
      max: number,
    }));
  }

  async getQestionsFromNet(id) {
    try {
      const response = await fetch('https://tgryl.pl/quiz/test/' + id);
      const json = await response.json();

      this.setQuestion(json.tasks);
      this.setLoaded(true);
      this.setMax(json.tasks.length);
    } catch (error) {
      console.error(error);
    }
  }
  check(s) {
    console.log('check');
    if (this.state.CurrentQ + 1 < this.state.max) {
      this.setCurrentQ(this.state.CurrentQ + 1);
    } else if (this.state.CurrentQ + 1 >= this.state.max) {
      this.setState({
        finished: true,
      });
    }
    if (s) {
      this.setScore(this.state.Score + 1);
    }
    this.setState({
      count: 0,
    });
  }

  Test() {
    if (this.state.finished) {
      return this.Finish();
    } else {
      return (
        <Card>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignContent: 'space-around',
              marginTop: 8,
            }}>
            <Text style={{flex: 1}}>
              Question {this.state.CurrentQ + 1} of {this.state.max}
            </Text>
            <Text style={{flex: 0}}>
              {this.state.question[this.state.CurrentQ].duration}
            </Text>
          </View>
          <LinearProgress
            style={{height: 10, marginVertical: 10}}
            value={this.state.count}
            variant="determinate"
          />
          <Text style={styles.header}>
            {this.state.question[this.state.CurrentQ].question}
          </Text>
          <Card containerStyle={{height: 420, alignContent: 'space-between'}}>
            <View style={styles.buttonscontainer}>
              <Pressable
                style={styles.button}
                onPress={() =>
                  this.check(
                    this.state.question[this.state.CurrentQ].answers[0]
                      .isCorrect,
                  )
                }>
                <Text style={{fontSize: 20}}>
                  {this.state.question[this.state.CurrentQ].answers[0].content}
                </Text>
              </Pressable>
              <Pressable
                style={styles.button}
                onPress={() =>
                  this.check(
                    this.state.question[this.state.CurrentQ].answers[1]
                      .isCorrect,
                  )
                }>
                <Text style={{fontSize: 20}}>
                  {this.state.question[this.state.CurrentQ].answers[1].content}
                </Text>
              </Pressable>
              <Pressable
                style={styles.button}
                onPress={() =>
                  this.check(
                    this.state.question[this.state.CurrentQ].answers[2]
                      .isCorrect,
                  )
                }>
                <Text style={{fontSize: 20}}>
                  {this.state.question[this.state.CurrentQ].answers[2].content}
                </Text>
              </Pressable>
              <Pressable
                style={styles.button}
                onPress={() =>
                  this.check(
                    this.state.question[this.state.CurrentQ].answers[3]
                      .isCorrect,
                  )
                }>
                <Text style={{fontSize: 20}}>
                  {this.state.question[this.state.CurrentQ].answers[3].content}
                </Text>
              </Pressable>
            </View>
          </Card>
        </Card>
      );
    }
  }

  render() {
    if (this.state.loaded) {
      return this.Test();
    } else {
      return <Text>loading Test</Text>;
    }
  }
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
