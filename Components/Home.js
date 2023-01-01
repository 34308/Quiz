import {View, ScrollView} from 'react-native';
import TestCard from './TestCard';
import Foot from './Foot';

export default function HomeScreen() {
  return (
    <View>
      <ScrollView>
        <TestCard />
        <Foot />
      </ScrollView>
    </View>
  );
}
