import { takeLatest, put } from "redux-saga/effects";
import PhotosActionTypes from "./photos.types";
import {
  fetchPhotosFailure,
  fetchPhotosSuccess,
  clearPhotoMessages,
  editPhotoFailure,
  editPhotoSuccess,
  deletePhotoFailure,
  deletePhotoSuccess,
  addPhotoFailure,
  addPhotoSuccess,
} from "./photos.actions";
import axios from "../../utils/axios";

export function* fetchPhotosStartAsync() {
  try {
    const Photos = yield axios.get("Photos").then((res) => res.data);
    yield put(fetchPhotosSuccess(Photos));
  } catch (error) {
    yield put(fetchPhotosFailure(error.message));
  }
}

export function* editPhotoStartAsync(action) {
  try {
    const Photo = action.payload;
    const editedPhoto = yield axios
      .put(`Photos/${Photo.id}`, Photo)
      .then((res) => res.data);

    yield put(editPhotoSuccess(editedPhoto));
  } catch (error) {
    yield put(editPhotoFailure(error.message));
  }
}

export function* addPhotoStartAsync(action) {
  try {
    const Photo = action.payload;
    const PhotoAdded = yield axios
      .post(`Photos/`, Photo)
      .then((res) => res.data);

    yield put(addPhotoSuccess(PhotoAdded));
  } catch (error) {
    yield put(addPhotoFailure(error.message));
  }
}

export function* deletePhotoStateAsync(action) {
  try {
    const id = action.payload;
    yield axios.delete(`Photos/${id}`).then((res) => res.status);

    yield put(deletePhotoSuccess(id));
  } catch (error) {
    yield put(deletePhotoFailure(error.message));
  }
}

export function* clearPhotoMessagesStart() {
  yield put(clearPhotoMessages());
}

//Not necessary unless you have more than one sagas exports
//The array should contain a list of actions to be listened to

export default function* PhotosSaga() {
  yield takeLatest(PhotosActionTypes.ADD_PHOTO_START, addPhotoStartAsync);
  yield takeLatest(PhotosActionTypes.EDIT_PHOTO_START, editPhotoStartAsync);
  yield takeLatest(PhotosActionTypes.DELETE_PHOTO_START, deletePhotoStateAsync);
  yield takeLatest(PhotosActionTypes.FETCH_PHOTOS_START, fetchPhotosStartAsync);
  yield takeLatest(
    [
      PhotosActionTypes.DELETE_PHOTO_FAILURE,
      PhotosActionTypes.DELETE_PHOTO_SUCCESS,
      PhotosActionTypes.ADD_PHOTO_FAILURE,
      PhotosActionTypes.ADD_PHOTO_SUCCESS,
      PhotosActionTypes.EDIT_PHOTO_FAILURE,
      PhotosActionTypes.EDIT_PHOTO_SUCCESS,
      PhotosActionTypes.FETCH_PHOTOS_FAILURE,
      PhotosActionTypes.FETCH_PHOTOS_SUCCESS,
    ],
    clearPhotoMessagesStart
  );
}
