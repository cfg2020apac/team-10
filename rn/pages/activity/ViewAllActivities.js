import React, { useState, useEffect, useCallback} from 'react';
import { useHistory } from "react-router-dom";
import axios from "axios";
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
  const [searchedActivities, setSearchedActivities] = useState([]);

  const updateSearch = useCallback(
    async (e, activities) => {
      const q = e.target.value;

      if (!q) {
        setActivities(activities);
        return;
      }
      setSearchedActivities(await search(q, activities));
    }, []
  );

  async function search(query, allActivities) {
    await sleep(500);

    const q = query.toLocaleLowerCase();
    console.log("search: " + allActivities);
    return allActivities.filter(l => {
      const fields = [l.activityName].map(f => f.toLocaleLowerCase());
      return fields.some(f => f.indexOf(q) >= 0);
    });
  }


  const getActivites = async () => {
    axios
      .get('https://codeitsuisse-mcspicy.herokuapp.com/getAllActivity')
      .then(response => {
        const data = response.data;
        console.debug(response.data);
        console.debug(data);
        setActivities(data);
      })
      .catch(error => {
        console.log(error);
      })
  }

  // const fake_activities = [
  //   { activityName: 'Activity 1', description: 'Description 1', status: 'Pending', caseOfficer: 'Thomas', applicant: 'Randy' },
  //   { activityName: 'Activity 2', description: 'Description 2', status: 'Cancelled', caseOfficer: 'Bob', applicant: 'Bobby' },
  //   { activityName: 'Activity 3', description: 'Description 3', status: 'Complete', caseOfficer: 'Susan', applicant: 'Sarah' },
  // ];

  const history = useHistory();

  useEffect(() => {
    getActivites();
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <SearchBar
          placeholder="Find Activity"
          platform="ios"
          onChange={(e) => {updateSearch(e, activities)}}
          value={search}
          searchIcon={false}
        />
        <ScrollView>
          <Button
            style={styles.buttonContainer}
            title="Create Activity"
            onPress={() => navigation.navigate('CreateActivity')}
          />
          {activities.map((activity, idx) => (
            <Card key={idx} onPre>
              <Card.Title>{activity.activityName}</Card.Title>
              <Text style={{ marginBottom: 10 }}>
                Status:{activity.status}
              </Text>
              <Text style={{ marginBottom: 10 }}>
                Applicant:{activity.applicant}
              </Text>
              <Text style={{ marginBottom: 10 }}>
                {activity.description}
              </Text>
              <Button
                title="View Details"
                type="outline"
                onPress={() => navigation.navigate('ViewActivityDetails', { id: activity.activityID })}
              />
            </Card>
          ))}

        </ScrollView>
      </SafeAreaView>
    </>
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