import {Image, LinearProgress} from '@rneui/themed';
import {View} from 'react-native';
import React from 'react';
import {Dimensions} from 'react-native';
export default function WaitingScreen() {
  const h = Dimensions.get('window').height - 30;
  const w = Dimensions.get('window').width;
  return (
    <View>
      <Image style={{width: w, height: h}} source={require('./quiz.png')} />
      <LinearProgress
        style={{height: 10, marginVertical: 0}}
        value={1}
        variant="determinate"
      />
    </View>
  );
}
