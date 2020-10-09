import React, { useState, useContext } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  KeyboardAvoidingView,
} from 'react-native';
import { Button, Input } from 'react-native-elements';

import { UserContext } from '../../util/UserProvider';

export default Login = ({ navigation }) => {
  const { setAuthToken } = useContext(UserContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigateToSignup = () => navigation.navigate('Signup');

  return (
    <SafeAreaView>
      <KeyboardAvoidingView style={styles.container}>
        <Input label={'Username'} value={username} onChangeText={setUsername} />
        <Input
          label={'Password'}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Button
          style={styles.buttonContainer}
          title="Login"
          onPress={() => {}}
        />
        <Button
          style={styles.buttonContainer}
          title="Don't have an account? Signup"
          onPress={navigateToSignup}
        />

        <Button
          title="fake login"
          onPress={() => setAuthToken('fake token')}
          style={styles.buttonContainer}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    margin: 6,
  },
});
