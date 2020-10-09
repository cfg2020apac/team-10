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

export default EditProfile = () => {
  const [name, setName] = useState('');
  const [organisationName, setOrganisationName] = useState('');
  const [designation, setDesignation] = useState('');

  const doneEditing = () => {
    // todo
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
