import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import { ListItem, Avatar, Button } from 'react-native-elements';

const list = [
  {
    applicantname: 'Applicant Name 1',
    applicantID: 'ID1',
    waitingTime: '',
    applicantCurrentStatus: 'Current Status',
    applicantCurrentProgress: 'Current Progress',
  },
  {
    applicantname: 'Applicant Name 2',
    applicantID: 'ID2',
    waitingTime: '',
    applicantCurrentStatus: 'Current Status',
    applicantCurrentProgress: 'Current Progress',
  },
];

export default ViewApplicants = ({ navigation }) => {
  const navigateToCreateApplicant = () =>
    navigation.navigate('CreateNewApplicant');
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView>
          <View style={{ height: 400 }}>
            {list.map((l, i) => (
              <ListItem
                key={i}
                bottomDivider
                onPress={() =>
                  navigation.navigate('ViewApplicantProfile', {
                    applicantID: l.applicantID,
                  })
                }
              >
                <Avatar source={require('../../img/users.png')} />
                <ListItem.Content>
                  <ListItem.Title>{l.applicantname}</ListItem.Title>
                  <ListItem.Subtitle>
                    {'ID:  ' + l.applicantID}
                  </ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            ))}
          </View>
        </ScrollView>
        <Button
          title="Add New Applicant"
          onPress={navigateToCreateApplicant}
          style={{ marginTop: 240, margin: 20 }}
        />
      </SafeAreaView>
    </>
  );
};
