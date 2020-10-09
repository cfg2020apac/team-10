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
import axios from 'axios';

import { UserContext } from '../../util/UserProvider';

/*
{"officerID": "Danieltan123465", 
"password": "holyCrap", 
"officerType": "Admin", 
"name": "Daniel Tan Tan",
 "organisationName": "New hope", 
 "designation":"MR" }
*/
export default Profile = ({ route, navigation }) => {
  const [profile, setProfile] = useState(null);
  const { userId, setUserId, setAuthToken } = useContext(UserContext);

  const isOwnProfile = route?.params?.isOwnProfile ?? true;
  const profileId = route?.params?.profileId ?? userId;

  useEffect(() => {
    axios
      .get(`https://codeitsuisse-mcspicy.herokuapp.com/getDetails/${profileId}`)
      .then((res) => {
        setProfile(res.data[0]);
      })
      .catch((err) => console.log('Error fetching profile', err));
  }, []);

  const deleteCaseOfficer = () => {
    // todo
    return;
  };

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
            Designation: {profile?.designation}
          </Text>
          {/* todo: show admin or not */}
        </View>

        {profile && (
          <View>
            {/* {isOwnProfile && profile.officerType === 'Admin' && ( */}
            {isOwnProfile && (
              <Button
                style={styles.buttonContainer}
                title="Case Officers List"
                onPress={() => navigation.navigate('ViewAllCaseOfficers')}
              />
            )}
            {isOwnProfile && (
              <>
                <Button
                  style={styles.buttonContainer}
                  title="Edit Profile"
                  onPress={() =>
                    navigation.navigate('EditProfile', {
                      profile: profile,
                    })
                  }
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
              </>
            )}
            {!isOwnProfile && profile.officerType === 'Admin' && (
              <Button
                style={styles.buttonContainer}
                title="Delete Case Officer"
                onPress={() =>
                  Alert.alert(
                    'Deleting Case Officer',
                    `Are you sure you want to delete Case Officer ${profileId}?`,
                    [
                      {
                        text: 'Cancel',
                        style: 'cancel',
                      },
                      {
                        text: 'Yes',
                        onPress: deleteCaseOfficer,
                      },
                    ],
                  )
                }
              />
            )}
          </View>
        )}
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
