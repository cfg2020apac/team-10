import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';

export default ViewAllCaseOfficers = () => {
  const list = [
    { name: 'Person 1', organisationName: 'Org 1' },
    { name: 'Person 2', organisationName: 'Org 2' },
    { name: 'Person 3', organisationName: 'Org 3' },
  ];

  return (
    <SafeAreaView>
      <ScrollView>
        {list.map((item, idx) => (
          <ListItem key={idx} bottomDivider>
            <Avatar />
            <ListItem.Content>
              <ListItem.Title>{item.name}</ListItem.Title>
              <ListItem.Subtitle>{item.organisationName}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
