import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import { Button } from 'react-native-elements';

/*
{"officerID": "Danieltan123465", 
"password": "holyCrap", 
"officerType": "Admin", 
"name": "Daniel Tan Tan",
 "organisationName": "New hope", 
 "designation":"MR" }
*/
export default Profile = ({ navigation }) => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (profile == null) {
      // todo get from user context
      // setProfile();
    } else {
      const profId = props.profId;
      // todo fetch from api
    }
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Button
            style={styles.buttonContainer}
            title="Case Officers List"
            onPress={() => navigation.navigate('ViewAllCaseOfficers')}
          />
          <Button
            style={styles.buttonContainer}
            title="Edit Profile"
            onPress={() => navigation.navigate('EditProfile')}
          />
        </View>

        <View>
          <Text>Officer ID: {profile?.officerID}</Text>
          <Text>Name: {profile?.name}</Text>
          <Text>Organisation: {profile?.organisationName}</Text>
          <Text>Designation: {profile?.desgination}</Text>
          {/* todo: show admin or not */}
        </View>
      </ScrollView>
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
