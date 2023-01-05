import {Text, View} from 'react-native';
import * as React from 'react';
import {Button, Card} from 'react-native-elements';

import {DrawerActions, useNavigation} from '@react-navigation/native';
export default function Foot() {
  const navigation = useNavigation();
  return (
    <Card>
      <View>
        <Text
          style={{
            justifyContent: 'flex-start',
            textAlign: 'center',
            fontSize: 25,
          }}>
          Get to know your ranking result
        </Text>
      </View>
      <Button
        onPress={() => navigation.dispatch(DrawerActions.jumpTo('Results'))}
        type="outline"
        title="Check!"
      />
    </Card>
  );
}
