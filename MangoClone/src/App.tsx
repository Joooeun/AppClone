import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import SplashScreen from 'react-native-splash-screen'

interface Props { }

const App = ({ }: Props) => {

  useEffect(() => {
    setTimeout( () => SplashScreen.hide(), 1000);
  })
  return (
    <View><Text>와와와</Text></View>
  );
};
export default App;
