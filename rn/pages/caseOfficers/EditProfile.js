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

export default EditProfile = ({ route, navigation }) => {
  const profile = route.params.profile;

  const [name, setName] = useState(profile.name);
  const [organisationName, setOrganisationName] = useState(
    profile.organisationName,
  );
  const [designation, setDesignation] = useState(profile.designation);

  const doneEditing = () => {
    console.log(profile);
    axios
      .post('https://codeitsuisse-mcspicy.herokuapp.com/updateOfficerDetails', {
        officerID: profile.officerID,
        // password: 'password',
        officerType: profile.officerType,
        name,
        organisationName,
        designation,
      })
      .then((res) => {
        navigation.goBack();
      })
      .catch((err) => console.log('Error updating profile', err));
  };

  return (
    <SafeAreaView>
      <KeyboardAvoidingView style={styles.container}>
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

        <Button
          style={styles.buttonContainer}
          title="Done"
          onPress={doneEditing}
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
