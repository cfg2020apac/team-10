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
import { Button, Input, CheckBox } from 'react-native-elements';
import axios from 'axios';

export default Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [organisationName, setOrganisationName] = useState('');
  const [designation, setDesignation] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const signup = () => {
    if (!username || !password || !confirmPassword) {
      Alert.alert('Username and password must be entered!');
    }

    if (password !== confirmPassword) {
      Alert.alert('Password does not match!');
    }

    axios
      .post('https://codeitsuisse-mcspicy.herokuapp.com/createUser', {
        officerID: username,
        password,
        officerType: isAdmin ? 'Admin' : 'Normal',
        name,
        organisationName,
        designation,
      })
      .then((res) => {
        const { data } = res;
        setUserId(username);
        setAuthToken(data.token);
      })
      .catch((err) => {
        console.log('Error signing up', err);
      });
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
        <Input label={'Name'} value={name} onChangeText={setName} />
        <Input
          label={'Organisation'}
          value={organisationName}
          onChangeText={setOrganisationName}
        />
        <Input
          label={'Designation'}
          value={designation}
          onChangeText={setDesignation}
        />

        <CheckBox
          center
          title="Admin"
          checked={isAdmin}
          onPress={() => setIsAdmin(!isAdmin)}
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
