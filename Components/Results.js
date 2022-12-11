import {
  Dimensions,
  FlatList,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {RefreshControl} from 'react-native-gesture-handler';
import {useCallback, useState} from 'react';
const results = [
  {
    nick: 'Marek',
    score: 18,
    total: 20,
    type: 'historia',
    date: '2022-11-22',
  },
  {
    nick: 'Darek',
    score: 18,
    total: 20,
    type: 'historia',
    date: '2022-11-22',
  },
  {
    nick: 'Jarek',
    score: 18,
    total: 20,
    type: 'historia',
    date: '2022-11-22',
  },
  {
    nick: 'Warek',
    score: 18,
    total: 20,
    type: 'historia',
    date: '2022-11-22',
  },
  {
    nick: 'Cezarek',
    score: 18,
    total: 20,
    type: 'historia',
    date: '2022-11-22',
  },
];
const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

export default function Results() {
  const h = Dimensions.get('window').height;
  const w = Dimensions.get('window').width;
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);
  const item = ({item}) => {
    return (
      <View style={{flexDirection: 'row'}}>
        <View style={{width: w / 5, backgroundColor: 'yellow'}}>
          <Text>{item.nick}</Text>
        </View>
        <View style={{width: w / 5, backgroundColor: 'yellow'}}>
          <Text>{item.score}</Text>
        </View>
        <View style={{width: w / 5, backgroundColor: 'yellow'}}>
          <Text>{item.total}</Text>
        </View>
        <View style={{width: w / 5, backgroundColor: 'yellow'}}>
          <Text>{item.type}</Text>
        </View>
        <View style={{width: w / 5, backgroundColor: 'yellow'}}>
          <Text>{item.date}</Text>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <FlatList
        data={results}
        renderItem={item}
        keyExtractor={(item, index) => index.toString()}
        nestedScrollEnabled={true}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
}
