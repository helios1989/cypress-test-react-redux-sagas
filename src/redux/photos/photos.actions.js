import PhotosActionTypes from "./photos.types";

export const clearPhotoMessages = () => ({
  type: PhotosActionTypes.CLEAR_PHOTO_MESSAGES,
});
export const fetchPhotosStart = (payload) => ({
  type: PhotosActionTypes.FETCH_PHOTOS_START,
  payload,
});

export const fetchPhotosSuccess = (photos) => ({
  type: PhotosActionTypes.FETCH_PHOTOS_SUCCESS,
  payload: photos,
});

export const fetchPhotosFailure = (errorMessage) => ({
  type: PhotosActionTypes.FETCH_PHOTOS_FAILURE,
  payload: errorMessage,
});

export const editPhotoStart = (payload) => ({
  type: PhotosActionTypes.EDIT_PHOTO_START,
  payload,
});

export const editPhotoSuccess = (photo) => ({
  type: PhotosActionTypes.EDIT_PHOTO_SUCCESS,
  payload: photo,
});

export const editPhotoFailure = (errorMessage) => ({
  type: PhotosActionTypes.EDIT_PHOTO_FAILURE,
  payload: errorMessage,
});

export const addPhotoStart = (payload) => ({
  type: PhotosActionTypes.ADD_PHOTO_START,
  payload,
});

export const addPhotoSuccess = (photo) => ({
  type: PhotosActionTypes.ADD_PHOTO_SUCCESS,
  payload: photo,
});

export const addPhotoFailure = (errorMessage) => ({
  type: PhotosActionTypes.ADD_PHOTO_FAILURE,
  payload: errorMessage,
});

export const deletePhotoStart = (payload) => ({
  type: PhotosActionTypes.DELETE_PHOTO_START,
  payload,
});

export const deletePhotoSuccess = (id) => ({
  type: PhotosActionTypes.DELETE_PHOTO_SUCCESS,
  payload: id,
});

export const deletePhotoFailure = (errorMessage) => ({
  type: PhotosActionTypes.DELETE_PHOTO_FAILURE,
  payload: errorMessage,
});
