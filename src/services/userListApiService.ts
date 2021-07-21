
import axios from 'axios';
import { BACKEND_URL } from '../constants/apiConstants';
import { GET_ALL_USERS } from '../store/Users/actionTypes';

export function getUserListApiCall() {
    return (dispatch: any) => {


        dispatch({
            type: GET_ALL_USERS,
            payload: {
                data: null,
                loader: true,
                error: null,
            },
        });


        axios.get(BACKEND_URL)
            .then((response: any) => {
                console.log('====== RES DATA', JSON.stringify(response.data, null, 2));
                if (response.status === 200) {
                    dispatch({
                        type: GET_ALL_USERS,
                        payload: {
                            data: response.data,
                            loader: false,
                            error: null,
                        },
                    });
                }
            })
            .catch((error: any) => {
                dispatch({
                    type: GET_ALL_USERS,
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
