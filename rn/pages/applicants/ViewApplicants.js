import React, { useState, useEffect } from 'react';
import axios from "axios";

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import { ListItem, Avatar, Button } from 'react-native-elements';

// const list = [
//   {
//     applicantname: 'Applicant Name 1',
//     applicantID: 'ID1',
//     waitingTime: '',
//     applicantCurrentStatus: 'Current Status',
//     applicantCurrentProgress: 'Current Progress',
//   },
//   {
//     applicantname: 'Applicant Name 2',
//     applicantID: 'ID2',
//     waitingTime: '',
//     applicantCurrentStatus: 'Current Status',
//     applicantCurrentProgress: 'Current Progress',
//   },
// ];
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

  const [applicants, setApplicants] = useState([]);

  const getAllApplicants = async () => {
    axios
      .get("https://codeitsuisse-mcspicy.herokuapp.com/allApplicants")
      .then((res) => {
        setApplicants(res.data);
      })
      .catch((err) => console.log('Error fetching applicants', err));
  }

  useEffect(() => {
    getAllApplicants();
  }, [])

  const navigateToCreateApplicant = () =>
    navigation.navigate('CreateNewApplicant');
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView>
          <View style={{ height: 400, paddingTop: 20}}>
            {applicants.map((l, i) => (
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
                  <ListItem.Title style={{marginBottom:8, fontSize:18,fontWeight:"bold"}}>{l.applicantName}</ListItem.Title>
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
