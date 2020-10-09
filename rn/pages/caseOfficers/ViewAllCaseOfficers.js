import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';

import axios from 'axios';

export default ViewAllCaseOfficers = ({ navigation }) => {
  const [officers, setOfficers] = useState([]);

  useEffect(() => {
    axios
      .get('https://codeitsuisse-mcspicy.herokuapp.com/getAllOfficers')
      .then((res) => {
        console.log(res);
        setOfficers(res.data);
      })
      .catch((err) => console.log('Error fetching profiles', err));
  }, []);

  const officerItemOnPress = (profileId) => {
    navigation.push('Profile', { isOwnProfile: false, profileId });
  };

  return (
    <SafeAreaView>
      <ScrollView>
        {officers.map((item, idx) => (
          <ListItem
            key={idx}
            bottomDivider
            onPress={() => officerItemOnPress(item.officerID)}
          >
            <Avatar />
            <ListItem.Content>
              <ListItem.Title>{item?.name}</ListItem.Title>
              <ListItem.Subtitle>{item?.organisationName}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
