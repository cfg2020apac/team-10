/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import Navigator from './Navigator';

import UserProvider from './util/UserProvider';

const App = () => {
  return (
    <UserProvider>
      <Navigator />
    </UserProvider>
  );
};

export default App;
