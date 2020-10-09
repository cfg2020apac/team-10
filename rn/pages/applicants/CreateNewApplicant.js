import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ActivityIndicator,
} from 'react-native';

import { Button, Input, Image} from 'react-native-elements';

import { UserContext } from '../../util/UserProvider';

export default CreateNewApplicant = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
          
          <Image  source={require('../../img/user.png')}
                  style={{ width: 200, 
                           height: 200,  
                           marginTop: 100,
                           marginHorizontal: 120}}
                  PlaceholderContent={<ActivityIndicator />}
          />

          <Input  placeholder='Applicant name'
                  inputContainerStyle={{ marginHorizontal: 10 }}
                  style={{ marginTop: 100 }} />
          <Input  placeholder='Applicant ID'
                  inputContainerStyle={{ marginHorizontal: 10 }}/>
          <Button
            title="Create New Applicant"
            onPress={() => createNewApplicant('fake token')}
            style={{ marginTop: 80,
                     margin: 20 }}
          />
          
          <Button
            title="Cancel"
            onPress={() => backToLastPage('fake token')}
            style={{marginHorizontal: 20 }}
          />
        </ScrollView>
    </>
  );
};
