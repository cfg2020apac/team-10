import React, { useState, useContext } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import { Button, Input } from 'react-native-elements';

export default Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const signup = () => {
    if (!username || !password || !confirmPassword) {
      Alert.alert('All fields must be entered!');
    }

    if (password !== confirmPassword) {
      Alert.alert('Password does not match!');
    }

    // todo
  };

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
        <Input
          label={'Confirm Password'}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <Button
          style={styles.buttonContainer}
          title="Signup"
          onPress={signup}
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
