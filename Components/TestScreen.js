import {Pressable, StyleSheet, Text, View} from 'react-native';
import * as React from 'react';
import {Card} from 'react-native-elements';
import {LinearProgress} from '@rneui/themed';
import {Component} from 'react';
import {unmountComponentAtNodeAndRemoveContainer} from 'react-native/Libraries/Renderer/implementations/ReactNativeRenderer-prod';
import {db} from './dbConnector';
import {getRandomTestIdFromNet} from './serverConnector';
import NetInfo from '@react-native-community/netinfo';
import {Button} from '@rneui/base';
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
}

export default class TestScreen extends Component {
  reset() {
    this.setState({
      connected: true,
      question: null,
      countInterval: null,
      count: 0,
      CurrentQ: 0,
      Score: 0,
      max: 0,
      loaded: false,
      finished: false,
      type: '',
    });
    clearInterval(this.interval);
    this.props.navigation.setOptions({headerShown: true, swipeEnabled: true});
    this.props.navigation.goBack();
  }
  async setRandomTest() {
    NetInfo.fetch().then(async state => {
      if (state.isConnected) {
        await this.getQestionsFromNet(await getRandomTestIdFromNet());
      } else {
        await this.setTestFromDatabase(await getRandomTestIdFromNet());
      }
    });
  }

  constructor(props) {
    super(props);
    this.props.navigation.setOptions({headerShown: false, swipeEnabled: false});

    if (this.props.route.params.id === -1) {
      // eslint-disable-next-line no-undef
      this.state = {
        connected: true,
        question: null,
        countInterval: null,
        count: 0,
        CurrentQ: 0,
        Score: 0,
        max: 0,
        started: false,
        loaded: false,
        finished: false,
        type: '',
      };
      this.setRandomTest();
    } else {
      this.state = {
        connected: true,
        question: null,
        countInterval: null,
        count: 0,
        CurrentQ: 0,
        Score: 0,
        max: 0,
        started: false,
        loaded: false,
        finished: false,
        type: this.props.route.params.name,
      };
      this.getQestions(this.props.route.params.id);
    }

  }
  interval;
  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState(old => ({
        count:
          old.count + 1 / this.state.question[this.state.CurrentQ].duration,
      }));
    }, 1000);
  }
  componentWillUnmount() {
    unmountComponentAtNodeAndRemoveContainer();
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
    clearInterval(this.interval);
    sendScore(this.state.Score, this.state.max, this.state.type);
    return (
      <Card>
        <Card.Title>
          Ukończyłeś test z wynikiem {this.state.Score}/{this.state.max}
        </Card.Title>
        <Button title={'Finish Test'} onPress={() => this.reset()} />
      </Card>
    );
  }
  setQuestion(json) {
    this.setState(previousState => ({
      question: json,
    }));
  }
  setCurrentQ(number) {
    this.setState(() => ({
      CurrentQ: number,
    }));
  }
  setLoaded(state) {
    this.setState(() => ({
      loaded: state,
    }));
  }
  setScore(number) {
    this.setState(() => ({
      Score: number,
    }));
  }
  setMax(number) {
    this.setState(() => ({
      max: number,
    }));
  }

  async getQestionsFromNet(id) {
    try {

      const response = await fetch('https://tgryl.pl/quiz/test/' + id);
      const json = await response.json();
      console.log(json.tasks);
      this.setQuestion(json.tasks);
      this.setLoaded(true);
      this.setMax(json.tasks.length);
      this.setType(json.name);
    } catch (error) {
      console.error(error);
    }
  }
  async setTestFromDatabase(id) {
    const query = 'select * from test where test.id= ?';
    db.transaction(async txn => {
      await txn.executeSql(
        query,
        [id],
        (transaction, resultSet) => {
          this.setQuestion(JSON.parse(resultSet.rows.item(0).tasks));
          this.setLoaded(true);
          this.setMax(JSON.parse(resultSet.rows.item(0).tasks).length);
          this.setType(resultSet.rows.item.name);
        },
        error => {
          console.log('Inserting error: ' + error.message);
        },
      );
    });
  }
  check(s) {
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
              {this.state.question[this.state.CurrentQ].answers.map((u, i) => {
                return (
                  <Pressable
                    key={u.content}
                    style={styles.button}
                    onPress={() => this.check(u.isCorrect)}>
                    <Text style={{fontSize: 20}}>{u.content}</Text>
                  </Pressable>
                );
              })}
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

  setType = name => {
    this.setState(previousState => ({
      type: name,
    }));
  };

  async getQestions(id) {
    NetInfo.fetch().then(async state => {
      if (state.isConnected) {

        await this.getQestionsFromNet(id);

      } else {
        await this.setTestFromDatabase(id);
      }
    });
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
