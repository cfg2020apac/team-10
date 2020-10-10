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
    applicantname: 'Vivian',
    applicantID: 'Vivian123',
    waitingTime: '',
    applicantCurrentStatus: 'Assessment',
    applicantCurrentProgress: 'On-going',
  },
  {
    applicantname: 'Tom Jerry',
    applicantID: 'TomJerry123',
    waitingTime: '',
    applicantCurrentStatus: 'Housing',
    applicantCurrentProgress: 'Pending',
  },
  {
    applicantname: 'Tom',
    applicantID: 'Tom123',
    waitingTime: '',
    applicantCurrentStatus: 'Assessment',
    applicantCurrentProgress: 'Pending',
  },
  {
    applicantname: 'Jerry',
    applicantID: 'Jerry123',
    waitingTime: '',
    applicantCurrentStatus: 'Case Plan With Case Manager',
    applicantCurrentProgress: 'Pending',
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
          <View style={{ height: 400, paddingTop: 20}}>
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
                <Avatar containerStyle={{marginLeft:10}} size="medium"  source={require('../../img/users.png')} />
                <ListItem.Content >
                  <ListItem.Title style={{marginBottom:8, fontSize:18,fontWeight:"bold"}}>{l.applicantname}</ListItem.Title>
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
