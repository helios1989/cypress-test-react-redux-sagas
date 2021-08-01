import { takeLatest, put } from "redux-saga/effects";
import UsersActionTypes from "./users.types";
import {
  fetchUsersFailure,
  fetchUsersSuccess,
  clearUserMessages,
  editUserFailure,
  editUserSuccess,
  deleteUserFailure,
  deleteUserSuccess,
  addUserFailure,
  addUserSuccess,
} from "./users.actions";
import axios from "../../utils/axios";

export function* fetchUsersStartAsync() {
  try {
    const Users = yield axios.get("Users").then((res) => res.data);
    yield put(fetchUsersSuccess(Users));
  } catch (error) {
    yield put(fetchUsersFailure(error.message));
  }
}

export function* editUserStartAsync(action) {
  try {
    const User = action.payload;
    const editedUser = yield axios
      .put(`Users/${User.id}`, User)
      .then((res) => res.data);

    yield put(editUserSuccess(editedUser));
  } catch (error) {
    yield put(editUserFailure(error.message));
  }
}

export function* addUserStartAsync(action) {
  try {
    const User = action.payload;
    const UserAdded = yield axios.post(`Users/`, User).then((res) => res.data);

    yield put(addUserSuccess(UserAdded));
  } catch (error) {
    yield put(addUserFailure(error.message));
  }
}

export function* deleteUserStateAsync(action) {
  try {
    const id = action.payload;
    yield axios.delete(`Users/${id}`).then((res) => res.status);
    yield put(deleteUserSuccess(id));
  } catch (error) {
    yield put(deleteUserFailure(error.message));
  }
}

export function* clearUserMessagesStart() {
  yield put(clearUserMessages());
}

//Not necessary unless you have more than one sagas exports
//The array should contain a list of actions to be listened to

export default function* UsersSaga() {
  yield takeLatest(UsersActionTypes.ADD_USER_START, addUserStartAsync);
  yield takeLatest(UsersActionTypes.EDIT_USER_START, editUserStartAsync);
  yield takeLatest(UsersActionTypes.DELETE_USER_START, deleteUserStateAsync);
  yield takeLatest(UsersActionTypes.FETCH_USERS_START, fetchUsersStartAsync);
  yield takeLatest(
    [
      UsersActionTypes.DELETE_USER_FAILURE,
      UsersActionTypes.DELETE_USER_SUCCESS,
      UsersActionTypes.ADD_USER_FAILURE,
      UsersActionTypes.ADD_USER_SUCCESS,
      UsersActionTypes.EDIT_USER_FAILURE,
      UsersActionTypes.EDIT_USER_SUCCESS,
      UsersActionTypes.FETCH_USERS_FAILURE,
      UsersActionTypes.FETCH_USERS_SUCCESS,
    ],
    clearUserMessagesStart
  );
}
