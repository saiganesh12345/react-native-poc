
import axios from 'axios';
import { BACKEND_URL } from '../constants/apiConstants';
import { GET_ALL_USERS, UPDATE_USER } from '../store/Users/actionTypes';

export function editUserApiCall(userData: any, navigation: any) {
    return (dispatch: any) => {


        dispatch({
            type: UPDATE_USER,
            payload: {
                loader: true,
                error: null,
            },
        });

        let payLoad = {
            body: JSON.stringify(userData),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }

        console.log('===================== ===============');
        console.log(userData);
        console.log('====================================');


        axios.put(`${BACKEND_URL}/${userData.id}`, payLoad)
            .then((response: any) => {
                console.log('====== RES DATA', JSON.stringify(response.data, null, 2));

                if (response.status === 200) {

                    dispatch({
                        type: UPDATE_USER,
                        payload: {
                            loader: false,
                            error: null,
                        },
                    });

                    navigation.navigate('UsersList')
                }
            })
            .catch((error: any) => {
                dispatch({
                    type: UPDATE_USER,
                    payload: {
                        data: null,
                        loader: false,
                        error,
                    },
                });
                console.log(error)
            });
    };
}
