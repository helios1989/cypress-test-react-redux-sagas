import AlbumsActionTypes from "./albums.types";

export const clearAlbumMessages = () => ({
  type: AlbumsActionTypes.CLEAR_ALBUM_MESSAGES,
});
export const fetchAlbumsStart = () => ({
  type: AlbumsActionTypes.FETCH_ALBUMS_START,
});

export const fetchAlbumsSuccess = (albums) => ({
  type: AlbumsActionTypes.FETCH_ALBUMS_SUCCESS,
  payload: albums,
});

export const fetchAlbumsFailure = (errorMessage) => ({
  type: AlbumsActionTypes.FETCH_ALBUMS_FAILURE,
  payload: errorMessage,
});

export const editAlbumStart = (payload) => ({
  type: AlbumsActionTypes.EDIT_ALBUM_START,
  payload,
});

export const editAlbumSuccess = (album) => ({
  type: AlbumsActionTypes.EDIT_ALBUM_SUCCESS,
  payload: album,
});

export const editAlbumFailure = (errorMessage) => ({
  type: AlbumsActionTypes.EDIT_ALBUM_FAILURE,
  payload: errorMessage,
});

export const addAlbumStart = (payload) => ({
  type: AlbumsActionTypes.ADD_ALBUM_START,
  payload,
});

export const addAlbumSuccess = (album) => ({
  type: AlbumsActionTypes.ADD_ALBUM_SUCCESS,
  payload: album,
});

export const addAlbumFailure = (errorMessage) => ({
  type: AlbumsActionTypes.ADD_ALBUM_FAILURE,
  payload: errorMessage,
});

export const deleteAlbumStart = (payload) => ({
  type: AlbumsActionTypes.DELETE_ALBUM_START,
  payload,
});

export const deleteAlbumSuccess = (id) => ({
  type: AlbumsActionTypes.DELETE_ALBUM_SUCCESS,
  payload: id,
});

export const deleteAlbumFailure = (errorMessage) => ({
  type: AlbumsActionTypes.DELETE_ALBUM_FAILURE,
  payload: errorMessage,
});
