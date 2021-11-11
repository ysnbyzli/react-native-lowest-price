import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppStack from './navigation/AppStack';
import AuthStack from './navigation/AuthStack';
import {Provider} from 'react-redux';
import {store} from './store';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
