import { takeLatest, put } from "redux-saga/effects";
import AlbumsActionTypes from "./albums.types";
import {
  fetchAlbumsFailure,
  fetchAlbumsSuccess,
  clearAlbumMessages,
  editAlbumFailure,
  editAlbumSuccess,
  deleteAlbumFailure,
  deleteAlbumSuccess,
  addAlbumFailure,
  addAlbumSuccess,
} from "./albums.actions";
import axios from "../../utils/axios";

export function* fetchAlbumsStartAsync() {
  try {
    const albums = yield axios.get("albums").then((res) => res.data);
    yield put(fetchAlbumsSuccess(albums));
  } catch (error) {
    yield put(fetchAlbumsFailure(error.message));
  }
}

export function* editAlbumStartAsync(action) {
  try {
    const album = action.payload;
    const editedAlbum = yield axios
      .put(`albums/${album.id}`, album)
      .then((res) => res.data);

    yield put(editAlbumSuccess(editedAlbum));
  } catch (error) {
    yield put(editAlbumFailure(error.message));
  }
}

export function* addAlbumStartAsync(action) {
  try {
    const album = action.payload;
    const albumAdded = yield axios
      .post(`albums/`, album)
      .then((res) => res.data);

    yield put(addAlbumSuccess(albumAdded));
  } catch (error) {
    yield put(addAlbumFailure(error.message));
  }
}

export function* deleteAlbumStateAsync(action) {
  try {
    const id = action.payload;
    yield axios.delete(`albums/${id}`).then((res) => res.status);
    yield put(deleteAlbumSuccess(id));
  } catch (error) {
    yield put(deleteAlbumFailure(error.message));
  }
}

export function* clearAlbumMessagesStart() {
  yield put(clearAlbumMessages());
}

//Not necessary unless you have more than one sagas exports
//The array should contain a list of actions to be listened to

export default function* albumsSaga() {
  yield takeLatest(AlbumsActionTypes.ADD_ALBUM_START, addAlbumStartAsync);
  yield takeLatest(AlbumsActionTypes.EDIT_ALBUM_START, editAlbumStartAsync);
  yield takeLatest(AlbumsActionTypes.DELETE_ALBUM_START, deleteAlbumStateAsync);
  yield takeLatest(AlbumsActionTypes.FETCH_ALBUMS_START, fetchAlbumsStartAsync);
  yield takeLatest(
    [
      AlbumsActionTypes.DELETE_ALBUM_FAILURE,
      AlbumsActionTypes.DELETE_ALBUM_SUCCESS,
      AlbumsActionTypes.ADD_ALBUM_FAILURE,
      AlbumsActionTypes.ADD_ALBUM_SUCCESS,
      AlbumsActionTypes.EDIT_ALBUM_FAILURE,
      AlbumsActionTypes.EDIT_ALBUM_SUCCESS,
      AlbumsActionTypes.FETCH_ALBUMS_FAILURE,
      AlbumsActionTypes.FETCH_ALBUMS_SUCCESS,
    ],
    clearAlbumMessagesStart
  );
}
