import React from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';


import { userListSelectors } from '../store/Users';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUserListApiCall } from '../services/userListApiService';
import { Alert } from 'react-native';
import { deleteUserApiCall } from '../services/userDeleteApiServices';
import { useNavigation } from '@react-navigation/native';



const UsersListScreen = (props: any) => {

    const dispatch = useDispatch(); 
    const useListState: any = useSelector(userListSelectors.getUsersListState)
    const navigation = useNavigation()

    console.log('=============SSS===LL== PPP ==> ', JSON.stringify(useListState.usersListData, null, 2));


    const addUser = () => {
        props.navigation.navigate('UserAdd') 
    }

    const deleteUser = (data:any) => {
        Alert.alert(
            "Are you sure want to remove user ?",
            "Please Confirm",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => {
                  console.log("OK Pressed")
                  dispatch(deleteUserApiCall(data) )
                } }
            ]
          );
    }


    const rederGridItem = (itemData: any) => {
        console.log('KKKKKKKKKKKKKKKKlK ', JSON.stringify(itemData, null, 2))
        return (
            <View
                style={styles.cardLayout}
            >
                <Text>{itemData.item.name}</Text>
                <TouchableOpacity
                    onPress={() => props.navigation.navigate('UserEdit', {
                        userData: itemData.item
                    })}
                >
                    <Text>Edit</Text> 
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => deleteUser(itemData.item) }
                >
                    <Text>Delete</Text>
                </TouchableOpacity>

            </View>
        )
    }

    return (
        <View>
            <Button title="Add User" onPress={() => addUser() }/>
        <FlatList
            keyExtractor={(item: any, index: any) => item.id}
            data={useListState.usersListData.data}
            numColumns={1}
            renderItem={rederGridItem}
        />
        </View>
    )
}

export default UsersListScreen

const styles = StyleSheet.create({
    cardLayout: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 12,
        backgroundColor: '#fff',
        marginHorizontal: 12,
        height:50,
        marginVertical: 12
    }
})
