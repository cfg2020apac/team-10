import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import { Button } from 'react-native-elements';

export default Profile = ({ navigation }) => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Button
            style={styles.buttonContainer}
            title="Case Officers List"
            onPress={() => navigation.navigate('ViewAllCaseOfficers')}
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
  buttonContainer: {
    margin: 6,
  },
});
