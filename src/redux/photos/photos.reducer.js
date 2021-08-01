import PhotosActionTypes from "./photos.types";
import {
  updateItemDetails,
  deleteItem,
  addNewItem,
} from "../../utils/modifier";

const initialState = {
  isFetching: false,
  data: [],
  errorMessage: null,
  message: null,
};

const photoReducer = (state = initialState, action) => {
  switch (action.type) {
    case PhotosActionTypes.CLEAR_PHOTO_MESSAGES:
      return {
        ...state,
        errorMessage: null,
        message: null,
      };
    case PhotosActionTypes.FETCH_PHOTOS_START:
      return {
        ...state,
        isFetching: true,
      };
    case PhotosActionTypes.FETCH_PHOTOS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.payload,
      };
    case PhotosActionTypes.FETCH_PHOTOS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    case PhotosActionTypes.EDIT_PHOTO_START:
      return {
        ...state,
        isFetching: true,
      };
    case PhotosActionTypes.EDIT_PHOTO_SUCCESS:
      return {
        ...state,
        data: updateItemDetails(state.data, action.payload),
        isFetching: false,
      };
    case PhotosActionTypes.EDIT_PHOTO_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    case PhotosActionTypes.ADD_PHOTO_START:
      return {
        ...state,
        isFetching: true,
      };
    case PhotosActionTypes.ADD_PHOTO_SUCCESS:
      return {
        ...state,
        data: addNewItem(state.data, action.payload),
        isFetching: false,
      };
    case PhotosActionTypes.ADD_PHOTO_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    case PhotosActionTypes.DELETE_PHOTO_START:
      return {
        ...state,
        isFetching: true,
      };
    case PhotosActionTypes.DELETE_PHOTO_SUCCESS:
      return {
        ...state,
        data: deleteItem(state.data, action.payload),
        isFetching: false,
      };
    case PhotosActionTypes.DELETE_PHOTO_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default photoReducer;
