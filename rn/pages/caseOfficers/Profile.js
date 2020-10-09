import React, { useState, useEffect, useContext } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Alert,
} from 'react-native';
import { Button } from 'react-native-elements';

import { UserContext } from '../../util/UserProvider';

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
  const { setUserId, setAuthToken } = useContext(UserContext);

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
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsText}>
            Officer ID: {profile?.officerID}
          </Text>
          <Text style={styles.detailsText}>Name: {profile?.name}</Text>
          <Text style={styles.detailsText}>
            Organisation: {profile?.organisationName}
          </Text>
          <Text style={styles.detailsText}>
            Designation: {profile?.desgination}
          </Text>
          {/* todo: show admin or not */}
        </View>

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
          <Button
            style={styles.buttonContainer}
            title="Logout"
            onPress={() =>
              Alert.alert('Logout', 'Are you sure you want to logout?', [
                {
                  text: 'Cancel',
                  style: 'cancel',
                },
                {
                  text: 'Yes',
                  onPress: () => {
                    setUserId(null);
                    setAuthToken(null);
                  },
                },
              ])
            }
          />
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
  detailsContainer: {
    margin: 16,
  },
  detailsText: {
    fontSize: 16,
    marginVertical: 10,
  },
  buttonContainer: {
    margin: 6,
  },
});
