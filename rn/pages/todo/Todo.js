import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native';

import { ListItem, Avatar,Divider } from 'react-native-elements';

const list = [
  {
    applicantname: 'TomJerry',
    applicantID: 'TomJerry123',
    waitingTime: '64 days',
    applicantCurrentStatus: 'Housing',
    applicantCurrentProgress: 'Pending',
  },
  {
    applicantname: 'Tom',
    applicantID: 'Tom123',
    waitingTime: '22 day',
    applicantCurrentStatus: 'Assessment',
    applicantCurrentProgress: 'Pending',
  },
  {
    applicantname: 'Jerry',
    applicantID: 'Jerry123',
    waitingTime: '10 days',
    applicantCurrentStatus: 'Case Plan With Case Manager',
    applicantCurrentProgress: 'Pending',
  },
];

export default Todo = ({ navigation }) => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView>
          <View style={{paddingTop:20}}>
            {list.map((l, i) => (
              <ListItem
                key={i}
                bottomDivider
                onPress={() => {
                  // todo
                  return;
                }}
              >
                <Avatar containerStyle={{marginLeft:10}} size="medium" source={require('../../img/users.png')} />
                <ListItem.Content style={{marginLeft:10}}>
                  <ListItem.Title style={{fontSize:18, marginBottom:8}}>{l.applicantname}</ListItem.Title>
                  <ListItem.Subtitle style={{marginBottom:4}}>
                    {'Status:  ' + l.applicantCurrentStatus}
                  </ListItem.Subtitle>
                  <ListItem.Subtitle style={{marginBottom:4}}>
                    {'Progress:  ' + l.applicantCurrentProgress}
                  </ListItem.Subtitle>
                  <ListItem.Subtitle style={{fontWeight:"bold"}}>
                    {'Waited Time:  ' + l.waitingTime}
                  </ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
