import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppStack from './navigation/AppStack';
import AuthStack from './navigation/AuthStack';

const App = () => {
  return (
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
  );
};

export default App;
