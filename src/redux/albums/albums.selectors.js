import { createSelector } from "reselect";

export const selectAlbums = (state) => state.albums;

export const selectAlbumsData = createSelector(
  [selectAlbums],
  (albums) => albums.data
);

export const selectAlbumsErrorMessage = createSelector(
  [selectAlbums],
  (albums) => albums.errorMessage
);

export const selectAlbumsFetchStatus = createSelector(
  [selectAlbums],
  (albums) => albums.isFetching
);
