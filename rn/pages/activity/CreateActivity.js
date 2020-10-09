import React, { useState, useEffect, useContext} from 'react';
import axios from 'axios'; //need to install axios?
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Alert
} from 'react-native';
import { UserContext } from '../../util/UserProvider';

import {Input, Button} from 'react-native-elements';

/*
*************************************** CREATE NEW ACTVITY ***************************************
* This code is to create new activity by the case officer. 
* Each case officer can create multiple activities, which is tagged to their case applicant.
* 
***************************************************************************************************
*/
export default CreateActivity = ({route, navigation}) => {

  const { userId, setUserId, setAuthToken } = useContext(UserContext);

  const profileId = route?.params?.profileId ?? userId;

  const [activity, setActivity] = useState("");

  const [activityName, setActivityName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(""); //This should be set in the backend
  const [caseOfficer, setCaseOfficer] = useState("")
  const [applicant, setApplicant] = useState("");
  const [comments, setComments] = useState([]);

  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessages, setErrorMessages] = useState([""]);

  const newActivity = {
    activityName: activityName,
    description: description,
    status: status,
    caseOfficer: profileId,
    applicant: applicant,
    comments: comments,
  }
  // Do I need to search for the case applicant? 
  // Case Officer Id should be stored globally?

  const createNewActivity = (e) => {
    console.log(newActivity)
    axios
      .post("https://codeitsuisse-mcspicy.herokuapp.com/createActivity", newActivity)
      .then((res) => {
        console.log(res.data);
        setSuccessMessage(res.data);
        setShowSuccessAlert(true);
        setActivityName("");
        setDescription("");
        setStatus("");
        setCaseOfficer("");
        setApplicant("");
      })
      .catch((error) => {
        console.log(error.response.data);
        Alert.alert('Error encountered when creating activity!')
        // let newErrorMessages = [...errorMessages, err.response.data];
        // setErrorMessages(newErrorMessages);
        // setShowErrorAlert(true);
      });
  }

  useEffect(() => {
  }, [])

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView>
          {/* <Text h1>Create New Activity</Text> */}
          <Input
            placeholder='Activity Name'
            required
            label="Enter Name"
            onChangeText={setActivityName}
            // errorStyle={{ color: 'red' }}
            // errorMessage='Enter a valid name'
          />
          <Input
            label="Description"
            placeholder='Enter Description'
            onChangeText={setDescription}
            // errorStyle={{ color: 'red' }}
            // errorMessage='Enter a valid description'
          />
          <Input
            label="Applicant ID"
            placeholder="Enter Applicant ID"
            onChangeText={setApplicant}
          />
          <Button
            style={styles.buttonContainer}
            title="Create Activity"
            type="solid"
            onPress={() => createNewActivity()}
          />
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
