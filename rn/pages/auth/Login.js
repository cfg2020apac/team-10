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
import { Button, Input, Image } from 'react-native-elements';
import axios from 'axios';

import { UserContext } from '../../util/UserProvider';

export default Login = ({ navigation }) => {
  const { setUserId, setAuthToken } = useContext(UserContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigateToSignup = () => navigation.navigate('Signup');

  const login = () => {
    if (!username) {
      Alert.alert('Username cannot be empty!');
    }

    if (!password) {
      Alert.alert('Password cannot be empty!');
    }

    axios
      .post('https://codeitsuisse-mcspicy.herokuapp.com/login', {
        officerID: username,
        password,
      })
      .then((res) => {
        const { data } = res;
        setUserId(username);
        setAuthToken(data.token);
      })
      .catch((err) => {
        console.log('Error login in', err);
        Alert.alert('Wrong username/password');
      });
  };

  return (
    <SafeAreaView>
      <KeyboardAvoidingView style={styles.container}>
        <Image  source={require('../../img/login.png')}
                    style={{ width: 120, 
                            height: 120,  
                            marginTop: 100,
                            marginHorizontal: 145}}
        />
        <Input 
          placeholder='Username' 
          value={username} 
          containerStyle={{marginTop:40}}
          inputContainerStyle={{marginHorizontal:20}}
          onChangeText={setUsername} />
        <Input
          placeholder='Password'
          value={password}
          onChangeText={setPassword}
          containerStyle={{marginBottom:40}}
          inputContainerStyle={{marginHorizontal:20}}
          secureTextEntry
        />

        <Button 
          style={styles.buttonContainer} 
          title="Login" 
          onPress={login} />
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
    marginHorizontal: 20,
    width:380
  },
});
