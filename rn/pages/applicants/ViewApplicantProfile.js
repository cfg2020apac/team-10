import React from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  ActivityIndicator,
} from 'react-native';

import { Button, Input, Image, Text } from 'react-native-elements';
import { UserContext } from '../../util/UserProvider';

export default ViewApplicantProfile = ({ navigation }) => {
  const updateApplicantInfo = () => {
    // todo
    navigation.goBack();
  };

  const deleteApplicant = () => {
    // todo
    navigation.goBack();
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
        <Image
          source={require('../../img/users.png')}
          style={{
            width: 120,
            height: 120,
            marginTop: 100,
            marginHorizontal: 145,
          }}
          PlaceholderContent={<ActivityIndicator />}
        />

        <Input
          //disabled
          placeholder="Applicant Name Place holder"
          inputContainerStyle={{ marginHorizontal: 10, marginTop: 40 }}
        ></Input>

        <DropDownPicker
          //disabled
          zIndex={5000}
          placeholder="Current Status"
          items={[
            { label: 'Assessment', value: 'Assessment' },
            {
              label: 'Intake / Interview / Acceptance',
              value: 'Intake/Interview/Acceptance',
            },
            { label: 'Admission', value: 'Admission' },
            { label: 'Settle-in', value: 'Settle-in' },
            {
              label: 'Case Plan With Case Manager',
              value: 'Case Plan With Case Manager',
            },
            {
              label: 'Employment w/ Career Coach',
              value: 'Employment w/ Career Coach',
            },
            { label: 'Housing', value: 'Housing' },
            { label: 'Move to Own House', value: 'Move to Own House' },
          ]}
          containerStyle={{ height: 40, marginHorizontal: 20 }}
          style={{ backgroundColor: '#fafafa' }}
          itemStyle={{
            zIndex: 2,
            justifyContent: 'flex-start',
          }}
          dropDownStyle={{ backgroundColor: '#fafafa' }}
          /*
            onChangeItem={item => this.setState({
                // TODO
            })}
            */
        />

        <DropDownPicker
          //disabled
          zIndex={4000}
          placeholder="Current Progress"
          items={[
            { label: 'Pending', value: 'Pending' },
            { label: 'On-going', value: 'On-going' },
          ]}
          containerStyle={{ height: 40, margin: 20 }}
          style={{ backgroundColor: '#fafafa' }}
          itemStyle={{
            justifyContent: 'flex-start',
          }}
          dropDownStyle={{ backgroundColor: '#fafafa' }}
          /*
            onChangeItem={item => this.setState({
                // TODO
            })}
            */
        />

        <DropDownPicker
          zIndex={3000}
          //disabled
          placeholder="Current Assigned 3rd-party"
          items={[
            { label: '3rd-party 1 place holder', value: '1' },
            { label: '3rd-party 2 place holder', value: '2' },
            { label: '3rd-party 3 place holder', value: '3' },
            { label: '3rd-party 4 place holder', value: '4' },
          ]}
          containerStyle={{ height: 40, marginHorizontal: 20 }}
          style={{ backgroundColor: '#fafafa' }}
          itemStyle={{
            justifyContent: 'flex-start',
          }}
          activeItemStyle={{ backgroundColor: 'lightblue' }}
          activeLabelStyle={{ color: 'gray' }}
          dropDownStyle={{ backgroundColor: '#fafafa' }}
          /*
            onChangeItem={item => this.setState({
                // TODO
            })}
            */
        />

        <Button
          title="Update Applicant Information"
          onPress={updateApplicantInfo}
          style={{ marginTop: 60, margin: 20 }}
        />

        <Button
          title="Delete Applicant"
          onPress={deleteApplicant}
          style={{ marginHorizontal: 20 }}
        />
      </ScrollView>
    </>
  );
};
