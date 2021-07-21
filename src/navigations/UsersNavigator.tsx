import 'react-native-gesture-handler';
import * as React from 'react';


import { createStackNavigator } from '@react-navigation/stack';
import { View, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { getUserListApiCall } from '../services/userListApiService';

import UsersListScreen from '../screens/UsersListScreen';
import UserEditScreen from '../screens/UserEditScreen';
import UserAddScreen from '../screens/UserAddScreen';



const UsersNavigator = () => {

const Stack = createStackNavigator();

const dispatch = useDispatch();


React.useEffect(() => {
    dispatch(getUserListApiCall())
}, [dispatch])

  return (
    <Stack.Navigator>
      <Stack.Screen name="UsersList" component={UsersListScreen} />
      <Stack.Screen name="UserEdit" component={UserEditScreen} />
      <Stack.Screen name="UserAdd" component={UserAddScreen} />
    </Stack.Navigator>
  );
}

export default  UsersNavigator