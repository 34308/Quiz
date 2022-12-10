import {Text, View} from 'react-native';
import * as React from 'react';
import {Button, Card} from 'react-native-elements';

export default function Foot() {
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
      <Button type="outline" title="Check!" />
    </Card>
  );
}
