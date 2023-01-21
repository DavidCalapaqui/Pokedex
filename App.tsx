import React from 'react'
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { Navigator } from './src/navigator/Tab1';
import { Tabs } from './src/navigator/Tabs';

const App = () => {
  return (
    //Se puede envolver en cualquier provider que se necesite
    <NavigationContainer>
      {/* <Navigator /> */}
      <Tabs />
    </NavigationContainer>

    
  )
}

export default App;
