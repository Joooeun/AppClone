import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import Naviator from '~/Screens/Navigator';

import { UserContextProvider } from '~/Context/User';
import { StatusBar } from 'react-native';

interface Props { }

const App = ({ }: Props) => {

  useEffect(() => {
    setTimeout(() => SplashScreen.hide(), 200);
  })
  return (
    <UserContextProvider>
      <StatusBar barStyle="light-content" />
      <Naviator />
    </UserContextProvider>
  );
};
export default App;
