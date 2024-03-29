import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import { Card, Button, SearchBar } from 'react-native-elements';

export default ViewAllActivities = ({ navigation }) => {
  const [activities, setActivities] = useState([]);

  const getActivites = async () => {
    axios
      .get('https://codeitsuisse-mcspicy.herokuapp.com/getAllActivity')
      .then((response) => {
        const data = response.data;
        console.debug(response.data);
        console.debug(data);
        setActivities(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const fake_activities = [
  //   { activityName: 'Activity 1', description: 'Description 1', status: 'Pending', caseOfficer: 'Thomas', applicant: 'Randy' },
  //   { activityName: 'Activity 2', description: 'Description 2', status: 'Cancelled', caseOfficer: 'Bob', applicant: 'Bobby' },
  //   { activityName: 'Activity 3', description: 'Description 3', status: 'Complete', caseOfficer: 'Susan', applicant: 'Sarah' },
  // ];

  useEffect(() => {
    getActivites();
  }, []);

  return (
    <SafeAreaView>
      <SearchBar
        placeholder="Find Activity"
        platform="ios"
        searchIcon={false}
      />
      <ScrollView style={{ marginBottom: 80 }}>
        <Button
          style={styles.buttonContainer}
          title="Create Activity"
          onPress={() => navigation.navigate('CreateActivity')}
        />
        {activities.map((activity, idx) => (
          <Card key={idx} onPre>
            <Card.Title>{activity.activityName}</Card.Title>
            <Text style={{ marginBottom: 10 }}>Status:{activity.status}</Text>
            <Text style={{ marginBottom: 10 }}>
              Applicant:{activity.applicant}
            </Text>
            <Text style={{ marginBottom: 10 }}>{activity.description}</Text>
            <Button
              title="View Details"
              type="outline"
              onPress={() =>
                navigation.navigate('ViewActivityDetails', {
                  id: activity.activityID,
                })
              }
            />
          </Card>
        ))}
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
