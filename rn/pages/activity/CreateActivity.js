import React, { useState, useEffect } from 'react';
import axios from 'axios'; //need to install axios?
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar, Button
} from 'react-native';

/*
*************************************** CREATE NEW ACTVITY ***************************************
* This code is to create new activity by the case officer. 
* Each case officer can create multiple activities, which is tagged to their case applicant.
* 
***************************************************************************************************
*/
export default CreateActivity = () => {

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
    caseOfficer: caseOfficer,
    applicant: applicant,
    comments: comments,
  }
  // Do I need to search for the case applicant? 
  // Case Officer Id should be stored globally?

  const createNewActivity = (e) => {
    axios
      .post()
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
        let newErrorMessages = [...errorMessages, err.response.data];
        setErrorMessages(newErrorMessages);
        setShowErrorAlert(true);
      });
  }

  useEffect(() => {
  }, [])

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView>
          <Text>TODO</Text>
          <InputText
            placeholder='Activity Name'
            required
            onChange={(e) => { setActivityName(e.target.value) }}
            errorStyle={{ color: 'red' }}
            errorMessage='Enter a valid name'
          />
          <InputText
            placeholder='Description'
            onChange={(e) => { setDescription(e.target.value) }}
            errorStyle={{ color: 'red' }}
            errorMessage='Enter a valid name'
          />
          <Button
            title="Create Activity"
            type="submit"
            onClick={()=> console.log("Create Activity")}
          >Create Activity</Button>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
