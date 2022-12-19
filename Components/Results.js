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

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

export default function Results() {
  const h = Dimensions.get('window').height;
  const w = Dimensions.get('window').width;
  const [refreshing, setRefreshing] = useState(false);
  const [results, setResults] = useState(false);
  getResultsFromNet();
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
    getResultsFromNet();
  }, []);
  const item = ({item}) => {
    return (
      <View style={{flexDirection: 'row'}}>
        <View style={{width: w / 5, backgroundColor: 'yellow'}}>
          <Text style={{fontFamily: 'ChivoMono-Medium'}}> {item.nick}</Text>
        </View>
        <View style={{width: w / 5, backgroundColor: 'yellow'}}>
          <Text style={{fontFamily: 'ChivoMono-Medium'}}>{item.score}</Text>
        </View>
        <View style={{width: w / 5, backgroundColor: 'yellow'}}>
          <Text style={{fontFamily: 'ChivoMono-Medium'}}>{item.total}</Text>
        </View>
        <View style={{width: w / 5, backgroundColor: 'yellow'}}>
          <Text style={{fontFamily: 'ChivoMono-Medium'}}>{item.type}</Text>
        </View>
        <View style={{width: w / 5, backgroundColor: 'yellow'}}>
          <Text style={{fontFamily: 'ChivoMono-Medium'}}>{item.createdOn}</Text>
        </View>
      </View>
    );
  };
  async function getResultsFromNet() {
    try {

      const response = await fetch('https://tgryl.pl/quiz/results');
      const json = await response.json();
      setResults(json);
    } catch (error) {
      console.error(error);
    }
  }
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
