import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import AuthStack from './navigation/AuthStack';
import {Provider} from 'react-redux';
import {store} from './store';
import FlashMessage from 'react-native-flash-message';
const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AuthStack />
        <FlashMessage position="top" />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
