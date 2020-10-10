import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom'; import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  TextInput
} from 'react-native';
import { Button, Input, Card, Overlay, Text } from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';

export default ViewActivityDetails = ({ route, navigation }) => {

  const [activity, setActivity] = useState();

  const [activityId, setActivityId] = useState();
  const [activityName, setActivityName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(""); //This should be set in the backend
  const [caseOfficer, setCaseOfficer] = useState("")
  const [applicant, setApplicant] = useState("");
  const [comments, setComments] = useState([]);
  const [createdDate, setCreateDate] = useState(new Date());
  const [updatedDate, setUpdatedDate] = useState(new Date());

  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessages, setErrorMessages] = useState([""]);

  const [updateMode, setUpdateMode] = useState(false);
  const [showDeleteOverlay, setShowDeleteOverlay] = useState(false);

  const updatedActivity = {
    activityId: activityId,
    activityName: activityName,
    description: description,
    status: status,
    caseOfficer: caseOfficer,
    applicant: applicant,
    comments: comments,
  }

  const deletedActivity = {
    activityId: activityId,
    activityName: activityName,
    description: description,
    status: status,
    caseOfficer: caseOfficer,
    applicant: applicant,
    comments: comments,
  }

  const getActivity = async () => {

    const id = route.params.id;
    console.log(id);
    axios
      .get("https://codeitsuisse-mcspicy.herokuapp.com/getActivityByID/" + route.params.id)
      .then((response) => {
        const data = response.data[0];
        console.log(data);
        // setActivity(data);
        setActivityId(data.activityID);
        setActivityName(data.activityName);
        setDescription(data.description);
        setStatus(data.status);
        setCaseOfficer(data.caseOfficer);
        setApplicant(data.applicant);
        setComments(data.comments);
        setCreateDate(data.createdDate);
        setUpdatedDate(data.updatedDate);
        setUpdateMode(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const updateActivity = async () => {
    console.log(updatedActivity);
    axios
      .post(
        "http://localhost:5000/project/updateProject/",
        updatedActivity
      )
      .then((res) => {
        console.log(res.data);
        setSuccessMessage(res.data);
        setShowSuccessAlert(true);
      })
      .catch((error) => {
        console.log(error);
        let newErrorMessages = [...errorMessages, error.response.data];
        setErrorMessages(newErrorMessages);
        setShowErrorAlert(true);
      });
  };

  const deleteActivity = async () => {
    axios
      .post("https://codeitsuisse-mcspicy.herokuapp.com/deleteActivity", deletedActivity)
      .then((res) => {
        console.log(res.data);
        setSuccessMessage(res.data);
        setShowSuccessAlert(true);
        navigation.navigate('ViewAllActivities');
      })
      .catch((error) => {
        console.log(error);
        let newErrorMessages = [...errorMessages, error.response.data];
        setErrorMessages(newErrorMessages);
        setShowErrorAlert(true);
      });
  };

  const history = useHistory();

  function formatDate(date) {
    const fDate = new Date(date)
    const f_Time = fDate.toLocaleTimeString().substring(0, 5);
    const f_Date = fDate.toLocaleDateString();
    const formattedDate = f_Date + " " + f_Time;
    return formattedDate; //fDate.to().substr(0, 22);
  }

  useEffect(() => {
    getActivity();
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView>
          <Text>{updateMode}</Text>
          {(updateMode === true) ? (
            <>
              <Input
                // disabled={updateMode}
                label="Activity Name"
                inputContainerStyle={{ marginHorizontal: 10, marginTop: 20 }}
                value={activityName}
                onChangeText={setActivityName}
              >
              </Input>
              <Input
                // disabled={updateMode}
                label="Description"
                multiline={true}
                numberOfLines={4}
                inputContainerStyle={{ marginHorizontal: 10, marginTop: 20 }}
                value={description}
                onChangeText={setDescription}
              >
              </Input>
              <Text style={styles.container}>Status</Text>
              <DropDownPicker
                //disabled
                zIndex={4000}
                placeholder="Current Progress"
                items={[
                  { label: 'Pending', value: 'Pending' },
                  { label: 'On-going', value: 'On-going' },
                  { label: 'Completed', value: 'Completed' }
                ]}
                // containerStyle={{ height: 40, margin: 20 }}
                style={styles.container}
                // itemStyle={{
                //   justifyContent: 'flex-start'
                // }}
                dropDownStyle={{ backgroundColor: '#fafafa' }}
              /*
              onChangeItem={item => this.setState({
                  // TODO
              })}
              */
              />
              {/* <Input
                // disabled={updateMode}
                label="Status"
                multiline={true}
                numberOfLines={4}
                inputContainerStyle={{ marginHorizontal: 10, marginTop: 20 }}
                value={status}
                onChangeText={setStatus}
              ></Input> */}
              <Button
                style={styles.buttonContainer}
                title="Save"
                onPress={() => updateActivity()}
              />
              <Button
                style={styles.buttonContainer}
                title="Cancel"
                onPress={() => setUpdateMode(false)}
              />
            </>
          ) : (
              <>
                <Input
                  // disabled={updateMode}
                  placeholder="Description"
                  multiline={true}
                  numberOfLines={4}
                  inputContainerStyle={{ marginHorizontal: 10, marginTop: 20 }}
                  value={description}
                  onChangeText={setDescription}
                >
                </Input>
                <Button
                  style={styles.buttonContainer}
                  title="Update"
                  onPress={setUpdateMode(true)}
                />
                <Button
                  style={styles.buttonContainer}
                  title="Delete"
                  onPress={setShowDeleteOverlay(true)}
                />
              </>
            )}

          {/* <Overlay isVisible={showDeleteOverlay} onBackdropPress={() => { setShowDeleteOverlay(false) }}>
            <Card>
              <Card.Title>
                <Text>Are you sure?</Text>
              </Card.Title>
          <Text>You are about to delete an {activityName} permanently. Do you want to delete?</Text>
              <Button
                title="Delete"
                onPress={() => deleteActivity()}
              />
            </Card>
          </Overlay> */}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fafafa',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 6,
  },
  buttonContainer: {
    margin: 6,
  },
});