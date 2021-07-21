
import axios from 'axios';
import { DELETE_USER_BY_ID, GET_ALL_USERS } from '../store/Users/actionTypes';
import { getUserListApiCall } from './userListApiService';

export function deleteUserApiCall(userData: any) {
    return (dispatch: any) => {
        dispatch({
            type: DELETE_USER_BY_ID,
            payload: {
                data: null,
                loader: true,
                error: null,
            },
        });

        const url = `https://jsonplaceholder.typicode.com/users/${userData.id}`;
        console.log('=>>>>>>>>>> URL :: ', url);


        dispatch({
            type: DELETE_USER_BY_ID,
            payload: {
                data: userData.id,
                loader: false,
                error: null,
            },
        });


        axios.delete(url)
            .then((response: any) => {
                if (response.status === 200) {
                    console.log('====== DDDDD RES DATA', JSON.stringify(response.data, null, 2));
                    dispatch({
                        type: DELETE_USER_BY_ID,
                        payload: {
                            data: null,
                            loader: false,
                            error: null,
                        },
                    });
                    dispatch(getUserListApiCall())
                }
            })
            .catch((error: any) => {
                dispatch({
                    type: DELETE_USER_BY_ID,
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
