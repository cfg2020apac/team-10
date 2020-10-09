import React, { useContext } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Alert,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Todo from './pages/todo/Todo';
import CreateNewApplicant from './pages/applicants/CreateNewApplicant';
import ViewApplicantProfile from './pages/applicants/ViewApplicantProfile';
import ViewApplicants from './pages/applicants/ViewApplicants';
import CreateActivity from './pages/activity/CreateActivity';
import ViewActivityDetails from './pages/activity/ViewActivityDetails';
import ViewAllActivities from './pages/activity/ViewAllActivities';
import Profile from './pages/caseOfficers/Profile';
import EditProfile from './pages/caseOfficers/EditProfile';
import ViewAllCaseOfficers from './pages/caseOfficers/ViewAllCaseOfficers';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';

import { UserContext } from './util/UserProvider';

const TodoStack = createStackNavigator();

function TodoStackScreen() {
  return (
    <TodoStack.Navigator>
      <TodoStack.Screen name="Todo" component={Todo} />
    </TodoStack.Navigator>
  );
}

const ApplicantsStack = createStackNavigator();

function ApplicantsStackScreen() {
  return (
    <ApplicantsStack.Navigator>
      <ApplicantsStack.Screen
        name="ViewApplicants"
        component={ViewApplicants}
      />
      <ApplicantsStack.Screen
        name="ViewApplicantProfile"
        component={ViewApplicantProfile}
      />
      <ApplicantsStack.Screen
        name="CreateNewApplicant"
        component={CreateNewApplicant}
      />
    </ApplicantsStack.Navigator>
  );
}

const ActivityStack = createStackNavigator();

function ActivityStackScreen() {
  return (
    <ActivityStack.Navigator>
      <ActivityStack.Screen
        name="ViewAllActivities"
        component={ViewAllActivities}
      />
      <ActivityStack.Screen
        name="ViewActivityDetails"
        component={ViewActivityDetails}
      />
      <ActivityStack.Screen name="CreateActivity" component={CreateActivity} />
    </ActivityStack.Navigator>
  );
}

const CaseOfficersStack = createStackNavigator();

function CaseOfficersStackScreen() {
  const { setUserId, setAuthToken } = useContext(UserContext);

  return (
    <CaseOfficersStack.Navigator>
      <CaseOfficersStack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerRight: () => (
            <Button
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
              title="Logout"
            />
          ),
        }}
      />
      <CaseOfficersStack.Screen name="EditProfile" component={EditProfile} />
      <CaseOfficersStack.Screen
        name="ViewAllCaseOfficers"
        component={ViewAllCaseOfficers}
        options={{ title: 'Case Officers' }}
      />
    </CaseOfficersStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

const AuthStack = createStackNavigator();

const Navigator = () => {
  const { authToken } = useContext(UserContext);

  return (
    <NavigationContainer>
      {!authToken ? (
        <AuthStack.Navigator>
          <AuthStack.Screen name="Login" component={Login} />
          <AuthStack.Screen name="Signup" component={Signup} />
        </AuthStack.Navigator>
      ) : (
        <Tab.Navigator>
          <Tab.Screen name="Todo" component={TodoStackScreen} />
          <Tab.Screen name="Applicants" component={ApplicantsStackScreen} />
          <Tab.Screen name="Activity" component={ActivityStackScreen} />
          <Tab.Screen name="Profile" component={CaseOfficersStackScreen} />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
};

export default Navigator;
