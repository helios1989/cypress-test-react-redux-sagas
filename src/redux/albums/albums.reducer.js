import AlbumsActionTypes from "./albums.types";
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

const albumReducer = (state = initialState, action) => {
  switch (action.type) {
    case AlbumsActionTypes.CLEAR_ALBUM_MESSAGES:
      return {
        ...state,
        errorMessage: null,
        message: null,
      };
    case AlbumsActionTypes.FETCH_ALBUMS_START:
      return {
        ...state,
        isFetching: true,
      };
    case AlbumsActionTypes.FETCH_ALBUMS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.payload,
      };
    case AlbumsActionTypes.FETCH_ALBUMS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    case AlbumsActionTypes.EDIT_ALBUM_START:
      return {
        ...state,
        isFetching: true,
      };
    case AlbumsActionTypes.EDIT_ALBUM_SUCCESS:
      return {
        ...state,
        data: updateItemDetails(state.data, action.payload),
        isFetching: false,
      };
    case AlbumsActionTypes.EDIT_ALBUM_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    case AlbumsActionTypes.ADD_ALBUM_START:
      return {
        ...state,
        isFetching: true,
      };
    case AlbumsActionTypes.ADD_ALBUM_SUCCESS:
      return {
        ...state,
        data: addNewItem(state.data, action.payload),
        isFetching: false,
      };
    case AlbumsActionTypes.ADD_ALBUM_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    case AlbumsActionTypes.DELETE_ALBUM_START:
      return {
        ...state,
        isFetching: true,
      };
    case AlbumsActionTypes.DELETE_ALBUM_SUCCESS:
      return {
        ...state,
        data: deleteItem(state.data, action.payload),
        isFetching: false,
      };
    case AlbumsActionTypes.DELETE_ALBUM_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default albumReducer;
