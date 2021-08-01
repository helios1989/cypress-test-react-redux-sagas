import { createSelector } from "reselect";

export const selectPhotos = (state) => state.photos;

export const selectPhotosData = createSelector(
  [selectPhotos],
  (photos) => photos.data
);

export const selectPhotosErrorMessage = createSelector(
  [selectPhotos],
  (photos) => photos.errorMessage
);

export const selectPhotosFetchStatus = createSelector(
  [selectPhotos],
  (photos) => photos.isFetching
);
