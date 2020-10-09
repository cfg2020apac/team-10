import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar, Button,
} from 'react-native';

import { ListItem, Avatar } from 'react-native-elements';


const list = [
  {
    applicantname: 'Applicant Name 1',
    applicantID: 'ID1',
    waitingTime: '',
    applicantCurrentStatus: 'Current Status',
    applicantCurrentProgress: 'Current Progress'
  },
  {
    applicantname: 'Applicant Name 2',
    applicantID: 'ID2',
    waitingTime: '',
    applicantCurrentStatus: 'Current Status',
    applicantCurrentProgress: 'Current Progress'
  }
]



export default Todo = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView>
          <View>
            {
              list.map((l, i) => (
                <ListItem key={i} 
                bottomDivider
                onPress={() => NatigateToApplicantProfilePage('fake token')}>
                  <Avatar source={require('../../img/users.png')} />
                  <ListItem.Content>
                    <ListItem.Title>{l.applicantname}</ListItem.Title>
                    <ListItem.Subtitle>{ "Status:  " + l.applicantCurrentStatus}</ListItem.Subtitle>
                    <ListItem.Subtitle>{ "Progress:  " + l.applicantCurrentProgress}</ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem>
              ))
            }
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
