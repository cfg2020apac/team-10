import React, { useContext } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import { Button } from 'react-native-elements';

import { UserContext } from '../../util/UserProvider';

export default Login = () => {
  const { setAuthToken } = useContext(UserContext);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView>
          <Text>TODO</Text>
          <Button
            title="fake login"
            onPress={() => setAuthToken('fake token')}
          />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
