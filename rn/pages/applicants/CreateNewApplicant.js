import React, { useState, useContext } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ActivityIndicator,
  Alert,
} from 'react-native';
import axios from 'axios';

import { Button, Input, Image } from 'react-native-elements';

import { UserContext } from '../../util/UserProvider';

export default CreateNewApplicant = ({ navigation }) => {
  const [applicantName, setApplicantName] = useState('');
  const [applicantID, setApplicantID] = useState('');
  const navigateToTodo = () => navigation.navigate('Todo');

  const createNewApplicant = () => {
    if (!applicantName) {
      Alert.alert('Applicant Name cannot be empty!');
    }

    if (!applicantID) {
      Alert.alert('Applicant ID cannot be empty!');
    }

    axios
      .post('https://codeitsuisse-mcspicy.herokuapp.com/addApplicant', {
        addName: applicantName,
        applicantID: applicantID,
        addOfficer: 'todo officerID',
        addThirdParty: 'todo third party',
      })
      .then((res) => {})
      .catch((err) => {
        console.log('Error add applicant in', err);
        if (applicantName.length != 0 && applicantName.length != 0) {
          Alert.alert('Error on adding applicant');
        }
      });
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
        <Image
          source={require('../../img/user.png')}
          style={{
            width: 200,
            height: 200,
            marginTop: 100,
            marginHorizontal: 120,
          }}
          PlaceholderContent={<ActivityIndicator />}
        />

        <Input
          placeholder="Applicant name"
          value={applicantName}
          inputContainerStyle={{ marginHorizontal: 10 }}
          style={{ marginTop: 100 }}
          onChangeText={setApplicantName}
        />
        <Input
          placeholder="Applicant ID"
          value={applicantID}
          inputContainerStyle={{ marginHorizontal: 10 }}
          onChangeText={setApplicantID}
        />
        <Button
          title="Create New Applicant"
          onPress={() => createNewApplicant()}
          style={{ marginTop: 60, margin: 20 }}
        />

        <Button
          title="Cancel"
          onPress={navigateToTodo}
          style={{ marginHorizontal: 20 }}
        />
      </ScrollView>
    </>
  );
};
