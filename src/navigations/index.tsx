import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import UsersNavigator from './UsersNavigator';

import { ActivityIndicator, StyleSheet, View } from 'react-native';




const MainStackNavigator = () => {


  return (
    <NavigationContainer>
      <UsersNavigator />
    </NavigationContainer>
  );

}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: 'yellow',
		alignItems: 'center',
	},
});


export default  MainStackNavigator