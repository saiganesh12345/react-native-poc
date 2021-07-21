
import axios from 'axios';
import { BACKEND_URL } from '../constants/apiConstants';
import { ADD_USER } from '../store/Users/actionTypes';

export function addUserApiCall(userData: any, navigation: any) {
    return (dispatch: any) => {


        dispatch({
            type: ADD_USER,
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
        console.log(navigation);
        console.log('====================================');


        axios.post(BACKEND_URL, payLoad)
            .then((response: any) => {
                console.log('====== RES DATA', JSON.stringify(response, null, 2));

                if (response.status === 201) {
                    dispatch({
                        type: ADD_USER,
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
                    type: ADD_USER,
                    payload: {
                        loader: true,
                        error,
                    },
                });
                console.log(error)
            });
    };
}
