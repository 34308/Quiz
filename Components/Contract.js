import RNExitApp from 'react-native-exit-app';
import {ScrollView, Text} from 'react-native';
import {Button, Card} from 'react-native-elements';

import {useNavigation} from '@react-navigation/native';
import {storeData} from './StorageHelper';

export default function Contract() {
  const navigation = useNavigation();

  function Accept() {
    navigation.navigate('Drawer');
    storeData('true', 'HAS_LAUNCHED4');
  }
  return (
    <ScrollView>
      <Card>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla varius
          arcu at leo rhoncus venenatis. Integer commodo imperdiet pellentesque.
          Nulla viverra auctor convallis. Ut ultricies elementum sodales.
          Curabitur mi magna, placerat eget convallis luctus, dictum a elit.
          Nulla vitae elit nec nisi gravida ullamcorper. Donec fringilla nisi
          nec eros maximus tempor. Quisque faucibus egestas ante a dignissim.
          Nulla vulputate et nulla et rhoncus. Nullam suscipit nulla lacinia
          consequat ultrices. Nunc ut auctor lorem. Nunc sed augue eget ex
          facilisis malesuada. Nullam egestas molestie neque quis laoreet. Sed
          et nibh id leo bibendum suscipit. Etiam at viverra turpis, et
          malesuada quam. In hac habitasse platea dictumst. In eu bibendum diam.
          Proin ut sollicitudin nibh. Suspendisse potenti. Nullam vel bibendum
          ante. Nam egestas erat diam, ac tempus enim ultrices gravida. Nunc at
          ipsum at felis aliquam imperdiet eu id nulla. Pellentesque iaculis eu
          erat sed pulvinar. Pellentesque feugiat libero vitae lorem placerat
          lacinia. Class aptent taciti sociosqu ad litora torquent per conubia
          nostra, per inceptos himenaeos. Etiam et velit lectus. Integer est
          erat, egestas ut pellentesque vitae, venenatis quis felis. Vestibulum
          facilisis et massa in porta. Quisque eu purus odio. Fusce consectetur
          accumsan tempus. Phasellus nibh urna, egestas sit amet pellentesque
          nec, aliquet aliquet libero. Praesent euismod et ex ullamcorper
          vehicula. Sed sed dolor sit amet ligula semper sagittis. Donec non
          luctus lacus. Vivamus facilisis diam quis consequat laoreet. Vivamus
          lacinia consequat eros, at gravida metus faucibus nec. Nullam
          tincidunt sagittis elit, sed suscipit nisl blandit ac. Proin molestie
          libero felis, nec semper eros pellentesque ut. Etiam ipsum felis,
          rhoncus in leo vitae, dictum accumsan lectus. Sed a efficitur dolor.
          Nulla suscipit eget tellus id hendrerit. Donec eget eleifend neque. In
          bibendum efficitur lacus eu ultricies. Aliquam mollis nisi sed augue
          posuere, quis varius libero congue. Donec vel urna scelerisque, luctus
          metus a, tincidunt risus. In euismod nisi in diam tincidunt laoreet.
          Cras pulvinar lectus ac fringilla malesuada. Aliquam dignissim velit
          turpis, in fermentum enim condimentum et. Nunc ac mi laoreet,
          pellentesque urna eget, porta tortor. Sed rhoncus, diam quis dignissim
          pretium, elit tellus bibendum nibh, eu cursus tortor orci ut nisi.
          Nunc faucibus ornare ipsum sed mattis. Cras nec accumsan dolor, non
          porta ligula. Mauris facilisis laoreet lectus, vel malesuada justo.
          Nam ultrices massa quis urna tristique, ut pretium libero dignissim.
          Suspendisse accumsan ligula quis venenatis dictum. Nunc lacus risus,
          vehicula id sagittis sagittis, imperdiet ac justo. Nulla auctor leo
          non ligula volutpat mattis. Nam nulla metus, faucibus viverra urna ac,
          facilisis venenatis turpis. Vivamus sed finibus neque. Phasellus non
          ullamcorper nibh.
        </Text>
        <Button title="Accept" onPress={() => Accept()} />
        <Button title="Decline" onPress={() => RNExitApp.exitApp()} />
      </Card>
    </ScrollView>
  );
}
