
import axios from 'axios';
import { BACKEND_URL } from '../constants/apiConstants';
import { GET_ALL_USERS } from '../store/Users/actionTypes';

export function addUserApiCall(userData: any, navigation: any) {
    return (dispatch: any) => {


        // dispatch({
        //     type: GET_ALL_USERS,
        //     payload: {
        //         data: null,
        //         loader: true,
        //         error: null,
        //     },
        // });

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
                    navigation.navigate('UsersList')
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
