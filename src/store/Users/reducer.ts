import {
    ADD_USER,
    DELETE_USER_BY_ID,
    GET_ALL_USERS,
    GET_USER_BY_ID,
    UPDATE_USER
} from './actionTypes';
import { UserServicesActionTypes } from './types';

export const initialUserServicesState = {
    usersListData: {
        data: [],
        loader: false,
        error: null,
    },
};

export default (
    state = initialUserServicesState,
    action: UserServicesActionTypes,
) => {
    switch (action.type) {
        case GET_ALL_USERS:
            return {
                ...state,
                usersListData: {
                    ...state.usersListData,
                    data: action.payload.data,
                    loader: action.payload.loader,
                    error: action.payload.error,
                },
            };

        case DELETE_USER_BY_ID:
            console.log(' AAAAAAAAAAAAAAAAAAaa ', action.payload.data)
            return {
                ...state,
                usersListData: {
                    ...state.usersListData,
                    data: [],
                    loader: action.payload.loader,
                    error: action.payload.error,
                },
            };

        case UPDATE_USER:
            return {
                ...state,
                usersListData: {
                    ...state.usersListData,
                    loader: action.payload.loader,
                    error: action.payload.error,
                },
            };

        default:
            return state;
    }
};
