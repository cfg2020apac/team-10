import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  ActivityIndicator,
} from 'react-native';

import { Button, Input, Image, Text} from 'react-native-elements';

import { UserContext } from '../../util/UserProvider';

export default ViewApplicantProfile = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
          
          
          <Image  source={require('../../img/users.png')}
                  style={{ width: 120, 
                           height: 120,  
                           marginTop: 100,
                           marginHorizontal: 145}}
                  PlaceholderContent={<ActivityIndicator />}
          />

          <Text style={{fontSize:22, marginTop:100, marginHorizontal:20}}>Applicant Name: </Text>
          <Text style={{fontSize:22, marginTop:5, marginHorizontal:20}}>Applicant ID: </Text>
          <Text style={{fontSize:22, marginTop:5, marginHorizontal:20}}>Applicant status: </Text>
          <Text style={{fontSize:22, marginTop:5, marginHorizontal:20}}>Event Progress: </Text>
          <Text style={{fontSize:22, marginTop:5, marginHorizontal:20}}>Assigned 3rd-party: </Text>
          
          <Button
            title="Update Applicant Information"
            onPress={() => createNewApplicant('fake token')}
            style={{ marginTop: 80,
                     margin: 20 }}
          />
          
          <Button
            title="Delete Applicant"
            onPress={() => backToLastPage('fake token')}
            style={{marginHorizontal: 20 }}
          />
        </ScrollView>
    </>
  );
};

