import UsersActionTypes from "./users.types";

export const clearUserMessages = () => ({
  type: UsersActionTypes.CLEAR_USER_MESSAGES,
});

export const fetchUsersStart = () => ({
  type: UsersActionTypes.FETCH_USERS_START,
});

export const fetchUsersSuccess = (users) => ({
  type: UsersActionTypes.FETCH_USERS_SUCCESS,
  payload: users,
});

export const fetchUsersFailure = (errorMessage) => ({
  type: UsersActionTypes.FETCH_USERS_FAILURE,
  payload: errorMessage,
});

export const editUserStart = () => ({
  type: UsersActionTypes.EDIT_USER_START,
});

export const editUserSuccess = (user) => ({
  type: UsersActionTypes.EDIT_USER_SUCCESS,
  payload: user,
});

export const editUserFailure = (errorMessage) => ({
  type: UsersActionTypes.EDIT_USER_FAILURE,
  payload: errorMessage,
});

export const addUserStart = () => ({
  type: UsersActionTypes.ADD_USER_START,
});

export const addUserSuccess = (user) => ({
  type: UsersActionTypes.ADD_USER_SUCCESS,
  payload: user,
});

export const addUserFailure = (errorMessage) => ({
  type: UsersActionTypes.ADD_USER_FAILURE,
  payload: errorMessage,
});

export const deleteUserStart = () => ({
  type: UsersActionTypes.DELETE_USER_START,
});

export const deleteUserSuccess = (id) => ({
  type: UsersActionTypes.DELETE_USER_SUCCESS,
  payload: id,
});

export const deleteUserFailure = (errorMessage) => ({
  type: UsersActionTypes.DELETE_USER_FAILURE,
  payload: errorMessage,
});
