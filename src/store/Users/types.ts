

import {
    GET_ALL_USERS,
    GET_USER_BY_ID,
    DELETE_USER_BY_ID,
    UPDATE_USER,
    ADD_USER
} from './actionTypes';

interface GetAllUsers {
    type: typeof GET_ALL_USERS;
    payload: any;
}

interface GetUserById {
    type: typeof GET_USER_BY_ID;
    payload: any;
}

interface DeleteUserById {
    type: typeof DELETE_USER_BY_ID;
    payload: any;
}

interface updateUser {
    type: typeof UPDATE_USER;
    payload: any;
}

interface addUser {
    type: typeof ADD_USER;
    payload: any;
}


export type UserServicesActionTypes =
    | GetAllUsers
    | GetUserById
    | DeleteUserById
    | updateUser
    | addUser
